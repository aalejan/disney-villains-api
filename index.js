const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {getAllVillains} = require('./controllers/villains')


app.get('/villains', getAllVillains )



app.listen(7000, () => {
    console.log('Listening on port 7000...')
})
