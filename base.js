var a = 5;
function woot() {
  console.log('a', a, a == 5);
  let a = 6;
}

// woot();

var obj = {
  a: 'aa',
  b: 'bb',
};

Object.prototype.c = 'c';
console.log(Object.values(obj));

for (var i in obj) {
  if (obj.hasOwnProperty(i)) {
    console.log(i);
  }
}
