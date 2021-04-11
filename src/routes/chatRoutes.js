var express = require('express');
var router = express.Router();
var querystring = require('querystring');
const request = require('request');
const axios = require('axios');
const Room = require('../models/roomModel');


router.post('/join', (req,res)=>{
    const { roomId, userId } = req.body;
    
});

router.get('/peeps', async (req,res)=>{
    const t = req.query.trackId;    
    try {
        const room = await Room.findOne({trackId:t});
        console.log(room);
        res.send(room);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;