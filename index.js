var express = require('express');
var bodyParser = require('body-parser');
var redis = require('redis');

var client = redis.createClient();

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/', function(req, res) {
  client.set(req.body.key, req.body.value, function(err, reply) {
    if(err) throw err;
    res.send(reply);
  });
});

app.get('/:key', function(req, res) {
  client.get(req.params.key, function(err, reply) {
    if(err) throw err;
    res.send(reply);
  });
});

app.listen(5000, function() {
  console.log('listening on port 5000');
});