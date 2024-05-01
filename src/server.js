const express = require('express')
const app = express()

const port = 9000
const routes = require('./routes')

app.use(express.json())
app.use('/api/v1/', routes)

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
})