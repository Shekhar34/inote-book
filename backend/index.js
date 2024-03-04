const connectToMongo = require('./db');
const express = require('express');

connectToMongo();

const app = express()
const port = 5000

//to send data in request body
app.use(express.json());

//available routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('shekhar gite')
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})