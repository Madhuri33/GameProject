const express= require('express');
const cors=require('cors');
const mysql =require('mysql');
const app = express();
app.use(cors());
const port= 5000;
const Select_Query ="select * from TestTable";
const Select_Files="select * from ImageTab";


const Connect =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'TestDb'
});

Connect.connect(err=>{
    if(err)
    return err;
})

app.listen(port , ()=>{
    console.log("Server Started on 5000");
});

app.get('/' ,(req ,res)=>{
    res.send("To see Data go to /users");
});

app.get('/users' ,(req ,res)=>{
    Connect.query(Select_Query ,(err ,result)=>{
        if(err)
        return res.send(err);
        else
        return res.json({
            data:result
        })
    })
});

app.get('/files' ,(req,res)=>{
    Connect.query(Select_Files,(err,result)=>{
        if(err)
        return res.send(err);
        else {
        var meraarray=[];
        result.forEach(element => {
            var buff= new Buffer(element.ImageBlob);
            var obj= {"ImageId":element.ImageId, "ImageBlob":buff.toString('utf8'), "Caption":element.Caption};
            meraarray.push(obj);
        });
        
        return res.json({
            data:meraarray
        })
       } 
    })
})

app.get("/users/add",(req ,res)=>{
    const { username ,age}=req.query;
    //console.log(ussername ,age);
    //res.send("Adding");
  const Inser_Query=`insert into TestTable(username ,age) values ('${username}' ,'${age}') `;
  Connect.query(Inser_Query ,(err, result)=>{
        if(err)
        return res.send(err);
        else
        return res.send("Data Inserted Successfully");
    });

});