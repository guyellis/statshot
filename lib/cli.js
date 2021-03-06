'use strict';

var _ = require('lodash');
var debug = require('debug')('statshot:cli');
var processParams = require('./process-params');
var randomizeUrl = require('./randomize-url');
var request = require('request');

var elapsedSeconds = 0;
var previousValue = 0;

function execute(originalOptions) {
  var options = randomizeUrl(originalOptions);
  request.get(options, function(err, httpResponse, body){
    if(!err && httpResponse.statusCode === 200) {
      try {
        var json = JSON.parse(body);
        var value;
        if(_.isArray(options.key)) {
          value = options.key.map(function(key){
            return _.get(json, key);
          });
        } else {
          value = _.get(json, options.key);
        }
        if(_.isObject(value)) {
          value = JSON.stringify(value);
        }
        var log = '' + elapsedSeconds + 's: ' + value;
        if(options.showDelta &&
          _.isFinite(Number(value)) &&
          _.isFinite(Number(previousValue))) {
          log += ' (delta: ' + (value - previousValue) + ')';
        }
        console.log(log);
        if(value === undefined) {
          debug(json);
        }
        previousValue = value;
      } catch (e) {
        debug('err: %o', err);
        debug('httpResponse: %o', httpResponse);
        debug('body: %o', body);
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

module.exports = function() {
  processParams(process.argv, function(err, options){
    if(err) {
      console.log(err);
    } else {
      if(!options.done) {
        console.log('Url:', options.url);
        console.log('For key(s):', options.key);
        console.log('Intervals: Every ' + options.interval + ' seconds');
        console.log('Show Delta:', options.showDelta + '\n');

        execute(options);

        setInterval(function() {
          execute(options);
        }, options.interval * 1000);
      }
    }
  });
};
