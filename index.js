'use strict';

let pointCount = 0;
let questionCount = 0;

// ====================================================
// Basic question template
// ====================================================
function questionForm(currentQuestion){
    // Basic template for the question screen
    return `
        <div class="row css_textStyle">
            <div class="col-12">
                <h2 class="heading_h2">${currentQuestion.question}</h2>
            </div>
        </div>
        <form class="js_questionForm css_textStyle">
            <fieldset role="group" name="answer options">
            <legend>Answers</legend>
                <div class="row">
                    <div class="col-12">
                        <label class="js_optAnswer css_optAnswer">
                            <input type="radio" name="answer" value="${currentQuestion.answers[0]}" required>
                            <span class="js_answer">${currentQuestion.answers[0]}</span>
                        </label>
                        <label class="js_optAnswer css_optAnswer">
                            <input type="radio" name="answer" required>
                            <span class="js_answer">${currentQuestion.answers[1]}</span>
                        </label>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <label class="js_optAnswer css_optAnswer">
                            <input type="radio" name="answer" required>
                            <span class="js_answer">${currentQuestion.answers[2]}</span>
                        </label>
                        <label class="js_optAnswer css_optAnswer">
                            <input type="radio" name="answer" required>
                            <span class="js_answer">${currentQuestion.answers[3]}</span>
                        </label>
                    </div>
                </div>
                </fieldset>
                <button type="submit" class="js_submitBtn">Submit</button>
        </form>`;
}

// ====================================================
// Starting the app
// ====================================================
function startQuiz() {
    $('.js_startBtn').click(function(event) {
      nextQuestion();
      $(".js_counter").html(`<ul><li class="css_score css_question">Question: <span class="js_questionCount">1</span>/10</li>
      <li class="css_score">Points: <span class="js_pointCount">0</span>/100</li></ul>`)
    });
}

// ====================================================
// Submitting the answer
// ====================================================
function submitUserAnswer() {
    $('.mainScreen').on('submit', function(event) {
        event.preventDefault()
        const answer = $('input:checked').next();
        renderFeedbackScreen(answer);
    });
}

// function submitUserAnswer() {
// $('.js_submitBtn').submit(function(event){
//     event.preventDefault();
//     const answer = $('input:checked').next();
//     renderFeedbackScreen(answer);
//     });
// }
// ====================================================
// Render next question
// ====================================================
function renderNextQuestion() {
    $('.mainScreen').on('click', '.js_nextBtn', function() {
        if(questionCount === questions.length-1) {
            $('.js_questionCount').text(questionCount+1);
            renderResults();
        } else {
            incrementQuestionCount();
            nextQuestion();
        }
    });
}

function nextQuestion() {
    const currentQuestion = questions[questionCount];
    $('.mainScreen').html(questionForm(currentQuestion));
}

// ====================================================
// Render feedback screen
// ====================================================
function renderFeedbackScreen(answer){
    $('.mainScreen').html(FeedbackScreen);
    // if right:
    if(answer.text() === answers[questionCount]){
        userIsRight();
    // if wrong:
    }else {
        userIsWrong();
    }
}

function userIsRight(){
    $(".feedbackText").text("Yeah Buddy, that is absolutely correct!");
    $(".css_answerImage").attr("src","https://media.giphy.com/media/3oFzmkkwfOGlzZ0gxi/giphy.gif").attr("alt",'Walter White from Breaking Bad saying "You are goddam right!"');
    incrementPoints();
}

function userIsWrong(){
    $(".feedbackText").text(`Sorry, But you are wrong! "${answers[questionCount]}" would be the right answer!`);
    $(".css_answerImage").attr("src","https://media.giphy.com/media/l1IY5J4Cfw8JLi40M/giphy.gif").attr("alt","Old man saying not true");
}

const FeedbackScreen = `
<div class="js_feedbackScreen">
<div>
<h2 class="feedbackText heading_h2">PlaceholderText</h2>
<img class="css_answerImage" src="#" alt="#">
<button class="js_nextBtn">Next Question</button>
</div>
</div>
`;

// ====================================================
// Additional functions
// ====================================================

function incrementPoints(){
    pointCount +=10;
    $(".js_pointCount").text(pointCount);
}

//increases by 1 everytime a new question is rendered!
// visual feedback for the user 
function incrementQuestionCount(){
    questionCount ++;
    $(".js_questionCount").text(questionCount);
}

// ====================================================
// Results ${pointCount/10}
// ====================================================

function renderResults() {
    $('.mainScreen').html(`
      <div class="js_results">
        <h2 class="css_score">Final Score</h2>
        <p class="css_score">${questionCount} out of 10</p>
        <p class="css_score">If you want to play another round feel free to press the "Play Again" button!</p>
        <button class="js_restartBtn">Play Again?</button>
      </div>
    `);
}

// ====================================================
// Restart
// ====================================================

function restartApp() {
  $('.mainScreen').on('click', '.js_restartBtn', function(event) {
    questionCount = 0;
    pointCount = 0;    
    $(".js_pointCount").text(pointCount);
    $(".js_questionCount").text(questionCount);
    nextQuestion();
  });
}

function app(){
    startQuiz();
    submitUserAnswer();
    renderNextQuestion();
    restartApp();
}

app();