const mongoose =require('mongoose');
const Joi=require('joi');

//Schema
const productSchema=new mongoose.Schema({
    category:{type:String,
        required:true,minlength:3,
        maxlength:20,
        enum:['vegetables','fruits'],
        lowercase:true
    },
    imageUrl:{type:String,required:true},
    price:{type:Number,required:true,min:1},//we use min property for Type Number
    title:{type:String,
        required:true,minlength:3,
        maxlength:20,
        trim:true
        }
});

//Model for schema
//Product is class
const Product=mongoose.model('Product',productSchema);


function validateProduct(product)
{
    const schema={
        category:Joi.string().min(3).required(),
        imageUrl:Joi.string().required(),
        price:Joi.number().required(),
        title:Joi.string().min(3).required()
    }
    return Joi.validate(product,schema); 
}

exports.Product=Product;
exports.validateProduct=validateProduct;