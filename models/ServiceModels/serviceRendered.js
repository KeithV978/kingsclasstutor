const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const serviceRenderedSchema = new Schema({
	client_Id:{
		type: String
	},
	client_Name:{
		type: String
	},
	tutor_Id:{
		type: String
	},
	tutor_Name:{
		type: String
	},
	start_date:{
		type: String
	},
	end_date:{
		type: String
	},
	payment_receipts:{
		type: Array
	}, 
	release_payment:{
		type: Boolean
	}
}, {timestamps: true});


const ServiceRendered = mongoose.model('ServiceRendered', serviceRenderedSchema);

module.exports = ServiceRendered;