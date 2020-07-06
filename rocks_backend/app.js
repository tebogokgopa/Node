//Required nodejs/npm modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models/index');

const app = express();

var corsOptions = {
    origin: 'http://localhost:5001',
    optionsSuccessStatus:200
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(bodyParser.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//simple route to check if backend server responds
app.get("/",(request,response)=>{

    response.json({message: "Welcome to the rocks backend things still running fine..."});

});

//Connect to mongodb database

db.mongoose.connect(db.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Connected to database.....');
}).catch(err =>{
    console.log('Cannot connect to database!', err);
    process.exit();
});

require("./routes/tutorial.routes")(app);

//Set port,listen for requests
const  PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Rocks server running and listening on port ${PORT}.....`);
});