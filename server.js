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
const roomRoute = require('./src/routes/room_route')
const entertainmentRoute = require('./src/routes/entertainment_route')
const imageRoute = require('./src/routes/image_route')
const reportRoute = require('./src/routes/report_route')
const riskRoute = require('./src/routes/risk_bill_route')

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

app.use("/uploads", express.static("uploads"));
app.use('/risk', riskRoute)
app.use('/user', routes)
app.use('/ingredient', ingredientRoute)
app.use('/request', requestRoute)
app.use('/food', foodRoute)
app.use('/resbill', resBillRoute)
app.use('/room', roomRoute)
app.use('/entertainment', entertainmentRoute)
app.use('/image', imageRoute)
app.use('/report', reportRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log('Server running in ' + process.env.NODE_ENV.toString() + 'mode on port ' + PORT.toString()))

