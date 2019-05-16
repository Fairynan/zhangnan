const PATH = '/api'

module.exports = {
  //EnglishWord
  articleList: PATH + '/getArticleList',
  articleDetails: PATH + '/getArticleDetails',

  //Login
  login: PATH + '/login',
  register: PATH + '/register',

  // learnCourse
  getLearnedCourse: PATH + '/getLearnedCourse',
  changeLearnedCourse: PATH + '/changeLearnedCourse',
  changeLearnedTime: PATH + '/changeLearnedTime'
}
