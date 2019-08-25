const mongoose =require('mongoose');
const winston=require('winston');
const config=require('config');
const db=config.get('db');
module.exports=function(){mongoose.connect(db,{useNewUrlParser:true})//connection string
.then(()=>{winston.info(`connected to mongodb ${db}`);
        console.log(`connected to mongodb ${db}`);
});
//.catch((err)=>("Cloud not connect to mongoDb..",err));
}