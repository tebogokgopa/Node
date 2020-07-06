const express =  require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require("./models");
const { initial } = require('lodash');
const Role = db.role;

const app = express();

var corsOptions = {
    origin : "http:localhost/5001"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.json({message: "Welcome to the rocks secure mysql application"});
});

db.sequelize.sync({force:true}).then(()=>{
    console.log('Drop and Resync Database...');
    initial();
});
function initial(){
    Role.create({
        id: 1,
        name : "user"
    });

    Role.create({
        id: 2,
        name: "admin"
    });

    Role.create({
        id: 3,
        name: "moderator"
    });
};

const PORT = process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Rocks secure mysql backend running on port ${PORT}`);
});