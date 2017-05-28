'use strict';

const fs = require('fs');
const camera = require('./libs/camera');
const Lcd = require('lcd');
const rs = require('restify');
const server = rs.createServer({
  name: 'examination3',
  version: '1.0.0'
});
const resources = require('./resources/resources.json');

const port = process.env.port || 8080;

server.use(rs.acceptParser(server.acceptable));
server.use(rs.queryParser());
server.use(rs.bodyParser());
server.use(rs.CORS());

server.get('/', function (req, res, next) {
  const response = {
    status: 'success',
    pi: resources,
    links: {
      message: '/message'
    }
  };

  res.send(200, response);
  return next();
});

server.get('/images/:img', function (req, res, next) {
  const fileName = req.params.img;

  fs.readFile(`${__dirname}/images/${fileName}`, function (err, file) {
    if (err) {
      res.send(500);
    }
    res.writeHead(200);
    res.write(file);
    res.end();
    return next();
  });
});

server.post('/message', (req, res, next) => {

  const text1 = req.body.text1;
  const text2 = req.body.text2;

  try {
    const lcd = new Lcd({ rs: 25, e: 24, data: [23, 17, 18, 22], cols: 16, rows: 2 });

    lcd.on('ready', function () {
      lcd.setCursor(0, 0);
      lcd.print(text1, function (err) {
        if (err) {
          throw err;
        }
        lcd.setCursor(0, 1);
        lcd.print(text2, function (error) {
          if (error) {
            throw error;
          }
        });
      });
    });

    camera.snap().then(function (timestamp) {
      const imgUrl = `http://gsiot-kqp9-e4pf.try.yaler.io/images/${timestamp}.jpg`;

      lcd.clear(function (error) {
        if (error) {
          throw error;
        }
        lcd.close();
      });

      res.send(200, {
        status: 'success',
        text1,
        text2,
        timestamp,
        imgUrl
      });

      return next();
    }).catch(function (error) {
      res.send(500, { message: error.message || error });
      return next();
    });

  } catch (error) {
    res.send(500, { message: error.message || error });
    return next();
  }
});

server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});
