let router = require('express').Router();
let User = require('../models/user');
let passportConf=require('../config/passport'); 
const passport=require('passport');
router.get('/signup',(req,res)=>{
    res.render('accounts/signup',{errors:req.flash('errors')});
});

router.get('/login',(req,res)=>{
	if(req.user) return res.redirect('/');
	res.render('accounts/login',{message: req.flash('loginMessage')});
});

router.post('/login',passport.authenticate('local-login',{
	successRedirect:'/profile',
	faliureRedirect:'/login',
	failureFlash: true
}));
router.get('/profile',(req,res)=>{
    res.render('accounts/profile');
});

router.post('/signup',(req,res)=>{
    let user = new User();
    user.profile.name = req.body.name;
    user.email        = req.body.email;
    user.password     = req.body.password;
    User.findOne({email:req.body.email},(err,existing)=>{
        if(existing){
            req.flash('errors','Account already exists');
            // console.log(req.body.email+'already exist');
            res.redirect('/signup');
        }else{
           // req.flash('msg','successfully SignUp!');
            user.save((err,user)=>{
                if(err) console.log(err);
                res.redirect('/profile');
            });
        }
    });
});

module.exports = router;