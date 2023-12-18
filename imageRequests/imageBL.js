const removeBgFunc = require('../middleware/removeBgFunc');

const upload_image = async (req, res) => {
  let imageFile = req.files.uploadedFile;
  if (imageFile.mimetype === 'image/jpeg' || imageFile.mimetype === 'image/png') {
    try {
      let time = new Date().getTime();
      newImageType = imageFile.name.replace('.jpg', '.png');
      let fileNameAndUploadedTime = time + '_' + newImageType;

      imageFile.mv(`${__dirname}/../uploaded_images/${fileNameAndUploadedTime}`, (err) => {
        if (err) {
          res.status(400).send(err);
        } else {
          removeBgFunc(fileNameAndUploadedTime);
          res.status(201).send(fileNameAndUploadedTime);
        }
      });
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    res.status(415).json({ errMsg: 'Unsupported file' });
  }
};

module.exports = { upload_image };
