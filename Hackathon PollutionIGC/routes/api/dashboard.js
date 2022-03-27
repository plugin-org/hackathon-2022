const express = require('express');

const router = express.Router();

// const Data = require('../../models/Data');

router.get('/', (req,res) => res.send('dashboard'));

module.exports = router;