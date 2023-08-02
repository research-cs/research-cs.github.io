// finds all question divs in the provided array and highlights their border in red and adds
// a small red text at their bottom indicating that the question was not answered.
function highlight_unanswered_questions(unanswered_divs) {
  const question_divs = $(".study-question, .post-placement-question");

  for (let i = 0; i < question_divs.length; i++) {
    const question_div = question_divs[i];

    // check if the div is unanswered
    if (unanswered_divs.includes(question_div)) {
      question_div.style.border = "2px solid red";
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
      question_div.style.border = "";
      if (question_div.lastChild.style.color == "red") {
        question_div.removeChild(question_div.lastChild);
      }
    }
  }
}

function log_checked_answers_with_sum(screen_name) {
  const study_questions = document.getElementsByClassName("study-question");
  let screen_output = {};
  let unanswered_questions = [];

  for (let i = 0; i < study_questions.length; i++) {
    const question_div = study_questions[i];
    const question_id = question_div.id;
    const inputs = question_div.querySelectorAll("input:checked");

    const checked_options = [];
    let sum_of_values = 0;

    for (let j = 0; j < inputs.length; j++) {
      const checked_input = inputs[j];
      const option_text = checked_input.nextElementSibling.textContent;
      checked_options.push(option_text);
      const option_value = parseInt(checked_input.value, 10);
      sum_of_values += isNaN(option_value) ? 0 : option_value;
    }

    if (checked_options.length == 0) {
      unanswered_questions.push(question_div);
    }

    screen_output[question_id] = {
      checked_options: checked_options,
      sum_of_values: sum_of_values,
    };
  }

  const post_placement_questions = document.getElementsByClassName("post-placement-question");

  for (let i = 0; i < post_placement_questions.length; i++) {
    const question_div = post_placement_questions[i];
    const feed = document.querySelectorAll('.feed')[i];

    const posts = feed.querySelectorAll('li');

    let chosen_index = -1;
    let correct_index = -1;
    let distance = -1;

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const position = parseInt(post.dataset.number);
      if (position >= 0) {
        distance = Math.abs(i - position);
        correct_index = position;
        chosen_index = i;
        break;
      }
    }

    if (chosen_index == -1) {
      unanswered_questions.push(question_div);
    }

    screen_output[question_div.id] = {
      chosen_index: chosen_index,
      correct_index: correct_index,
      distance: distance,
    };
  }

  if (unanswered_questions.length == 0) {
    console.log(start_times[screen_name]);
    console.log(screen_name);
    screen_output['time-elapsed'] = (new Date().getTime() - start_times[screen_name]) / 1000;
    console.log(screen_output['time-elapsed']);
    output[screen_name] = screen_output;
    console.log(output);
  }

  return unanswered_questions;
}

function next_screen() {
  let curr_screen_info = screen_order[screen_index];
  let curr_screen_name = generate_screen_name(curr_screen_info);

  let next_screen_info = screen_order[screen_index + 1];
  let next_screen_name = generate_screen_name(next_screen_info);
  console.log(next_screen_name);

  let missing_questions = log_checked_answers_with_sum(curr_screen_name);
  if (missing_questions.length > 0) {
    highlight_unanswered_questions(missing_questions);
  } else {
    deactivate_screen(curr_screen_info);
    screen_index++;
    activate_screen(next_screen_info, next_screen_name);
  }
}

function deactivate_screen(screen_info) {
  let screen_type = json_screens[screen_info['type']]['template'];
  window.scrollTo(0,0);
  document.getElementById(screen_type).style.display = 'none';
}

function activate_screen(screen_info, screen_name) {
  
  start_times[screen_name] = new Date().getTime();

  if (screen_info == undefined) {
    alert('Screen name ' + screen_name + ' is undefined');
    return;
  }

  let template = json_screens[screen_info['type']]['template'];

  if (template == "left-feed-questions") {
    populate_LFQ(screen_info, screen_name);
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
