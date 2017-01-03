var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var reversi = require('./reversi');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(__dirname));

var router = express.Router();
router.route('/reversi').post(function (req, res) {	
	var step = reversi.generateStep(req.body.board);	
	if (!!step) {
		res.json({ step: step });
	}
	else {
		res.json({ step: null });
	}
});

app.use('/api', router);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var port = process.env.PORT || 8080; 
app.listen(port);