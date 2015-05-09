'use strict';

var request = require('request');
var objectPath = require('object-path');

var elapsedSeconds = 0;
var previousValue = 0;
var options = {
  headers: {
    'User-Agent': 'statshot (https://github.com/guyellis/statshot)'
  }
};

var runFormatHelp =
  'You should run it like this:\n' +
  'statshot -u http://yourapi.com -k your.key [-i interval -d delta]\n' +
  'Try "statshot demo" to see a demo example.';

function execute() {
  request.get(options, function(err, httpResponse, body){
    if(!err && httpResponse.statusCode === 200) {
      try {
        var json = JSON.parse(body);
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
    } else {
      if(err) {
        console.log(err.message ? err.message : err);
      } else {
        console.log('statusCode not 200: ' + httpResponse.statusCode);
      }
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

  if(argv._.indexOf('demo') >= 0) {
    return demo();
  }

  if(!argv.u || !argv.k) {
    console.log(runFormatHelp);
    return false;
  }

  options.url = argv.u;
  options.key = argv.k;
  options.showDelta = argv.hasOwnProperty('d') ? !!argv.d : true;
  options.interval = argv.i || 60;

  return true;
}

module.exports = function() {
  if(setOptions()) {
    console.log('Url:', options.url);
    console.log('For key:', options.key);
    console.log('Intervals: Every ' + options.interval + ' seconds');
    console.log('Show Delta:', options.showDelta + '\n');

    execute();

    setInterval(execute, options.interval * 1000);
  }
};
