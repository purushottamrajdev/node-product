
//const winston=require('winston');
const winston=require('winston');
module.exports=function(err,req,res,next){
    winston.error(err.message,err);//logging error into file
    res.status(500).send('Internal Servar Error');
}