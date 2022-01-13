const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ServiceInProgressSchema = new Schema({
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
		type: Date
	},
	end_date:{
		type: Date
	},
	first_payment_receipt_no:{
		type: String
	},
	extended_payment_receipt_no:{
		type: String
	},
	release_payment:{
		type: Boolean,
		default: false
	}
}, {timestamps: true});


const ServiceInProgress = mongoose.model('ServiceInProgress', ServiceInProgressSchema);

module.exports = ServiceInProgress;