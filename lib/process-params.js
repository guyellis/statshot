'use strict';

var _ = require('lodash');
var debug = require('debug')('implicit:process-params');
var help = require('./help');

var options = {
  // If done is true then the params are incomplete to
  // run and an apporpriate message has been printed
  done: true,
  encoding: 'utf8',
  headers: {
    'User-Agent': 'statshot (https://github.com/guyellis/statshot)',
    'Cache-Control': 'no-cache'
  }
};

function getValueOrDefault(hasOwns, argv, defaultValue) {
  for(var i = 0; i < hasOwns.length; i++) {
    if(argv.hasOwnProperty(hasOwns[i])) {
      return argv.hasOwnProperty(hasOwns[i]);
    }
  }
  return defaultValue;
}

// eslint-disable-next-line complexity
module.exports = function(processArgs, callback) {
  debug('processArgs: %o', processArgs);
  var argv = require('minimist')(processArgs.slice(2));
  debug('args: %o', argv);

  if(argv.help || argv.h) {
    debug('Help wanted');
    help();
    return callback(null, options);
  }

  if(argv.version || argv.v) {
    debug('Version wanted');
    console.log(require('../package.json').version);
    return callback(null, options);
  }

  if(argv._.indexOf('demo') >= 0) {
    debug('Run demo');

    options.url = 'http://api.randomuser.me/';
    options.key = 'results.0.user.dob';
    options.interval = 5;
    options.showDelta = true;
    options.done = false;
    console.log('\nRunning demo:' +
    '\nstatshot -u http://api.randomuser.me/ -k results.0.user.dob -i 5\n');
    return callback(null, options);
  }

  if(argv.u || argv.url) {
    options.url = argv.u || argv.url;
  }

  if(argv.k || argv.key) {
    options.key = argv.k || argv.key;
    if(_.startsWith(options.key, '[') && _.endsWith(options.key, ']')) {
      options.key = _.trim(options.key, '[]');
      options.key = options.key.split(',').map(function(key){
        return _.trim(key);
      });
    }
  }

  options.showDelta = getValueOrDefault(['d', 'delta'], argv, true);
  options.showDelta = getValueOrDefault(['r', 'random'], argv, true);

  options.interval = argv.i || 60;

  // Set done to false if url and key are present
  options.done = !(options.url && options.key);

  if(options.done) {
    // If done is true then url or key are missing.
    // Print help message.
    help();
  }

  return callback(null, options);
};
