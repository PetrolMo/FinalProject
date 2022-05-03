const Utils = require('../utils/index')
const assert = require('assert')
const app = require('../app')
// 定义一个测试场景，第一个参数是场景描述， 第二个参数是回调函数
describe('测试获取年龄函数', function () {
  it('应该返回正确的年龄', function () {
    const age = Utils.getAge(new Date('1999-06-14'))
    assert.equal(age[0], 22)
  })
})
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});
