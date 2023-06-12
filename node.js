/* Created and coded by Abhilash Narayan */
/* Quiz source: w3schools.com */
var quiz = {
  "math": [
  {
  "id": 1,
  "question": "34+27=?",
  "options": [
  {
  "a": "57;",
  "b": "63;",
  "c": "61;",
  "d": "65;"
  }
  ],
  "answer": "61;",
  "score": 0,
  "status": ""
  },
  {
  "id": 2,
  "question": "identify the prime number?",
  "options": [
  {
  "a": "2",
  "b": "9",
  "c": "6"
  }
  ],
  "answer": "2",
  "score": 0,
  "status": ""
  },
  {
  "id": 3,
  "question": "identify the even number?",
  "options": [
  {
  "a": "25;",
  "b": "31;",
  "c": "62;"
  }
  ],
  "answer": "62;",
  "score": 0,
  "status": ""
  }
  ]
  }
  var quizApp = function () {
  this.score = 0;
  this.qno = 1;
  this.currentque = 0;
  var totalque = quiz.math.length;
  this.displayQuiz = function (cque) {
  this.currentque = cque;
  if (this.currentque < totalque) {
  $("#tque").html(totalque);
  $("#previous").attr("disabled", false);
  $("#next").attr("disabled", false);
  $("#qid").html(quiz.math[this.currentque].id + '.');
  $("#question").html(quiz.math[this.currentque].question);
  $("#question-options").html("");
  for (var key in quiz.math[this.currentque].options[0]) {
  if (quiz.math[this.currentque].options[0].hasOwnProperty(key)) {
  $("#question-options").append(
  "<div class='form-check option-block'>" +
  "<label class='form-check-label'>" +
  "<input type='radio' class='form-check-input' name='option' id='q" + key + "' value='" + quiz.math[this.currentque].options[0][key] + "'><span id='optionval'>" +
  quiz.math[this.currentque].options[0][key] +
  "</span></label>"
  );
  }
  }
  }
  if (this.currentque <= 0) {
  $("#previous").attr("disabled", true);
  }
  if (this.currentque >= totalque) {
  $('#next').attr('disabled', true);
  for (var i = 0; i < totalque; i++) {
  this.score = this.score + quiz.math[i].score;
  }
  return this.showResult(this.score);
  }
  }
  this.showResult = function (scr) {
  $("#result").addClass('result');
  $("#result").html("<h1 class='res-header'>Total Score: &nbsp;" + scr + '/' + totalque + "</h1>");
  for (var j = 0; j < totalque; j++) {
  var res;
  if (quiz.math[j].score == 0) {
  res = '<span class="wrong">' + quiz.math[j].score + '</span><i class="fa fa-remove c-wrong"></i>';
  } else {
  res = '<span class="correct">' + quiz.math[j].score + '</span><i class="fa fa-check c-correct"></i>';
  }
  $("#result").append(
  '<div class="result-question"><span>Q ' + quiz.math[j].id + '</span> &nbsp;' + quiz.math[j].question + '</div>' +
  '<div><b>Correct answer:</b> &nbsp;' + quiz.math[j].answer + '</div>' +
  '<div class="last-row"><b>Score:</b> &nbsp;' + res +
  '</div>'
  );
  }
  }
  this.checkAnswer = function (option) {
  var answer = quiz.math[this.currentque].answer;
  option = option.replace(/</g, "&lt;") //for <
  option = option.replace(/>/g, "&gt;") //for >
  option = option.replace(/"/g, "&quot;")
  if (option == quiz.math[this.currentque].answer) {
  if (quiz.math[this.currentque].score == "") {
  quiz.math[this.currentque].score = 1;
  quiz.math[this.currentque].status = "correct";
  }
  } else {
  quiz.math[this.currentque].status = "wrong";
  }
  }
  this.changeQuestion = function (cque) {
  this.currentque = this.currentque + cque;
  this.displayQuiz(this.currentque);
  }
  }
  var jsq = new quizApp();
  var selectedopt;
  $(document).ready(function () {
  jsq.displayQuiz(0);
  $('#question-options').on('change', 'input[type=radio][name=option]', function (e) {
  //var radio = $(this).find('input:radio');
  $(this).prop("checked", true);
  selectedopt = $(this).val();
  });
  });
  $('#next').click(function (e) {
  e.preventDefault();
  if (selectedopt) {
  jsq.checkAnswer(selectedopt);
  }
  jsq.changeQuestion(1);
  });
  $('#previous').click(function (e) {
  e.preventDefault();
  if (selectedopt) {
  jsq.checkAnswer(selectedopt);
  }
  jsq.changeQuestion(-1);
  });