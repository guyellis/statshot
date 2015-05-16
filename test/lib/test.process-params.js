'use strict';

var _ = require('lodash');
var chai = require('chai');
var processParams = require('../../lib/process-params');
var sinon = require('sinon');

chai.config.includeStack = true; // turn on stack trace
var expect = chai.expect;
var should = chai.should();

describe('Process Params', function(){

  it('should print help with --help', function(done){
    var processArgs = ['node', 'statshot.js', '--help'];
    var hasText;
    var stub = sinon.stub(console, 'log', function(msg){
      hasText = _.includes(msg, 'Usage: statshot [options]');
      stub.restore();
    });
    processParams(processArgs, function(err, options){
      expect(hasText).to.equal(true);
      hasText.should.equal(true);
      should.not.exist(err);
      options.done.should.equal(true);
      done();
    });
  });

});
