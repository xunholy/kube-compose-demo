const bodyParser = require('body-parser')
const express = require('express')
const plivo = require('plivo');
const cors = require('cors')
const app = express()


const client = new plivo.Client(process.env.AUTH_ID, process.env.AUTH_TOKEN);

const port = process.env.PORT || 8081

// handle cors
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('Success!')
});

app.post('/send', async (req, res) => {
    if (req.method === 'OPTIONS') {
        // Set CORS headers for preflight requests
        // Allows GETs from any origin with the Content-Type header
        // and caches preflight response for 3600s
        // Send response to OPTIONS requests
        response.set('Access-Control-Allow-Methods', 'POST');
        response.set('Access-Control-Allow-Headers', 'Content-Type');
        response.set('Access-Control-Max-Age', '3600');
        response.status(204).send('');
    } else {
        console.log(req.body)
        let msg = await client.messages.create(
            req.body.source,
            req.body.destination,
            req.body.message
        )
        res.set('Access-Control-Allow-Origin', '*')
        res.send('Message Sent: ' + JSON.stringify(msg))
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

