var express = require('express'),
    mongodb = require('mongodb'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

var app = express();

// 中间件
app.use(bodyParser());
app.use(cookieParser());
app.use(session({ secret: 'my secret'}));
// 身份验证
app.use(function(req, res, next) {
  console.log('中间件===', req.session);
  if (req.session.loggedIn) {
    res.locals.authenticated = true;
    app.users.findOne({ _id: { $oid: req.session.loggedIn }}, function(err, doc) {
      if (err) {
        console.log('err insert', err);
        return next(err);
      }
      res.locals.me = doc;
      next()
    });
  } else {
    res.locals.authenticated = false;
    next();
  }
});

// 指定视图
app.set('view engine', 'jade');
app.set('view options', { layout: false });

// 默认路由
app.get('/', function(req, res) {
  console.log('默认路由')
  res.render('index');
});

// 注册路由
app.get('/signup', function(req, res) {
  console.log('注册路由')
  res.render('signup');
});

// 登录路由
app.get('/login', function(req, res) {
  console.log('登录路由')
  res.render('login');
});

// 处理注册路由
app.post('/signup', function(req, res, next) {
  app.users.insert(req.body.user, function(err, doc) {
    if (err) {
      return next(err);
    }
    res.redirect('/login/' + doc[0].email);
  });
});

// 注册成功之后跳转到登录页面并带邮箱参数
app.get('/login/:signupEmail', function(req, res) {
  console.log('login===', req.params);
  res.render('login', { signupEmail: req.params.signupEmail });
});


// 处理登录路由
app.post('/login', function(req, res) {
  app.users.findOne({ email: req.body.user.email, password: req.body.user.password }, function(err, doc) {
    if (err) {
      return next(err);
    }
    if(!doc) {
      return res.send('<p>User not found. Go back and try again</p>');
    }
    req.session.loggedIn = doc._id.toString();
    console.log('doc===', doc);
    res.redirect('/');
  });
});

// 处理登出路由
app.post('/logout', function(req, res) {
  // 清除session
  req.session.loggedIn = null;
  res.redirect('/');
});

//创建mongodb.Server 初始化服务器
var server = new mongodb.Server('127.0.0.1', 27017);

//告诉驱动器连接数据库'my-website'，不存在会创建
new mongodb.Db('my-website', server).open(function(err, client) {
  if (err) throw err;
  console.log('\033[96m + \033[39m connected to mongodb');
  app.users = new mongodb.Collection(client, 'users');
  client.ensureIndex('users', 'email', function(err) {
    if (err) {
      throw err;
    }
    client.ensureIndex('users', 'password', function(err) {
      if (err) {
        throw err;
      }
      console.log('\033[96m \033[39m app listening on *:3000')
    })
  })
  // 监听
  app.listen(3000, function() {
    console.log('\033[96m + \033[39m ensureIndex');
  });
});


