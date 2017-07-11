var times = ['2017/7/6 1:31:0', '2017/7/6 1:34:10', '2017/7/6 1:34:20', '2017/7/6 08:20']
var now = new Date().getTime()

times.forEach((v) => {
  let time = new Date(v).getTime() - now
  console.log(time)
  if (time >= 0 ) {
    setTimeout(() => {
      console.log('时间到了')
    }, time)
  }
})