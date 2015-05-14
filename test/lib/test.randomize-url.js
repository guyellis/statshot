'use strict';

var chai = require('chai');
var randomizeUrl = require('../../lib/randomize-url');

chai.should();

describe('Randomize URL', function(){

  it('should preserve query string', function(done){
    var options = {
      url: 'http://some.com/path?a=b',
      random: false
    };
    var newOptions = randomizeUrl(options);
    newOptions.url.should.contain('?a=b');
    done();
  });

  it('should have a random element and preserve original query', function(done){
    var options = {
      url: 'http://some.com/path?a=b',
      random: true
    };
    var newOptions = randomizeUrl(options);
    newOptions.url.should.contain('?a=b');
    newOptions.url.should.contain('&unused=');
    done();
  });

  it('should have a random element only', function(done){
    var options = {
      url: 'http://some.com/path',
      random: true
    };
    var newOptions = randomizeUrl(options);
    newOptions.url.should.not.contain('?a=b');
    newOptions.url.should.contain('?unused=');
    done();
  });

});
