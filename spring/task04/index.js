window.onload = function(){
  
  // 渲染节点
  const secOne = document.querySelector('#section-one'),
        secTwo = document.querySelector('#section-two'),
        secThr = document.querySelector('#section-thr');

  // 根据值返回所处索引和id
  const search = (object, value) => {
    for (var key in object) {
      if (object[key] == value) return [key];
      if (typeof object[key] == "object") {
        var temp = search(object[key], value);
        if (temp) return [key, temp].flat();
      }
    }
  }

  // 渲染
  const render = () => {
    var resultStr1 = '<ul>',
        resultStr2 = '',
        resultStr3 = '';

    dataObj.forEach(cv => {
      // 创建分类列表
      resultStr1 += `
        <li type="1" key="${cv.classId}" class="${cv.actived ? 'classActive' : 'classNormal'}">${cv.className}</li>
      `;
      // 创建分类列表下的数个 ul
      resultStr2 += `
      <ul class="${cv.actived ? 'taskShow' : 'taskHide'}">
        ${makeTaskList(cv.taskList, cv.actived)}
      </ul>
      `;
    })
    resultStr1 += '</ul>';

    function makeTaskList(target, flag){
      let cacheStr = '';
      target.forEach(cv => {
        cacheStr += `
        <li type="2" key="${cv.taskId}" class="${cv.actived ? 'classActive' : 'classNormal'}">${cv.taskName}</li>
        `;
        // 构建列表任务内容
        if(cv.actived && flag){
          resultStr3 = `
          <p>
            <span>${cv.taskName}</span>
            <span>${cv.taskEditTime}</span>
            <span>${cv.taskContent}</span>
          </p>`
        }
      })
      return cacheStr;
    }

    secOne.innerHTML = resultStr1;
    secTwo.innerHTML = resultStr2;
    secThr.innerHTML = resultStr3;

    console.log(dataObj);
  }

  // 思路
  // 主要有两类 聚焦事件: 分类和任务
  // 聚焦前者，后者默认给第一位为 actived
  // 聚焦后者，搜索当前聚焦分类，在子类中遍历，并不用那么复杂
  // 进去动画发生在 render 后；
  // 退出动画直接退出，不能通过手势进入；

  const activedOne = (event) => {
    const targetKey = event.target.getAttribute('key');
    const isClass = event.target.getAttribute('type') == 1 ? true : false;

    if(!targetKey) return;

    dataObj.forEach(cv => {
      cv.actived = isClass ? false : cv.actived;
      if(isClass && cv.classId == targetKey){
        cv.actived = true;

        cv.taskList = cv.taskList.map((cvv, index) => {
          cvv.actived = index == 0 ? true : false;
          return cvv;
        })
      }
      if(!isClass && cv.actived){
        cv.taskList = cv.taskList.map(cvv => {
          cvv.actived = false;
          if(cvv.taskId == targetKey){
            cvv.actived = true;
          }
          return cvv;
        })
      }
    })

    render();
  }

  secOne.addEventListener('click', activedOne)
  secTwo.addEventListener('click', activedOne)
  



  // 将对象所有 特定字段设置为 false


  // 数据结构渲染
  // 当前聚焦对象id，滑动即显示
  // 滑动控制呈现，点击控制聚焦切换，切换不能触发渲染

  render();
}