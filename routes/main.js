let router=require('express').Router();

router.get('/',(req,res)=>{
    res.render('main/home');
});

module.exports = router;
