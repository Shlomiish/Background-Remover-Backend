const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const port = 5000;
const app = express();

app.use(cors());
app.use(fileUpload());

app.use(express.static('uploaded_images')); // Make the folder public, that the client side can use it
app.use(express.static('bg_removed_images')); // Make the folder public, that the client side can use it
app.use(express.static('bg_color_images')); // Make the folder public, that the client side can use it

const imageRouter = require('./routers/imageRouter');
app.use('/', imageRouter);

app.listen(port);

const connect = () => {
  console.log(`App is listening at http://localhost:${port}`);
};

connect();
