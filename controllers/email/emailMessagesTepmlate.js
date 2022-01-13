const {CLIENT_ORIGIN} = require('../../config');

module.exports = {
	confirmationMessage: (id, role) =>({
		subject: 'Email Confirmation',
		html: `
		<a href='${CLIENT_ORIGIN}/confirmEmail/:${role}/:${id}'> Click to confirm Email</a>`,
		text: `Copy and paste this link: ${CLIENT_ORIGIN}/confirmEmail/:${role}/:${id}`
	}),
	tutorConfirmationMessage: (id,role) =>({
		subject: 'Email Confirmation - As a Tutor',
		html: `
		<a href='${CLIENT_ORIGIN}/confirmEmail/:${role}/:${id}'> Click to confirm Email</a>`,
		text: `Copy and paste this link: ${CLIENT_ORIGIN}/confirmEmail/:${role}/:${id}`
	})

}