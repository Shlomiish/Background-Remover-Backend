const express = require('express');
const imageBL = require('../imageRequests/imageBL');

const router = express.Router();

router.post('/upload_image', imageBL.upload_image);

module.exports = router;
