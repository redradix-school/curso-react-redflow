var _ = require('mori');

var slice = Array.prototype.slice;

function padLeftWithZero(value, length) {
  value = '000' + value;
  return value.substring(value.length - length);
}

function getDayOfYear(now) {
  var start = new Date(now.getUTCFullYear(), 0, 0);
  return Math.floor((now - start) / (1000 * 60 * 60 * 24));
}

module.exports = {
  throttle: function(f, delay){
      var timer = null;
      return function(){
          var context = this, args = arguments;
          clearTimeout(timer);
          timer = window.setTimeout(function(){
              f.apply(context, args);
          },
          delay || 500);
      };
  },
  debounce: function(fn, ms) {
    var id = 0;
    return function() {
      var args = slice.call(arguments), ctx = this;
      clearTimeout(id);
      id = setTimeout(function() { fn.apply(ctx, arguments); }, ms);
    };
  },
  extend: function(obj) {
    var args = slice.call(arguments, 1);
    return args.reduceRight(function(acc, el) {
      for (var k in el) if (el.hasOwnProperty(k)) acc[k] = el[k];
      return acc;
    }, obj);
  },
  curry2: function(fn) {
    return function() {
      var fixedArgs = slice.call(arguments);
      return function() {
        var args = slice.call(arguments);
        return fn.apply(this, fixedArgs.concat(args));
      };
    };
  },
  range: function (from, to) {
    var range = [];
    for (var i = from - 1; ++i < to;) range.push(i);
    return range;
  },
  partitionAll: function (list, size) {
    var partition = [];
    for (var i = 0, ln = list.length; i < ln; i += size) partition.push(list.slice(i, i + size));
    return partition;
  },
  mapTimes: function (mapper, times) {
    var timesArr = [];
    for (var i = 0; i++ < times;) timesArr.push(0);
    return timesArr.map(mapper);
  },
  compose: function() {
    var funcs = arguments;
    return function() {
        var args = arguments;
        for (var i = funcs.length; i --> 0;) {
            args = [funcs[i].apply(this, args)];
        }
        return args[0];
    }
  },
  // mori
  removeElement: function(e) {
    return _.partial(_.remove, _.partial(_.equals, e));
  },
  replaceElement: function(old, current) {
    return _.partial(_.map, function(e) {
      return (_.equals(old, e)? current : e);
    });
  },
  not: function(p) {
    return function() { return !p.apply(this, arguments); };
  },
  createEventSortedSet: function() {
    return _.sortedSetBy(function(a, b) {
      if (_.equals(a, b)) {
        return 0;
      } else {
        return (_.get(b, 'timestamp') - _.get(a, 'timestamp') ||
               (_.get(b, 'id') > _.get(a, 'id') ? 1 : -1));
      }
    });
  },
  createEventSortedSetASC: function(){
    return _.sortedSetBy(function(a,b){
      if (_.equals(a, b)) {
        return 0;
      } else {
        return (_.get(a, 'timestamp') - _.get(b, 'timestamp') ||
               (_.get(a, 'id') > _.get(b, 'id') ? 1 : -1));
      }
    });
  },
  createEventSortedSetDESC: function(){
    return _.sortedSetBy(function(a,b){
      if (_.equals(a, b)) {
        return 0;
      } else {
        return (_.get(b, 'timestamp') - _.get(a, 'timestamp') ||
               (_.get(b, 'id') > _.get(a, 'id') ? 1 : -1));
      }
    });
  },
  createColumnSortedSet: (function() {
    var columnOrder = {
      'Time': 1,
      'Site': 2,
      'Module': 3,
      'Domain': 4,
      'Type': 5,
      'Instance': 6,
      'Host': 7,
      'Submodule': 8,
      'Source Event ID': 9,
      'Ground System Time': 10,
      'Username': 11,
      'Message': 12
    };
    return function(initialColumns) {
      var columnSortedSet = _.sortedSetBy(function(a, b) {
        return columnOrder[a] - columnOrder[b];
      });
      if(initialColumns) {
        for (var i = 0; i < initialColumns.length; i++) {
          columnSortedSet = _.conj(columnSortedSet, initialColumns[i]);
        }
      }
      return columnSortedSet;
    };
  }()),

  // others
  threeDigits: function(d){
    if (d < 10){
      return '00' + d.toString();
    }
    if(d < 100){
      return '0' + d.toString();
    }
    return d.toString();
  },
  twoDigits: function(value) {
    return value < 10 ? '0' + value : value;
  },
  formatDate: function(format, options, date) {
    var jsDate = new Date(date),
        result = '';

    if (format === 'dayOfMonth') { //dd/MM/yyyy HH:mm:ss.SSS
      result =
        padLeftWithZero(jsDate.getUTCDate(), 2) + '/' +
        padLeftWithZero((jsDate.getUTCMonth() + 1), 2) + '/' +
        jsDate.getUTCFullYear();

        if (!options.noTime) {
          result += ' ' +
            padLeftWithZero(jsDate.getUTCHours(), 2) + ':' +
            padLeftWithZero(jsDate.getUTCMinutes(), 2) + ':' +
            padLeftWithZero(jsDate.getUTCSeconds(), 2);
        }
    } else if (format === 'dayOfYear') { //yyyy.DDD.HH.mm.ss.SSS
      result =
        jsDate.getUTCFullYear() + '.' +
        padLeftWithZero(getDayOfYear(jsDate), 3);

        if (!options.noTime) {
          result += '.' +
            padLeftWithZero(jsDate.getUTCHours(), 2) + '.' +
            padLeftWithZero(jsDate.getUTCMinutes(), 2) + '.' +
            padLeftWithZero(jsDate.getUTCSeconds(), 2);
        }
    }

    if (result && options.showMilliseconds && !options.noTime) {
      result += '.' + padLeftWithZero(jsDate.getUTCMilliseconds(), 3);
    }

    return result;
  },
  /**
   * Returns the number of weeks in a given month/year
   * @param  {Integer} year         Year (2015)
   * @param  {Integer} month_number Month number (1..12)
   * @return {Integer}              Number of weeks
   */
  weekCount: function(year, month_number) {
    // month_number is in the range 1..12
    var firstOfMonth = new Date(year, month_number-1, 1);
    var lastOfMonth = new Date(year, month_number, 0);
    //for week starting on Monday we replace 0 for 7
    //if you need American work days, remove the '||7'
    var used = (firstOfMonth.getUTCDay()||7) + lastOfMonth.getUTCDate();
    return Math.ceil(used / 7);
  },
  sameDay: function (date1, date2) {
    return date1.getUTCDay() === date2.getUTCDay() && date1.getUTCMonth() === date2.getUTCMonth() && date1.getUTCFullYear() === date2.getUTCFullYear();
  },
  isPreviousDay: function (date1, date2) {
    return ((date1.getUTCDay() < date2.getUTCDay() &&
            date1.getUTCMonth() === date2.getUTCMonth() &&
            date1.getUTCFullYear() === date2.getUTCFullYear()) ||
           (date1.getUTCMonth() < date2.getUTCMonth() &&
           date1.getUTCFullYear() < date2.getUTCFullYear()) ||
           (date1.getUTCFullYear() < date2.getUTCFullYear()));
  },
  capitalize: function(str) {
    if (!str) return;
    return str[0].toUpperCase() + str.substr(1);
  },
  fetch: function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          callback(null, xhr.response);
        } else {
          callback(xhr.status);
        }
      }
    };

    xhr.send();
  }
};
