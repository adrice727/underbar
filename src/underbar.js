/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

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
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length - 1];
    } else {
      if (n === 0) {
        return [];
      } else {
        return array.slice(-n);
      }
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if ( Array.isArray(collection) ) {
      for ( var i = 0; i < collection.length; i++ ) {
        iterator(collection[i], i, collection);
      }
    } else {
      for ( var key in collection ) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
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
   
    _.each(collection, function(item, key, collection){
        if (test(item, key, collection)) {
            result.push(item);
        }
    });

    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
     
    return _.filter(collection, function(item) {
        return !test(item);
    });

  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {

    var result = {};

    _.each(array, function(item){
        result[item] = true;
    })

    return Object.keys(result);
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.

    var result = [];

    _.each(array, function(item){
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
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.

  //This passes the tests, but to be honest, I don't understand it very well.
  _.invoke = function(collection, functionOrKey, args) {

    var result = [];
    if ( typeof functionOrKey !== "function" ) {    
      result = _.map(collection, function(item) {
        return item[functionOrKey].apply(item, args);
      });    
    } else {
      result = _.map(collection, function(item) {
        return functionOrKey.apply(item, args);
      });
    };  
    
    /*
    if ( typeof functionOrKey === "function" ) {
      for ( var i = 0; i < collection.legnth; i++ ) {
        result.push(functionOrKey(collection[i]));
      }
    } else {
      for (var i)
    }

    if ( typeof functionOrKey === "function" ) {
      for ( var i = 0; i < collection.length; i++ ) {
        result.push(functionOrKey(collection[i], args));
      }
    }
    */

    return result;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {

    var hasInitial = arguments.length > 2;
    var memo = accumulator;

    _.each(collection, function(value, index, list) {
      if (!hasInitial) {
        memo = value;
        hasInitial = true;
      } else {
        memo = iterator(memo, value)
      }
    });

    return memo;

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
    // TIP: Try re-using reduce() here.
    // I don't understand why I wouldn't use each instead of reduce here

    var hasCallback = arguments.length > 1;

    return _.reduce(collection, function(allMatch, item) {
      if (!allMatch) {
        return false;
      }
      if (hasCallback) {
        return (iterator(item) != false && iterator(item) != undefined);
      } else {
        return (item != false && item != undefined);
      }
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    // I think I actually figured out the "clever" way to re-use every.  See below =)

    var hasCallback = arguments.length > 1;

    return _.reduce(collection, function(someMatch, item) {
      if (someMatch) {
        return true;
      }
      if (hasCallback) {
        return (iterator(item) != false && iterator(item) != undefined);
      } else {
        return (item != false && item != undefined);
      }
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
    
    var args = Array.prototype.slice.call(arguments,1);

    _.each(args, function(item) {
      for ( var key in item ) {
        obj[key] = item[key];
      }
    });

    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {

    var args = Array.prototype.slice.call(arguments,1);

    _.each(args, function(item) {
      for ( var key in item ) {
        if (key in obj != true){
          obj[key] = item[key];
        }
      }
    });

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

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

      var args = Array.prototype.slice.call(arguments,1);

      return function() {

        var memory = memory || {};
        var key = args.toString();

        return (key in memory) ? 
          memory[key] :
          memory[key] = func.apply(this, arguments)
      } 

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {

    var time = Array.prototype.slice.call(arguments,1,2);
    var args = Array.prototype.slice.call(arguments,2);

    setTimeout(function() { func.apply(this, args); }, time)
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {

    var copy = Array.prototype.slice.call(array);
    var result = [];

    for ( var i = 0; i < array.length; i++ ) {
      var rand = Math.floor(Math.random() * copy.length);
      result.push(copy[rand]);
      copy.splice(rand,1);
    }

    return result;

  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {

    //This is ugly and I don't really understand what I did.  It works though.

  var sortable = [];

  if ( Array.isArray(collection) ) {
    if(typeof iterator === "string"){
      sortable = collection.sort(function(a,b) { return a[iterator] - b[iterator];});
    } else {
      sortable = collection.sort(iterator).sort();
    }
  } else {
    _.each(collection, function(item){
      sortable.push(item.iterator)
    })
    sortable.sort(function(a,b) {return a - b;});
  }
  
  return sortable;

  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {

  //Not pretty, but it works

    var args = Array.prototype.slice.call(arguments);
    var sorted = args.slice();

    sorted.sort( function (a,b) { return b.length - a.length; } );
    
    var result = [];
    var temp;

    for ( var i = 0; i < sorted[0].length; i++) {
      temp = [];
      _.each(args, function(list){
        temp.push(list[i]);
      })
      result.push(temp);
    }
   
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {

    var args = Array.prototype.slice.call(nestedArray);
    var result = result || [];
    _.each(args, function (item) { 
      if (Array.isArray(item)) { 
        _.flatten(item, result);
      } else {
        result.push(item);
      }
    })

    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {

    var arrays = Array.prototype.slice.call(arguments);
    var items = [];
    items  = _.uniq(items.concat.apply(items, arrays));

    return _.filter(items, function(value){
      return _.every(arrays, function(list){
        return _.contains(list,value)
      })
    })

  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {


    var others = Array.prototype.slice.call(arguments, 1);
    var merged = [];
    var merged = merged.concat.apply(merged, others);

    return _.filter(array, function(elem){
      return (!_.contains(merged, elem));
    })

  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.

  //I feel like this should work. Hmmmm.

  _.throttle = function(func, wait) {

    return function(){

      var timeCalled;
      var args = Array.prototype.slice.call(arguments,2);

      if (timeCalled){
        var now = new Date().getTime();
        if ((now - timeCalled) > wait){
          func.apply(this, args);
          timeCalled = new Date().getTime();
        }
      } else {
        func.apply(this, args);
        timeCalled = new Date().getTime();
      }  
    }
  };

}).call(this);
