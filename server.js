var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 1337;
var router = express.Router();

// test route
router.get('/', function(req, res) {
    res.json({ message: 'hooray! it works!' });
});

// test router handler
app.use('/api', router);

// =============================================================================
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('EllIoT started on port ' + port);
