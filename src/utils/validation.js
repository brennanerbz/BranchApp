Array.prototype.__alphabetizeList = function() {
  const alphabetical = function (a, b) {
    var first = a.title.replace("#").toLowerCase()
    var second = b.title.replace("#").toLowerCase()
    if(first < second) return -1;
    else if(first > second) return 1;
    else return 0;
  }
  return this.sort(alphabetical)
}

Array.prototype.__uniqueShallow = function() {
  var seen = new Set;
  return this.filter(function(item, i){
    if (!seen.has(item)) {
      seen.add(item);
      return true;
    }
  });
}

Array.prototype.__findUniqueByKey = function(key) {
  var keyList = [];
  for(var l = 0; l < this.length; l++) {
    keyList.push(this[l][key])
  }
  var uniqueKeys = [];
  var unique = [];
  for (var i = 0; i < keyList.length; i++) {
    if(uniqueKeys.indexOf(keyList[i]) === -1) {
      uniqueKeys.push(keyList[i])
      unique.push(this[i])
    }
  }
  return unique;
}


Array.prototype.__placeItemFirst = function(key, value) {
  var values = [];

  for(var v = 0; v < this.length; v++) {
    values.push(this[v][key])
  }
  var index = values.indexOf(value)
  var obj = this[index]

  this.splice(index, 1)
  this.unshift(obj)
  return this;
}

// const isEmpty = value => value === undefined || value === null || value === '';
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */ ];

export function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function isEmpty(value) {
  if(value === undefined || value === null || value === '') return true;
}

export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return 'Required';
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
  };
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}
