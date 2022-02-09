const authJwt = require("./authToken");
const {photoUploader} = require("./multer/photoUploader");
const {resumeUploader} = require("./multer/resumeUploader");

module.exports = {
  authJwt,
  photoUploader,
  resumeUploader
};