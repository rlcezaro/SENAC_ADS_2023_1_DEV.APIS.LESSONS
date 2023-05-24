var mysql = require("mysql");

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "loja2",
});

conn.connect(function (erro) {
  if (!erro) {
    sql = "SELECT * FROM produto ORDER BY nome";
    conn.query(sql, function (err, result, fields) {
      if (!err) {
        console.log(result);
      } else {
        console.log(err);
      }
    });
  }
});
