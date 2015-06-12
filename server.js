/*!
 * Juggler
 * Copyright (c) Sergey Ryzhov 201752 <serega.rf@gmail.com>
 * MIT licensed
 */

var express = require('express'),
  morgan = require("morgan"),
  log4js = require("log4js"),
  compression = require('compression'),
  lessMiddleware = require('less-middleware'),
  router = express.Router({caseSensitive:false}),
  app = express(),
  logger = log4js.getLogger('Server');

app.use(router);

router.use(morgan('combined', {
    "stream": {
      write: function(str) {
        logger.debug(str);
      }
    }
  }));

router.use(lessMiddleware(__dirname + '/public'));
router.use(express.static(__dirname + '/public'));

router.use(compression({
  filter: function(req, res) {
    if (req.headers['x-no-compression']) {
      return false;
    }

    return compression.filter(req, res);
  }
}));

var port = process.env.PORT || 82;
app.set('port', port);
app.listen(port, function() {
  logger.info('Server started at port: ' + port);
});
