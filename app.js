
var express = require('express');
var path = require('path');
var fs =require('fs');
const { stringify } = require('querystring');
var app = express();
var loginbool = new Boolean(false);
const values=[];
const booksread=[];
const booksNames=['lord of the flies','the grapes of wrath','leaves of grass','the sun and her flowers','dune','to kill a mocking bird'];
 const searchvalues=[];
 
 var session = require('express-session');
const { SSL_OP_NETSCAPE_CA_DN_BUG } = require('constants');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: 'BOOKS',
	resave: false,
  saveUninitialized: true,
  cookie:{secure:true}
}));



app.get('/', function(req,res){
  res.render('login',{err:''})
 });









app.get('/dune', function(req,res){
 res.render('dune')
});


app.get('/fiction', function(req,res){
  res.render('fiction')
 });

 app.get('/flies', function(req,res){
  res.render('flies')
 });

 app.get('/grapes', function(req,res){
  res.render('grapes')
 });
 app.get('/home', function(req,res){
  
  res.render('home')
 });
 app.get('/index', function(req,res){
  res.render('index')
 });

 app.get('/leaves', function(req,res){
  res.render('leaves')
 });

 app.get('/login', function(req,res){
  res.render('login',{err:''})
  
 });

 app.get('/mockingbird', function(req,res){
  res.render('mockingbird')
 });

 app.get('/novel', function(req,res){
  res.render('novel')
 });

 app.get('/poetry', function(req,res){
  res.render('poetry')
 });

 app.get('/readlist', function(req,res){

   for(var i=0;i<values.length;i++){
    if(values[i].usernames==ssn.session_username){
      res.render('readlist',{err:values[i].readlists});
      break;
    }
     
   }
  
 });

 app.get('/searchresults', function(req,res){
  res.render('searchresults')
 });
 app.get('/sun', function(req,res){
  res.render('sun')
 });

 


 app.get('/register',function(req,res){
  res.render('registration',{err:''})
 });

 app.get('/registration',function(req,res){
  res.render('registration',{err:''})
 });

 


 app.post('/register',function(req,res){
  var user=req.body.username;
  var pass=req.body.password;
  var readlists;
  var bool = new Boolean(false);
  
  if(user.length==0||pass.length==0){

    res.render('registration',{err:'You have to enter a username and a password'})
  }else{
    for(var i=0;i<values.length;i++){
      //if((JSON.stringify(values[i].usernames).toLowerCase==JSON.stringify(user).toLowerCase))
      if(values[i].usernames==user){
        console.log(values[i].usernames)
        bool=true;
      }
    }
    if(bool==true){
      console.log("Sorry the username already exists")
      res.render('registration',{err:'Sorry The Username Already Exists'})
    
    }else{
      values.push(
        {
        usernames : user,
        passwords : pass,
        readlists:  []
        
      })
      
      console.log(values);
      var json = JSON.stringify(values);
      fs.writeFileSync("users.json",json);
      
      console.log(user, user.length, pass, pass.length)
      res.redirect('/login')
    }
  }

 });

app.post('/login',function(req,res){
     ssn=req.session;
   var user=req.body.username;
  var pass=req.body.password;
  
  for(var i=0;i<values.length;i++){
   
    if(values[i].usernames==user && values[i].passwords==pass){
      loginbool=true;
      var readlist=values[i].readlists
      break;
    }
  }

  if(loginbool==true){
    ssn.session_username=user;
    ssn.session_readlist=readlist;
    res.redirect('/home');
    loginbool=false;
  }else{
    res.render('login',{err:'The Username or Password is Incorrect'})
  }
});



app.post('/',function(req,res){
  ssn=req.session;
  var user=req.body.username;
  var pass=req.body.password;
  for(var i=0;i<values.length;i++){
   
    if(values[i].usernames==user && values[i].passwords==pass){
      var readlist=values[i].readlists
      loginbool=true;
     
    }
  }

  if(loginbool==true){
    ssn.session_username=user;
    ssn.session_readlist=readlist;
    res.redirect('/home');
    loginbool=false;
  }else{
    res.render('login',{err:'The Username or Password is Incorrect'})
  }
});


app.post('/search',function(req,res){
  while(searchvalues.length > 0) {
    searchvalues.pop();
}
  var searchitem=req.body.Search;
  //console.log(searchitem)
  for(var i=0;i<booksNames.length;i++){
    console.log(String(searchitem).toLowerCase()+"this is the text");
    if(booksNames[i].includes(String(searchitem).toLowerCase())){
    
     // res.render('searchresults',{err:"  "+booksNames[i]});
      searchvalues.push(booksNames[i]);
      console.log(booksNames[i]);
    }

    
  }

  if(searchvalues.length==0){

    res.render('searchresults',{err:'This book is not found'})
  }else{

    res.render('searchresults',{err:searchvalues})
  }

});


