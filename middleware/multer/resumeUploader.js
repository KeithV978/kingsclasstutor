exports.resumeUploader = () =>{
	var multer = require('multer');
  
	var storage = multer.diskStorage({
	    destination: (req, file, cb) => {
		   cb(null, 'resumeUploads')
	    },
	    filename: (req, file, cb) => {
		   cb(null, file.fieldname + '-' + Date.now())
	    }
	});
	  
	var resumeUploader = multer({ storage: storage });

}