const consoleDebug = (text) => {
    console.log(`\x1b[36m%s\x1b[0m `,`[j-post-serverside]] ${text}`);
}
consoleDebug('Started.')


const express = require('express')
const app = express()
var mysql = require('mysql');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const JWT = require('jsonwebtoken');


app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "j_post"
});

con.connect(function(err) {
  if (err) throw err;
  consoleDebug("Connected MYSQL server.")
});

app.get('/', function (req, res) {
  res.send('hello cutie <3 anvozz')
})

app.post('/login', function (req, res) {
    if(req.body.email != null && req.body.password != null){
        var sql = `SELECT * FROM users WHERE email = "${req.body.email}" AND password = "${req.body.password}"`;
        con.query(sql, function (err, result) {
        if (err) throw err;
            var data = {};
            result.forEach(element => {
                data = {
                    "email" : element.email,
                    "firstname" : element.user_firstname,
                    "lastname" : element.user_lastname,
                    "role" : element.user_role,
                    "status" : element.user_status,
                    "userid" : element.userid
                }
            });
        if (data.email) {
            let token = JWT.sign(data, 'usersdata', {
                expiresIn: '7d'
              });
            res.send({
                token: token,
                data: data
            })
        }
  });
    }else{
        res.send(`{status : error}`)
    }
})

app.post('/research/post', function (req, res) {
    if(req.body.userid != null && req.body.data.research_focus != null){
        var d = new Date();
        var n = d.getFullYear()
        var reg = n + 543
        var sql = `INSERT INTO research_list (userid, research_head, research_history, research_goal, research_tester, research_tool, research_how, research_result, research_abstract, research_focus_id, research_year, research_abstract_thai_keyword, research_abstract_eng, research_abstract_eng_keyword) VALUES (${req.body.userid}, '${req.body.data.research_head}','${req.body.data.research_history}','${req.body.data.research_goal}','${req.body.data.research_tester}','${req.body.data.research_tool}','${req.body.data.research_how}','${req.body.data.research_result}','${req.body.data.research_abstract}',${req.body.data.research_focus},'${reg}','${req.body.data.research_abstract_thai_keyword}','${req.body.data.research_abstract_eng}','${req.body.data.research_abstract_eng_keyword}')`;
        con.query(sql, function (err) {
        if (err) throw err;
        res.send({status : "success" , text : "เพิ่มข้อมูลเรียบร้อยแล้ว"})
  });
    }else{
        res.send({status : "error" , text : "คุณไม่ได้ Login หรือไม่ได้เลือก ระดับชั้น"})
    }
})

app.post('/research/getusersresearchlist', function (req, res) {
    if(req.body.userid != null){
        var sql = `SELECT * FROM research_list JOIN research_focus ON research_list.research_focus_id = research_focus.research_focus_id WHERE userid = ${req.body.userid}`;
        con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result)
    
         });
    }
})

app.post('/research/deleteresearch', function (req, res) {
    if(req.body.userid != null && req.body.index !=null){
        var sql = `DELETE FROM research_list WHERE research_id = ${req.body.index} AND userid = ${req.body.userid}`;
        con.query(sql, function (err) {
        if (err) throw err;
        res.send({status : "success" , text : "ลบข้อมูลสำเร็จ"})
         });
    }else{
        res.send({status : "error" , text : "ลบผลงานวิจัยไม่สำเร็จ"})
    }
})

app.post('/research/geteditresearch', function (req, res) {
    if(req.body.userid != null && req.body.research_id != null){
        var sql = `SELECT * FROM research_list WHERE userid = ${req.body.userid} AND research_id = ${req.body.research_id}`;
        con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result)
    
         });
    }
})

app.post('/home/getresearchdataview', function (req, res) {
    if(req.body.research_id != null){
        var sql = `SELECT * FROM research_list WHERE research_id = ${req.body.research_id}`;
        con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result)
    
         });
    }
})

app.post('/research/updateresearch', function (req, res) {
    if(req.body.userid != null && req.body.research_id != null){
        var sql = `UPDATE research_list SET research_head = '${req.body.data.research_head}', research_history = '${req.body.data.research_history}' ,research_goal = '${req.body.data.research_goal}',research_tester = '${req.body.data.research_tester}',research_tool = '${req.body.data.research_tool}',research_how = '${req.body.data.research_how}',research_result = '${req.body.data.research_result}',research_abstract = '${req.body.data.research_abstract}',research_focus_id = ${req.body.data.research_focus} ,research_abstract_eng_keyword = '${req.body.data.research_abstract_eng_keyword}',research_abstract_eng = '${req.body.data.research_abstract_eng}',research_abstract_thai_keyword = '${req.body.data.research_abstract_thai_keyword}'  WHERE userid = ${req.body.userid} AND research_id = ${req.body.research_id}`;
        con.query(sql, function (err) {
        if (err) throw err;
        res.send({status : "success" , text : "อัพเดทงานวิจัยสำเร็จ"})
        
         });
    }else{
        res.send({status : "error" , text : "อัพเดทผลงานวิจัยไม่สำเร็จ"})
    }
})

