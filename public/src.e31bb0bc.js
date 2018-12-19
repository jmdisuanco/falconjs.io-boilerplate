// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
var global = arguments[3];
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);

},{}],"../node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime-module.js":[function(require,module,exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = require("./runtime");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

},{"./runtime":"../node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js"}],"../node_modules/@babel/runtime/regenerator/index.js":[function(require,module,exports) {
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":"../node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime-module.js"}],"../node_modules/@babel/runtime/helpers/asyncToGenerator.js":[function(require,module,exports) {
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;
},{}],"../node_modules/@falconjs.io/falcon/dist/index.js":[function(require,module,exports) {
var define;
parcelRequire=function(e,r,n,t){function i(n,t){function o(e){return i(o.resolve(e))}function c(r){return e[n][1][r]||r}if(!r[n]){if(!e[n]){var l="function"==typeof parcelRequire&&parcelRequire;if(!t&&l)return l(n,!0);if(u)return u(n,!0);if(f&&"string"==typeof n)return f(n);var p=new Error("Cannot find module '"+n+"'");throw p.code="MODULE_NOT_FOUND",p}o.resolve=c;var a=r[n]=new i.Module(n);e[n][0].call(a.exports,o,a,a.exports,this)}return r[n].exports}function o(e){this.id=e,this.bundle=i,this.exports={}}var u="function"==typeof parcelRequire&&parcelRequire,f="function"==typeof require&&require;i.isParcelRequire=!0,i.Module=o,i.modules=e,i.cache=r,i.parent=u;for(var c=0;c<n.length;c++)i(n[c]);if(n.length){var l=i(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):t&&(this[t]=l)}return i}({9:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=0,n=1,r=2,l="http://www.w3.org/1999/xlink",t="http://www.w3.org/2000/svg",o={},u=[],i=u.map,a=Array.isArray,c=function(e,n){var r={};for(var l in e)r[l]=e[l];for(var l in n)r[l]=n[l];return r},f=function(e){return e.currentTarget.events[e.type](e)},s=function(e,n,r,t,o){if("key"===n);else if("style"===n)for(var u in c(r,t)){var i=null==t||null==t[u]?"":t[u];"-"===u[0]?e[n].setProperty(u,i):e[n][u]=i}else if("o"===n[0]&&"n"===n[1])e.events||(e.events={}),e.events[n=n.slice(2)]=t,null==t?e.removeEventListener(n,f):null==r&&e.addEventListener(n,f);else{var a=null==t||!1===t;if(n in e&&"list"!==n&&"draggable"!==n&&"spellcheck"!==n&&"translate"!==n&&!o)e[n]=null==t?"":t,a&&e.removeAttribute(n);else o&&n!==(n=n.replace(/^xlink:?/,""))?a?e.removeAttributeNS(l,n):e.setAttributeNS(l,n,t):a?e.removeAttribute(n):e.setAttribute(n,t)}},p=function(e,n,l){var o=e.type===r?document.createTextNode(e.name):(l=l||"svg"===e.name)?document.createElementNS(t,e.name):document.createElement(e.name),u=e.props;u.oncreate&&n.push(function(){u.oncreate(o)});for(var i=0,a=e.children.length;i<a;i++)o.appendChild(p(e.children[i],n,l));for(var c in u)s(o,c,null,u[c],l);return e.element=o},v=function(e,n,r,l,t,o){for(var u in c(n,r))("value"===u||"checked"===u?e[u]:n[u])!==r[u]&&s(e,u,n[u],r[u],t);var i=o?r.oncreate:r.onupdate;null!=i&&l.push(function(){i(e,n)})},m=function(e){for(var n=0,r=e.children.length;n<r;n++)m(e.children[n]);var l=e.props.ondestroy;return null!=l&&l(e.element),e.element},h=function(e,n){var r=function(){e.removeChild(m(n))},l=n.props&&n.props.onremove;null!=l?l(n.element,r):r()},d=function(e){return null==e?null:e.key},y=function(e,n,r){for(var l,t,o={};n<=r;n++)null!=(l=(t=e[n]).key)&&(o[l]=t);return o},g=function(e,l,t,o,u,i){if(o===t);else if(null!=t&&t.type===r&&o.type===r)t.name!==o.name&&(l.nodeValue=o.name);else if(null==t||t.name!==o.name){var a=e.insertBefore(p(o,u,i),l);null!=t&&h(e,t),l=a}else{var c,f,s;v(l,t.props,o.props,u,i=i||"svg"===o.name,t.type===n);for(var m,k=t.children,w=0,b=k.length-1,x=o.children,A=0,N=x.length-1;A<=N&&w<=b&&(s=d(k[w]),m=d(x[A]),null!=s&&s===m);)g(l,k[w].element,k[w],x[A],u,i),w++,A++;for(;A<=N&&w<=b&&(s=d(k[b]),m=d(x[N]),null!=s&&s===m);)g(l,k[b].element,k[b],x[N],u,i),b--,N--;if(w>b)for(;A<=N;)l.insertBefore(p(x[A++],u,i),(f=k[w])&&f.element);else if(A>N)for(;w<=b;)h(l,k[w++]);else{for(var E=y(k,w,b),B={};A<=N;)s=d(f=k[w]),m=d(x[A]),B[s]||null!=m&&m===d(k[w+1])?(null==s&&h(l,f),w++):null==m||t.type===n?(null==s&&(g(l,f&&f.element,f,x[A],u,i),A++),w++):(s===m?(g(l,f.element,f,x[A],u,i),B[m]=!0,w++):null!=(c=E[m])?(g(l,l.insertBefore(c.element,f&&f.element),c,x[A],u,i),B[m]=!0):g(l,f&&f.element,null,x[A],u,i),A++);for(;w<=b;)null==d(f=k[w++])&&h(l,f);for(var C in E)null==B[C]&&h(l,E[C])}}return o.element=l},k=function(e,n,r,l,t,o){return{name:e,props:n,children:r,element:l,key:t,type:o}},w=function(e,n){return k(e,o,u,n,null,r)},b=function(e){return 3===e.nodeType?w(e.nodeValue,e):x(e)},x=function(e){return k(e.nodeName.toLowerCase(),o,i.call(e.childNodes,b),e,null,n)},A=exports.recycle=function(e){return x(e.children[0])},N=exports.patch=function(e,n,r){var l=[];for(g(r,r.children[0],e,n,l);l.length>0;)l.pop()();return n},E=exports.h=function(n,r){for(var l,t=[],o=[],u=arguments.length;u-- >2;)t.push(arguments[u]);for(null!=(r=null==r?{}:r).children&&(t.length<=0&&t.push(r.children),delete r.children);t.length>0;)if(a(l=t.pop()))for(u=l.length;u-- >0;)t.push(l[u]);else!1===l||!0===l||null==l||o.push("object"==typeof l?l:w(l));return"function"==typeof n?n(r,r.children=o):k(n,r,o,null,r.key,e)};
},{}],4:[function(require,module,exports) {
var t=function(t){var n={},e={target:null,subs:{},depend:function(t,n){t.includes(this.target)||t.push(this.target),e.subs[this.target].includes(n)||e.subs[this.target].push(n)},getValidDeps:function(t,n){var e=this;return t.filter(function(t){return e.subs[t].includes(n)})},notifyDeps:function(t){t.map(function(t){return i(t)})}},r=function(t,e){n[t]||(n[t]=[]),n[t].push(e)},u=function(t,n,r){var u=t[n],s=[];Object.defineProperty(t,n,{get:function(){return e.target&&e.depend(s,n),u},set:function(t){u=t,s=e.getValidDeps(s,n),e.notifyDeps(s,n),i(n)}})},i=function(t){!n[t]||n[t].lenght<1||n[t].forEach(function(t){return t()})},s=function(t,n,u){var i=null,s=[];r(n,function(){i=null,s=e.getValidDeps(s,n),e.notifyDeps(s,n)}),Object.defineProperty(t,n,{get:function(){return e.target&&e.depend(s,n),e.target=n,i||(e.subs[n]=[],i=u.call(t)),e.target=null,i},set:function(){}})};return function(t){for(var n in t)t.hasOwnProperty(n)&&("function"==typeof t[n]?s(t,n,t[n]):u(t,n))}(t.data),function(t,n){for(var e in t)t.hasOwnProperty(e)&&r(e,t[e].bind(n))}(t.watch,t.data),{state:t.data,observe:r,notify:i}};module.exports={Observable:t};
},{}],13:[function(require,module,exports) {
module.exports=function(r,e){if("function"!=typeof r)throw new Error("URL Mapper - function to compile a route expected as first argument");e=e||{};var t={};function n(n){return t[n]||(t[n]=r(n,e)),t[n]}return{parse:function(r,e){if(arguments.length<2)throw new Error("URL Mapper - parse method expects 2 arguments");return n(r).parse(e)},stringify:function(r,e){if(arguments.length<2)throw new Error("URL Mapper - stringify method expects 2 arguments");return n(r).stringify(e)},map:function(r,e){if(arguments.length<2)throw new Error("URL Mapper - map method expects 2 arguments");for(var t in e){var o=n(t).parse(r);if(o)return{route:t,match:e[t],values:o}}}}};
},{}],17:[function(require,module,exports) {
"use strict";var r=/([=:@$/])/g,e=/([&;/])/g,t=/[=:@$]/,n=/[&;]/;function i(r,e){return encodeURI(r.replace(e,"/$1"))}function a(r){return"string"==typeof r?r.replace(/;+$/g,""):r}function f(t,n){if(!n)return a(f(t,!0));if("number"==typeof t||!0===t||!1===t||null===t)return":"+t;var u=[];if(t instanceof Array){for(var o=0;o<t.length;++o)void 0===t[o]?u.push(":null"):u.push(f(t[o],!0));return"@"+u.join("&")+";"}if("object"==typeof t){for(var c in t){var h=f(t[c],!0);h&&u.push(i(c,r)+h)}return"$"+u.join("&")+";"}return void 0!==t?"="+i(t.toString(),e):void 0}function u(r){var e=0;function i(t){for(var n="";e!==r.length;++e){if("/"===r.charAt(e)){if((e+=1)===r.length){n+=";";break}}else if(r.charAt(e).match(t))break;n+=r.charAt(e)}return n}return r=decodeURI(r),function a(){var f,u=r.charAt(e++);if("="===u)return i(n);if(":"===u){var o=i(n);return"true"===o||"false"!==o&&(o=parseFloat(o),isNaN(o)?null:o)}if("@"===u){f=[];r:if(!(e>=r.length||";"===r.charAt(e)))for(;;){if(f.push(a()),e>=r.length||";"===r.charAt(e))break r;e+=1}return e+=1,f}if("$"===u){f={};r:if(!(e>=r.length||";"===r.charAt(e)))for(;;){if(f[i(t)]=a(),e>=r.length||";"===r.charAt(e))break r;e+=1}return e+=1,f}throw new Error("Unexpected char "+u)}()}module.exports={stringify:f,parse:u};
},{}],18:[function(require,module,exports) {
module.exports=g,module.exports.parse=n,module.exports.compile=o,module.exports.tokensToFunction=i,module.exports.tokensToRegExp=c;var e="/",t="./",r=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function n(n,o){for(var i,l=[],f=0,u=0,s="",c=o&&o.delimiter||e,g=o&&o.delimiters||t,h=!1;null!==(i=r.exec(n));){var m=i[0],x=i[1],d=i.index;if(s+=n.slice(u,d),u=d+m.length,x)s+=x[1],h=!0;else{var v="",y=n[u],w=i[2],E=i[3],b=i[4],$=i[5];if(!h&&s.length){var R=s.length-1;g.indexOf(s[R])>-1&&(v=s[R],s=s.slice(0,R))}s&&(l.push(s),s="",h=!1);var T=""!==v&&void 0!==y&&y!==v,A="+"===$||"*"===$,j="?"===$||"*"===$,k=v||c,O=E||b;l.push({name:w||f++,prefix:v,delimiter:k,optional:j,repeat:A,partial:T,pattern:O?p(O):"[^"+a(k)+"]+?"})}}return(s||u<n.length)&&l.push(s+n.substr(u)),l}function o(e,t){return i(n(e,t))}function i(e){for(var t=new Array(e.length),r=0;r<e.length;r++)"object"==typeof e[r]&&(t[r]=new RegExp("^(?:"+e[r].pattern+")$"));return function(r,n){for(var o="",i=n&&n.encode||encodeURIComponent,a=0;a<e.length;a++){var p=e[a];if("string"!=typeof p){var l,f=r?r[p.name]:void 0;if(Array.isArray(f)){if(!p.repeat)throw new TypeError('Expected "'+p.name+'" to not repeat, but got array');if(0===f.length){if(p.optional)continue;throw new TypeError('Expected "'+p.name+'" to not be empty')}for(var u=0;u<f.length;u++){if(l=i(f[u],p),!t[a].test(l))throw new TypeError('Expected all "'+p.name+'" to match "'+p.pattern+'"');o+=(0===u?p.prefix:p.delimiter)+l}}else if("string"!=typeof f&&"number"!=typeof f&&"boolean"!=typeof f){if(!p.optional)throw new TypeError('Expected "'+p.name+'" to be '+(p.repeat?"an array":"a string"));p.partial&&(o+=p.prefix)}else{if(l=i(String(f),p),!t[a].test(l))throw new TypeError('Expected "'+p.name+'" to match "'+p.pattern+'", but got "'+l+'"');o+=p.prefix+l}}else o+=p}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function p(e){return e.replace(/([=!:$/()])/g,"\\$1")}function l(e){return e&&e.sensitive?"":"i"}function f(e,t){if(!t)return e;var r=e.source.match(/\((?!\?)/g);if(r)for(var n=0;n<r.length;n++)t.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return e}function u(e,t,r){for(var n=[],o=0;o<e.length;o++)n.push(g(e[o],t,r).source);return new RegExp("(?:"+n.join("|")+")",l(r))}function s(e,t,r){return c(n(e,r),t,r)}function c(r,n,o){for(var i=(o=o||{}).strict,p=!1!==o.start,f=!1!==o.end,u=a(o.delimiter||e),s=o.delimiters||t,c=[].concat(o.endsWith||[]).map(a).concat("$").join("|"),g=p?"^":"",h=0===r.length,m=0;m<r.length;m++){var x=r[m];if("string"==typeof x)g+=a(x),h=m===r.length-1&&s.indexOf(x[x.length-1])>-1;else{var d=x.repeat?"(?:"+x.pattern+")(?:"+a(x.delimiter)+"(?:"+x.pattern+"))*":x.pattern;n&&n.push(x),x.optional?x.partial?g+=a(x.prefix)+"("+d+")?":g+="(?:"+a(x.prefix)+"("+d+"))?":g+=a(x.prefix)+"("+d+")"}}return f?(i||(g+="(?:"+u+")?"),g+="$"===c?"$":"(?="+c+")"):(i||(g+="(?:"+u+"(?="+c+"))?"),h||(g+="(?="+u+"|"+c+")")),new RegExp(g,l(o))}function g(e,t,r){return e instanceof RegExp?f(e,t):Array.isArray(e)?u(e,t,r):s(e,t,r)}
},{}],14:[function(require,module,exports) {
"use strict";var e=require("urlon"),r=require("path-to-regexp");function t(e){return e.name.toString()}function n(e){return encodeURI(e).replace(/[/?#'"]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function i(i,o){var a,f,c=[],s=o.querySeparator||"?";return a=r(i,c),c=c.map(t),f=r.compile(i),{parse:function(r){var t=r,n={};if(~t.indexOf("#")&&!~s.indexOf("#")&&(t=t.split("#")[0]),~t.indexOf(s)){if(o.query){var i="$"+t.slice(t.indexOf(s)+s.length);n=e.parse(i)}t=t.split(s)[0]}var f=a.exec(t);if(!f)return null;for(var u=1;u<f.length;++u){var p=c[u-1],l=f[u]&&decodeURIComponent(f[u]);n[p]=l&&":"===l[0]?e.parse(l):l}return n},stringify:function(r){var t={},i={};Object.keys(r).forEach(function(n){if(~c.indexOf(n))switch(typeof r[n]){case"boolean":case"number":t[n]=e.stringify(r[n]);break;case"object":if(r[n])throw new Error("URL Mapper - objects are not allowed to be stringified as part of path");t[n]=e.stringify(r[n]);break;default:t[n]=r[n]}else i[n]=r[n]});var a=f(t,{encode:n}),u="";return o.query&&Object.keys(i).length&&(u=e.stringify(i).slice(1)),a+(u?s+u:"")}}}module.exports=i;
},{"urlon":17,"path-to-regexp":18}],11:[function(require,module,exports) {
"use strict";var e=require("./mapper"),r=require("./compileRoute");module.exports=function(u){return e(r,u)};
},{"./mapper":13,"./compileRoute":14}],5:[function(require,module,exports) {
"use strict";var e=require("./model"),r=require("url-mapper"),t=a(r);function a(e){return e&&e.__esModule?e:{default:e}}var u=(0,t.default)(),n=function(e){return function(r){return u.map(r,e)}},o=function(e){var r=e.state.router(e.state.location);if(r){var t=r.match;r.values;e.state.render(t)}else{var a=e.state.routes["*"];e.state.render(a)}};module.exports={router:n,Navigate:o};
},{"./model":4,"url-mapper":11}],3:[function(require,module,exports) {
var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o=function(o){var e=document.querySelectorAll("a");for(var n in e)"object"===t(e[n])&&"/"===e[n].attributes.href.value.charAt(0)&&function(){var t=e[n].attributes.href.value;e[n].addEventListener("click",function(e){e.preventDefault(),o.state.location=t,history.pushState({},null,t)})}()};module.exports={transLink:o};
},{}],1:[function(require,module,exports) {
"use strict";var e=require("superfine"),r=require("./libs/model"),t=require("./libs/router"),u=require("./utils"),i=a(u);function a(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r}var l=function(r,t,u){return function(i){u=(0,e.patch)(u,r(i),t)}};module.exports={h:e.h,patch:e.patch,Observable:r.Observable,Render:l,Router:t.router,Navigate:t.Navigate,Utils:i};
},{"superfine":9,"./libs/model":4,"./libs/router":5,"./utils":3}]},{},[1], null)

},{}],"../node_modules/falconjs-component-flexgrid/dist/index.js":[function(require,module,exports) {
var r=require("@falconjs.io/falcon");var e=function(e){var t=e.span,o=e.offset,n=e.children,a=e.prefix;void 0===a&&(a="flcn-grid-col");var s=e.order,f=function(r,e){var t={};for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&-1===e.indexOf(o)&&(t[o]=r[o]);return t}(e,["span","offset","children","prefix","order"]),i="flcn-col ";f.class&&(i=f.class+" ");return["xs","sm","md","lg","xl"].map(function(r){if(f[r]){var e={};"number"==typeof f[r]?e.span=f[r]:"object"==typeof f[r]&&(e=f[r]||{}),delete f[r],void 0!==e.span&&(i+=a+"-"+r+"-"+e.span+" "),(e.offset||0===e.offset)&&(i+=a+"-"+r+"-offset-"+e.offset+" "),(e.order||0===e.order)&&(i+=a+"-"+r+"-order-"+e.order)}}),t&&(i+=a+"-"+t+" "),o&&(i+=a+"-offset-"+o+" "),s&&(i+=a+"-order-"+s+" "),r.h("div",Object.assign({},f,{class:i}),n)};e.defaultProps={offset:0};module.exports={Col:e,Row:function(e){var t=e.justify;void 0===t&&(t="start");var o=e.vertical;void 0===o&&(o="top");var n=e.gutter;void 0===n&&(n=0);var a=e.style,s=e.children,f=e.prefix;void 0===f&&(f="flcn-grid-row");var i=function(r,e){var t={};for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&-1===e.indexOf(o)&&(t[o]=r[o]);return t}(e,["justify","vertical","className","gutter","style","children","prefix"]),l="flcn-row ";l+=f+" ",l+=f+"-"+t+" "||t+" ",l+=f+"-"+o+" "||o+" ";var c=n>0?Object.assign({},{marginLeft:n/-2,marginRight:n/-2},a):a,d=s.map(function(r){return r?(r.props&&n>0&&(r.props.style={paddingLeft:n/2+"px",paddingRight:n/2+"px"}),r):null});return r.h("div",Object.assign({},i,{style:c,class:l}),d)}};


},{"@falconjs.io/falcon":"../node_modules/@falconjs.io/falcon/dist/index.js"}],"C:/Users/JM/AppData/Roaming/npm/node_modules/parcel/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"C:/Users/JM/AppData/Roaming/npm/node_modules/parcel/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"C:/Users/JM/AppData/Roaming/npm/node_modules/parcel/src/builtins/bundle-url.js"}],"../node_modules/falconjs-component-flexgrid/dist/index.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"C:/Users/JM/AppData/Roaming/npm/node_modules/parcel/src/builtins/css-loader.js"}],"images/logo.png":[function(require,module,exports) {
module.exports = "/logo.6023b87e.png";
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _falcon = require("@falconjs.io/falcon");

var _falconjsComponentFlexgrid = require("falconjs-component-flexgrid");

require("falconjs-component-flexgrid/dist/index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StateStore = {
  data: {
    fName: 'FalconJS',
    lName: 'Framework',
    age: 25,
    fullName: function fullName() {
      return this.fName + ' ' + this.lName;
    },
    old: function old() {
      var oldornot = 'Young';

      if (this.age > 50) {
        oldornot = 'Old';
      }

      return oldornot;
    }
  }
};
var App = new _falcon.Observable(StateStore);
/*
Service Worker
*/

var registerSW =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!('serviceWorker' in navigator)) {
              _context.next = 10;
              break;
            }

            _context.prev = 1;
            console.log('add');
            _context.next = 5;
            return navigator.serviceWorker.register("/falconjs-sw.js");

          case 5:
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            console.log('ServiceWorker registration failed. Sorry about that.'); // (4)

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 7]]);
  }));

  return function registerSW() {
    return _ref.apply(this, arguments);
  };
}();

