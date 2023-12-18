const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000; // Use a default port if process.env.PORT is not set

const corsOptions = {
  origin: 'https://photobox-background-remover-frontend-yourname.onrender.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(fileUpload());

app.use(express.static('uploaded_images')); // Make the folder public, that the client side can use it
app.use(express.static('bg_removed_images')); // Make the folder public, that the client side can use it

const imageRouter = require('./routers/imageRouter');
app.use('/', imageRouter);

app.listen(port);

app.listen(() => {
  console.log(`Server is running on http://localhost:${port}`);
});
