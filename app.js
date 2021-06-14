const express = require('express');
const app = express();
//const graphqlHTTP = require('express-graphql');
const { graphqlHTTP } = require('express-graphql');
require('dotenv/config') // env file config
const mongoose = require('mongoose');


//graphql creation
app.use(
    '/graphql', 
    graphqlHTTP({
         schema : require('./Schema'), graphiql: true}));




//DB creation
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology',true)
mongoose.connect(process.env.MYDB_CONNECTION,(err) =>{
    if (err) 
    {
        console.log('DB NOT CONNECTED.');    
    }
    console.log('DB CONNECTED SUCCESSFULLY');
})




//localhost
app.listen(5000, () => {
    console.log('Server running succefully in port 5000 ...')
})