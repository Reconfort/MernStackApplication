const express =  require('express');
const bodyParser =  require('body-parser');
const MongoClient =  require('mongodb').MongoClient;
const router = express.Router();
const app = express();
const port = process.env.PORT || 8080;
const url =  require('./secret');
// const { MongoClient } = require('mongoDb');

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
    app.route('/users')
    
    .get((req,res)=>{

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
        
    })

    .delete((req,res)=>{

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