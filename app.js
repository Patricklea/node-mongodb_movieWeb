let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
// 以环境变量或者指定的端口
// 设置环境变量：在node命令行中 PORT=3000 node app.js
let port = process.env.PORT || 3333;
let app = express();


app.set('views', './views/pages');// 设置视图目录
app.set('view engine', 'jade');// 设置模板引擎
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));// 格式化表单数据
app.use(express.static(path.join(__dirname,'bower_components')))// 静态文件路径
// 监听端口
app.listen(port);

console.log(`listening port:`,port);

//index page
app.get('/',(req, res) => {
    res.render('index',{
        title:'imooc 首页',
        movies:[{
            title: '机械战警1',
            _id: 1,
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
        },{
            title: '机械战警1',
            _id: 1,
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'            
        }]
    })
})

app.get('/movie/:id', (req, res) => {
    res.render('detail', {
        title: 'imooc 详情页',
        movie: {
           doctor:'何塞.帕迪利亚',
           country:"美国",
           title:"机械战警",
           year:2014,
           poster:"http://r3.ykimg.com/05160000530EEB63675839160D0B79D5",
           language:"英语",
           flash:"http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf",
           summary:"《机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映。影片的故事背景与原版基本相同，故事设定在2028年的底特律，男主角亚历克斯·墨菲是一名正直的警察，被坏人安装在车上的炸弹炸成重伤，为了救他，OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来。"
        }
    })
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

app.get('/admin/list', (req, res) => {
    res.render('list',{
        title:'imooc 列表页',
        movies:[{
            title:"机械战警",
            _id:1,
            doctor:'何塞.帕迪利亚',
            country:"美国",
            year:2014,
            poster:"http://r3.ykimg.com/05160000530EEB63675839160D0B79D5",
            language:"英语",
            flash:"http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf",
            summary:"《机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映。影片的故事背景与原版基本相同，故事设定在2028年的底特律，男主角亚历克斯·墨菲是一名正直的警察，被坏人安装在车上的炸弹炸成重伤，为了救他，OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来。"
        }]
    })
})