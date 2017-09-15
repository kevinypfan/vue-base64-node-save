const express = require('express')
const bodyParser = require('body-parser')
var fallback = require('express-history-api-fallback')
var fs = require('fs');
var path = require('path');

var app = express();

app.use(bodyParser.json({limit: '50mb'}))
//Node.js
function base64ToFile(data) {
  return new Promise((resolve, reject) => {
    data = data.replace(/.*:(image)\/(.*);.*,/, '');
    if (RegExp.$1 !== "image") {
      reject('這不是圖片');
    } else {
      var decide = RegExp.$1
      var extension = RegExp.$2;
      var date = Date.now()
      // data = data.replace(/^data:image\/png;base64,/, '');
      fs.writeFile(path.resolve(__dirname, `./tmp/${date}.${extension}`), data, 'base64', (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(`/tmp/${date}.${extension}`)
        }
      });
    }
  })
}

app.delete('/deleteFile', (req, res) => {
  var fileName = req.body.fileName
  fs.unlink(`./tmp/${fileName}`, (err) => {
  if (err) {
    res.status(403).send(err)
  } else {
    res.send("成功刪除")
  }
  console.log('successfully deleted /tmp/hello');
});
})

app.post('/sendPhoto', (req, res) => {
  var data = req.body.data
  base64ToFile(data).then((result) => {
    console.log(result);
    res.send(result)
  }).catch((err) => {
    res.status(403).send('no')
  })
})

app.post('/sendBase64ToTxt', (req, res) => {
  var data = req.body.data
  fs.writeFileSync(path.resolve(__dirname, `./tmp/${Date.now()}.txt`), data)
  res.send('ok')
})

app.use(express.static(__dirname))
app.use(fallback('index.html', { root: __dirname }))

app.listen(3000, () => {
  console.log('3000');
})
