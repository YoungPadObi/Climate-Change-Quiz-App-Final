//question database
const STORE = [
    {
      question: 'In the last decade, the rate of Antarctica ice mass loss has__________.',
      answers: [
        'stayed the same',
        'doubled',
        'tripled',
        'decreased by 10%'
      ],
      correctAnswer: 'tripled'
    },
    {
      question:
        'Global sea level rose about 8 inches in the last century. The rate in the last two decades, however, is nearly ________ that of the last century.',
      answers: [
        'half',
        'the same as',
        'double',
        'quadruple'
      ],
      correctAnswer: 'double'
    },
    {
      question:
        'For milennia, atmospheric carbon dioxide levels had never been above 300ppm. The current atmospheric carbon dioxide level is approximately _________.',
      answers: [
        '500ppm',
        '400ppm',
        '300ppm',
        '200ppm'
      ],
      correctAnswer: '400ppm'
    },
    {
      question: 'The United States, with 5% of the world’s population, is responsible for _______ of global GHG emissions.',
      answers: [
        '5%',
        '10%',
        '15%',
        '25%'
      ],
      correctAnswer: '25%'
    },
    {
      question: ' ____________ of climate scientists worldwide agree that climate change is real and driven by human activity.',
      answers: [
        '97%',
        '84%',
        '72%',
        '67%'
      ],
      correctAnswer: '97%'
    },
  ];
  
  //variables to store the quiz score and question number information
  let score = 0;
  let questionNumber = 0;
  
  //template to generate each question
  function generateQuestion() {
    if (questionNumber < STORE.length) {
      return createThing(questionNumber);
    } else {
      $('.questionBox').hide();
      finalScore();
      $('.questionNumber').text(5);
    }
  }
  
  //increments the number value of the "score" variable by one
  //and updates the "score" number text in the quiz view
  function updateScore() {
    score++;
    $('.score').text(score);
  }
  
  //increments the number value of the "question number" variable by one
  //and updates the "question number" text in the quiz view
  function updateQuestionNumber() {
    questionNumber++;
    $('.questionNumber').text(questionNumber + 1);
  }
  
  //resets the text value of the "question number" and "score" variables
  //and updates their repective text in the quiz view
  function resetStats() {
    score = 0;
    questionNumber = 0;
    $('.score').text(0);
    $('.questionNumber').text(0);
  }
  
  //begins the quiz
  function startQuiz() {
    $('.altBox').hide();
    $('.startQuiz').on('click', '.startButton', function (event) {
      $('.startQuiz').hide();
      $('.questionNumber').text(1);
      $('.questionBox').show();
      $('.questionBox').prepend(generateQuestion());
    });
  }
  
  //submits a selected answer and checks it against the correct answer
  //runs answer functions accordingly
  function submitAnswer() {
    $('.climateBox').on('submit', function (event) {
      event.preventDefault();
      $('.altBox').hide();
      $('.response').show();
      let selected = $('input:checked');
      let answer = selected.val();
      let correct = STORE[questionNumber].correctAnswer;
      if (answer === correct) {
        correctAnswer();
      } else {
        wrongAnswer();
      }
    });
  }
  
  //creates html for question form
  function createThing(questionIndex) {
    let formMaker = $(`<form>
      <fieldset>
        <legend class="questionText">${STORE[questionIndex].question}</legend>
      </fieldset>
    </form>`)
  
    let fieldSelector = $(formMaker).find('fieldset');
  
    STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
      $(`<label class="sizeMe" for="${answerIndex}">
          <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
          <span>${answerValue}</span>
        </label>
        `).appendTo(fieldSelector);
    });
    $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
    return formMaker;
  }
  
  //resulting feedback if a selected answer is correct
  //increments user score by one
  function correctAnswer() {
    $('.response').html(
      `<h3>That's Right!</h3>
      <img src="climate/correct1.jpeg" alt="happy fox" class="images" width="200px">
        <p class="sizeMe">Nice Job!</p>
        <button type="button" class="nextButton button">Next</button>`
    );
    updateScore();
  }
  
  //resulting feedback if a selected answer is incorrect
  function wrongAnswer() {
    $('.response').html(
      `<h3>So Close!</h3>
      <img src="climate/wrong.jpeg" alt="earth- half on fire" class="images" width="200px">
      <p class="sizeMe">It's actually:</p>
      <p class="sizeMe">${STORE[questionNumber].correctAnswer}</p>
      <button type="button" class="nextButton button">Next</button>`
    );
  }
  
  //generates the next question
  function nextQuestion() {
    $('.climateBox').on('click', '.nextButton', function (event) {
      $('.altBox').hide();
      $('.questionBox').show();
      updateQuestionNumber();
      $('.questionBox form').replaceWith(generateQuestion());
    });
  }
  
  //determines final score and feedback at the end of the quiz
  function finalScore() {
    $('.final').show();
  
    const great = [
      'Great job!',
      'climate/correct.jpeg',
      'captain planet and co',
      'We might have to crown you the new Captain Planet!'
    ];
  
    const good = [
      'Good Job!',
      'climate/bg.jpeg',
      'ice slowly melting',
      'Check Out https://foe.org/ for more info!'
    ];
  
    const bad = [
      'Try Again, you got this!',
      'climate/wrong.jpg',
      'iceberg collapsing',
      'Hit Restart To Try Again!'
    ];
  
    if (score >= 4) {
      array = great;
    } else if (score < 4 && score >= 3) {
      array = good;
    } else {
      array = bad;
    }
    return $('.final').html(
      `<h3>${array[0]}</h3>
        <img src="${array[1]}" alt="${array[2]}" class="images">
          <h3>Your score is ${score} / 5</h3>
          <p class="sizeMe">${array[3]}</p>
          <button type="submit" class="restartButton button">Restart</button>`
    );
  }
  
  //takes user back to the starting view to restart the quiz
  function restartQuiz() {
    $('.climateBox').on('click', '.restartButton', function (event) {
      event.preventDefault();
      resetStats();
      $('.altBox').hide();
      $('.startQuiz').show();
    });
  }
  
  //runs the functions
  function makeQuiz() {
    startQuiz();
    generateQuestion();
    submitAnswer();
    nextQuestion();
    restartQuiz();
  }
  
  $(makeQuiz);
  