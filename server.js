const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const path = require('path')

const app = express()

app.use(express.json())

const db = config.get('mongoURI')

mongoose
  .connect(db, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false})
  .then(()=> console.log('MongoDB Connected'))
  .catch(err => console.log(err))

app.use('/events', require('./routes/events'))
app.use('/users', require('./routes/users'))
app.use('/auth', require('./routes/auth'))

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));