app.post('/addDune',function(req,res){

  var exists = new Boolean(false);
  for(var i=0;i<values.length;i++){
    if(values[i].usernames==ssn.session_username){

      console.log(ssn.session_username+"i am here");
   //   values[i].readlists=values[i].readlists+","+"Dune";
      
       
          console.log(values[i].readlists.length)
          for(var j=0;j<=values[i].readlists.length;j++){
            if(values[i].readlists[j]=="dune"){
              exists=true;
              break;
            }
          }

          if(exists==true){
            console.log("The book already exists")
            res.render('readlist',{err:'The book already exists'})
          }
          else{
            values[i].readlists.push("dune")

            console.log(values);
            var json = JSON.stringify(values);
            fs.writeFileSync("users.json",json);
            res.render('readlist',{err:values[i].readlists});
          }

          exists=false;

    }
  }

});


app.post('/addMocking',function(req,res){

  var exists = new Boolean(false);
  for(var i=0;i<values.length;i++){
    if(values[i].usernames==ssn.session_username){

      console.log(ssn.session_username+"i am here");

          console.log(values[i].readlists.length)
          for(var j=0;j<=values[i].readlists.length;j++){
            if(values[i].readlists[j]=="to kill a mocking bird"){
              exists=true;
              break;
            }
          }

          if(exists==true){
            console.log("The book already exists")
            res.render('readlist',{err:'The book already exists'})
          }
          else{
            values[i].readlists.push("to kill a mocking bird")

            console.log(values);
            var json = JSON.stringify(values);
            fs.writeFileSync("users.json",json);
            res.render('readlist',{err:values[i].readlists});
          }

          exists=false;
  
    }
  }
});

app.post('/addLeaves',function(req,res){

      var exists = new Boolean(false);
      for(var i=0;i<values.length;i++){
        if(values[i].usernames==ssn.session_username){
    
          console.log(ssn.session_username+"i am here");
       //   values[i].readlists=values[i].readlists+","+"Dune";
          
           
              console.log(values[i].readlists.length)
              for(var j=0;j<=values[i].readlists.length;j++){
                if(values[i].readlists[j]=="leaves of grass"){
                  exists=true;
                  break;
                }
              }
    
              if(exists==true){
                console.log("The book already exists")
                res.render('readlist',{err:'The book already exists'})
              }
              else{
                values[i].readlists.push("leaves of grass")
    
                console.log(values);
                var json = JSON.stringify(values);
                fs.writeFileSync("users.json",json);
                res.render('readlist',{err:values[i].readlists});
              }
    
              exists=false;

        }
      }
      
});


app.post('/addSun',function(req,res){
 
  var exists = new Boolean(false);
  for(var i=0;i<values.length;i++){
    if(values[i].usernames==ssn.session_username){

      console.log(ssn.session_username+"i am here");
   //   values[i].readlists=values[i].readlists+","+"Dune";
      
       
          console.log(values[i].readlists.length)
          for(var j=0;j<=values[i].readlists.length;j++){
            if(values[i].readlists[j]=="the sun and her flower"){
              exists=true;
              break;
            }
          }

          if(exists==true){
            console.log("The book already exists")
            res.render('readlist',{err:'The book already exists'})
          }
          else{
            values[i].readlists.push("the sun and her flowers")

            console.log(values);
            var json = JSON.stringify(values);
            fs.writeFileSync("users.json",json);
            res.render('readlist',{err:values[i].readlists});
          }

          exists=false;

    }
  }
});



app.post('/addFlies',function(req,res){
  
  var exists = new Boolean(false);
  for(var i=0;i<values.length;i++){
    if(values[i].usernames==ssn.session_username){

      console.log(ssn.session_username+"i am here");
   //   values[i].readlists=values[i].readlists+","+"Dune";
      
       
          console.log(values[i].readlists.length)
          for(var j=0;j<=values[i].readlists.length;j++){
            if(values[i].readlists[j]=="lord of the flies"){
              exists=true;
              break;
            }
          }

          if(exists==true){
            console.log("The book already exists")
            res.render('readlist',{err:'The book already exists'})
          }
          else{
            values[i].readlists.push("lord of the flies")

            console.log(values);
            var json = JSON.stringify(values);
            fs.writeFileSync("users.json",json);
            res.render('readlist',{err:values[i].readlists});
          }

          exists=false;
    }
  }
});


app.post('/addGrapes',function(req,res){
 
  var exists = new Boolean(false);
  for(var i=0;i<values.length;i++){
    if(values[i].usernames==ssn.session_username){

      console.log(ssn.session_username+"i am here");
   //   values[i].readlists=values[i].readlists+","+"Dune";
      
       
          console.log(values[i].readlists.length)
          for(var j=0;j<=values[i].readlists.length;j++){
            if(values[i].readlists[j]=="the grapes of wrath"){
              exists=true;
              break;
            }
          }

          if(exists==true){
            console.log("The book already exists")
            res.render('readlist',{err:'The book already exists'})
          }
          else{
            values[i].readlists.push("the grapes of wrath")

            console.log(values);
            var json = JSON.stringify(values);
            fs.writeFileSync("users.json",json);
            res.render('readlist',{err:values[i].readlists});
          }
          exists=false;       
    }
  }
     // values[i].readlists.push("the grapes of wrath")
});

if(process.env.PORT){
  app.listen(process.env.PORT,function() {console.log("The server has started")});
}else{
  app.listen(3000,function(){console.log("The server has not been started")})
}

