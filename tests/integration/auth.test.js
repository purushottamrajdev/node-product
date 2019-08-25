const {Product}=require('../../models/product');
const {User}=require('../../models/user');
const request=require('supertest');
//let server;
describe('auth middleware',()=>{
    
    beforeEach(()=>{server=require('../../index');})
    afterEach(async()=>{
        await Product.remove({});
        server.close();});
    let token;
    const exec=()=>{
        return request(server).post('/api/products')
        .set('x-auth-token',token)
        .send({category:'fruits',imageUrl:'sfsdfsdf',price:10,title:'apple'});
    }
    beforeEach(()=>{
        token= new User().generateAuthToken();
    })
    it('should return 401 if no token provided',async()=>{
        token='';
        const res=await exec();
        expect(res.status).toBe(401);
    })

    it('should return 400 if invalid token provided',async()=>{
        token='a';
        const res=await exec();
        expect(res.status).toBe(400);
    })
    it('should return 200 if  token is valid',async()=>{
    
        const res=await exec();
        expect(res.status).toBe(200);
    })
})