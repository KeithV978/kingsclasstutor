const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Services = mongoose.model('Services', 
new mongoose.Schema({
	clientDetails:{
		name:{
			firstName:{
			type: String
			},
			lastName:{
				type: String
			}
		},
		address:{
			street:{type: String},
			city:{type: String},
			_state:{type: String}
		},
		phone:{type: Number},
		email:{type: String}
		
	},
	tutorDetails:{
		tutorID:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "TutorProfile"
		},
		tutorName:{
			type: String
		},
	},
	serviceDetails:{
		transactionReference:{
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
		startDate:{
			type: Date
		},
		end_date:{
			type: Date
		},
		receipts:{
			firstPaymentReceiptNno:{
				type: String
			},
			firstPayment:{
				type: Number,
				default: 0
			},
			secondPaymentReceiptNo:{
				type: String
			},
			secondPayment:{
				type: Number,
				default: 0
			}
		},
		releasePaymentToTutor:{
			type: Boolean,
			default: false
		},
		tutorPaymentDate:{
			type: Date,
			default: null
		},
		completed:{
			type: Boolean,
			default: false
		}
	}
}, {timestamps: true})
)

module.exports = Services;