define(function(require, exports, module) {

  // Base
  // ---------
  // Base 是一个基础类，提供 Class、Events、Attrs 和 Aspect 支持。

  var Class = require('class');
  var Events = require('events');
  var Aspect = require('./aspect');
  var Attribute = require('./attribute');


  module.exports = Class.create({
    Implements: [Events, Aspect, Attribute],

    initialize: function(config) {
      this.initAttrs(config);

      // Automatically register `this._onChangeAttr` method as
      // a `change:attr` event handler.
      parseEventsFromInstance(this, this.attrs);
    },

    destroy: function() {
      this.off();

      for (var p in this) {
        if (this.hasOwnProperty(p)) {
          delete this[p];
        }
      }
    }
  });


  function parseEventsFromInstance(host, attrs) {
    for (var attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        var m = '_onChange' + ucfirst(attr);
        if (host[m]) {
          host.on('change:' + attr, host[m]);
        }
      }
    }
  }

  function ucfirst(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }
});
