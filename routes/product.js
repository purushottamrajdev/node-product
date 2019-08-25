//const asyncMiddleware=require('../middleware/async');
//const mongoose=require('mongoose');
const validateObjectId=require('../middleware/validateObjectId');
const auth=require('../middleware/auth');
const admin=require('../middleware/admin');
const superAdmin=require('../middleware/superAdmin');
const express=require('express');
const router=express.Router();
const {Product,validateProduct}=require('../models/product');
//api call for creating product
router.post('/',[auth],async(req,res)=>{
    const {error}=validateProduct(req.body);//joi returns error object if error found
    if(error)
        return res.status(400).send(error.details[0].message);
    let product=new Product({
        category:req.body.category,
        imageUrl:req.body.imageUrl,
        price:req.body.price,
        title:req.body.title
    })
        product=await product.save();
        res.status(200).send(product);
 });

//api call for get all product
router.get('/',async(req,res,next)=>{
        //throw new Error('Could Not Get Data');
        const products=await Product.find();
        res.status(200).send(products);
});

// api call for get singal product
router.get('/:id',validateObjectId,async(req,res)=>{
    //getProductById(req.params.id)
   
    const product=await Product.findById(req.params.id);
    if(!product)
    return res.status(404).send('Given Id is not present in database');
    return res.status(200).send(product);
    
 });

//api call for update Product
router.put('/:id',[auth,superAdmin],async(req,res)=>{
    const {error}=validateProduct(req.body);//joi returns error object if error found
    if(error)
        return res.status(400).send(error.details[0].message);
        
            const product=await Product.findByIdAndUpdate(req.params.id,{
                $set:{
                    category:req.body.category,
                    imageUrl:req.body.imageUrl,
                    price:req.body.price,
                    title:req.body.title
                }
            },{new:true}); 
            if(!product)
            return res.status(404).send('update unsuccessfull,Given Id is not present in database');
            res.status(200).send(product);
        });
//api call for remove Product
router.delete('/:id',[auth,superAdmin],async(req,res)=>{
    const product=await Product.findByIdAndRemove(req.params.id);
    if(!product)
    return res.status(404).send('delete unsuccessfull,Given Id is not present in database');
    res.status(200).send(product);
})

module.exports = router;
