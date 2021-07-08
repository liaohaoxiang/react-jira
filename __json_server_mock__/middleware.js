module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "neo" && req.body.password === "123") {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
    }
    return res.status(400).json({
      message: "用户名或者密码错误",
    });
  }
  next();
};

var num = 5;
for (var i = 1; i <= num; i++) {
  for (a = 1; a <= i - 1; a++) {
    document.write("&nbsp;");
  }
  for (var j = 1; j <= 2 * (num - i) + 1; j++) {
    if (j === 1 || j === 2 * (num - i) + 1) {
      document.write("*");
    } else {
      document.write("&nbsp;");
    }
  }
  document.write("<br/>");
}

// function output(num){
//   for (var row = 0; row < num; row ++){
//     console.loh(row)
//       for(var startSpace = 0; startSpace < row; startSpace++){
//           document.write("&nbsp;")
//       }
//       for(var star = 0; star <= 2 * num; star++){
//         if(star === 0 || star === 2 * (num - row) -2){
//           document.write("*")
//         }else {
//             document.write("&nbsp;")
//         }
//       }
//     document.write("<br/>")
//   }
// }
// output(5)
