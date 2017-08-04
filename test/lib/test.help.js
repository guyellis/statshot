'use strict';

// var _ = require('lodash');
var chai = require('chai');
var help = require('../../lib/help');
var sinon = require('sinon');

chai.should();

describe('Help', function(){

  it('should print a help message', function(done){
    var stub = sinon.stub(console, 'log').callsFake(function(message){
      message.should.contain('--help');
      stub.restore();
      done();
    });
    help();
  });

});
