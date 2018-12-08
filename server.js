const express = require("express")
const logger = require('morgan')
const projectRouter = require('./routers/projectRouter');
const actionRouter = require('./routers/actionRouter');
const cors = require('cors');

const server = express()
const port = 9000

server.use(express.json(), logger('tiny'), cors())
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);


server.get('/', (req, res) => {
    res.send("The API is working!");
});

server.listen(port, err => {
    if(err) console.log(err)
    console.log(`Server is running on port: ${port}`);
})