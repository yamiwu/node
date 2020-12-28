// var a = 5;
// function woot() {
//   console.log('a', a, a == 5);
//   let a = 6;
// }

// // woot();

// var obj = {
//   a: 'aa',
//   b: 'bb',
// };

// Object.prototype.c = 'c';
// console.log(Object.values(obj));

// for (var i in obj) {
//   if (obj.hasOwnProperty(i)) {
//     console.log(i);
//   }
// }

function  onChangeValue(){
  let mycount=0;
  console.log("onChangeValue1方法");

  let myBright = setInterval(function(){
    let ledbright = {
      type: 7,
      content: _self.value1
    };
    websocket.send(JSON.stringify(ledbright));
    console.log("定时发送亮度",_self.value1);

  }, 500);

  if(mycount === 0){
    $("#mybf").mouseup(function(){
      clearInterval(myBrightmyBright);
      console.log("清除定时器");
      let ledbright = {
          type: 7,
          content: _self.value1
      };
      websocket.send(JSON.stringify(ledbright));
      console.log("鼠标弹起发送亮度",_self.value1);
    });
  }

  mycount++;
}

onChangeValue();
