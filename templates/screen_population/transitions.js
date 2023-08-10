/**
 * Highlights unanswered question divs and adds a small red text indicating they were not answered.
 * @param {Array} unanswered_divs - Array of unanswered question div elements.
 */
function highlight_unanswered_questions(unanswered_divs) {
  // Get all question divs in the provided array
  const question_divs = $(".study-question, .post-placement-question");

  // Iterate through each question div
  for (let i = 0; i < question_divs.length; i++) {
    const question_div = question_divs[i];

    // Check if the div is unanswered
    if (unanswered_divs.includes(question_div)) {
      // Highlight unanswered question div
      question_div.style.border = "2px solid red";

      // Add red text indicating that the question was not answered
      if (question_div.lastChild.style.color != "red") {
        const question_number_div = document.createElement("div");
        question_number_div.className = "py-2";
        question_number_div.style.color = "red";
        question_number_div.style.fontSize = "small";
        question_number_div.style.textAlign = "center";
        question_number_div.textContent = `Please answer the required question.`;
        question_div.appendChild(question_number_div);
      }
    } else {
      // Remove highlighting and red text if the question is answered
      question_div.style.border = "";
      if (question_div.lastChild.style.color == "red") {
        question_div.removeChild(question_div.lastChild);
      }
    }
  }
}

/**
 * Processes a checked question and updates the screen output.
 * @param {Element} questionDiv - The question div element.
 * @param {Object} screenOutput - The screen output object.
 * @param {Array} unansweredQuestions - Array to track unanswered questions.
 */
function process_check_question(questionDiv, screenOutput, unansweredQuestions) {
  const questionId = questionDiv.id;
  const inputs = questionDiv.querySelectorAll("input:checked");

  const checkedOptions = [];
  let sumOfValues = 0;

  for (let j = 0; j < inputs.length; j++) {
    const checkedInput = inputs[j];
    const optionText = checkedInput.nextElementSibling.textContent;
    checkedOptions.push(optionText);
    const optionValue = parseInt(checkedInput.value, 10);
    sumOfValues += isNaN(optionValue) ? 0 : optionValue;
  }

  if (checkedOptions.length === 0) {
    unansweredQuestions.push(questionDiv);
  }

  if (questionId.slice(-2) === "CF") {
    screenOutput["chosen_confidence"] = checkedOptions[0];
    screenOutput["confidence"] = sumOfValues;
  } else {
    const questionNum = questionId.slice(-2);
    screenOutput["chosen_options_" + questionNum] = checkedOptions[0];
    screenOutput["score_" + questionNum] = sumOfValues;
  }
}

/**
 * Processes a post placement question and updates the screen output.
 * @param {Element} questionDiv - The question div element.
 * @param {Object} screenOutput - The screen output object.
 * @param {Array} unansweredQuestions - Array to track unanswered questions.
 * @param {Element} feed - The feed element.
 */
function process_post_placement_question(questionDiv, screenOutput, unansweredQuestions, feed) {
  const posts = feed.querySelectorAll('li');

  let chosenIndex = -1;
  let correctIndex = -1;
  let distance = -1;

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const position = parseInt(post.dataset.number);
    if (position >= 0) {
      distance = Math.abs(i - position);
      correctIndex = position;
      chosenIndex = i;
      break;
    }
  }

  if (chosenIndex === -1) {
    unansweredQuestions.push(questionDiv);
  }

  screenOutput["chosen_index"] = chosenIndex;
  screenOutput["correct_index"] = correctIndex;
  screenOutput["distance"] = distance;
  screenOutput["score_Q1"] = distance === 0 ? 1 : 0;
}

/**
 * Logs checked answers with sum and updates the screen output.
 * @param {string} screenName - The screen name.
 * @returns {Array} - Array of unanswered question div elements.
 */
function log_checked_answers_with_sum(screen_info, screenName) {
  const studyQuestions = document.getElementsByClassName("study-question");
  const postPlacementQuestions = document.getElementsByClassName("post-placement-question");
  const feedElements = document.querySelectorAll('.feed');
  const screenOutput = 
  {
    "study_type": screen_info.study_type,
    "feature_count": screen_info.feature_count,
    "nstance_number": screen_info.instance_number,
    "screen_name": screenName,
    };

  const unansweredQuestions = [];

  for (let i = 0; i < studyQuestions.length; i++) {
    process_check_question(studyQuestions[i], screenOutput, unansweredQuestions);
  }

  for (let i = 0; i < postPlacementQuestions.length; i++) {
    process_post_placement_question(postPlacementQuestions[i], screenOutput, unansweredQuestions, feedElements[i]);
  }

  if (unansweredQuestions.length === 0) {
    screenOutput['time-elapsed'] = (new Date().getTime() - start_times[screenName]) / 1000;

    if (!output["questions"]) {
      output["questions"] = [];
    }

    output["questions"].push(screenOutput);
  }

  return unansweredQuestions;
}

function next_screen() {
  let curr_screen_info = screen_order[screen_index];
  let curr_screen_name = generate_screen_name(curr_screen_info);

  let next_screen_info = screen_order[screen_index + 1];
  let next_screen_name = generate_screen_name(next_screen_info);

  let missing_questions = log_checked_answers_with_sum(curr_screen_info, curr_screen_name);
  if (missing_questions.length > 0) {
    highlight_unanswered_questions(missing_questions);
  } else {
    deactivate_screen(curr_screen_info);
    screen_index++;
    activate_screen(next_screen_info, next_screen_name);
  }
}

function deactivate_screen(screen_info) {
  let screen_type = screen_info['template'];
  window.scrollTo(0,0);
  document.getElementById(screen_type).style.display = 'none';
}

function activate_screen(screen_info, screen_name) {
  
  start_times[screen_name] = new Date().getTime();

  if (screen_info == undefined) {
    alert('Screen name ' + screen_name + ' is undefined');
    return;
  }

  let template = screen_info['template'];

  if (template == "left-feed-questions") {
    populate_LFQ(screen_info, screen_name);
  } else if (template == "single-post-question") {
    populate_SPQ(screen_info, screen_name);
  } else if (template == "submission") {
    document.getElementById("next-btn").style.display = "none";
  }

  document.getElementById(template).style.display = 'block';
  window.scrollTo(0,0);

  MathJax.typesetPromise().then(() => { });
}

function submit() {
  proliferate.submit(output);
}
