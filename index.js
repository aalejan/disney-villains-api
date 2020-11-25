const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 7000
const { getAllVillains, getVillainBySlug, saveNewVillain } = require('./controllers/villains')

app.get('/villains', getAllVillains)

app.get('/villains/:slug', getVillainBySlug)

app.use(bodyParser.json())

app.post(bodyParser.json(), saveNewVillain)

app.all('*', (req, res) => {
  return res.send('Villain was not found, incorrect slug or route does not exist.')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
