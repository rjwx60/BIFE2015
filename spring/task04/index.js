window.onload = function(){

  let originPos = 0;
  
  // 渲染节点
  const parentCon = document.querySelector('.parent-content'),
        secOne = document.querySelector('#section-one'),
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
  }

  // 动画
  const moveAnimate = (event) => {
    // 0 - -100vw - -200vw
    // 100vw - 0 -100vw
    // 200vw - 100vw - 0

    const baseLeft = parseInt(window.getComputedStyle(secOne).left);
    const deviceWidth = document.documentElement.clientWidth;

    if(!event){
      // 增加 trainstion 过渡
      Array.from(parentCon.children).forEach(cv => {
        cv.classList.remove('child-trainsion1');
        cv.classList.add('child-trainsion');
      })

      if(!baseLeft){
        secOne.style.left = `-100vw`;
        secTwo.style.left = `0px`;
        secThr.style.left = `100vw`;
      } else {
        secOne.style.left = `-200vw`;
        secTwo.style.left = `-100vw`;
        secThr.style.left = `0`;
      }
    } else {
      const touchPos = event.touches[0] ? event.touches[0].clientX : undefined,
            secOneLeft = parseInt(window.getComputedStyle(secOne).left),
            secTwoLeft = parseInt(window.getComputedStyle(secTwo).left),
            secThrLeft = parseInt(window.getComputedStyle(secThr).left);

      // 去除 trainstion 过渡
      Array.from(parentCon.children).forEach(cv => {
        cv.classList.add('child-trainsion1');
      })

      if(!originPos){
        originPos = touchPos;
      } else {
        // touchmove event
        // 若为从左往右移动，则赋值;
        if(touchPos !== undefined){
          if(touchPos - originPos > 10){
            if(!baseLeft){
              return;
            } else {
              secOne.style.left = secOneLeft + touchPos + 'px';
              secTwo.style.left = secTwoLeft + touchPos + 'px';
              secThr.style.left = secThrLeft + touchPos + 'px';
            }
          } else {
            return;
          }
        // touchend event
        // 根据边距判断是否回弹或位置变化;
        } else {
          if(!baseLeft){
            return;
          } else {
            if(Math.abs(parseInt(secOne.style.left)) < deviceWidth / 3){
              secOne.style.left = `0`;
              secTwo.style.left = `100vw`;
              secThr.style.left = `200vw`;
            } else {
              secOne.style.left = `-100vw`;
              secTwo.style.left = `0`;
              secThr.style.left = `100vw`;
            }
          }
        }
      }
    }
  }

  // 思路
  // 有两类聚焦事件: 分类、任务
  // 聚焦前者，后者默认给第一位为 actived；
  // 聚焦后者，搜索当前聚焦分类，直接在子类中遍历；
  // render 后触发进入动画
  // 手势触发退出动画，当；

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

    moveAnimate();
  }
  
  render();

  secOne.addEventListener('click', activedOne);
  secTwo.addEventListener('click', activedOne);

  parentCon.addEventListener('touchmove', moveAnimate);
  parentCon.addEventListener('touchend', moveAnimate);
}