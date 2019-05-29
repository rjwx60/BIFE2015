const baseOpt = {
  configurable: true,
  enumerable: true
}

const createGetSetValue = (target, key, self) => {
  if(target){
    // 初始值
    let value = target.value;
    // option属性赋值到对象为对象属性
    for(optKey in self.options[key]){
      target[optKey] = self.options[key][optKey];
    }
    // key - value 绑定
    Object.defineProperty(target, "value", {
      ...baseOpt,
      set: function (newValue) {
        console.log('key-value set operator');
        value = newValue
        if(target.validate && typeof target.validate === 'function'){
          target.validate.call(self, newValue);
        }
      },
      get: function () {
        console.log('key-value get operator');
        return value;
      },
    });
    // key 绑定
    Object.defineProperty(self.target, key, {
      ...baseOpt,
      set: function (newValue) {
        console.log('key set operator');
        value = newValue
        if(target.validate && typeof target.validate === 'function'){
          target.validate.call(self, newValue);
        }
      },
      get: function () {
        console.log('key get operator');
        return value;
      },
    });
  }
};

// Main
const eform = {
  target: {},
  options: {},
  fields: {},
  define: function(options){
    this.options = options;
    return this;
  },
  scan: function(formElement){
    this.target = formElement;
    for(key in this.options){
      createGetSetValue(this.target[key], key, this)
    }
    this.fields = this.target;
    return this;
  }
}




const form = eform.define({
  username: {
    required: false,
    validate: function(value) {
      console.log('username', value);
    }
  },

  password: {
    validate: function(value) {
      console.log('password', value);
      return this.passwordConfirm.value === value;
    }
  },

  usertype: {
    validate: function(value) {
      // 这需要触发username表单的验证，而不需要用户的操作
      this.username.required = true;
    }
  }
});

// 需识别HTML中的部分验证规则加到模型中去
form.scan(document.querySelector('#form'));

// 需触发username的验证
form.fields.username = 'more 1';

// 如果有一个程序员很淘气，它写了这样的代码
document.getElementsByName("username")[0].value = "again 2";

// 需触发username的验证
form.fields.username.value = 'more again 3';


console.log(form);

