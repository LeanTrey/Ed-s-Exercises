const express = require('express')
const { nextTick } = require('process')
const morgan =require('morgan')
const mongoose = require('mongoose')
const { result } = require('lodash')
const { render } = require('ejs')
const blogRoutes = require('./routes/blogRoutes')



//express app
const app = express()

//connect to mongodb
const dbURI = 'mongodb+srv://treymclean0003:Scout2003@cluster0.wvv9m8z.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(3000))
    .catch((err) => console.log(err))

//register view engine
app.set('view engine', 'ejs')

//middleware and static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.redirect('/logs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'})
})

app.use('/logs', blogRoutes)

//404 page (has to be at bottom)
app.use((req, res) =>{
    res.status(404).render('404', { title: '404'})
})