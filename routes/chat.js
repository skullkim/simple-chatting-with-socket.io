const express = require('express');
const path = require('path');
const User = require('../models/users');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try{
        const {nick} = req.body;
        const ex_user = await User.findOne({
            where: {nick}
        });
        if(ex_user){
            res.redirect('/?error=same nick name exist');
        }
        else{
            await User.create({
                nick,
            });
            if(!req.session.user){
                req.session.user = {
                    nick
                }
            } 
            res.sendFile(path.join(__dirname, "../views/chatroom.html"));
        }
    }
    catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/nickname', (req, res, next) => {
    try{
        const {user:{nick}} = req.session;
        res.json({nick});
    }
    catch(err){
        console.error(err);
        next(err);
    }
})

router.post('/exit', async (req, res, next) => {
    try{
        const {user:{nick}} = req.session;
        await User.destroy({
            where: {nick}
        });
        req.session.destroy(() => req.session);
        res.redirect('/');
    }
    catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;