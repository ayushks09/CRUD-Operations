//Connection with Database
let mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'crudapp'
});

connection.connect((err) =>{
    if(err){
      console.error('error connecting:' +err.stack);
      return;
    }
    console.log("Connection Established!!!")
})

module.exports = connection 