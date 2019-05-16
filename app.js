const express = require('express')
const fs = require('fs')
const https = require('https')
const app = express()
const bodyParser = require('body-parser')
const router = require('./router')
app.use(bodyParser.json())
app.all('*', function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
        //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
          res.header('Access-Control-Allow-Headers', 'Content-Type');
            res.header('Access-Control-Allow-Methods', '*');
              res.header('Content-Type', 'application/json;charset=utf-8');
          next();
})
app.use(router)
const options = {
  key: fs.readFileSync('./keys/ezreal-key.pem'),
  cert: fs.readFileSync('./keys/ezreal-cert.pem')
}

const server = https.createServer(options, app);
server.listen(443,function () { console.log("https server is running on port 443");});
