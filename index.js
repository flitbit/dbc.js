;
(function (global, module, require) {
  "use strict";

  var inherits;
  if (typeof require === 'function') {
    inherits = require('util').inherits;
  } else {
    inherits = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          writable: true,
          configurable: true
        }
      });
    };
  }

  function ContractError(message) {
    ContractError.super_.call(this);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    Object.defineProperties(this, {
      message: { value: message || '' },
      error: { value: message || '', enumerable: true }
    });
  }
  inherits(ContractError, Error);

  ContractError.toString = function toString() {
    return 'ContractError: '.concat(this.message);
  };

  function dbc(requirements, description) {
    requirements = (Array.isArray(requirements)) ? requirements : [requirements];
    var i = -1
    , len = requirements.length
    , req , res , err
    ;
    while(++i < len) {
      req = requirements[i];
      res = (typeof req === 'function') ? req() : (req);
      if(!res) {
        err = description || 'Failed contract: '.concat(req);
        throw new ContractError((typeof err === 'function') ? err() : err);
      }
    }
  }

  dbc.ContractError = ContractError;

  module.exports = dbc;

  if (typeof window !== 'undefined') {
    window.dbc = module.exports;
  }

  return dbc;
})(
this
, 'undefined' !== typeof module ? module : {}
, 'undefined' !== typeof require ? require : null
);