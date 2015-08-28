/*global localStorage: false, escape: false, unescape: false */
var moment = require('moment');
var _ = require('underscore');

var browserStorage = function (opts) {
  "use strict";

  var module = {};
  var strgObjName = opts && opts.name ? opts.name : 'SimpleBrowserStorage';

  var hasStorage = (function () {
    try {
      var mod = 'test';
      localStorage.setItem(mod, mod);
      localStorage.removeItem(mod);
      return true;
    } catch (exception) {
      return false;
    }
  }());

  if (hasStorage) {
    module.setState = function (value) {
      localStorage.setItem(strgObjName, JSON.stringify(value));
    };

    module.getState = function () {
      return JSON.parse(localStorage.getItem(strgObjName));
    };
  } else {
    module.setState = function (value) {
      var d = new Date();
      var days100 = 100 * 24 * 60 * 60 * 1000;
      d.setTime(d.getTime() + days100);
      var expires = "expires=" + d.toUTCString();
      var cookie = [strgObjName, '=', escape(JSON.stringify(value)), ';', expires].join('');
      document.cookie = cookie;
    };
    module.getState = function () {
      var result = document.cookie.match(new RegExp(strgObjName + '=([^;]+)'));
      if (result) {
        result = JSON.parse(unescape(result[1]));
      }
      return result;
    };
  }

  module.init = function() {
    var state   = this.getState();
    var expires = state.expires;
    var willExpire = {expires: moment()._d}
    if (!expires || moment().diff(expires, 'minutes') > 10) {
      this.setState(willExpire);
      this.expired = true;
    } else {
      this.setState(_.defaults(state, willExpire));
      this.expired = false;
    }
  };

  module.stateIsExpired = function(){
    return this.expired;
  }

  if (module.getState() === null) {
    module.setState({});
  }

  return module;
};

module.exports = browserStorage;
