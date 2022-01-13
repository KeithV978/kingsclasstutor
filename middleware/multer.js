// exports.upload = () =>{
// 	const multer = require('multer');

// 	const storage = multer.diskStorage({
// 		destination: function(req, file, cb){
// 		    if(file.fieldname === "qualification"){
// 			   cb(null, 'uploads/qualifications/')
// 		    }else if(file.fieldname === "photo"){
// 			   cb(null, 'uploads/photo/')
// 		    }
// 		},
// 		filename:(req, file, cb) =>{
// 		    if(file.fieldname === "qualification"){
// 			   cb(null, file.fieldname + "_" + file.originalname )
// 		    }else if(file.fieldname === "photo"){
// 			   cb(null, file.fieldname + "_" + file.originalname )
// 		    }
// 		}
// 	 });
//   var upload = multer
//   	({
// 	 storage: storage,
// 	 limits: {fileSize: 1024 * 1024 * 10 }
// 	})

// }