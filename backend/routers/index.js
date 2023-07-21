const express = require('express');
const router = express.Router();
const userRt = require('./authRoutes');

router.use(userRt);

module.exports = router;