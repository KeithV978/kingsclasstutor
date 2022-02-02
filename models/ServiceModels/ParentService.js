const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ParentServiceShema = new Schema({
	parent_Id:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "ParentProfile"
	},
	parent_Name:{
		type: String
	},
	tutor_Id:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "TutorProfile"
	},
	tutor_Name:{
		type: String
	},
	duration:{
		type: String
	},
	hours:{
		type: String
	},
	days:{
		type: Array
	},
	start_date:{
		type: Date
	},
	end_date:{
		type: Date
	},
	receipts:{
		first_payment_receipt_no:{
			type: String
		},
		first_payment:{
			type: Number,
			default: 0
		},
		second_payment_receipt_no:{
			type: String
		},
		second_payment:{
			type: Number,
			default: 0
		}
	},
	release_payment_to_tutor:{
		type: Boolean,
		default: false
	},
	tutor_payment_date:{
		type: Date,
		default: null
	},
	completed:{
		type: Boolean,
		default: false
	}
}, {timestamps: true});


const ParentService = mongoose.model('ParentService', ParentServiceShema);

module.exports = ParentService;