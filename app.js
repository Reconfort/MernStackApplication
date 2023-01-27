const express =  require('express');
const bodyParser =  require('body-parser');
const MongoClient =  require('mongodb').MongoClient;
const router = express.Router();
const app = express();
const port = process.env.PORT || 8080;
const url =  require('./secret');
const ObjectId = require('mongodb').ObjectId;

app.use(bodyParser.json());

const client = new MongoClient(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

client.connect(err =>{
    const myDB = client.db('people').collection('friends');
    // console.log('ready');
    // const myObj ={
    //     name:'Dany'
    // }
    // coll.insertOne(myObj,(err,res)=>{
    //     console.log('inserted')
    //     client.close();
    // })


    app.get('/user/:name',(req, res)=>{
        console.log(req.params);
        myDB.find(req.params).toArray().then(results => {
            console.log(results);
            res.contentType('application/json')
            res.send(JSON.stringify(results))
        })
    })



    app.route('/users')
    
    .get((req,res)=>{
        myDB.find().toArray().then(results => {
            console.log(results);
            res.contentType('application/json')
            res.send(JSON.stringify(results))
        })
    })

    .post((req,res)=>{
        console.log(req.body)
        myDB.insertOne(req.body).then(results=>{
            console.log(req.body);
            res.contentType('application/json');
            res.send(JSON.stringify(req.body));
        })
    })

    .put((req,res)=>{
        console.log(req.body)
        myDB.findOneAndUpdate(
            {
                _id:ObjectId(req.body._id)
            },
            {$set:{
                name:req.body.name
            }},
            {
                upsert:false
            }
        ).then(result => {
            res.contentType('application/json');
            res.send({"status":true})
        })
    })

    .delete((req,res)=>{
        console.log(req.body);
        myDB.deleteOne({
            _id :ObjectId(req.body._id)
        }).then(result =>{
            let boo = true;
            if(result.deletedCount === 0){
                boo : false
            }
            res.send({"status":boo})
        })
        .catch(error => console.log(error))
    })
})

// Connect
// MongoClient.connect(url,(err,db)=>{
//     if(err) throw err;
//     console.log('Connected');
//     db.close();
// })







app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})

app.listen(port,()=>{
    console.log(`Server ${port} started 🚀🚀🚀`)
})