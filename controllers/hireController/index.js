const Tutors = require('../../models/TutorModels/TutorModel');
const Services = require('../../models/ServiceModels/Services')

module.exports = {
	fetchTutors: (req, res) =>{
		let {classesITeach, subject, gender} = req.body;
		Tutors.find({classesITeach})
	},
	trackReference:(req, res) =>{
		let ref = req.body;
		Services.find(ref, (err, service)=>{
			if(err) return res.send({message: err});

			res.send({message: service});
		})

	}
}