var express = require('express')
var mongoose = require('mongoose')
var cors = require('cors')

require("dotenv").config()

var app = express();

const corsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization', "auth-token"],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: 'https://social-media-234.herokuapp.com',
  preflightContinue: false,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static(__dirname + "/public"))

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to db"))
  .catch(err => console.log(err))

mongoose.connection.on("connected", () => {
  console.log("connected successfully !!!")
})

mongoose.connection.on("error", () => {
  console.log("error")
})

const routes = require('./routes/routes')
app.use(routes)

const PORT = process.env.PORT || 4000

app.use(express.static("client/build"))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

app.listen(PORT)
console.log('server on')
