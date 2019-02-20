// 练习1:
// 第一阶段
// 在页面中，有一个单行输入框，一个按钮，输入框中用来输入用户的兴趣爱好，允许用户用半角逗号来作为不同爱好的分隔。
// 当点击按钮时，把用户输入的兴趣爱好，按照上面所说的分隔符分开后保存到一个数组，过滤掉空的、重复的爱好，在按钮下方创建一个段落显示处理后的爱好。
// 思路: input querySelector split trim 去重 显示

var Btn1 = $('.Btn1');

addClickEvent(Btn1, () => {
  var Inp1 = $('.Inp1');
  $('.showPlace').innerHTML = Array.from(new Set(Inp1.value.split(','))).join(' ');
})

// 第二阶段
// 单行变成多行输入框，一个按钮，输入框中用来输入用户的兴趣爱好，允许用户用换行、空格（全角/半角）、逗号（全角/半角）、顿号、分号来作为不同爱好的分隔。
// 当点击按钮时的行为同上
// 思路：textarea querySelector replace split trim 去重 显示

var Btn1 = $('.Btn2');

addClickEvent(Btn1, () => {
  var Inp2 = $('.Inp2');
  $('.showPlace').innerHTML = Array.from(new Set(Inp2.value.split(/,|\n|，|;|；|\s/g).filter(cv => cv))).join(' ');
})

// 第三阶段
// 用户输入的爱好数量不能超过10个，也不能什么都不输入。当发生异常时，在按钮上方显示一段红色的错误提示文字，并且不继续执行后面的行为；当输入正确时，提示文字消失。
// 同时，当点击按钮时，不再是输出到一个段落，而是每一个爱好输出成为一个checkbox，爱好内容作为checkbox的label。
// 思路：键盘输入事件 内容为空不算+分隔号之间为空不算 类控制提示文字显示 组成的

// 练习2:
// 实现一个倒计时功能。

// 界面首先有一个文本输入框，允许按照特定的格式YYYY-MM-DD输入年月日；
// 输入框旁有一个按钮，点击按钮后，计算当前距离输入的日期的00:00:00有多少时间差
// 在页面中显示，距离YYYY年MM月DD日还有XX天XX小时XX分XX秒
// 每一秒钟更新倒计时上显示的数
// 如果时差为0，则倒计时停止

var Btn4 = $('.Btn4');

addClickEvent(Btn4, () => {
  var Inp4 = $('.Inp4');
  var initTime = new Date(`${Inp4.value.split('-').map(cv => parseInt(cv)).join('-')}`).getTime();

  // 初始显示
  timeOperate(initTime - Date.now());
  // 后续显示
  refreshTime(initTime);
})

function refreshTime(futureTime){
  let minValue;

  clearInterval(timer);
  
  var timer = setInterval(() => {
    minValue = futureTime - Date.now();
    if(minValue <= 0){
      $('.showPlace').innerHTML = '';
      clearInterval(timer);
    }else{
      timeOperate(minValue);
    }
  }, 1000);
}
function timeOperate(minValue){
  let day = parseInt(minValue / 1000 / 60 / 60 / 24 ),
      hour = minValue / 1000 / 60 / 60,
      minute = minValue / 1000 / 60;
      second = minValue  / 1000;

  let obj ={
    day: day,
    hour: parseInt(hour - day * 24),
    minute: parseInt(minute - parseInt(hour) * 60),
    second: parseInt(second - parseInt(minute) * 60),
  };

  $('.showPlace').innerHTML = `${obj.day} ${obj.hour} ${obj.minute} ${obj.second}`;
}


// 练习3:
// 实现一个轮播图的功能。
// 图片数量及URL均在HTML中写好
// 可以配置轮播的顺序（正序、逆序）、是否循环、间隔时长
// 图片切换的动画要流畅
// 在轮播图下方自动生成对应图片的小点，点击小点，轮播图自动动画切换到对应的图片

window.onload = function(){
  var Exe3Run = $('.Exe3_Run'), tag = 0;

  function AnimationRun(){
    let timer = null;
    console.log(window.getComputedStyle(Exe3Run).width);
    clearInterval(timer);
    timer = setInterval(() => {
      tag+=5;
      Exe3Run.style.setProperty('left', `-${tag}px`);
      if(tag === 2000){
        Exe3Run.style.setProperty('left', `0px`);
        tag = 0;
      }
      if(tag % 400 === 0){
        clearInterval(timer);
        setTimeout(function(){
          AnimationRun();
        },1000)
      }
    }, 10);
  }
  AnimationRun();
}

// 练习4：
// 实现一个类似百度搜索框的输入提示的功能，使用Ajax来获取提示数据。
// 要求如下：
// 允许使用鼠标点击选中提示栏中的某个选项
// 允许使用键盘上下键来选中提示栏中的某个选项，回车确认选中
// 选中后，提示内容变更到输入框中



// 练习5：
// 实现一个可拖拽交互的界面
// 如示例图，左右两侧各有一个容器，里面的选项可以通过拖拽来左右移动
// 被选择拖拽的容器在拖拽过程后，在原容器中消失，跟随鼠标移动
// 注意拖拽释放后，要添加到准确的位置
// 拖拽到什么位置认为是可以添加到新容器的规则自己定
// 注意交互中良好的用户体验和使用引导
