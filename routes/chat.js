const express = require('express');
const path = require('path');

const router = express.Router();

router.post('/', (req, res, next) => {
    try{
        res.sendFile(path.join(__dirname, "../views/chatroom.html"));
    }
    catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/exit', (req, res, next) => {
    try{
        res.redirect('/');
    }
    catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;