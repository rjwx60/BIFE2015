window.onload = function() {

  // 独立的id
  var id = 12;

  // 缓存数据体
  var cacheDataObj = null,
      cacheFlag = true;

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

  // 时间格式转换 yyyy-mm-dd
  const formatDate = (date) => {
    var d = date ? new Date(date) : new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

  // 渲染函数
  const render = function(){
    var resultA = '<div class="list-content">';
    var resultB = '';
    
    dataObj.forEach(cv => {
      // 构建 dl — mainObject
      resultA += `<dl class="${cv.actived ? 'activedDL' : ''}">
        <dt index="${cv.id}">${cv.title}<span remove="true" class="dt-delete iconfont icon-close"></span></dt>
        ${makeDD(cv.taskList)}
      </dl>`
    });

    listEle.innerHTML = resultA + `</div>
    <div class="list-bottom" add='true'>
      <span class="iconfont icon-add" add='true'></span>
      <span add='true'>新增分类</span>
    </div>`;

    listDetail.innerHTML =  `
    <div class="list-detail-content">
      <p>
        <span show="true" id="show-all" class="show-span">所有</span>
        <span show="true" id="show-unc" >未完成</span>
        <span show="true" id="show-com" >已完成</span>
      </p>` 
      + resultB + `
    </div>
    <div class="list-detail-bottom" add='true'>
      <span class="iconfont icon-add" add='true'></span>
      <span add='true'>新增任务</span>
    </div>`;

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
        cache += `<li status="${cv.status}" index="${cv.id}" class="${cv.actived ? 'activedTD' : ''}">${cv.title}</li>`
        if(cv.actived){
          detailContent.innerHTML = `
            <div class="con-header">
              <input id="inp-text" type='text' ${cv.readonly ? 'readonly' : ''} value='${cv.title}'>
              <p>
                <button><span data-type='cp1' index="${cv.id}" class="${!cv.status ? 'iconfont icon-finish': ''}"></span></button>
                <button><span data-type='cp2' index="${cv.id}" class="iconfont ${cv.readonly ? 'icon-edit': 'icon-edit-complete'}" data-readonly='${cv.readonly}'></span></button>
              </p>
            </div>
            <p class="con-time"><span>任务日期:&nbsp;</span><input id="inp-date" type='date' ${cv.readonly ? 'readonly' : ''} value="${cv.editDate}"></p>
            <div class="con-inner">
              <textarea id='inp-textarea' ${cv.readonly ? 'readonly' : ''}>${cv.substance}</textarea>
            </div>
          `
          // <div contenteditable="true" ${cv.readonly ? 'readonly' : ''}>${cv.substance}</div>
        }
      })
      return cache;
    }

    return;
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
    render();
  };

  // 删除主任务
  const removeMainObj = function(removeIndex){
    dataObj = dataObj.filter(cv => {
      if(cv.id != removeIndex) {
        return cv;
      }
    })
  }

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
    render();
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
              editDate: formatDate(),
              substance: '', 
              status: false,
              actived: true,
              readonly: true,
              id: id++,
            })
          }
          return cvv;
        })
      }
      return cv;
    })
    render();
  }

  // 根据完成度排序
  const sortTask = function(type){
    var activedTT = document.querySelector('.activedTT');
    Array.from(activedTT.children).forEach(cv => {
    })
    activedTT.appendChild(Array.from(activedTT.children)[0])
    // activedTT.children = activedTT.children.filter(cv => {
    //   if(type === 1){

    //   } else if(type ===2 ){
    //     return cv.
    //   } else {
    //     return cv
    //   }
    // })
  }

  // 设置状态
  const setStatus = function(indexList, keyList, valueList){
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
              for(let i = 0; i < keyList.length; i++){
                cvvv[keyList[i]] = valueList[i];
              }
            }
            return cvvv;
          })
          return cvv;
        });
        return cv;
      })
    }
  }

  // promopt 事件处理
  const promoptHandle = function(typeName){
    return new Promise((resolve) => {
      var result = window.prompt('new ', `${typeName}`);
      resolve(result)
    })
  }


  // 点击项目
  const actived = function(event){
    // 获取目标元素的id
    var newList = [0,0,0],
        targetElement = event.target,
        nodeName = targetElement.nodeName.toLowerCase(),
        elementIndex = targetElement.getAttribute('index'),
        elementData = targetElement.getAttribute('data-type'),
        elementAdd = targetElement.getAttribute('add'),
        elementRemove = targetElement.getAttribute('remove'),
        elementShow = targetElement.getAttribute('id');


    // 编辑元素忽略 render
    if(nodeName == 'input' || nodeName == 'textarea') return;
    // if(nodeName == 'div' && targetElement.getAttribute('contenteditable')) return;
    // if(nodeName == 'div' && targetElement.parentNode.getAttribute('contenteditable')) return;


    // 完成项 + 编辑项 激活项 active 处理
    if(elementIndex && !elementAdd && !elementRemove && !elementShow){
      // 获取当前位置索引
      var oldList = search(dataObj, elementIndex);
      var regxp = new RegExp(elementData);

      // 返回索引
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

      if(elementData && regxp.test('cp1')){
        Promise.resolve(window.confirm('完成任务了么')).then(res => {
          if(res) {
            setStatus(newList, ['status'], [true]);
            render();
          }
        })
      } else if(elementData && regxp.test('cp2')){
        var originReadonly = targetElement.getAttribute('data-readonly');
        // 可操作切换至不可操作 - 保存内容
        if(!/true/.test(originReadonly)){
          var InpText = document.querySelector('#inp-text');
          var InpDate = document.querySelector('#inp-date');
          var InpTextarea = document.querySelector('#inp-textarea');
          setStatus(newList, ['title', 'editDate', 'substance'], [InpText.value, InpDate.value, InpTextarea.value]);
        }
        setStatus(newList, ['readonly'], [!/true/.test(originReadonly)]);
      } else {
        setStatus(newList, ['actived'], [true]);
      }

    // 添加项目 处理
    } else if(elementAdd) {
      var type =  targetElement.nodeName.toLowerCase() == 'p' ? 
                  targetElement.className : 
                  targetElement.nodeName.toLowerCase() == 'span' ? targetElement.parentNode.className : '';

      switch(type){
        case 'head-right':
          promoptHandle('新建列表').then(res => {
            if(res) addMainObj(res);
          })
          break;
        case 'list-bottom':
          promoptHandle('新建分类').then(res => {
            if(res) addTaskList(res);
          })
          break;
        case 'list-detail-bottom':
          promoptHandle('新建任务').then(res => {
            if(res) addTask(res);
          })
          break;
        default:
          console.log('按不准');
          break;
      }
      
    // 删除项目 处理
    } else if(elementRemove) {
      var index = targetElement.parentNode.getAttribute('index');
      if(index == 1){
        window.alert('默认分类不可删除')
        return
      }
      removeMainObj(index)
      setStatus(newList, ['actived'], [true]);
    
    // 展示项目 处理 
    } else if(elementShow){
      var type = targetElement.getAttribute('id').split('-')[1];

      switch(type){
        case 'all':
          sortTask(0);
          break;
        case 'com':
          sortTask(1);
          break;
        case 'unc':
          sortTask(2);
          break;
      }
      // 排序不刷新
      return;
    }
    render();
  }

  document.documentElement.addEventListener('click', actived);

  render();
};
