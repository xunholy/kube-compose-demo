const bodyParser = require('body-parser')
const express = require('express')
const plivo = require('plivo')
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
    res.type('text/plain').send('Hello Kubernetes User Group! You were here on 29 August 2019!')
});

app.post('/send', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    if (req.method === 'OPTIONS') {
        // Set CORS headers for preflight requests
        // Allows GETs from any origin with the Content-Type header
        // and caches preflight response for 3600s
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        console.log(req.body)
        let msg = await client.messages.create(
            req.body.source,
            req.body.destination,
            req.body.message
        )
        res.send('Message Sent: ' + JSON.stringify(msg))
    }
})

let server
['SIGINT', 'SIGTERM'].forEach(signal => {
    let shuttingDown = false
    process.on(signal, () => {
        console.log(`received signal ${signal}`)
        if (server == undefined) {
            console.log('gracefully shut down server')
            process.exit(0)
        }
        if (shuttingDown) {
            return
        }
        shuttingDown = true
        server.close(() => {
            console.log('gracefully shut down server')
            process.exit(0)
        })
        setTimeout(() => {
            console.error('could not gracefully terminate server after 10 seconds, abruptly exiting with code 1')
            process.exit(1)
        }, 10000)
    })
})
server = app.listen(port, () => {
    console.log(`server is listening on port ${port}!`)
})

