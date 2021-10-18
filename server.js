const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')
const passport = require('passport')
const bodyParser = require('body-parser')

//
//initialize routes
const routes = require('./routes/index')
const ingredientRoute = require('./routes/ingredient_route')

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(routes)
app.use(ingredientRoute)

app.use(passport.initialize())
require('./config/passport')(passport)

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log('Server running in ' + process.env.NODE_ENV.toString() + 'mode on port ' + PORT.toString()))

