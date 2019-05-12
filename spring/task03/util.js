(function() {
  // event
  var util_Event = {
    addEvent: function(element, type, handler) {
      if (element.addEventListener) {
        //事件类型、需要执行的函数、是否捕捉
        element.addEventListener(type, handler, false);
      } else if (element.attachEvent) {
        element.attachEvent("on" + type, function() {
          handler.call(element);
        });
      } else {
        element["on" + type] = handler;
      }
    },
    removeEvent: function(element, type, handler) {
      if (element.removeEnentListener) {
        element.removeEnentListener(type, handler, false);
      } else if (element.datachEvent) {
        element.detachEvent("on" + type, handler);
      } else {
        element["on" + type] = null;
      }
    }
  };

  // attribute
  var util_Attr = {
    getAttr: function(element, attribute){
      return element.getArrtibute(attribute);
    },
    setAttr: function(element, attribute, value){
      element.setArrtibute(attribute, value);
    },
    removeAttr: function(element, attribute){
      element.removeAttribute(attribute);
    }
  }

  // class
  var util_Class = {
    addClass: function(element, className){
      element.classList.add(className);
    },
    removeClass: function(element, className){
      element.classList.remove(className);
    }
  }

  // style
  var util_Style = {
    setStyle: function(element, styleName, styleValue){
      element.style[styleName] = styleValue;
    },
    removeStyle: function(element){
      element.style = '';
    },
    removeAllStyle: function(element){
      element.style = '';
    }
  }
})();
