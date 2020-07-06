
module.exports = app =>{

    const tutorials = require("../controllers/tutorials.controller");

    var router = require("express").Router();

    //create new tutorial
    router.post("/",tutorials.create);

    //Retrieve all tutorials
    router.get("/",tutorials.findAll);

    //Retrive all published Tutorials
    router.get("/published",tutorials.findAllPublished);

    //Retrieve a single tutorial with id 
    router.get("/:id",tutorials.findOne);

    //Update a Tutorial with id
    router.put("/:id",tutorials.update);

    //Delete  Tutorial with id
    router.delete("/:id",tutorials.delete);

    //Delete all Tutorials
    router.delete("/",tutorials.deleteAll);

    app.use('./api/tutorials',router);

};