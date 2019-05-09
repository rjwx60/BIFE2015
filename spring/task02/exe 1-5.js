window.onload = function() {
  // 练习1:
  // 阶段1:
  // 在页面中，有一个单行输入框，一个按钮，输入框中用来输入用户的兴趣爱好，允许用户用半角逗号来作为不同爱好的分隔。
  // 当点击按钮时，把用户输入的兴趣爱好，按照上面所说的分隔符分开后保存到一个数组，过滤掉空的、重复的爱好，在按钮下方创建一个段落显示处理后的爱好。
  // 思路: input querySelector split trim 去重 显示

  var Btn1 = $(".Btn1");

  addClickEvent(Btn1, () => {
    var Inp1 = $(".Inp1");
    $(".showPlace").innerHTML = Array.from(new Set(Inp1.value.split(","))).join(
      " "
    );
  });

  // 阶段2:
  // 单行变成多行输入框，一个按钮，输入框中用来输入用户的兴趣爱好，允许用户用换行、空格（全角/半角）、逗号（全角/半角）、顿号、分号来作为不同爱好的分隔。
  // 当点击按钮时的行为同上
  // 思路：textarea querySelector replace split trim 去重 显示

  var Btn1 = $(".Btn2");

  addClickEvent(Btn1, () => {
    var Inp2 = $(".Inp2");
    $(".showPlace").innerHTML = Array.from(
      new Set(Inp2.value.split(/,|\n|，|;|；|\s/g).filter(cv => cv))
    ).join(" ");
  });

  // 阶段3:
  // 用户输入的爱好数量不能超过10个，也不能什么都不输入。当发生异常时，在按钮上方显示一段红色的错误提示文字，并且不继续执行后面的行为；当输入正确时，提示文字消失。
  // 同时，当点击按钮时，不再是输出到一个段落，而是每一个爱好输出成为一个 checkbox ，爱好内容作为 checkbox 的 label。
  // 思路：键盘输入事件 内容为空不算+分隔号之间为空不算 类控制提示文字显示 组成的

  var Btn3 = $(".Btn3"),
    Btn3Info = $(".Input3_info"),
    Inp3 = $(".Inp3"),
    Exe1 = $(".Exe1");

  const dubHobbyArray = value => {
    return Array.from(
      new Set(value.split(/,|\n|，|;|；|\s/g).filter(cv => cv))
    );
  };

  addEvent(Inp3, "keyup", event => {
    var infoText = "",
      result = dubHobbyArray(event.target.value);
    infoText = result.length
      ? result.length <= 10
        ? ""
        : "输入个数不能超过10个"
      : "输入内容不能为空";
    Btn3Info.innerHTML = infoText;
  });

  addClickEvent(Btn3, () => {
    var div = document.createElement("div");
    dubHobbyArray(Inp3.value).forEach((cv, index) => {
      var label = document.createElement("label"),
        input = document.createElement("input"),
        p = document.createElement("p");
      label.setAttribute("for", `hobby-${index + 1}`);
      label.innerHTML = cv;
      input.setAttribute("id", `hobby-${index + 1}`);
      input.setAttribute("type", "checkbox");
      p.appendChild(label);
      p.appendChild(input);
      div.appendChild(p);
    });
    Exe1.appendChild(div);
  });






  // 练习2:
  // 实现一个倒计时功能。

  // 界面首先有一个文本输入框，允许按照特定的格式YYYY-MM-DD输入年月日；
  // 输入框旁有一个按钮，点击按钮后，计算当前距离输入的日期的00:00:00有多少时间差
  // 在页面中显示，距离YYYY年MM月DD日还有XX天XX小时XX分XX秒
  // 每一秒钟更新倒计时上显示的数
  // 如果时差为0，则倒计时停止

  var Btn4 = $(".Btn4");
  var timer, minValue;

  addClickEvent(Btn4, () => {
    var Inp4 = $(".Inp4");
    var initTime = new Date(
      `${Inp4.value
        .split("-")
        .map(cv => parseInt(cv))
        .join("-")}`
    ).getTime();
    // 初始显示
    timeOperate(initTime - Date.now());
    // 后续显示
    refreshTime(initTime);
  });

  function refreshTime(futureTime) {
    clearInterval(timer);

    timer = setInterval(() => {
      minValue = futureTime - Date.now();
      if (minValue <= 0) {
        clearInterval(timer);
        $(".showPlace").innerHTML = "";
      } else {
        timeOperate(minValue);
      }
    }, 1000);
  }

  function timeOperate(minValue) {
    let day = parseInt(minValue / 1000 / 60 / 60 / 24),
      hour = minValue / 1000 / 60 / 60,
      minute = minValue / 1000 / 60;
    second = minValue / 1000;
    let obj = {
      day: day,
      hour: parseInt(hour - day * 24),
      minute: parseInt(minute - parseInt(hour) * 60),
      second: parseInt(second - parseInt(minute) * 60)
    };
    $(".showPlace").innerHTML = `${obj.day} ${obj.hour} ${obj.minute} ${
      obj.second
    }`;
  }






  // 练习3:
  // 实现一个轮播图的功能。

  // 图片数量及URL均在HTML中写好
  // 可以配置轮播的顺序（正序、逆序）、是否循环、间隔时长
  // 图片切换的动画要流畅
  // 在轮播图下方自动生成对应图片的小点，点击小点，轮播图自动动画切换到对应的图片

  var Exe3Run = $(".Exe3_Run"),
    Exe3_Tab = $(".Exe3_Tab"),
    Exe3_Tab_List = Exe3_Tab.querySelectorAll("li"),
    tag = 0,
    timer = null,
    clickFlag = true,
    activeTag = 0,
    originPos = "0",
    direct = "-";

  // 初始延迟显示
  AnimationRun(10, false, true);

  // 轮播动画
  function AnimationRun(speed, direction, loop) {
    // 清除缓存
    clearInterval(timer);
    // 控制方向
    direct = direction ? "-" : "";
    // 起始位置 - 仅初始化时执行1次
    originPos = direction ? "0" : "-2000";

    if (clickFlag) {
      Exe3Run.style.setProperty("left", `${originPos}px`);
      // 圆点倒序排列
      Exe3_Tab_List = direction
        ? Array.from(Exe3_Tab_List).reverse()
        : Exe3_Tab_List;
      Exe3_Tab_List[activeTag].classList.add("active");
      clickFlag = false;
    }

    // console.log('tag: ', tag);

    // 控制速度
    timer = setInterval(() => {
      tag += speed;
      Exe3Run.style.setProperty(
        "left",
        `${parseInt(originPos) + parseInt(`${direct}${tag}`)}px`
      );

      // 控制终末位置回归
      if (tag === 2000) {
        Exe3Run.style.setProperty("left", `0px`);
        tag = 0;
        // 控制循环
        if (!loop) {
          clearInterval(timer);
          return;
        }
      }

      // 控制停顿
      if (tag % 400 === 0) {
        activeTag = tag / 400;
        // 控制圆点的显示
        cleanClass(Exe3_Tab_List, "active");
        Exe3_Tab_List[activeTag].classList.add("active");

        clearInterval(timer);
        setTimeout(function() {
          AnimationRun(speed, direction, loop);
        }, 1000);
      }
    }, 10);
  }

  // 遍历消除特定类
  function cleanClass(list, styleClass) {
    list.forEach(cv => cv.classList.remove(styleClass));
  }

  // 点击事件
  addClickEvent(Exe3_Tab, e => {
    var targetEle = e.target;
    var index = targetEle.getAttribute("index");
    cleanClass(Exe3_Tab_List, "active");
    targetEle.classList.add("active");

    if (!direct) {
      tag = parseInt(index) * 400;
    } else {
      tag = 1600 - parseInt(index) * 400;
    }
    if (tag >= 2000) {
      tag = 0;
    }
    Exe3Run.style.setProperty(
      "left",
      `${parseInt(originPos) + parseInt(`${direct}${tag}`)}px`
    );
  });







  // 练习4：
  // 实现一个类似百度搜索框的输入提示的功能，使用Ajax来获取提示数据;

  // 要求如下：
  // 允许使用鼠标点击选中提示栏中的某个选项
  // 允许使用键盘上下键来选中提示栏中的某个选项，回车确认选中
  // 选中后，提示内容变更到输入框中

  var Exe4_Inp = $(".Exe4_input"),
    Exe4_List = $(".Exe4_List"),
    li_List = Exe4_List.querySelectorAll("li");
  count = 0;

  addEvent(Exe4_Inp, "input", e => {
    // 控制显示隐藏
    if (!e.target.value) Exe4_List.classList.add("Exe4_list_hidden");
    Exe4_List.classList.remove("Exe4_list_hidden");
  });

  window.addEventListener("keydown", e => {
    // 当前聚焦元素非 Exe4_Inp 则静默
    if (document.activeElement != Exe4_Inp) return;
    switch (e.keyCode) {
      // 向上键
      case 38:
        count--;
        if (count === -1) count = 4;
        break;
      // 向下键
      case 40:
        count++;
        if (count === 5) count = 0;
        break;
      // 回车键
      case 13:
        Exe4_Inp.value = li_List[count - 1].innerHTML;
        Exe4_List.classList.add("Exe4_list_hidden");
        count = 0;
        break;
      default:
        break;
    }

    cleanClass(li_List, "Exe4_list_active");

    if (count) {
      li_List[count - 1].classList.add("Exe4_list_active");
    }
  });

  Exe4_List.addEventListener("mousemove", e => {
    // 当前聚焦元素非 Exe4_Inp 则静默
    if (document.activeElement != Exe4_Inp) return;
    count = +e.target.getAttribute("index");

    // 重复操作
    cleanClass(li_List, "Exe4_list_active");

    if (count) {
      li_List[count - 1].classList.add("Exe4_list_active");
    }
  });

  Exe4_List.addEventListener("click", e => {
    count = +e.target.getAttribute("index");

    cleanClass(li_List, "Exe4_list_active");

    Exe4_Inp.value = li_List[count - 1].innerHTML;
    Exe4_List.classList.add("Exe4_list_hidden");
    count = 0;
  });

  // 遍历消除特定类
  function cleanClass(list, styleClass) {
    list.forEach(cv => cv.classList.remove(styleClass));
  }





  // 练习5：
  // 实现一个可拖拽交互的界面

  // 如示例图，左右两侧各有一个容器，里面的选项可以通过拖拽来左右移动
  // 被选择拖拽的容器在拖拽过程后，在原容器中消失，跟随鼠标移动
  // 注意拖拽释放后，要添加到准确的位置
  // 拖拽到什么位置认为是可以添加到新容器的规则自己定
  // 注意交互中良好的用户体验和使用引导

  const Ex5_Ul1 = $('.Exe5_son1'),
        Ex5_Ul2 = $('.Exe5_son2'),
        Exe5_Li = Ex5_Ul2.querySelectorAll('li')[0];
 
  // 获取元素计算属性
  const computedStyle = (target) => {
    return document.defaultView.getComputedStyle(target, null)
  };

  // 获取元素 content 宽高
  const elementSize = (element) => {
    return {
      height: parseInt(computedStyle(element).height),
      width: parseInt(computedStyle(element).width)
    }
  }

  // // border padding content
  // console.log(Ex5_Ul1.offsetHeight);
  // console.log(Ex5_Ul2.offsetWidth);

  // // padding content
  // console.log(Ex5_Ul1.clientHeight);
  // console.log(Ex5_Ul2.clientWidth);

  // // content
  // console.log(parseInt(computedStyle(Ex5_Ul1).height));
  // console.log(parseInt(computedStyle(Ex5_Ul2).width));

  // 获取 ul li 大小
  const Exe5_Ul_size = elementSize(Ex5_Ul1);
  const Exe5_li_size = elementSize(Exe5_Li);
  
  // 获取 ul1 ul2 偏移量
  const Ul1_Pos = getBoundingClientRect(Ex5_Ul1);
  const Ul2_Pos = getBoundingClientRect(Ex5_Ul2);

  // 获取 ul1 ul2 所属区域边界
  const Ul1_Area = {
    leftPoint: Ul1_Pos.left,
    topPoint: Ul1_Pos.top,
    rightPoint: Ul1_Pos.left + Exe5_Ul_size.width,
    bottomPoint: Ul1_Pos.top + Exe5_Ul_size.height
  }
  const Ul2_Area = {
    leftPoint: Ul2_Pos.left,
    topPoint: Ul2_Pos.top,
    rightPoint: Ul2_Pos.left + Exe5_Ul_size.width,
    bottomPoint: Ul2_Pos.top + Exe5_Ul_size.height
  }
  
  

  let origin_Pos = {},
      target = null,
      differValueObbj = {};

  const handleMouseEvent = (event) => {
    // 取消默认文字拖拽事件
    event.preventDefault();
    event.stopPropagation();

    const evenType = event.type,  
          eventTarget = event.target;

    if(evenType === 'mousedown'){
      // 限定范围下的 li
      if(/Exe5/.test(eventTarget.parentNode.getAttribute('class')) && eventTarget.nodeName.toLowerCase() === 'li'){
        // 存储当前 target
        target = eventTarget;
        // 获取目标元素偏移量并存储
        origin_Pos = getBoundingClientRect(eventTarget);
        // 鼠标点击位置 与 目标元素边界距离
        differValueObbj.left = event.pageX - origin_Pos.left;
        differValueObbj.top = event.pageY - origin_Pos.top;
      }
    } else if (evenType === 'mousemove') {
      // 确保移动对象为点击对象
      if(eventTarget == target){
        // 让目标对象脱离文本流
        eventTarget.style.position = 'absolute';
        // 赋值跟随光标位置移动
        eventTarget.style.left = event.pageX - differValueObbj.left + 'px';
        eventTarget.style.top = event.pageY - differValueObbj.top + 'px';
      }
    } else if (evenType === 'mouseup'){
      // 判断是否进入对方范围
      if(/son1/.test(eventTarget.parentNode.getAttribute('class'))){
        let inX = event.pageX > Ul2_Area.leftPoint && event.pageX < Ul2_Area.rightPoint;
        let inY = event.pageY > Ul2_Area.topPoint && event.pageX < Ul2_Area.bottomPoint;
        if(inX && inY) {
          // 回归文档流
          eventTarget.style.position = '';
          Ex5_Ul2.appendChild(eventTarget);
        }
      }
      // 判断是否进入对方范围
      if(/son2/.test(eventTarget.parentNode.getAttribute('class'))){
        let inX = event.pageX > Ul1_Area.leftPoint && event.pageX < Ul1_Area.rightPoint;
        let inY = event.pageY > Ul1_Area.topPoint && event.pageX < Ul1_Area.bottomPoint;
        if(inX && inY) {
          // 回归文档流
          eventTarget.style.position = '';
          Ex5_Ul1.appendChild(eventTarget);
        }
      }
      // 其他情况回归原本位置
      eventTarget.style.top = origin_Pos.top + 'px';
      eventTarget.style.left = origin_Pos.left + 'px';
      eventTarget.style.position = '';
      // 数据还原
      target = null;
      origin_Pos = {};
      differValueObbj = {};
    }
  }

  addEvent(document.documentElement, 'mousemove', handleMouseEvent);
  addEvent(document.documentElement, 'mousedown', handleMouseEvent);
  addEvent(document.documentElement, 'mouseup', handleMouseEvent);

};
