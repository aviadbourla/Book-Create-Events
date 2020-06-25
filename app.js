const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const app = express();
const graphqlSchema = require('./graphql/scheima/index');
const graphqlResolvers = require('./graphql/resolvers/index')
const password = require('./keys');

const IsAuth = require('./middleware/is-auth')

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        next();
    }

})
app.use(IsAuth)

app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
})
);

app.get('/', (req, res, next) => {
     res.send("hey world")
})

mongoose.connect
    (`mongodb+srv://aviadbourla:${password}@bourla-shop-xmeqv.mongodb.net/events-react-dev?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(8000);
    })
    .catch(err => {
        console.log(err);
    })

 