'use strict';

module.exports = function() {
  var help =
    '\n' +
    '\n  Usage: statshot [options]' +
    '\n         statshot -u http://yourapi.com -k your.key [-i interval -d delta -r random]' +
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
    '\n    -i, --interval   interval in seconds between requests (defaults to 60s)' +
    '\n    -d, --delta      show changes between readings (1=show (default), 0=do not show)' +
    '\n    -r, --random     randomize request with ?unused=<some random value> ' +
                            '(1=random (default), 0=no random query string)' +
    '\n' +
    '\n';
  console.log(help);
};