app.get('/home/getResearchdata', function (req, res) {
    var sql = `SELECT research_list.research_id AS research_id , research_list.research_head AS research_head , research_list.research_abstract AS research_abstract, research_list.research_year AS research_research_year , users.user_firstname AS user_firstname , users.user_lastname AS user_lastname , research_focus.research_focus_name AS research_focus_name FROM research_list JOIN users ON research_list.userid = users.userid JOIN research_focus ON research_list.research_focus_id = research_focus.research_focus_id `;
    con.query(sql, function (err,result) {
    if (err) throw err;
    res.send(result)
        
    });
   
})

app.post('/mainadmin/deleteresearch', function (req, res) {
    if(req.body.index !=null){
        var sql = `DELETE FROM research_list WHERE research_id = ${req.body.index}`;
        con.query(sql, function (err) {
        if (err) throw err;
        res.send({status : "success" , text : "ลบข้อมูลสำเร็จ"})
         });
    }else{
        res.send({status : "error" , text : "ลบผลงานวิจัยไม่สำเร็จ"})
    }
})


app.post('/user/valideemailcheck', function (req, res) {
  if(req.body.email != null){
      var sql = `SELECT * FROM users WHERE email = '${req.body.email}'`;
      con.query(sql, function (err, result) {
      if (err) throw err;
      var data = {};
            result.forEach(element => {
                data = {
                    "email" : element.email,
                    "firstname" : element.user_firstname,
                    "lastname" : element.user_lastname,
                    "role" : element.user_role,
                    "status" : element.user_status,
                    "userid" : element.userid
                }
            });
          console.log(data.email)
       if(!data.email){
        res.send({status : "success" , text : "Not valid" , state : true})
       }else{
        res.send({status : "error" , text : "Valid" , state : false})
       }

       });
  }else{
      res.send({status : "error" , text : "error"})
  }
})


app.post('/user/addusersdata', function (req, res) {
  if(req.body.data !=null && req.body.data.email !=null && req.body.data.password !=null && req.body.data.firstname !=null && req.body.data.lastname != null){
      var sql = `INSERT INTO users (email,password,user_firstname,user_lastname,user_role) VALUES ('${req.body.data.email}','${req.body.data.password}','${req.body.data.firstname}','${req.body.data.lastname}',1)`;
      con.query(sql, function (err) {
      if (err) throw err;
      res.send({status : "success" , text : "เพิ่มข้อมูลผู้ใช้สำเร็จ"})
       });
  }else{
      res.send({status : "error" , text : "เพิ่มข้อมูลผู้ใช้ไม่สำเร็จ"})
  }
})

app.get('/user/getusersdata', function (req, res) {
  var sql = `SELECT userid,email,password,user_firstname,user_lastname FROM users`;
  con.query(sql, function (err,result) {
  if (err) throw err;
  res.send(result)
      
  });
 
})

app.post('/user/deleteuser', function (req, res) {
  if(req.body.userid !=null){
      var sql = `DELETE FROM users WHERE userid = ${req.body.userid}`;
      con.query(sql, function (err) {
      if (err) throw err;
      res.send({status : "success" , text : "ลบข้อมูลสำเร็จ"})
       });
  }else{
      res.send({status : "error" , text : "ลบผลงานผู้ใช้งานไม่สำเร็จ"})
  }
})

app.post('/user/edituser', function (req, res) {
  if(req.body.data !=null){
      var sql = `UPDATE users SET email = '${req.body.data.email}' , password = '${req.body.data.password}' , user_firstname = '${req.body.data.user_firstname}' , user_lastname = '${req.body.data.user_lastname}' WHERE userid = ${req.body.data.userid}`;
      con.query(sql, function (err) {
      if (err) throw err;
      res.send({status : "success" , text : "แก้ไขข้อมูลผู้ใช้สำเร็จ"})
       });
  }else{
      res.send({status : "error" , text : "แก้ไขข้อมูลผู้ใช้ไม่สำเร็จ"})
  }
})

app.get('/user/getresearch_focus', function (req, res) {
  var sql = `SELECT * FROM research_focus`;
  con.query(sql, function (err,result) {
  if (err) throw err;
  res.send(result)
      
  });
 
})



app.listen(1234)