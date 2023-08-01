const express = require('express');
const bodyParser = require('body-parser');
const routes = require('express').Router();
const tasksInfo = require('./routes/taskInfo');

const app = express();
app.use(bodyParser.json());
app.use(routes);

const PORT = 3000;

app.get('/', (req,res)=>{
    return res.status(200).send('Welcome to task manager application');
})

routes.use('/tasks',tasksInfo);

app.listen(PORT, (error)=> { //takes a callback
    if(!error){
        console.log("Server has started successfully");
    } else {
        console.log("Error occured");
    }
});