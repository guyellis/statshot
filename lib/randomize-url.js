'use strict';

var _ = require('lodash');
var debug = require('debug')('statshot:cli');
var randomString = require('randomstring');
var url = require('url');

module.exports = function randomizeUrl(options) {
  if(options.random) {
    var localOptions = _.clone(options);
    var urlObj = url.parse(localOptions.url);
    urlObj.search = urlObj.search
      ? urlObj.search + '&'
      : '?';
    urlObj.search += 'unused=' + randomString.generate();
    localOptions.url = url.format(urlObj);
    debug('Randomized URL: %s', localOptions.url);
    return localOptions;
  } else {
    return options;
  }
};
