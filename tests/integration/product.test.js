const request=require('supertest');
const {Product}=require('../../models/product');
const {User}=require('../../models/user');
let server;

describe('/api/products',()=>{
    beforeEach(()=>{server=require('../../index');})
    afterEach(async()=>{
        await Product.remove({});
        server.close();});

    describe('GET /',()=>{
        it('should return all product',async()=>{
           await Product.collection.insertMany([
                {category:'fruits',imageUrl:'abcd',price:10,title:'apple'},
                {category:'vegetable',imageUrl:'sdfsdf',price:20,title:'leeks'}
            ]
            );
            const res= await request(server).get('/api/products');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g=>g.title==='apple')).toBeTruthy();
            expect(res.body.some(g=>g.title==='leeks')).toBeTruthy();
        })
    })

    describe('GET /:id',()=>{
        it('should return a product if valid id is passed',async()=>{
            const product=new Product({category:'fruits',imageUrl:'abcd',price:10,title:'apple'});
            await product.save(); 
            const res=await request(server).get('/api/products/'+product._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('title',product.title);
        })

        it('should return 404 if invalid product id provide in get request',async()=>{
           
            const res=await request(server).get('/api/products/1');
           
            expect(res.status).toBe(404);
            //expect(res.body).toHaveProperty('title',product.title);
        });

    });

    describe('POST /',()=>{

        let token;
        let category,imageUrl,title,price;
        const exec=async()=>{
            return await request(server)
            .post('/api/products')
            .set('x-auth-token',token)
            .send({category,imageUrl,price,title})//if key and value name are same then in es 6 ,we can use only keynames
        }
        beforeEach(()=>{
            token=new User().generateAuthToken();
            category='fruits';
            imageUrl='abcd';
            price=10;
            title='spinich';
        })

        it('should return 401 if client is not logged in',async()=>{
            token='';
            const res=await exec();

           expect(res.status).toBe(401);
        })

        it('should return 400 if client provide wrong data',async()=>{
           title="dd";
           const res=await exec();

            expect(res.status).toBe(400);
         })

         it('should save the product if it is valid',async()=>{
            await exec();
            const product=await Product.find({title:'abvsdf'});
            expect(product).not.toBeNull();
         })

         it('should return  saved product',async()=>{
            const res=await exec();

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('title');
            expect(res.body).toHaveProperty('category');
            expect(res.body).toHaveProperty('imageUrl');
            expect(res.body).toHaveProperty('title');
         })
    })
    
})