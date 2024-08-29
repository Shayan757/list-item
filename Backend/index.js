const express = require('express')

const ConnectToMongo = require ("./db")
const cors = require('cors')

ConnectToMongo();

const app = express()
const port = 3001

app.use(express.json());
app.use(cors())



app.use('/api/item', require('./routes/item'))
app.use('/api/user', require('./routes/user'))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })