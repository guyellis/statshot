'use strict';

module.exports = function() {
  var help =
    '\n' +
    '\n  Usage: statshot [options]' +
    '\n         statshot -u http://yourapi.com -k your.key [-i interval -d delta]' +
    '\n' +
    '\n  Commands:' +
    '\n' +
    '\n    demo' +
    '\n      run a demo against the randomuser.me site' +
    '\n' +
    '\n  Options:' +
    '\n' +
    '\n    -h, --help       output usage information' +
    '\n    -v, --version    output the version number' +
    '\n    -u, --url        endpoint to query' +
    '\n    -k, --key        json key that has the data' +
    '\n    -i, --interval   interval in seconds between requests' +
    '\n    -d, --delta      show changes between readings (1=show, 0=do not show)' +
    '\n' +
    '\n';
  console.log(help);
};
