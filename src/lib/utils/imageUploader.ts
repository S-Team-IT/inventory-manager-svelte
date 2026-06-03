//Supabase
import { PUBLIC_SUPABASE_PUBLISHABLE_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';
import { error as svelteError } from '@sveltejs/kit';
import imageCompression from 'browser-image-compression';

const supabaseUrl = PUBLIC_SUPABASE_URL;
const supabaseKey = PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadFile(file: File, name: string) {
	const { data, error } = await supabase.storage
		.from('item-photos')
		.upload(`public/${name}.jpg`, file);

	if (error) {
		console.log(error);
		svelteError(500, 'Failed to upload file.');
	} else {
		return data;
	}
}

async function getPublicUrl(name: string) {
	const { data } = supabase.storage.from('item-photos').getPublicUrl(name);
	return data.publicUrl;
}

async function compressImage(file: File): Promise<File> {
	const options = {
		maxSizeMB: 0.1,
		maxWidthOrHeight: 500,
		useWebWorker: true
	};

	console.log('originalFile instanceof Blob', file instanceof Blob);
	console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

	try {
		const compressedFile = await imageCompression(file, options);
		console.log('compressedFile instanceof Blob', compressedFile instanceof Blob);
		console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);
		return compressedFile;
	} catch (error) {
		console.log(error);
		return file;
	}
}

async function getCompressedUrl(file: File, name: string): Promise<string> {
	const compressedFile = await compressImage(file);
	const uploadData = await uploadFile(compressedFile, name);
	const url = await getPublicUrl(uploadData.path);
	return url;
}
