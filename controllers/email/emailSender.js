const nodemailer = require('nodemailer');

// The credentials for the email account to be used
const credentials = {
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.MAIL_USER,
		password: process.env.MAIL_PASS
	}
}


// Creating the mailing system based off of our credentials.
const transporter = nodemailer.createTransport(credentials);

module.exports = async(to, content) =>{
	const contact ={
		from: process.env.MAIL_USER,
		to
	}

	// Combine the content and the contact into a single object
	const email = Object.assign({}, content, contact)

	// This file is imported to the controller as the sendMail() function.
	await transporter.sendMail(email)
}