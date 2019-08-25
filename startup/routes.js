const express=require('express');
const product=require('../routes/product');
const user =require('../routes/user');
const auth=require('../routes/auth');
const error=require('../middleware/error');

module.exports=function(app){
app.use(express.json());//middleware
app.use('/api/products',product);
app.use('/api/users',user);
app.use('/api/auth',auth);
app.use(error);
}