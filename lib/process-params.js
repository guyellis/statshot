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
    'User-Agent': 'statshot (https://github.com/guyellis/statshot)'
  }
};

module.exports = function(callback) {
  var argv = require('minimist')(process.argv.slice(2));
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

  if(argv.hasOwnProperty('d') || argv.hasOwnProperty('delta')) {
    options.showDelta = argv.hasOwnProperty('d') ? !!argv.d : !!argv.delta;
  } else {
    options.showDelta = true; // default to true
  }

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
