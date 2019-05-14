window.onload = function() {

  // 独立的id
  var id = 12;

  // 当前位置
  var currentIndex = null;

  // 渲染节点
  var listEle = document.querySelector('.list');
  var listDetail = document.querySelector('.list-detail');
  var detailContent = document.querySelector('.detail-content');

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

  // 所有状态还原操作
  const resetStatus = function(target, key, value){
    return Array.from(target).map(cv => {
      return cv[key] = value;
    })
  }

  // 渲染函数
  const render = function(){
    var resultA = '';
    var resultB = '';
    
    dataObj.forEach(cv => {
      // 构建 dl — mainObject
      resultA += `<dl class="${cv.actived ? 'activedDL' : ''}">
        <dt index="${cv.id}">${cv.title}</dt>
        ${makeDD(cv.taskList)}
      </dl>`
    });

    listEle.innerHTML = resultA;
    listDetail.innerHTML = resultB;

    function makeDD(taskList){
      var cache = '';
      taskList.forEach(cv  => {
        resultB += `<ul class="${cv.actived ? 'activedTT' : ''}">${makeTasks(cv.tasks)}</ul>`
        cache += `<dd index="${cv.id}" class="${cv.actived ? 'activedDD' : ''}">${cv.listName}(${cv.incomplete})</dd>`
      })
      return cache;
    }

    function makeTasks(tasks){
      var cache = '';
      tasks.forEach(cv => {
        cache += `<li index="${cv.id}" class="${cv.actived ? 'activedTD' : ''}">${cv.title}</li>`
        if(cv.actived){
          detailContent.innerHTML = `
            <p><input type='text'></p>
            <textarea disabled="${cv.disabled}">${cv.substance}</textarea>
          `
        }
      })
      return cache;
    }
  }

  // 增加主任务 增加任务前还原所有为 false
  const addMainObj = function(mainObjTitle) {
    // 还原每一 actived 状态
    resetStatus(dataObj, 'actived', false);
    // 直接添加
    dataObj.push({
      title: mainObjTitle,
      actived: true,
      taskList: [],
      id: id++
    })
  };

  // 为主任务增加列表
  const addTaskList = function(listName){
    // 遍历 actived 为真的 mainObject
    dataObj = dataObj.map(cv => {
      resetStatus(cv.taskList, 'actived', false);
      if(cv.actived){
        cv.taskList.push({
          listName: listName,
          incomplete: 0,
          actived: true,
          id: id++,
          tasks: [],
        });
      }
      return cv;
    })
  }

  // 为列表增加列表任务
  const addTask = function(title){
    // 遍历 actived 为真的 mainObject 下的 taskList
    dataObj = dataObj.map(cv => {
      if(cv.actived) {
        cv.taskList = cv.taskList.map(cvv => {
          resetStatus(cvv.tasks, 'actived', false)
          if(cvv.actived){
            cvv.tasks.push({
              title: title,
              createDate: (new Date()).toString(),
              substance: '', 
              status: false,
              actived: true,
              disabled: false,
              id: id++,
            })
          }
          return cvv;
        })
      }
      return cv;
    })
  }

  // 为列表任务填写内容
  const addTaskContent = function(Text){
    dataObj = dataObj.map(cv => {
      if(cv.actived) {
        cv.taskList = cv.taskList.map(cvv => {
          if(cvv.actived){
            cvv.tasks = cvv.tasks.map(cvvv => {
              if(cvvv.actived){
                cvvv.substance = Text;
              }
              return cvvv;
            })
          }
          return cvv;
        })
      }
      return cv;
    })
  }

  // 设置状态
  const setStatus = function(indexList){
    resetStatus(dataObj, 'actived', false)
    if(indexList.length){
      dataObj = dataObj.map((cv, index) => {
        resetStatus(cv.taskList, 'actived', false);
        if(index == indexList[0]){
          cv.actived = true;
        }
        cv.taskList = cv.taskList.map((cvv, indexx) => {
          resetStatus(cvv.tasks, 'actived', false);          
          if(index == indexList[0] && indexx == indexList[1]){
            cvv.actived = true;
          }
          cvv.tasks = cvv.tasks.map((cvvv, indexxx) => {
            if(index == indexList[0] && indexx == indexList[1] && indexxx == indexList[2]){
              cvvv.actived = true;
            }
            return cvvv;
          })
          return cvv;
        });
        return cv;
      })
    }
  }


  // 点击项目 相应的项 actived on
  const actived = function(event){
    // 获取目标元素的id
    var targetElement = event.target,
        elementIndex = targetElement.getAttribute('index');

    // 判断是否重复点击
    if(!elementIndex || elementIndex == currentIndex) return;
    currentIndex = elementIndex;

    var oldList = search(dataObj, currentIndex);
    var newList = [];
    switch(oldList.length){
      case 2:
        newList = [+oldList[0], 0, 0];
        break;
      case 4:
        newList = [+oldList[0], +oldList[2], 0];
        break;
      case 6:
        newList = [+oldList[0], +oldList[2], +oldList[4]];
        break;
    }

    setStatus(newList);
    render();
  }

  document.documentElement.addEventListener('click', actived)

  addMainObj('hhaha');

  addTaskList('hihi');

  addTask('kkk')
  // addTaskContent('kkklala');

  addTask('ooo')

  // addTaskContent('ooolala');


  render();

};
