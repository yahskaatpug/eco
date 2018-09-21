const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');
const schema = mongoose.Schema;
//user schema
let UserSchema = new schema({
    email:{type:String,unique:true,lowercase:true},
    password:String,
    profile:{
        name:{type:String, default:''},
        picture:{type:String, default:''}
    },
    address:String,
    history:{
        date:Date,
        paid:{type:Number,default:0}
    }
});
//password hashing before saving to the DB
UserSchema.pre('save',(next)=>{
    let user=this;
    //if(!user.isModified(password)) return next();
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            console.log("chutiyap!!!!");
        return next(err);}
        bcrypt.hash(user.password,salt,null,(err,hash)=>{//?
         if(err){
            console.log("hutiyap!!!!");
        return next(err);}
        user.password=hash;
        next();//?
        });
    });
});
//checking entered pass and saves pass
UserSchema.methods.comparePassword=(password)=>{
    return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('User',UserSchema);