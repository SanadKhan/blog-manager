const express = require('express')
const hbs = require('hbs')
const path = require('path')
const blogRouter = require('./routers/blog')
const bodyparser = require('body-parser')
require('../app/helper')
require('./db/mysql')

const app = express() 
app.use(bodyparser.urlencoded({ extended: true }));
const port = process.env.PORT

//Define path for views
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials') 

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.use(bodyparser.json());
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(blogRouter)

app.get('*', (req, res) => {
	res.render('404', {
		title:'Blogs',
	})
})

app.listen(port ,() => {
	console.log('Server is up to port ' +port)
})
