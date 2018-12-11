const { Router } = require('express')
var router = Router();
const deadlineModel = require('../db/models/deadline')

const objList=[
    {
        majorId:0,
        majorNameId:1,//과 이름만 받아오기 위한 key
        majorName: "교양",
        subjectId : 0,
        subjectName: "합창"
    },
    {
        majorId:0,
        majorNameId:0,//과 이름만 받아오기 위한 key
        majorName: "교양",
        subjectId : 1,
        subjectName: "서양영화사"
    },
    {
        majorId:0,
        majorNameId:0,//과 이름만 받아오기 위한 key
        majorName: "교양",
        subjectId : 2,
        subjectName: "살아있는 미술관"
    },
    {
        majorId:0,
        majorNameId:0,//과 이름만 받아오기 위한 key
        majorName: "교양",
        subjectId : 3,
        subjectName: "연극의세계"
    },
    {
        majorId:0,
        majorNameId:0,//과 이름만 받아오기 위한 key
        majorName: "교양",
        subjectId : 4,
        subjectName: "현대인의 성과사랑"
    },
    {
        majorId:0,
        majorNameId:0,//과 이름만 받아오기 위한 key
        majorName: "교양",
        subjectId : 5,
        subjectName: "중국인의 삶과 문화"
    },
    {
        majorId:0,
        majorNameId:0,//과 이름만 받아오기 위한 key
        majorName: "교양",
        subjectId : 6,
        subjectName: "미술의세계"
    },
    {
        majorId:0,
        majorNameId:0,//과 이름만 받아오기 위한 key
        majorName: "교양",
        subjectId : 7,
        subjectName: "창의적사고와훈련"
    },
    {
        majorId:0,
        majorNameId:0,//과 이름만 받아오기 위한 key
        majorName: "교양",
        subjectId : 8,
        subjectName: "현대물리의 이해"
    },
    {
        majorId:0,
        majorNameId:0,//과 이름만 받아오기 위한 key
        majorName: "교양",
        subjectId : 9,
        subjectName: "태권도"
    },
    {
        majorId:0,
        majorNameId:0,//과 이름만 받아오기 위한 key
        majorName: "교양",
        subjectId : 10,
        subjectName: "인간두뇌의신비"
    },
    {
        majorId:1,
        majorNameId:1,//과 이름만 받아오기 위한 key
        majorName: "소프트웨어학과",
        subjectId : 0,
        subjectName: "웹시스템설계"
    },
    {
        majorId:1,
        majorNameId:0,
        majorName: "소프트웨어학과",
        subjectId : 1,
        subjectName: "도메인분석및설계"
    },
    {
        majorId:1,
        majorNameId:0,
        majorName: "소프트웨어학과",
        subjectId : 2,
        subjectName: "컴퓨터구조"
    },
    {
        majorId:1,
        majorNameId:0,
        majorName: "소프트웨어학과",
        subjectId : 3,
        subjectName: "데이터베이스"
    },
    {
        majorId:1,
        majorNameId:0,
        majorName: "소프트웨어학과",
        subjectId : 4,
        subjectName: "디지털회로"
    },
    {
        majorId:1,
        majorNameId:0,
        majorName: "소프트웨어학과",
        subjectId : 5,
        subjectName: "객체지향 프로그래밍"
    },
    {
        majorId:1,
        majorNameId:0,
        majorName: "소프트웨어학과",
        subjectId : 6,
        subjectName: "자료구조및실습"
    },
    {
        majorId:1,
        majorNameId:0,
        majorName: "소프트웨어학과",
        subjectId : 7,
        subjectName: "운영체제"
    },
    {
        majorId:1,
        majorNameId:0,
        majorName: "소프트웨어학과",
        subjectId : 8,
        subjectName: "이산수학"
    },
    {
        majorId:1,
        majorNameId:0,
        majorName: "소프트웨어학과",
        subjectId : 9,
        subjectName: "오픈소스SW입문"
    },
    {
        majorId:1,
        majorNameId:0,
        majorName: "소프트웨어학과",
        subjectId : 10,
        subjectName: "컴퓨터네트워크"
    },
    {
        majorId:2,
        majorNameId:1,
        majorName: "기계공학과",
        subjectId : 0,
        subjectName: "차량설계"
    },
    {
        majorId:2,
        majorNameId:0,
        majorName: "기계공학과",
        subjectId : 1,
        subjectName: "엔진공학"
    },
    {
        majorId:2,
        majorNameId:0,
        majorName: "기계공학과",
        subjectId : 2,
        subjectName: "진동학"
    },
    {
        majorId:2,
        majorNameId:0,
        majorName: "기계공학과",
        subjectId : 3,
        subjectName: "진동신호분석법"
    },
    {
        majorId:2,
        majorNameId:0,
        majorName: "기계공학과",
        subjectId : 4,
        subjectName: "전산열유체역학"
    },
    {
        majorId:2,
        majorNameId:0,
        majorName: "기계공학과",
        subjectId : 5,
        subjectName: "자동차공학"
    },
    {
        majorId:2,
        majorNameId:0,
        majorName: "기계공학과",
        subjectId : 6,
        subjectName: "유체역학"
    },
    {
        majorId:2,
        majorNameId:0,
        majorName: "기계공학과",
        subjectId : 7,
        subjectName: "로봇공학"
    },
    {
        majorId:2,
        majorNameId:0,
        majorName: "기계공학과",
        subjectId : 8,
        subjectName: "시스템동역학"
    },
    {
        majorId:2,
        majorNameId:0,
        majorName: "기계공학과",
        subjectId : 9,
        subjectName: "공작기계"
    },
    {
        majorId:2,
        majorNameId:0,
        majorName: "기계공학과",
        subjectId : 10,
        subjectName: "공작기계"
    },
    {
        majorId:3,
        majorNameId:1,
        majorName: "사이버보안학과",
        subjectId : 0,
        subjectName: "시스템소프트웨어보안및실습"
    },
    {
        majorId:3,
        majorNameId:0,
        majorName: "사이버보안학과",
        subjectId : 1,
        subjectName: "사이버보안윤리"
    },
    {
        majorId:3,
        majorNameId:0,
        majorName: "사이버보안학과",
        subjectId : 2,
        subjectName: "IoT플랫폼보안"
    },
    {
        majorId:3,
        majorNameId:0,
        majorName: "사이버보안학과",
        subjectId : 3,
        subjectName: "현대 암호이론 및 응용"
    },
    {
        majorId:3,
        majorNameId:0,
        majorName: "사이버보안학과",
        subjectId : 4,
        subjectName: "사이버플랫폼보안"
    },
    {
        majorId:3,
        majorNameId:0,
        majorName: "사이버보안학과",
        subjectId : 5,
        subjectName: "모바일응용보안및실습"
    },
    {
        majorId:3,
        majorNameId:0,
        majorName: "사이버보안학과",
        subjectId : 6,
        subjectName: "클라우드서비스보안"
    },
    {
        majorId:3,
        majorNameId:0,
        majorName: "사이버보안학과",
        subjectId : 7,
        subjectName: "정보보호법제도와정책"
    },
    {
        majorId:3,
        majorNameId:0,
        majorName: "사이버보안학과",
        subjectId : 8,
        subjectName: "사이버보안사례특강"
    },
    {
        majorId:4,
        majorNameId:1,
        majorName: "경영학과",
        subjectId : 0,
        subjectName: "회계학원론"
    },
    {
        majorId:4,
        majorNameId:0,
        majorName: "경영학과",
        subjectId : 1,
        subjectName: "창업론"
    },
    {
        majorId:4,
        majorNameId:0,
        majorName: "경영학과",
        subjectId : 2,
        subjectName: "투자론"
    },
    {
        majorId:4,
        majorNameId:0,
        majorName: "경영학과",
        subjectId : 3,
        subjectName: "조직행위론"
    },
    {
        majorId:4,
        majorNameId:0,
        majorName: "경영학과",
        subjectId : 4,
        subjectName: "마케팅관리"
    },
    {
        majorId:4,
        majorNameId:0,
        majorName: "경영학과",
        subjectId : 5,
        subjectName: "금융론"
    },
    {
        majorId:4,
        majorNameId:0,
        majorName: "경영학과",
        subjectId : 6,
        subjectName: "관리회계"
    },
    {
        majorId:4,
        majorNameId:0,
        majorName: "경영학과",
        subjectId : 7,
        subjectName: '고정소득증권기초'
    },
    {
        majorId:4,
        majorNameId:0,
        majorName: "경영학과",
        subjectId : 8,
        subjectName: "고급재무관리"
    },
    {
        majorId:4,
        majorNameId:0,
        majorName: "경영학과",
        subjectId : 9,
        subjectName: "기업가 정신과 경영"
    },
    {
        majorId:4,
        majorNameId:0,
        majorName: "경영학과",
        subjectId : 10,
        subjectName: "마케팅조사론"
    },
    {
        majorId:5,
        majorNameId:1,
        majorName: "영여영문학과",
        subjectId : 0,
        subjectName: "영시와 대중음악"
    },
    {
        majorId:5,
        majorNameId:0,
        majorName: "영여영문학과",
        subjectId : 1,
        subjectName: "영미문학개론"
    },
    {
        majorId:5,
        majorNameId:0,
        majorName: "영여영문학과",
        subjectId : 2,
        subjectName: "영어담화분석"
    },
    {
        majorId:5,
        majorNameId:0,
        majorName: "영여영문학과",
        subjectId : 3,
        subjectName: "영어연습"
    },
    {
        majorId:5,
        majorNameId:0,
        majorName: "영여영문학과",
        subjectId : 4,
        subjectName: "영어회화"
    },
    {
        majorId:5,
        majorNameId:0,
        majorName: "영여영문학과",
        subjectId : 5,
        subjectName: "영문법"
    },
    {
        majorId:5,
        majorNameId:0,
        majorName: "영여영문학과",
        subjectId : 6,
        subjectName: "실무영작문"
    },
    {
        majorId:5,
        majorNameId:0,
        majorName: "영여영문학과",
        subjectId : 7,
        subjectName: "문학 전공영어독해"
    },
    {
        majorId:5,
        majorNameId:0,
        majorName: "영여영문학과",
        subjectId : 8,
        subjectName: "Public Speaking"
    },
    {
        majorId:5,
        majorNameId:0,
        majorName: "영여영문학과",
        subjectId : 9,
        subjectName: "영어 교재연구 및 지도법"
    },
    {
        majorId:5,
        majorNameId:0,
        majorName: "영여영문학과",
        subjectId : 10,
        subjectName: "영어학개론"
    },
    {
        majorId:6,
        majorNameId:1,
        majorName: "수학과",
        subjectId : 0,
        subjectName: "확률 및 통계"
    },
    {
        majorId:6,
        majorNameId:0,
        majorName: "수학과",
        subjectId : 1,
        subjectName: "수치해석"
    },
    {
        majorId:6,
        majorNameId:0,
        majorName: "수학과",
        subjectId : 2,
        subjectName: "선형대수"
    },
    {
        majorId:6,
        majorNameId:0,
        majorName: "수학과",
        subjectId : 3,
        subjectName: "현대수학특강"
    },
    {
        majorId:6,
        majorNameId:0,
        majorName: "수학과",
        subjectId : 4,
        subjectName: "현대대수"
    },
    {
        majorId:6,
        majorNameId:0,
        majorName: "수학과",
        subjectId : 5,
        subjectName: "정수론"
    },
    {
        majorId:6,
        majorNameId:0,
        majorName: "수학과",
        subjectId : 6,
        subjectName: "수학프로그래밍"
    },
    {
        majorId:6,
        majorNameId:0,
        majorName: "수학과",
        subjectId : 7,
        subjectName: "해석개론"
    },
    {
        majorId:6,
        majorNameId:0,
        majorName: "수학과",
        subjectId : 8,
        subjectName: "해석개론 연습"
    },
    {
        majorId:6,
        majorNameId:0,
        majorName: "수학과",
        subjectId : 9,
        subjectName: "편미분방정식"
    },
    {
        majorId:6,
        majorNameId:0,
        majorName: "수학과",
        subjectId : 10,
        subjectName: "산업수학 모델링 기초"
    },
    {
        majorId:7,
        majorNameId:1,
        majorName: "건축공학과",
        subjectId : 0,
        subjectName: "철근콘크리트구조"
    },
    {
        majorId:7,
        majorNameId:0,
        majorName: "건축공학과",
        subjectId : 1,
        subjectName: "실시설계도서 이해"
    },
    {
        majorId:7,
        majorNameId:0,
        majorName: "건축공학과",
        subjectId : 2,
        subjectName: "구조역학"
    },
    {
        majorId:7,
        majorNameId:0,
        majorName: "건축공학과",
        subjectId : 3,
        subjectName: "건축유지관리학"
    },
    {
        majorId:7,
        majorNameId:0,
        majorName: "건축공학과",
        subjectId : 4,
        subjectName: "건축재료"
    },
    {
        majorId:7,
        majorNameId:0,
        majorName: "건축공학과",
        subjectId : 5,
        subjectName: "건축공학 입문설계"
    },
    {
        majorId:7,
        majorNameId:0,
        majorName: "건축공학과",
        subjectId : 6,
        subjectName: "건설관리 및 실습"
    },
    {
        majorId:7,
        majorNameId:0,
        majorName: "건축공학과",
        subjectId : 7,
        subjectName: "건설계약 및 시방서"
    },
    {
        majorId:7,
        majorNameId:0,
        majorName: "건축공학과",
        subjectId : 8,
        subjectName: "구조시스템"
    },
    {
        majorId:8,
        majorNameId:1,
        majorName: "심리학과",
        subjectId : 0,
        subjectName: "현대상담의 이론과 실제"
    },
    {
        majorId:8,
        majorNameId:0,
        majorName: "심리학과",
        subjectId : 1,
        subjectName: "심리학 연구법"
    },
    {
        majorId:8,
        majorNameId:0,
        majorName: "심리학과",
        subjectId : 2,
        subjectName: "집단상담"
    },
    {
        majorId:8,
        majorNameId:0,
        majorName: "심리학과",
        subjectId : 3,
        subjectName: "임상심리학"
    },
    {
        majorId:8,
        majorNameId:0,
        majorName: "심리학과",
        subjectId : 4,
        subjectName: "언어심리학"
    },
    {
        majorId:8,
        majorNameId:0,
        majorName: "심리학과",
        subjectId : 5,
        subjectName: "심리학개론"
    },
    {
        majorId:8,
        majorNameId:0,
        majorName: "심리학과",
        subjectId : 6,
        subjectName: "사고과정의 이해"
    },
    {
        majorId:8,
        majorNameId:0,
        majorName: "심리학과",
        subjectId : 7,
        subjectName: "발달심리학"
    },
    {
        majorId:8,
        majorNameId:0,
        majorName: "심리학과",
        subjectId : 8,
        subjectName: "광고심리학"
    },
    {
        majorId:8,
        majorNameId:0,
        majorName: "심리학과",
        subjectId : 9,
        subjectName: "감각과 지각"
    },
    {
        majorId:8,
        majorNameId:0,
        majorName: "심리학과",
        subjectId : 10,
        subjectName: "사회심리학 및 실험"
    },
    {
        majorId:9,
        majorNameId:1,
        majorName: "스포츠레저학과",
        subjectId : 0,
        subjectName: "축구 심리 코칭론"
    },
    {
        majorId:9,
        majorNameId:0,
        majorName: "스포츠레저학과",
        subjectId : 1,
        subjectName: "체육 논리와 논술"
    },
    {
        majorId:9,
        majorNameId:0,
        majorName: "스포츠레저학과",
        subjectId : 2,
        subjectName: "스포츠 사회학"
    },
    {
        majorId:9,
        majorNameId:0,
        majorName: "스포츠레저학과",
        subjectId : 3,
        subjectName: "레크리에이션론"
    },
    {
        majorId:9,
        majorNameId:0,
        majorName: "스포츠레저학과",
        subjectId : 4,
        subjectName: "스포츠조직 리더십"
    },
    {
        majorId:9,
        majorNameId:0,
        majorName: "스포츠레저학과",
        subjectId : 5,
        subjectName: "세계시민으로 살기"
    },
    {
        majorId:9,
        majorNameId:0,
        majorName: "스포츠레저학과",
        subjectId : 6,
        subjectName: "사회갈등과통합"
    },{
        majorId:9,
        majorNameId:0,
        majorName: "스포츠레저학과",
        subjectId : 7,
        subjectName: "여가사회학"
    },
    {
        majorId:9,
        majorNameId:1,
        majorName: "간호학과",
        subjectId : 0,
        subjectName: "아동간호학"
    },
    {
        majorId:9,
        majorNameId:0,
        majorName: "간호학과",
        subjectId : 1,
        subjectName: "병리학"
    },
    {
        majorId:9,
        majorNameId:0,
        majorName: "간호학과",
        subjectId : 2,
        subjectName: "성인간호학"
    },
    {
        majorId:9,
        majorNameId:0,
        majorName: "간호학과",
        subjectId : 3,
        subjectName: "모성간호학"
    },
    {
        majorId:9,
        majorNameId:0,
        majorName: "간호학과",
        subjectId : 4,
        subjectName: "노인간호학실습"
    },
    {
        majorId:9,
        majorNameId:0,
        majorName: "간호학과",
        subjectId : 5,
        subjectName: "금연상담실무"
    },
    {
        majorId:9,
        majorNameId:0,
        majorName: "간호학과",
        subjectId : 6,
        subjectName: "건강증진"
    },
    {
        majorId:9,
        majorNameId:0,
        majorName: "간호학과",
        subjectId : 7,
        subjectName: "건강사정"
    },
    {
        majorId:9,
        majorNameId:0,
        majorName: "간호학과",
        subjectId : 8,
        subjectName: "간호학개론"
    },
    {
        majorId:9,
        majorNameId:0,
        majorName: "간호학과",
        subjectId : 9,
        subjectName: "보건교육지도법"
    },
    {
        majorId:9,
        majorNameId:0,
        majorName: "간호학과",
        subjectId : 10,
        subjectName: "문제중심학습"
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

    if(aaa>0) {
        const newDeadline = new deadlineModel({
            userId: req.body.userId,
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
    }
    else{
        const newDeadline = new deadlineModel({
            userId: req.body.userId,
            hw_name: req.body.hw_name,
            major_name: req.body.major_name,
            subject_name: req.body.subject_name,
            hw_date: new Date(bbb),
            timeRemaining: aaa,
            status: 2
        });

        newDeadline.save(err => {
            if (err) return res.status(500).send(err);
            return res.end();
        })
    }
   // console.log(newDeadline);
});

module.exports = router
