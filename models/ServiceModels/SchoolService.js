const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const serviceRenderedSchema = new Schema({
	client_Id:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "TutorProfile"
	},
	client_Name:{
		type: String
	},
	tutor_Id:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "TutorProfile"
	},
	tutor_Name:{
		type: String
	},
	paid_for_service:{
		type: Boolean,
		default: false
	},
	amount_paid:{
		type: Number,
		default: 0
	}
}, {timestamps: true});


const ServiceRendered = mongoose.model('ServiceRendered', serviceRenderedSchema);

module.exports = ServiceRendered;