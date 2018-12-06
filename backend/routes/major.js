//import moment from "moment";

const { Router } = require('Express')
var router = Router();
const deadlineModel = require('../db/models/deadline')

const objList=[
    {
        majorId:0,
        majorNameId:1,//과 이름만 받아오기 위한 key
        majorName: "소프트웨어학과",
        subjectId : 0,
        subjectName: "웹시스템설계"
    },
    {
        majorId:0,
        majorNameId:0,
        majorName: "소프트웨어학과",
        subjectId : 1,
        subjectName: "도메인분석및설계"
    },
    {
        majorId:0,
        majorNameId:0,
        majorName: "소프트웨어학과",
        subjectId : 2,
        subjectName: "컴퓨터구조"
    },
    {
        majorId:1,
        majorNameId:1,
        majorName: "기계공학과",
        subjectId : 0,
        subjectName: "차량설계"
    },
    {
        majorId:1,
        majorNameId:0,
        majorName: "기계공학과",
        subjectId : 1,
        subjectName: "엔진공학"
    },
    {
        majorId:1,
        majorNameId:0,
        majorName: "기계공학과",
        subjectId : 2,
        subjectName: "진동학"
    },
    {
        majorId:1,
        majorNameId:0,
        majorName: "기계공학과",
        subjectId : 3,
        subjectName: "진동신호분석법"
    },
    {
        majorId:1,
        majorNameId:0,
        majorName: "기계공학과",
        subjectId : 4,
        subjectName: "전산열유체역학"
    },
    {
        majorId:1,
        majorNameId:0,
        majorName: "기계공학과",
        subjectId : 5,
        subjectName: "자동차공학"
    },
    {
        majorId:1,
        majorNameId:0,
        majorName: "기계공학과",
        subjectId : 6,
        subjectName: "유체역학"
    },
    {
        majorId:1,
        majorNameId:0,
        majorName: "기계공학과",
        subjectId : 7,
        subjectName: "로봇공학"
    },
    {
        majorId:1,
        majorNameId:0,
        majorName: "기계공학과",
        subjectId : 8,
        subjectName: "시스템동역학"
    },
    {
        majorId:1,
        majorNameId:0,
        majorName: "기계공학과",
        subjectId : 9,
        subjectName: "공작기계"
    },
    {
        majorId:1,
        majorNameId:0,
        majorName: "기계공학과",
        subjectId : 10,
        subjectName: "공작기계"
    },
    {
        majorId:2,
        majorNameId:1,
        majorName: "사이버보안학과",
        subjectId : 0,
        subjectName: "시스템소프트웨어보안및실습"
    },
    {
        majorId:2,
        majorNameId:0,
        majorName: "사이버보안학과",
        subjectId : 1,
        subjectName: "사이버보안윤리"
    },
    {
        majorId:2,
        majorNameId:0,
        majorName: "사이버보안학과",
        subjectId : 2,
        subjectName: "IoT플랫폼보안"
    },

]

router.get('/subject', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    return res.json(objList);
});



router.post('/register', (req, res) => {
    var aaa = new Date(req.body.hdate) - Date.now();
    var bbb = new Date(req.body.hdate);
    bbb.setHours(9);
    //var ccc= new Date(req.body.hdate)-new Date.now()
    //console.log(new Date(aaa))
    //console.log(moment(aaa,"YYYYMMDD").fromNow())
        const newDeadline = new deadlineModel({
            userId: 1,
            hw_name: req.body.hw_name,
            major_name: req.body.major_name,
            subject_name: req.body.subject_name,
            hw_date: new Date(bbb),
            timeRemaining: aaa,
            status: 0
        });

        newDeadline.save(err => {
            if (err) return res.status(500).send(err);
            return res.end();
        })
   // console.log(newDeadline);
});

module.exports = router
