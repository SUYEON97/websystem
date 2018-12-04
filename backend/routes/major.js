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
    var aaa = new Date(Date.UTC(req.body.deadlineYear,req.body.deadlineMonth-1,req.body.deadlineDate)) - Date.now();

    const newDeadline = new deadlineModel({userId:1, hw_name: req.body.hw_name, major_name: req.body.major_name, subject_name:req.body.subject_name, hw_date : new Date(Date.UTC(req.body.deadlineYear,req.body.deadlineMonth-1,req.body.deadlineDate)), timeRemaining: aaa});
    newDeadline.save(err => {
        if (err) return res.status(500).send(err);
        return res.end();
    })

    console.log(newDeadline);
});

module.exports = router
