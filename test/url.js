'use strict';

var assert = require('assert');
var hbs = require('handlebars');
var helpers = require('..');
helpers.url({handlebars: hbs});

describe('url', function() {
  describe('urlResolve', function() {
    it('should take a base URL, and a href URL, and resolve them as a browser would', function() {
      var fn = hbs.compile('{{urlResolve "/one/two/three" "four"}}');
      assert.equal(fn(), '/one/two/four');
    });

    it('should take a base URL, and a href URL, and resolve them as a browser would', function() {
      var fn = hbs.compile('{{urlResolve "http://example.com/" "/one"}}');
      assert.equal(fn(), 'http://example.com/one');
    });

    it('should take a base URL, and a href URL, and resolve them as a browser would', function() {
      var fn = hbs.compile('{{urlResolve "http://example.com/one" "/two"}}');
      assert.equal(fn(), 'http://example.com/two');
    });
  });

  describe('stripQuerystring', function() {
    it('should return a url without its query string.', function() {
      var fn = hbs.compile('{{stripQuerystring "http://example.com?tests=true"}}');
      assert.equal(fn(), 'http://example.com');
    });
  });

  describe('encodeURI', function() {
    it('should return an encoded uri string.', function() {
      var fn = hbs.compile('{{encodeURI "http://example.com?comment=Thyme &time=again"}}');
      assert.equal(fn(), 'http%3A%2F%2Fexample.com%3Fcomment%3DThyme%20%26time%3Dagain');
    });
  });

  describe('decodeURI', function() {
    it('should return an decoded uri string.', function() {
      var fn = hbs.compile('{{{decodeURI "http%3A%2F%2Fexample.com%3Fcomment%3DThyme%20%26time%3Dagain"}}}');
      assert.equal(fn(), 'http://example.com?comment=Thyme &time=again');
    });
  });

  describe('urlParse', function() {
    it('should take a string, and return an object stringified to JSON.', function() {
      var fn = hbs.compile('{{{JSONstringify (urlParse "http://foo.com/bar/baz?key=value" "json")}}}');
      JSON.parse(fn()).should.eql({
        "protocol": "http:",
        "slashes": true,
        "auth": null,
        "host": "foo.com",
        "port": null,
        "hostname": "foo.com",
        "hash": null,
        "search": "?key=value",
        "query": "key=value",
        "pathname": "/bar/baz",
        "path": "/bar/baz?key=value",
        "href": "http://foo.com/bar/baz?key=value"
      });
    });
  });

  describe('strip protocol', function() {
    it('should take an http url and return without the protocol', function() {
      var data = { testUrl: 'http://foo.bar' };
      var expectedResult = '//foo.bar/';
      var fn = hbs.compile('{{stripProtocol testUrl}}');
      fn(data).should.eql(expectedResult);
    });

    it('strip https protocol', function() {
      var data = { testUrl: 'https://foo.bar' };
      var expectedResult = '//foo.bar/';
      var fn = hbs.compile('{{stripProtocol testUrl}}');
      fn(data).should.eql(expectedResult);
    });

    it('should leave a relative url unchanged', function() {
      var testUrl = 'path/to/file';
      var data = { testUrl: testUrl };
      var fn = hbs.compile('{{stripProtocol testUrl}}');
      fn(data).should.eql(testUrl);
    });

    it('should leave an absolute url unchanged', function() {
      var testUrl = '/path/to/file';
      var data = { testUrl: testUrl };
      var fn = hbs.compile('{{stripProtocol testUrl}}');
      fn(data).should.eql(testUrl);
    });

  });
});
