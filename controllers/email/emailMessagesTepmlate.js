const {CLIENT_ORIGIN} = require('../../config');

module.exports = {
	confirmationMessage: (id, role) =>({
		subject: 'Registeration Confirmation',
		html: `
		<p>Congratulations on your first step to becoming a tutor on our platform. </p>
		<p>You have recieved this message as a follow up on your signing up with us. If you didn't initiate this signup, kindly ignore this mail.</p>
		<p>To proceed and complete your profile, we need to first confirm your email address.</p>
		<p> Click on the link below: <p/><br/>
		<a href='${CLIENT_ORIGIN}/confirmEmail/${role}/${id}'> Click to confirm Email</a>`,
		text: `or Copy and paste on your brower url bar: ${CLIENT_ORIGIN}/confirmEmail/${role}/${id}`
	})

}