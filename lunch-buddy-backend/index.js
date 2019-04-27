const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 5000


app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log('server is running on port ' + port)
})