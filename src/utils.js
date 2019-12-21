/* globals window, _ */
(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length-1]
          : n === 0 ? array.slice(array.length) : array.slice(-n);
    };

    //@@@ slice() 메서드 - 어떤 배열의 begin부터 end까지(end 미포함)에 대한 얕은 복사본을 새로운 배열 객체로 반환한다. 원본 배열은 수정되지 않음

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  
  _.each = function(collection, iterator) {
    //각 요소에 iteratee를 적용한 결과를 리턴한다.
    if(Array.isArray(collection)) {
      for(var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
     } else {
      for(var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var result = [];
    _.each(collection, function(item) {
      if (test(item)) {
        result.push(item);
      }
    });
      
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var result = [];
    _.each(collection, function(item) {
      if (test(item) === false) {
        result.push(item);
      }
    });

    return result;
  };

  // Produce a duplicate-free version of the array.
  // _.uniq = function(array) {
  //   var result = [];
  //   for (var i = 0; i < array.length; i++) {
  //     if(_.indexOf(result, array[i]) === -1) {
  //       result.push(array[i]);
  //     };
  //   };
    
  //   return result;
  // };

  _.uniq = function(array) {
    var result = [];
    _.each(array, function(item) {
      if(_.indexOf(result, item) === -1) {
        result.push(item);
      };
    });

    return result;
  };

  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    //each랑 비슷, 새로운 배열 만든다
    var result = [];
    _.each(collection, function(item) {
      result.push(iterator(item))
    });

    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    //collection으로부터 하나의 결과를 낸다

    // if(accumulator === undefined) {
    //   accumulator = collection[0];
    //   for(var i = 0; i < collection.length - 1; i++) {
    //   accumulator = iterator(accumulator, collection[i+1]);
    //   }
    //   } else {
    //   for(var j = 0; j < collection.length; j++) {
    //   accumulator = iterator(accumulator, collection[j]); >> 객체일때 처리가 안되는
    //   }
    //   }
    //   return accumulator;
    //   };
  
  // _.each(collection, function(item, index) {
  //   if(accumulator !== undefined) {
  //       accumulator = iterator(accumulator, item);
  //   } else {
  //     if(Array.isArray(collection)) {
  //       accumulator = collection[0];
  //     } else {
  //       accumulator = Object.values(collection)[0];
  //     }
  //     accumulator = iterator(accumulator, item);  >> 두번째 아이템부터 들어와야함.. 
  //   }
  // });
  // return accumulator;

  // if(accumulator !== undefined) {
  //   for(var i = 0; i < collection.length; i++) {
  //     accumulator = iterator(accumulator, collection[i])
  //   };
  // } else {
  //     if(Array.isArray(collection)) {
  //       accumulator = collection[0];
  //       for(var j = 1; j < collection.length; j++) {
  //         accumulator = iterator(accumulator, collection[j])
  //       }
  //     } else {
  //       accumulator = Object.values(collection)[0];
  //       for(var j = 1; j < Object.keys(collection).length; j++) {
  //         accumulator = iterator(accumulator, Object.values(collection)[j])
  //       };
  //     };
  //   };
    
  // return accumulator;
  // };

  if(Array.isArray(collection)) {
    if(accumulator !== undefined) {
      for(var i = 0; i < collection.length; i++) {
      accumulator = iterator(accumulator, collection[i])
      };
      return accumulator;
    } else {
      accumulator = collection[0];
        for(var j = 1; j < collection.length; j++) {
        accumulator = iterator(accumulator, collection[j])
      };
      return accumulator;
    }
  } else {
    for(var k in collection){
      accumulator = iterator(accumulator, collection[k]);
    }
    return accumulator;
  }
};

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };  

  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    //TIP: Try re-using reduce() here.
    if(iterator === undefined) {
      return collection[collection.length-1];
    } else {
      return _.reduce(collection, function(pass, item) {
        if (!pass) {
          return false;
        } else if (iterator(item)) {
          return true;
        } else return false;
      }, true);
    }
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if(iterator === undefined) {
      return _.contains(collection, true);
    }
    return _.reduce(collection, function(pass, item) {
      if (pass) {
        return true;
      } else if (iterator(item)) {
        return true;
      } else return false;
    }, false);
  };

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for(var i = 0; i < arguments.length; i++) {
      for(var key in arguments[i]) {
        obj[key] = arguments[i][key]
      };
    };
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for(var i = 0; i < arguments.length; i++) {
      for(var key in arguments[i]) {
        if(!obj.hasOwnProperty(key)) {
          obj[key] = arguments[i][key]
        };
      };
    };
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
  };

  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
