let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let Movie = require('./models/movie')
let _ = require('underscore');//替换对象的字段
// 以环境变量或者指定的端口
// 设置环境变量：在node命令行中 PORT=3000 node app.js
let port = process.env.PORT || 3333;
let app = express();
mongoose.connect('mongodb://localhost/imooc', { useNewUrlParser: true });

app.set('views', './views/pages');// 设置视图目录
app.set('view engine', 'jade');// 设置模板引擎
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));// 格式化表单数据
app.use(express.static(path.join(__dirname,'public')))// 静态文件路径
app.locals.moment = require('moment');
// 监听端口
app.listen(port);

console.log(`listening port:`,port);

//index page
app.get('/',(req, res) => {
    Movie.fetch(function (err,movies){
        if (err){
            console.log(`err:`,err);
        }
        res.render('index',{
            title:'imooc 首页',
            movies:movies,
        })
    })
})

// detail page
app.get('/movie/:id', (req, res) => {
    let id = req.params.id;
    Movie.findById(id, function (err, movie) {
        res.render('detail', {
            title: 'imooc' + movie.title,
            movie: movie,
        })
    })
    // res.render('detail', {
    //     title: 'imooc 详情页',
    //     movie: {
    //        doctor:'何塞.帕迪利亚',
    //        country:"美国",
    //        title:"机械战警",
    //        year:2014,
    //        poster:"http://r3.ykimg.com/05160000530EEB63675839160D0B79D5",
    //        language:"英语",
    //        flash:"http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf",
    //        summary:"《机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映。影片的故事背景与原版基本相同，故事设定在2028年的底特律，男主角亚历克斯·墨菲是一名正直的警察，被坏人安装在车上的炸弹炸成重伤，为了救他，OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来。"
    //     }
    // })
})

app.get('/list', (req, res) => {
    res.render('index', {
        title: 'imooc 列表页'
    })
})

app.get('/admin/movie', function (req, res) {
    res.render('admin', {
        title: 'imooc 后台录入页',
        movie: {
            title: "",
            doctor: "",
            country: "",
            year: "",
            poster: "",
            flash: "",
            summary: "",
            language: ""
        }

    })
})

// admin update movie
app.get('/admin/update/:id', function (req, res) {
    var id = req.params.id
    if (id) {
        Movie.findById(id, function (err, movie) {
            res.render('admin', {
                title: 'imooc 后台更新页',
                movie: movie
            })
        })
    }

})

// admin post movie
app.post('/admin/movie/new', function (req, res) {
    var id = req.body.movie._id
    var movieObj = req.body.movie
    var _movie = null
    if (id !== 'undefined') {
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err)
            }
            _movie = _.extend(movie, movieObj)
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err)
                }

                res.redirect('/movie/' + movie._id)
            })

        })
    } else {
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        })
        _movie.save(function (err, movie) {
            if (err) {
                console.log(err)
            }

            res.redirect('/movie/' + movie._id)
        })
    }
})


// list page
app.get('/admin/list', (req, res) => {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err)
        }
        res.render('list', {
            title: 'imooc 首页',
            movies: movies
        })

    })    
    // res.render('list',{
    //     title:'imooc 列表页',
    //     movies:[{
    //         title:"机械战警",
    //         _id:1,
    //         doctor:'何塞.帕迪利亚',
    //         country:"美国",
    //         year:2014,
    //         poster:"http://r3.ykimg.com/05160000530EEB63675839160D0B79D5",
    //         language:"英语",
    //         flash:"http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf",
    //         summary:"《机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映。影片的故事背景与原版基本相同，故事设定在2028年的底特律，男主角亚历克斯·墨菲是一名正直的警察，被坏人安装在车上的炸弹炸成重伤，为了救他，OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来。"
    //     }]
    // })
})

// list delete
app.delete('/admin/list',function (req, res){
    let id = req.query.id;
    if (id) {
        Movie.remove({ _id: id },function (err,movie){
            if (err){
                console.log(`err:`,err);
            } else {
                res.json({success: 1});
            }
        })
    }
})