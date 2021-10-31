const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./src/config/db')
const passport = require('passport')
const bodyParser = require('body-parser')

//
//initialize routes
const routes = require('./src/routes/index')
const ingredientRoute = require('./src/routes/ingredient_route')
const requestRoute = require('./src/routes/request_route')
const foodRoute = require('./src/routes/food_route')
const resBillRoute = require('./src/routes/restaurant_bill_route')

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize())
require('./src/middleware/passport')(passport)

app.use('/user', routes)
app.use('/ingredient', ingredientRoute)
app.use('/request', requestRoute)
app.use('/food', foodRoute)
app.use('/resbill', resBillRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log('Server running in ' + process.env.NODE_ENV.toString() + 'mode on port ' + PORT.toString()))

