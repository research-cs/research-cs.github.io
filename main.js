function main() {
    enableTask();
    start();
}
/*******************
Start page functionality
********************/

function start() {
  document.getElementById('welcome').style.display = "block";
  $('#welcome-button').click(function() {
    transition('welcome', 'task')
    launchTask()
  })
}

function launchTask() {
  resetTask()
  if (ai_condition[within_condition_num] == 'ratings') {
    $('#explanation-text-area-div').css('display', 'none')
  } else {
    $('#explanation-text-area-div').css('display', 'block')
  }
  time_started_task = Date.now()
}

function taskCallback() {

  let stars_1 = ['#star-5-1','#star-4-1', '#star-3-1', '#star-2-1', '#star-1-1'];
  let checked_stars_1 = false;
  let chosen_stars_1;
  for (let i = 0; i < stars_1.length; i++) {
    if($(stars_1[i]).is(":checked")) {
      chosen_stars_1 = Number(stars_1[i].slice(6,7));
      checked_stars_1 = true;
    }
  }

  let stars_2 = ['#star-5-2','#star-4-2', '#star-3-2', '#star-2-2', '#star-1-2'];
  let checked_stars_2 = false;
  let chosen_stars_2;
  for (let i = 0; i < stars_2.length; i++) {
    if($(stars_2[i]).is(":checked")) {
      chosen_stars_2 = Number(stars_2[i].slice(6,7));
      checked_stars_2 = true;
    }
  }

  if (!checked_stars_2 || !checked_stars_1) {
    alert('Please select a rating for both AI responses.')
  }
  else if (!$.trim($("#explanation-text-area").val()) && ai_condition[within_condition_num] == 'explanations-ratings') {
    alert('Please write a response.')
  }
  else  {
    let q_response = {}
    q_response['num'] = num
    q_response['num_overall'] = num_overall
    q_response['condition'] = ai_condition[within_condition_num]
    q_response['response_1_stars'] = chosen_stars_1
    q_response['response_2_stars'] = chosen_stars_2
    q_response['prompt'] = input[num_overall]['prompt']
    q_response['response_1'] = temp_responses[0][0]
    q_response['response_2'] = temp_responses[1][0]
    q_response['within_condition_num'] = within_condition_num
    q_response['question_id'] = input[num_overall]['question_id']
    
    q_response['response_1_type'] = temp_responses[0][1]
    q_response['response_2_type'] = temp_responses[1][1]
    q_response['time_spent'] = (Date.now() - time_started_task) / 1000;

    if (chosen_stars_1 == chosen_stars_2) {
      q_response['preference'] = 'Equal'
      q_response['preference_diff'] = 0
    } else if (chosen_stars_1 > chosen_stars_2) {
      q_response['preference'] = temp_responses[0][1]
      q_response['preference_diff'] = chosen_stars_1-chosen_stars_2
    } else {
      q_response['preference'] = temp_responses[1][1]
      q_response['preference_diff'] = chosen_stars_2-chosen_stars_1
    }

    if (ai_condition[within_condition_num]) {
      q_response['explanation'] = $("#explanation-text-area").val()
    }
    output['task'].push(q_response)
    if (num < num_per_condition - 1) {
      num+=1
      num_overall+=1
      transition('task', 'task')
      launchTask()
    }
    else {
      transition('task', 'questionnaire')
      $('#ratings-feelings').val('')
      $('#explanations-feelings').val('')
      if (ai_condition[within_condition_num] == 'explanations-ratings') {
        $('#questionnaire-form-7').css('display', 'block')
      }
      else {
        $('#questionnaire-form-7').css('display', 'none')
      }
    }
  }
}


/*******************
General functions for 
progressing through 
the study
********************/

function transition(current,next) {
  window.scrollTo(0,0); 
  document.getElementById(current).style.display = "none";
  document.getElementById(next).style.display = "block";
  window.scrollTo(0,0)
  progress_value++
  let curr_prog = ((progress_value/total_progress_ticks) * 100.0).toFixed(0)
  $('#progress-bar').attr('aria-valuenow', curr_prog).html(curr_prog + "%").css('width', curr_prog + '%')
}

function renderTask() {
  output['collaboration-progress'].push([])
  question_start_time = Date.now()
  resetTask()
  insertCode()
  addCounter()
}

