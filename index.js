const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { getAllVillains, getVillainBySlug } = require('./controllers/villains')


app.get('/villains', getAllVillains)

app.get('/villains/:slug', getVillainBySlug)


app.listen(7000, () => {
  console.log('Listening on port 7000...')
})