window.addEventListener('load', function (e) {
  registerSW();
});

var Display = function Display() {
  return (0, _falcon.h)("div", {
    onupdate: function onupdate() {
      console.log('Display Component has been updated');
    }
  }, (0, _falcon.h)("h1", null, App.state.fullName), (0, _falcon.h)("div", null, App.state.age), (0, _falcon.h)("div", null, App.state.old));
};

var Controller = function Controller() {
  return (0, _falcon.h)("div", null, (0, _falcon.h)("input", {
    value: App.state.fName,
    oninput: function oninput(e) {
      App.state.fName = e.target.value;
    }
  }), (0, _falcon.h)("input", {
    value: App.state.lName,
    oninput: function oninput(e) {
      App.state.lName = e.target.value;
    }
  }), (0, _falcon.h)("input", {
    type: 'range',
    value: App.state.age,
    oninput: function oninput(e) {
      App.state.age = e.target.value;
    }
  }));
};

var View = function View() {
  return (0, _falcon.h)("div", null, (0, _falcon.h)(Display, null), (0, _falcon.h)(Controller, null), (0, _falcon.h)(_falconjsComponentFlexgrid.Row, {
    gutter: 40
  }, (0, _falcon.h)(_falconjsComponentFlexgrid.Col, {
    xs: 12
  }, (0, _falcon.h)("div", null, (0, _falcon.h)("img", {
    src: require("./images/logo.png"),
    height: "150"
  }))), (0, _falcon.h)(_falconjsComponentFlexgrid.Col, {
    xs: 12,
    md: 3,
    lg: 4
  }, (0, _falcon.h)("div", null, "1")), (0, _falcon.h)(_falconjsComponentFlexgrid.Col, {
    xs: 12,
    md: 3,
    lg: 4
  }, (0, _falcon.h)("div", null, "2")), (0, _falcon.h)(_falconjsComponentFlexgrid.Col, {
    xs: 12,
    md: 6,
    lg: 4
  }, (0, _falcon.h)("div", null, "3"))));
};

var render = (0, _falcon.Render)(View, document.getElementById('root'));
render(App);
App.observe('fName', function () {
  render(App);
});
App.observe('lName', function () {
  render(App);
});
App.observe('age', function () {
  render(App);
});
},{"@babel/runtime/regenerator":"../node_modules/@babel/runtime/regenerator/index.js","@babel/runtime/helpers/asyncToGenerator":"../node_modules/@babel/runtime/helpers/asyncToGenerator.js","@falconjs.io/falcon":"../node_modules/@falconjs.io/falcon/dist/index.js","falconjs-component-flexgrid":"../node_modules/falconjs-component-flexgrid/dist/index.js","falconjs-component-flexgrid/dist/index.css":"../node_modules/falconjs-component-flexgrid/dist/index.css","./falconjs-sw.js":[["falconjs-sw.js","falconjs-sw.js"],"falconjs-sw.map","falconjs-sw.js"],"./images/logo.png":"images/logo.png"}],"C:/Users/JM/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64426" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["C:/Users/JM/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.map