const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const http = require('http');

const app = express();
const PORT = process.env.PORT;
const server = http.createServer(app);

app.use(cors());
app.use(fileUpload());

app.use(express.static('uploaded_images')); // Make the folder public, that the client side can use it
app.use(express.static('bg_removed_images')); // Make the folder public, that the client side can use it
app.use(express.static('bg_color_images')); // Make the folder public, that the client side can use it

const imageRouter = require('./routers/imageRouter');
app.use('/', imageRouter);

app.listen(PORT);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
