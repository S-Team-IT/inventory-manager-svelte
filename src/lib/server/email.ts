import { GOOGLE_APP_PASSWORD, GOOGLE_EMAIL } from '$env/static/private';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: GOOGLE_EMAIL,
		pass: GOOGLE_APP_PASSWORD
	}
});

export async function testNodemailer() {
	try {
		await transporter.verify();
		console.log('Server is ready to take our messages');
	} catch (e) {
		console.error('Verification failed:', e);
	}
}

export async function sendAuthenticationEmail(email: string, password: string) {
	try {
		const info = await transporter.sendMail({
			from: '"Charlotte" <faethychan@gmail.com>',
			to: email,
			subject: 'S-Team Inventory Manager Account Creation',
			text: `This is an automated email. Please verify with Fang Yee if unsure. Your password is: ${password}. Please change it once you sign in.`,
			html: `
			<div>This is an automated email. <b>Please verify with Fang Yee if unsure.</b></div>
			<div>Your password is: <b>${password}<b>. Please change it once you sign in.</div>
			`
		});

		console.log('Message sent: %s', info.messageId);
	} catch (e) {
		console.error('Error while sending mail:', e);
	}
}

export async function sendForgetPasswordEmail(email: string, password: string) {
	const subject = 'S-Team Inventory Manager Forget Password';
	const text = `This is an automated email. You have forgotten your password :(. Your new password is ${password}. Please change it once you sign in.`;
	const html = `
		<div>This is an automated email. You have forgotten your password :(</div>
		<div>Your new password is: <b>${password}</b>. Please change it once you sign in.</div>
		`;
	await sendEmail(email, subject, text, html);
}
async function sendEmail(email: string, subject: string, text: string, html: string) {
	try {
		const info = await transporter.sendMail({
			from: '"Charlotte" <faethychan@gmail.com>',
			to: email,
			subject,
			text,
			html
		});

		console.log('Message sent: %s', info.messageId);
	} catch (e) {
		console.error('Error while sending mail:', e);
	}
}
