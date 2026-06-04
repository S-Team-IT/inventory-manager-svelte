import { zImgFile, zString } from '$lib/types/schemaTypes';
import { command } from '$app/server';
import sharp from 'sharp';
import { supabase } from '$lib/server/supabase';
import { error } from '@sveltejs/kit';
import z from 'zod';
import { handleQueryErrors } from '$lib/utils/errorHandling';
import type { Gallery } from '$lib/types/databaseTypes';

export const uploadImage = command(
	z.object({ file: zImgFile, name: zString }),
	async ({ file, name }) => {
		try {
			const optimizedBuffer = await compressImageFile(file);
			const uploadData = await uploadBuffer(optimizedBuffer, name);
			const url = await getPublicUrl(uploadData.path);
			return url;
		} catch (e) {
			handleQueryErrors(e);
		}
	}
);

export const uploadMultipleImages = command(
	z.object({ files: z.array(zImgFile), name: zString }),
	async ({ files, name }): Promise<Gallery> => {
		const urls: Gallery = [];
		for (const [i, file] of files.entries()) {
			const url = await uploadImage({ file, name: `${name}_${i}` });
			if (!url) throw new Error('uploadImage did not return url but did not throw an error');
			urls.push({ item: url });
		}
		return urls;
	}
);

async function compressImageFile(file: File): Promise<Uint8Array> {
	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	const optimizedBuffer = await sharp(buffer).resize(300).webp().toBuffer();
	console.log(buffer.length, ' ', optimizedBuffer.length);
	return new Uint8Array(optimizedBuffer);
}

async function uploadBuffer(buffer: Uint8Array, name: string) {
	const { data, error: supabaseError } = await supabase.storage
		.from('item-photos')
		.upload(`public/${name}_${Date.now()}.webp`, buffer, {
			contentType: 'image/webp'
		});

	if (supabaseError) {
		console.log(supabaseError);
		error(500, 'Failed to upload file.');
	} else {
		return data;
	}
}

async function getPublicUrl(name: string) {
	const { data } = supabase.storage.from('item-photos').getPublicUrl(name);
	return data.publicUrl;
}
