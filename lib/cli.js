'use strict';

var http = require('http');
var objectPath = require('object-path');

var elapsedSeconds = 0;
var previousValue = 0;
var options = {};

var runFormatHelp =
  'You should run it like this:\n' +
  'statshot -url http://some-site.com/some-json-endpoint -key some.key';

function execute() {
  http.get(options.url, function(res){
    if(res.statusCode === 200) {
      var data = [];
      res.on('data', function(chunk){
        data.push(chunk);
      });
      res.on('end', function(){
        try {
          var json = JSON.parse(data.join());
          var value = objectPath.get(json, options.key);
          var log = '' + elapsedSeconds + 's: ' + value;
          if(options.showDelta) {
            log += ' (delta: ' + (value - previousValue) + ')';
          }
          console.log(log);
          previousValue = value;
        } catch (e) {
          console.log(e);
        }
        elapsedSeconds += options.interval;
      });
    } else {
      console.log('statusCode not 200: ' + res.statusCode);
      process.exit(1); // eslint-disable-line no-process-exit
    }
  });

}

function demo() {
  options.url = 'http://api.randomuser.me/';
  options.key = 'results.0.user.dob';
  options.interval = 5;
  options.showDelta = true;
  console.log('\nRunning demo:' +
  '\nstatshot -u http://api.randomuser.me/ -k results.0.user.dob -i 5\n');
  return true;
}

function setOptions() {
  var argv = require('minimist')(process.argv.slice(2));
  console.log(argv);

  if(argv._.indexOf('demo') >= 0) {
    return demo();
  }

  if(!argv.u || !argv.k) {
    console.log(runFormatHelp);
    return false;
  }

  options.url = argv.u;
  options.key = argv.k;
  options.showDelta = !!argv.d || true;
  options.interval = argv.i || 60;

  return true;
}

module.exports = function() {
  if(setOptions()) {
    console.log('Url:', options.url);
    console.log('For key:', options.key);
    console.log('Intervals:', options.interval);

    execute();

    setInterval(execute, options.interval * 1000);
  }
};
