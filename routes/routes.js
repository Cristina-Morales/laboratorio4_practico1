const express = require('express');
const { getArtistInfo, getTrackInfo } = require('../controllers/controlador');
const router = express.Router();

router.get('/artist/:name', getArtistInfo);
router.get('/track/:name', getTrackInfo);

module.exports = router;