function resetTask(){
    $('#prompt').html(input[num_overall]['prompt'])
    temp_responses = [[input[num_overall]['response_1'], 'Regular'], [input[num_overall]['response_2'], 'ELI5']]
    shuffleArray(temp_responses)
    $('#output-1').html(temp_responses[0][0].replaceAll('\n', '<br>'))
    $('#output-2').html(temp_responses[1][0].replaceAll('\n', '<br>'))
    $('#explanation-text-area').val('')
    $('#star-form-1')[0].reset()
    $('#star-form-2')[0].reset()
    auto_grow(document.getElementById('output-1'))
    auto_grow(document.getElementById('output-2'))
}


function setSlider1(bool) {
  slider_changed1 = bool;
}

function setSlider2(bool) {
  slider_changed2 = bool;
}


function setSlider3(bool) {
  slider_changed3 = bool;
}

function setSlider4(bool) {
  slider_changed4 = bool;
}


function setSlider5(bool) {
  slider_changed5 = bool;
}

function questionnaireCallback() {
  let q_response = {}

  q_response['TLX-1'] = document.querySelector('#TLX-1').value;
  q_response['TLX-2'] = document.querySelector('#TLX-2').value;
  q_response['TLX-3'] = document.querySelector('#TLX-3').value;
  q_response['TLX-4'] = document.querySelector('#TLX-4').value;
  q_response['TLX-5'] = document.querySelector('#TLX-5').value;

  q_response['ratings-feelings'] = $("#ratings-feelings").val();
  q_response['explanations-feelings'] = $("#explanations-feelings").val();

  q_response['condition'] = ai_condition[within_condition_num]
  q_response['within_condition_num'] = within_condition_num

   if (slider_changed1 == false || slider_changed2 == false || slider_changed3 == false ||
      slider_changed4 == false || slider_changed5 == false) {
      alert("Please answer the slider questions.")
    }

    else if ((!$.trim($("#explanations-feelings").val()) && 
              ai_condition[within_condition_num] == 'explanations-ratings') || !$.trim($("#ratings-feelings").val())) {
      alert("Please input your response in the text box.")
    }
    else {
      output['questionnaire'].push(q_response)
      num = 0 
      num_overall += 1
      within_condition_num += 1
      postQuestionnaireOrTask("questionnaire")

    }
 }

 function postQuestionnaireOrTask(previous_html) {
    if (within_condition_num < ai_condition.length) {
      $('#questionnaire-form-1').trigger('reset')
      $('#questionnaire-form-2').trigger('reset')
      $('#questionnaire-form-3').trigger('reset')
      $('#questionnaire-form-4').trigger('reset')
      $('#questionnaire-form-5').trigger('reset')
      slider_changed1 = false;
      slider_changed2 = false;
      slider_changed3 = false;
      slider_changed4 = false;
      slider_changed5 = false;
      transition(previous_html, 'task')
      launchTask()
    }
    else {
      transition(previous_html, 'final-questionnaire')
    }
 }

 function finalQuestionnaireCallback() {

  if (!$.trim($("#prefer-explanation-or-not").val()) ||
      !$.trim($("#other-ways-feedback").val())
      ) {
    alert("Please input your response in the text box.")
  } else {
    console.log(output)
    output['Total_Time'] = (Date.now() - startTime) / 1000;
    output['userID'] = userID
    output['prefer-explanation-or-not'] = $("#prefer-explanation-or-not").val()
    output['other-ways-feedback'] = $("#other-ways-feedback").val()
    transition('final-questionnaire', 'thank-you')
  }

 }

function saveOutput() {
  proliferate.submit(output)
}

function enableTask() {
  startTime = Date.now()
  enabled = true;
  $('#continue-task-button').click(taskCallback)
  $('#questionnaire-button').click(questionnaireCallback);
  $('#submit-btn').click(saveOutput);
  $('#final-questionnaire-button').click(finalQuestionnaireCallback)
}

function auto_grow(element) {
    element.style.height = "15px";
    element.style.height = (element.scrollHeight)+"px";
}

// $.ajax('http://127.0.0.1:5000/save_data',  // url
// {data: JSON.stringify({"output":output}),
// method: "POST",
// async: false,
// contentType: "application/json",
// success: function(data) {  }})

// download(JSON.stringify(output), userID + '-user-json.json', 'application/json');
// $.ajax('http://127.0.0.1:5000/save_data',  // url
//   {data: JSON.stringify({"output":output}),
//   method: "POST",
//   async: false,
//   contentType: "application/json",
//   success: function(data) {  }})

main();