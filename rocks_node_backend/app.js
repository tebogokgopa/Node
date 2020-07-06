const express = require('express')
const app = express()
const mongoclient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
app.use(express.json)

mongoclient.connect(url,{useUnifiedTopology: true},(error,db) =>{
    
    if(error){
        console.log("Error while connecting to mongo client...")
    }else{

        const mydatabase = db.db('j_rocks')
        const collection = mydatabase.collection('login_table')

        app.post('/register',(req,res) =>{

            const new_user = {
                username : req.body.username,
                email:req.body.email,
                password:req.password
            }
            
            const query = {email:new_user.email}  

            collection.findOne(query,(error,result)=>{
                if(result == null){
                    collection.insertOne(new_user,(err,result)=>{
                        res.status(200).send()
                    })
                }else{
                    
                    res.status(400).send()
                }
            })
        })


        app.post('/login',(req,res)=>{
                const query = {
                    email:req.body.email,
                    password: req.body.password
                }

                collection.findOne(query,(error,result)=>{
                    if(result != null){
                        const objToSend = {
                            name: result.name,
                            email:result.email
                        }
                        res.status(200).send(JSON.stringify(objToSend))
                    }else{
                       
                        res.status(404).send()
                    }
                })

        })

    }


})


app.listen(3000,()=>{
    console.log('Listening on port 3000...')
})