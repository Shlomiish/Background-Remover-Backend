const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const removeBgFunc = require('./middleware/removeBgFunc');

const app = express();
const port = process.env.PORT || 3000; // Use a default port if process.env.PORT is not set

app.use(cors());
app.use(fileUpload());

app.use(express.static('uploaded_images')); // Make the folder public, that the client side can use it
app.use(express.static('bg_removed_images')); // Make the folder public, that the client side can use it

const imageRouter = require('./routers/imageRouter');
app.use('/', imageRouter);

const isRenderEnvironment = process.env.RENDER === 'true';

app.get('/', (req, res) => {
  res.send(`Running on Render: ${isRenderEnvironment}`);
});

app.post('/test', (req, res) => {
  console.log('test');
  let imageFile = req.files.uploadedFile;
  if (imageFile.mimetype === 'image/jpeg' || imageFile.mimetype === 'image/png') {
    console.log('test2');
    try {
      console.log('test3');
      let time = new Date().getTime();
      newImageType = imageFile.name.replace('.jpg', '.png');
      let fileNameAndUploadedTime = time + '_' + newImageType;

      imageFile.mv(`${__dirname}/./uploaded_images/${fileNameAndUploadedTime}`, (err) => {
        console.log('test4');

        if (err) {
          res.status(400).send(err);
        } else {
          removeBgFunc(fileNameAndUploadedTime);
          res.status(201).send(fileNameAndUploadedTime);
          console.log('test5');
        }
      });
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    res.status(415).json({ errMsg: 'Unsupported file' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
