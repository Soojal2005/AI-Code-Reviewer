const express = require('express');
const router = express.Router();
const aicontroller = require('../controller/ai.controller');
router.post('/ask-ai', aicontroller.getreview)

module.exports = router;