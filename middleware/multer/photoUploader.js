exports.photoUploader = () =>{
	var multer = require('multer');
  
	var storage = multer.diskStorage({
	    destination: (req, file, cb) => {
		   cb(null, 'photoUploads')
	    },
	    filename: (req, file, cb) => {
		   cb(null, file.fieldname + '-' + Date.now())
	    }
	});
	  
	var photoUploader = multer({ storage: storage });

}