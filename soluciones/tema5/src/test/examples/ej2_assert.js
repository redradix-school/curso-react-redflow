var assert = require('assert');

describe('Suite con assert', function(){
  it('Should add 2 + 2', function(){
    var res = 2 + 2;
    assert.equal(res, 4);
  });

  it('Should add 2 + 2', function(){
    var res = 2 + 2;
    assert.notEqual(res, 5);
  });

  it('Should compare two objects', function(){
    var obj1 = { foo: 'bar' };
    var obj2 = { foo: 'bar' };

    assert.deepEqual(obj1, obj2);
  });

  it('Should compare two Arrays', function(){
    var array1 = [1,2,3];
    var array2 = [1,2,3];

    assert.deepEqual(array1, array2);

  });

  it('Should assert truthy values', function(){
    var array = [1,2,3];
    assert(array.length);
  });

});