import { generate } from 'generate-password';

export function generatePassword() {
	return generate({
		length: 10,
		numbers: true,
		symbols: true,
		strict: true
	});
}
