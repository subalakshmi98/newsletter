const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req,res){
  res.sendFile(__dirname+"/signup.html");
});


app.post("/",function(req,res){
  const fname=req.body.firstname;
  const lname=req.body.lastname;
  const email=req.body.email;

  const data={
    members:[
      {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:fname,
        LNAME:lname
      }
      }
    ]
  };

const jsonData=JSON.stringify(data);
const url="https://us6.api.mailchimp.com/3.0/lists/7cfaa04c2d";
const options={
  method:"post",
  auth:"suba:50a67834082051330f9ccbd9f4d4c059-us6"
}
const request=https.request(url,options,function(response){
  if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html")
  }else{
    res.sendFile(__dirname+"/failure.html")
  }

  response.on("data",function(data){
    const x = JSON.parse(data);
    console.log(x);
  });
});
request.write(jsonData);
request.end();
});

app.post("/failure", function(req,res){
  res.redirect("/");
});

app.post("/success", function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT ,function(req,res){
  console.log("server is running");
});


//50a67834082051330f9ccbd9f4d4c059-us6

//7cfaa04c2d
