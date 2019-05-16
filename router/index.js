const articleList = require('../controls/articleList')
const judgeLogin = require('../controls/judgeLogin')
const learnedCourse = require('../controls/learnCourse')
const express = require('express')
const api = require('../api')
const router = express.Router()

//articleList
router.post(api.articleList, articleList.getArticleList)
router.post(api.articleDetails, articleList.getArticleDetails)
router.post(api.login, judgeLogin.login)
router.post(api.register, judgeLogin.register)

// learnedCourse
router.post(api.getLearnedCourse, learnedCourse.getLearnedCourse)
router.post(api.changeLearnedCourse,learnedCourse.changeLearnedCourse)
router.post(api.changeLearnedTime,learnedCourse.changeLearnedTime)
module.exports = router
