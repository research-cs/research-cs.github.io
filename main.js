var startTime;

function main() {
  // If this is a HIT on AMT, then replace the default input with the real
  // input.
  // input = easyturk.getInput(input);
  // console.log(input);

  // Enable the task.
  // if (!easyturk.isPreview()){
    enableTask();
  //}

  if (idx == 0) {
    document.getElementById("onboarding").style.display = "block";
    $('#progress-text').html(progress_bar_text[progress_num]);
    $('#payment').html(payment);
    $('#time').html(time);
    $('#consent-form').attr("href", href);

    progress_num += 1;
    idx += 1
  }
}

function transition(current,next) {
  document.getElementById(current).style.display = "none";
  document.getElementById(next).style.display = "block";
  window.scrollTo(0,0)
  if (next == "exit") {
    document.getElementById("progress-bar").style.display = "none";
  }
  else {
   progress();
  }
}

function progress() {
    progress_bar_current += progress_bar_increments;
    $('#progress-bar').attr('aria-valuenow', Math.round(progress_bar_current)).css('width', Math.round(progress_bar_current)+'%');
    document.getElementById("progress-bar").innerHTML = Math.round(progress_bar_current) + '%';
}


function consentCallback() {
  startTime = Date.now()
  if ($("#agree").is(":checked")) {
    output['consent'] = 'agree'
    transition("onboarding", "demographics");
    $('#progress-text').html(progress_bar_text[progress_num]);
    progress_num += 1;
  }
  else if ($("#disagree").is(":checked")) {
    output['consent'] = 'disagree'
    transition("onboarding","exit");
    $('#progress-text').html('Exit');
  }
  else {
    alert('Please answer the consent question.');
  }
}

function demographicsCallback() {
  let checked_prolificID = false;
  let written_prolificID;

  if ($.trim($("#prolificID").val())) {
        written_prolificID = $("#prolificID").val();
        checked_prolificID = true;
  }

  let gender = ['#male','#female', '#nonbinary', '#prefernot', '#other'];
  let checked_gender = false;
  let chosen_gender;
  for (let i = 0; i < gender.length; i++) {
    if($(gender[i]).is(":checked")) {
      if((gender[i]) != '#other') {
          chosen_gender = gender[i].slice(1);
          checked_gender = true;
          break;
        }
      else if ($.trim($("#self-description").val())) {
        chosen_gender = $("#self-description").val();
        checked_gender = true;
        break;
      }
      
    }
  }
  
  let age = ['#under18','#18-24yo', '#25-34yo', '#35-44yo', '#45-54yo', '#55-64yo', '#65-74yo', '#over74'];
  let checked_age = false;
  let chosen_age;
  for (let i = 0; i < age.length; i++) {
    if($(age[i]).is(":checked")) {
      chosen_age = age[i].slice(1)
      checked_age = true;
      break;
    }
  }
  if (checked_prolificID == false) {
    alert('Please answer the question about your Prolific ID');
  }

  if (checked_gender == false) {
    alert('Please answer the question about your gender');
  }
  if (checked_age == false) {
    alert('Please answer the question about your age');
  }
  if (checked_gender == true && checked_age == true && checked_prolificID == true) {
    output['demographics'] = {
      'prolific':written_prolificID,
      'gender': chosen_gender,
      'age': chosen_age
    }
    save_progress_val = progress_bar_current;
    transition("demographics", "tutorial-start");
    $('#progress-text').html(progress_bar_text[progress_num]);
    save_progress_text = progress_num
    progress_num += 1;
    runTutorial();
  }
}

function disableSelfDescribe() {
  $('#self-description').attr('disabled', true);
}

function enableSelfDescribe() {
  $('#self-description').attr('disabled', false);
}

// $('#tutorial-start-button').click(function(){
//   transition('tutorial-start','training-start')
//   $('#progress-text').html(progress_bar_text[progress_num]);
//   progress_num += 1;
//   tutorial_phase = false
//   runTraining()
// });

var intro;

function runTutorial() {

  tutorial_phase = true

  $('#tutorial-start-button').click(function(){
    transition("tutorial-start","tutorial-choose");
    intro.setOptions(introOptions);
    intro.start()
  });

  intro = introJs()

  var introSteps = [
    {
      title: 'Welcome!',
      intro: 'In this study, you will be asked to choose between solving a task together with an artificial intelligence (AI) agent and solving a task by yourself. In this tutorial, we will walk you through a few pre-selected choices to help explain important components of the study interface.<br><br>To advance through this tutorial, you should always press the <strong>Next</strong> button (below) to continue.'
    },
    {
      element: document.querySelector('#choose-human-tutorial'),
      intro: "First, we will demonstrate the task <strong>without AI assistance</strong>.",
    },
    {
      title: "Task Interface",
      intro: 'For each task, you will be asked to answer a <strong>multiple-choice question</strong> about the provided text passage on the left.<br><br>For now, you do not need to worry about answering the question correctly. Later on in the study, you will be asked to complete questions like this by youself.'
    },
    {
      element: document.querySelector('#context-text'),
      intro: 'The passages will all be of similar lengths and will contain factual information about a given topic.<br><br>You do not need to carefully read the passage during this tutorial.'
    },
    {
      element: document.querySelector('#question-box'),
      intro: 'You will be asked to answer a multiple-choice question about the provided passsage. The answer to each question can always be found within the passage.<br><br>You do not need to answer this particular question during the tutorial.'
    },
    {
      element: document.querySelector('#choose-AI-tutorial'),
      intro: "Now, we will demonstrate the task <strong>with advice from an AI</strong>.",
    },
    {
      element: document.querySelector('#question-box'),
      intro: 'When you choose to receive advice, the AI will also provide you with a <strong>suggested answer</strong>. The AI is a computer program that has been trained to answer multiple choice questions using a dataset of thousands of similar questions. '
    },
    {
      element: document.querySelector('#model-prediction-box'),
      intro: "This AI is 80% accurate, which means that its suggestions <strong>will not always be correct</strong>. You will have to decide for yourself whether to accept its suggested answer or not. In this case, the AI's suggestion is correct."
    },
    {
    element: document.querySelector('#context-text'),
    intro: "Some AI will also provide you with highlights to help explain its answer. The <span class='main-highlight'>green</span> highlights correspond to the AI's suggested answer, while the <span class='question-highlight'>blue</span> highlights correspond to important contextual information that the AI has selected.",
    position: 'right'
    },
    {
      title: "Tutorial Complete",
      intro: "Thank you for completing the tutorial. In the next section, you will complete several training questions."
    }
  ]

  // var highlightStep = {
  //   element: document.querySelector('#context-text'),
  //   intro: "Some AI will also provide you with highlights to help explain its answer. The <span class='main-highlight'>green</span> highlights correspond to the AI's suggested answer, while the <span class='question-highlight'>blue</span> highlights correspond to important contextual information that the AI has selected.",
  //   position: 'right'
  // }

  // if (tutorial_task == 'xai') {
  //   introSteps.splice(-1, 0, highlightStep)
  // }

  var introOptions = {
    // disableInteraction: true,
    exitOnOverlayClick: false,
    exitOnEsc: false,
    scrollTo: "tooltip",
    showBullets: false,
    steps: introSteps
  };

  intro.onbeforechange(function(targetElement) { 
    // first transition from choice to task
    if (this._currentStep == 2) {
      transition("tutorial-choose","task");
      renderTask(tutorial_setting + " " + 'baseline', input['tutorial'][0])
      $('#answer-question').attr('disabled', true)
      $('#q1,#q2,#q3,#q4').attr('disabled', true)
    // transition from task back to choice
    } else if (this._currentStep == 5) {
      transition('task', 'tutorial-choose');

    // second transition from choice to task
    } else if (this._currentStep == 6) {
      transition("tutorial-choose","task");
      renderTask(tutorial_setting + " " + tutorial_task, input['tutorial'][0])
      $('#answer-question').attr('disabled', true)
      $('#q1,#q2,#q3,#q4').attr('disabled', true)
      // var targetElement = $('.main-highlight').parent()[0]
      // intro._introItems[8].element = targetElement
      // if (tutorial_task == 'xai') {
      //   var targetElement = (tutorial_setting == 'long') ? $('.main-highlight').parent()[0] : document.querySelector('#context-text')
      //   intro._introItems[8].element = targetElement
      // }
    }
  });

  intro.oncomplete(function() {
    transition('task', 'tutorial-multiple-ai')
    for (let i = 0; i < ai_names.length; i++) {
      document.getElementById('choose-AI-tutorial-'+(i+1)).style.color = ai_colors[i];
      document.getElementById('choose-AI-tutorial-'+(i+1)).style.backgroundColor = ai_background_colors[i];
      document.getElementById('choose-AI-tutorial-'+(i+1)).style.border = ai_border[i];
      document.getElementById('choose-ai-name-'+(i+1)).innerHTML = ai_names[i];
    }
  })

  $('#tutorial-multiple-ai-button').click(function() {
      transition('tutorial-multiple-ai', 'funnymoney')
      tutorial_phase = false
      $('#credits-box').show()
      $('#progress-text').html(progress_bar_text[progress_num]);
    progress_num += 1;
      
  });
}

$('#funnymoney-button').click(function() {
    transition('funnymoney', 'funnymoney-2');
});

$('#funnymoney-2-button').click(function() {
    transition('funnymoney-2', 'comprehension-check');
    $('#progress-text').html(progress_bar_text[progress_num]);
    progress_num += 1;
    $('#comprehension-check-button').css('display', 'block')
    $('#comprehension-check-button-2').css('display', 'none')
    $('#comprehension-check-button-3').css('display', 'none')
    $('#comprehension-response-form')[0].reset()
    $('#long-short,#yourself-AI,#AI-explanations,#short-long,#ai-ai,#ai-xai,#yourself-ai,#ai-badai,#how-many-AI-to-collaborate,#offer-confidence,#offer-xai,#offer-alternative,#offer-similar,#true,#false').attr('disabled', false)

});

$('#comprehension-check-button').click(comprehensionCallback);

function comprehensionCallback() {
  let q1 = ['#long-short','#yourself-AI', '#AI-explanations', '#short-long'];
  let checked_q1 = false;
  let chosen_q1;
  for (let i = 0; i < q1.length; i++) {
    if($(q1[i]).is(":checked")) {
      chosen_q1 = q1[i].slice(1);
      checked_q1 = true;
      break;
    }
  }
  let q2 = ['#ai-ai','#ai-xai', '#yourself-ai', '#ai-badai'];
  let checked_q2 = false;
  let chosen_q2;
  for (let i = 0; i < q2.length; i++) {
    if($(q2[i]).is(":checked")) {
      chosen_q2 = q2[i].slice(1);
      checked_q2 = true;
      break;
    }
  }

  let q3 = $('#how-many-AI-to-collaborate').val()
  let checked_q3 = false;
  if(!$('#please-select').is(':selected')) {
    checked_q3 = true;
  }
  let chosen_q3 = q3;

  let q4 = ['#offer-confidence','#offer-xai', '#offer-alternative', '#offer-similar'];
  let checked_q4 = false;
  let chosen_q4;
  for (let i = 0; i < q4.length; i++) {
    if($(q4[i]).is(":checked")) {
      chosen_q4 = q4[i].slice(1);
      checked_q4 = true;
      break;
    }
  }

  let q5 = ['#true', '#false'];
  let checked_q5 = false;
  let chosen_q5;
  for (let i = 0; i < q5.length; i++) {
    if($(q5[i]).is(":checked")) {
      chosen_q5 = q5[i].slice(1);
      checked_q5 = true;
      break;
    }
  }

  var comprehension_incorrect = 0;
  if (checked_q1 == false || checked_q2 == false 
     || checked_q3 == false || checked_q4 == false
     || checked_q5 == false) {
    alert('Please answer all of the comprehension check questions');
  }
  else {
    if (chosen_q1 == 'long-short') {
      $('#q1-correct').css('display', 'block')
      $('#q1-incorrect').css('display', 'none')
    }
    else {
      $('#q1-incorrect').css('display', 'block')
      $('#q1-correct').css('display', 'none')
      comprehension_incorrect += 1;
    }
    if (chosen_q2 == 'yourself-ai') {
      $('#q2-correct').css('display', 'block')
      $('#q2-incorrect').css('display', 'none')
    }
    else {
      $('#q2-incorrect').css('display', 'block')
      $('#q2-correct').css('display', 'none')
      comprehension_incorrect += 1;
    }
    if (chosen_q3 == '4 AIs') {
      $('#q3-correct').css('display', 'block')
      $('#q3-incorrect').css('display', 'none')
    }
    else {
      $('#q3-incorrect').css('display', 'block')
      $('#q3-correct').css('display', 'none')
      comprehension_incorrect += 1;
    }
    if (chosen_q4 == 'offer-xai') {
      $('#q4-correct').css('display', 'block')
      $('#q4-incorrect').css('display', 'none')
    }
    else {
      $('#q4-incorrect').css('display', 'block')
      $('#q4-correct').css('display', 'none')
      comprehension_incorrect += 1;
    }
    if (chosen_q5 == 'true') {
      $('#q5-correct').css('display', 'block')
      $('#q5-incorrect').css('display', 'none')
    }
    else {
      $('#q5-incorrect').css('display', 'block')
      $('#q5-correct').css('display', 'none')
      comprehension_incorrect += 1;
    }
    $('#long-short,#yourself-AI,#AI-explanations,#short-long,#ai-ai,#ai-xai,#yourself-ai,#ai-badai,#how-many-AI-to-collaborate,#offer-confidence,#offer-xai,#offer-alternative,#offer-similar,#true,#false').attr('disabled', true)
    if (comprehension_incorrect > 0 && output['comprehension check'].length == 1) {
      // Transition to exit
      $('#comprehension-check-button-4').css('display', 'block')
      $('#comprehension-check-button-2').css('display', 'none')
      $('#comprehension-check-button').css('display', 'none')
      $('#comprehension-check-button-4').click(function() {
      transition("comprehension-check","exit");
      $('#progress-text').html('Exit');
      });
    }
    else if (comprehension_incorrect > 0) {
      $('#comprehension-check-button-3').css('display', 'block')
      $('#comprehension-check-button-2').css('display', 'none')
      $('#comprehension-check-button').css('display', 'none')
      $('#comprehension-check-modal').modal('toggle')
      $('#comprehension-check-button-3').click(function() {
        progress_bar_current = save_progress_val
        transition('comprehension-check', 'tutorial-start');
        progress_num = save_progress_text
        $('#progress-text').html(progress_bar_text[progress_num]);
        progress_num += 1;
      });
    }
    else {
      $('#comprehension-check-button-2').css('display', 'block')
      $('#comprehension-check-button-3').css('display', 'none')
      $('#comprehension-check-button').css('display', 'none')
      $('#comprehension-check-button-2').click(function() {
        transition('comprehension-check', 'training-start');
        $('#progress-text').html(progress_bar_text[progress_num]);
        progress_num += 1;
        runTraining();
      });
    }
    var comprehension_response = {
      'q1': chosen_q1,
      'q2': chosen_q2,
      'q3': chosen_q3,
      'q4': chosen_q4,
      'q5': chosen_q5
    }
    output['comprehension check'].push(comprehension_response)
  }
};

function runTraining() {
  training_phase = true;
  training_phase_count = 0;


  function trainingCallback() {
    response = readTaskResponse()

    if (response) {
      output['training'].push(response)

      if (training_phase_count == training_phase_order.length - 1) {
        $('.alert-link').unbind('click').click(
          ()=>transition('task', 'training-end')
        )
      }
      else {
        training_phase_count += 1;
        $('.alert-link').unbind('click').click(function() {
          renderTask(training_phase_order[training_phase_count], input['training'][training_phase_count]);
          progress();
        })
      }
    }
  }

  $('#training-start-button').click(function() {
    transition('training-start', 'task');
    renderTask(training_phase_order[0], input['training'][0], trainingCallback)

  })

  $('#training-end-button').click(function() {
    transition('training-end', 'begin-task');
    repeatTask(input['coged-order'][task_repeat][1], 'collaboration-task-first-text')
    runTask();
    $('#progress-text').html(progress_bar_text[progress_num]);
    progress_num += 1;
    training_phase = false;
    output['coged-order'] = input['coged-order']
  })
}


var wager;

function runTask() {
  coged_phase_count = 0;
  function populateChoice() {
    coged_phase = true;
    ai_condition = input['coged-order'][task_repeat][1].split(" ");
    baseline_condition = input['coged-order'][task_repeat][0].split(" ");
    if (ai_condition[0] == 'long') {
      document.getElementById("cost-of-AI").innerHTML = gold_cost_of_ai + " gold credits";
      document.getElementById("cost-of-human").innerHTML = cost_of_human + " gold credits";
      document.getElementById('gold-coin-image').style.display = 'inline-block';
      document.getElementById('silver-coin-image').style.display = 'none';
      document.getElementById('gold-coin-image-2').style.display = 'inline-block';
      document.getElementById('silver-coin-image-2').style.display = 'none';

     
    }
    else {
      document.getElementById("cost-of-AI").innerHTML = silver_cost_of_ai + " silver credits";
      document.getElementById("cost-of-human").innerHTML = cost_of_human + " silver credits";
      document.getElementById('silver-coin-image').style.display = 'inline-block';
      document.getElementById('gold-coin-image').style.display = 'none';
      document.getElementById('silver-coin-image-2').style.display = 'inline-block';
      document.getElementById('gold-coin-image-2').style.display = 'none';
    }
      document.getElementById('choose-AI').style.color = ai_colors[task_repeat];
      document.getElementById('choose-AI').style.backgroundColor = ai_background_colors[task_repeat];
      document.getElementById('choose-AI').style.border = ai_border[task_repeat];
      document.getElementById('choose-ai-name').innerHTML = ai_names[task_repeat];
  }
  var collaboration_count = 0;
  function collaborationCallBack() {
    response = readTaskResponse();
    if (response) {
      output['collaboration'][task_repeat].push(response)

      if (collaboration_count == input['collaboration'][task_repeat].length - 1) {
        $('.alert-link').unbind('click').click(function(){
            populateChoice()
            transition('task', 'choose')
            $('#coged-modal').modal('toggle')
            if (current_setting == 'long') {
              $('#coged-modal-text').html('Remember that 100 gold credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini.png"> is equal to a $0.10 bonus.')
            }
            else {
              $('#coged-modal-text').html('Remember that 100 silver credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png"> is equal to a $0.05 bonus.')
            }
          });
    }
    else {
      $('.alert-link').unbind('click').click(function() {
        collaboration_count +=1;
        renderTask(input['coged-order'][task_repeat][1], input['collaboration'][task_repeat][collaboration_count], collaborationCallBack);
        progress();
         });
    }
  }
}

  function taskCallBack() {
    response = readTaskResponse();
    if (response) {

      output['coged'][task_repeat].push(response)

      if (coged_phase_count == max_coged) {

          $('.alert-link').unbind('click').click(function(){

            transition('task', 'questionnaire');
            $('#questionnaire-ai-1').css('color',ai_colors[task_repeat]);
            $('#questionnaire-ai-1').html('AI ' + ai_names[task_repeat] + "\'s");
            $('#questionnaire-ai-2').css('color',ai_colors[task_repeat]);
            $('#questionnaire-ai-2').html('AI ' + ai_names[task_repeat]);
            $('#questionnaire-ai-3').css('color',ai_colors[task_repeat]);
            $('#questionnaire-ai-3').html('AI ' + ai_names[task_repeat]);
            $('#questionnaire-ai-4').css('color',ai_colors[task_repeat]);
            $('#questionnaire-ai-4').html('AI ' + ai_names[task_repeat] + "\'s");
            $('#questionnaire-ai-5').css('color',ai_colors[task_repeat]);
            $('#questionnaire-ai-5').html('AI ' + ai_names[task_repeat]);
            $('#questionnaire-ai-5a').css('color',ai_colors[task_repeat]);
            $('#questionnaire-ai-5a').html('AI ' + ai_names[task_repeat]);
            $('#questionnaire-ai-6').css('color',ai_colors[task_repeat]);
            $('#questionnaire-ai-6').html('AI ' + ai_names[task_repeat]);
            $('#questionnaire-ai-7').css('color',ai_colors[task_repeat]);
            $('#questionnaire-ai-7').html('AI ' + ai_names[task_repeat]);
            window.scrollTo(0,0); 
            $("#questionnaire-form-1")[0].reset();
            $("#questionnaire-form-2")[0].reset();
            $("#questionnaire-form-3")[0].reset();
            $("#questionnaire-form-4")[0].reset();
            $("#questionnaire-form-5")[0].reset();
            $("#questionnaire-form-6")[0].reset();
            $("#questionnaire-form-7")[0].reset();
            task_repeat += 1;
          });
        // }
      }
      else {
        populateChoice();
        $('.alert-link').unbind('click').click(
            ()=>transition('task', 'choose')
        )
      }
    }
  }

  $('#choose-human').click(function(){
    wager = 100;

    if (ai_condition[0] == 'long') {
      choice = {
      'length':'long',
      'task': 'baseline',
      'wager': wager,
      'lower': gold_lower_bound,
      'upper': gold_upper_bound,
      'balance': num_gold_credits}
   }
   else {
     choice = {
      'length':'short',
      'task': 'baseline',
      'wager': wager,
      'lower': silver_lower_bound,
      'upper': silver_upper_bound,
      'balance': num_silver_credits}
   }

    output['choices'][task_repeat].push(choice)

    gold_lower_bound = gold_cost_of_ai;
    silver_lower_bound = silver_cost_of_ai;
    gold_cost_of_ai = Math.round(average(gold_lower_bound, gold_upper_bound));
    silver_cost_of_ai = Math.round(average(silver_lower_bound, silver_upper_bound));
    transition("choose","task");
    renderTask(input['coged-order'][task_repeat][0], input['coged'][task_repeat][coged_phase_count], taskCallBack);
    coged_phase_count += 1;
  });

  $('#choose-AI').click(function(){
    var task = ai_condition[1]
    if (ai_condition[0] == 'long') {
      wager = gold_cost_of_ai;
      choice = {
      'length':'long',
      'task': task,
      'wager': wager,
      'lower': gold_lower_bound,
      'upper': gold_upper_bound,
      'balance': num_gold_credits}
    }
    else {
      wager = silver_cost_of_ai;
      choice = {
      'length':'short',
      'task': task,
      'wager': wager,
      'lower': silver_lower_bound,
      'upper': silver_upper_bound,
      'balance': num_silver_credits}
    }

    output['choices'][task_repeat].push(choice)

    gold_upper_bound = gold_cost_of_ai;
    silver_upper_bound = silver_cost_of_ai;
    gold_cost_of_ai = Math.round(average(gold_lower_bound, gold_upper_bound));
    silver_cost_of_ai = Math.round(average(silver_lower_bound, silver_upper_bound));
    transition("choose", "task");
    renderTask(input['coged-order'][task_repeat][1], input['coged'][task_repeat][coged_phase_count], taskCallBack);
    coged_phase_count += 1;
  });

  $('#begin-task-button').click(function() {
    output['coged'].push([])
    output['choices'].push([])
    output['collaboration'].push([])

    transition('begin-task', 'task');
    renderTask(input['coged-order'][task_repeat][1], input['collaboration'][task_repeat][collaboration_count], collaborationCallBack)
    collaboration_phase = true;
    coged_phase = false;
  })

  $('#repeat-task-button').click(function() {
    output['coged'].push([])
    output['choices'].push([])
    output['collaboration'].push([])

    populateChoice()

    collaboration_count = 0
    gold_lower_bound = 0
    gold_upper_bound = 100
    silver_lower_bound = 0
    silver_upper_bound = 100
    coged_phase_count = 0
    collaboration_phase = true;
    coged_phase = false;
    gold_cost_of_ai = Math.round(average(gold_lower_bound, gold_upper_bound));
    silver_cost_of_ai = Math.round(average(silver_lower_bound, silver_upper_bound));
    transition('repeat-task', 'task');
    renderTask(input['coged-order'][task_repeat][1], input['collaboration'][task_repeat][collaboration_count], collaborationCallBack)
  })

  // $('#end-task-button').click(function() {
  //   output['costs'].push(gold_cost_of_ai)
  //   output['final_balance'] = num_gold_credits
  //   transition('end-task', 'questionnaire-human');
  //   $('#progress-text').html(progress_bar_text[progress_num]);
  //   progress_num += 1;
  //   coged_phase = false;
  // })
}

var question_start_time;
var question_stop_time;

function readTaskResponse() {

  question_stop_time = Date.now()

  var mode;
  if (tutorial_phase) {
    mode = 'tutorial'
  }
  else if (training_phase) {
    mode = 'training'
  }
  else if (coged_phase) {
    mode = 'coged'
  }
  else if (collaboration_phase) {
    mode = 'collaboration'
  }

  let questions = ['#q1','#q2', '#q3', '#q4'];
  let labels = ['#q1-label', '#q2-label', '#q3-label', '#q4-label']
  let checked_question = false;
  let checked_question_label = null;
  var correct_label = current_question['correct_response'];

  for (let i = 0; i < questions.length; i++) {
    var input = $(questions[i])
    var label = $(labels[i])

    if(input.is(":checked")) {
      checked_question = true;
      checked_question_label = label.html();
    }
  }

  if (!checked_question) {
    alert("Please select an answer.")
    return null
  }
  else {
    answer = {
      'mode': mode,
      'setting': current_setting,
      'condition': current_condition,
      'id': current_question['id'],
      'response': checked_question_label,
      'correct_response': correct_label,
      'model_response': current_question['model_response'],
      'time': (question_stop_time - question_start_time) / 1000,
      'scroll': current_label
    }

    $("#question-box").addClass('muted')
    $('#answer-question').attr('disabled', true)
    $('#q1,#q2,#q3,#q4').attr('disabled', true)

    for (let i = 0; i < labels.length; i++) {
      var label = $(labels[i])
      if (label.html() == correct_label) {
        label.css('font-weight', 'bold')
        label.append(' <span class="badge badge-success">Correct</span>')
      }
    }
    
    if (checked_question_label == correct_label) {
      // alert("Correct!")
      $('.alert-success').show()

      if (mode == 'coged') {
        if (ai_condition[0] == 'long'){
          num_gold_credits += wager;
          $('#gold-credits').text(num_gold_credits)
        }
        else {
          num_silver_credits += wager;
          $('#silver-credits').text(num_silver_credits)
        }
      }
      else if (mode == 'collaboration'){
        if (ai_condition[0] == 'long'){
          num_gold_credits += collaboration_wager;
          $('#gold-credits').text(num_gold_credits)
        }
        else {
          num_silver_credits += collaboration_wager;
          $('#silver-credits').text(num_silver_credits)
        }
      }
      else if (mode == 'training'){
        if (training_phase_order[training_phase_count].split(" ")[0] == 'long'){
          num_gold_credits += 100;
          $('#gold-credits').text(num_gold_credits)
        }
        else {
          num_silver_credits += 100;
          $('#silver-credits').text(num_silver_credits)
        }
      }
    } else {
      $('.alert-danger').show()
      // alert("Incorrect. The correct answer was: " + correct_label)
    }
    // TODO
    return answer
  }
}

var current_question;
var current_condition;
var current_setting;
function renderTask(condition, data, callback=null) {
  curr = condition.split(" ");
  current_question = data;
  current_condition = curr[1];
  current_setting = curr[0];
  // reset state and load elements
  window.scrollTo(0,0); 
  qBox = $("#question-box");
  qForm = $("#question-response-form");
  qBox.removeAttr('style');
  qBox.removeClass();
  qForm[0].reset();
  contextText = $("#context-text");
  contextText.empty()

  // Scroll Tracking
  current_label = "0%";
  var tracker = window.ScrollTracker({
        context: '#context-text'
      });

  tracker.on({
   percentages: {
    every: [5]
    }
  }, function(evt) {
    current_label = evt.data.label
  });

  // End of scroll tracking

  $('#answer-question').attr('disabled', false)
  $('#q1,#q2,#q3,#q4').attr('disabled', false)
  $('#q1-label,#q2-label,#q3-label,#q4-label').css('font-weight', '')
  $('.alert-link').unbind('click')
  $('.alert').hide()

  // parse and load data
  if (current_setting == 'short') {
    idx_list = data['short_text']
  } 
  else if (current_setting == 'long') {
    idx_list = data['long_text']
  }

  var innerContextHTML = '';
  for (var i = 0; i < idx_list.length; i++) {
    innerContextHTML += data['text'][idx_list[i]]
  }
  contextText.html(innerContextHTML)
  contextText.disableFind()
  contextText.bind('copy paste cut',function(e) {
      e.preventDefault(); return false; 
  });

  $('#question-text').html(data['question'])
  $('#model-prediction').html(data['model_response'])
  $('#confidence').html(data['confidence'])

  let labels = ['#q1-label', '#q2-label', '#q3-label', '#q4-label']
  shuffle(labels)
  for (let i = 0; i < labels.length; i++) {
    $(labels[i]).html(data['possible_answers'][i])
  }

  // style box correctly
  highlights = $('.answer-highlight, .question-highlight, .main-highlight')
  predBox = $('#model-prediction-box')

  if (current_condition == 'baseline') {
    qBox.toggleClass('baseline-box');
    highlights.addClass('no-highlight')
    predBox.hide()
  } 
  else if (current_condition == 'prediction') {
    qBox.toggleClass('ai-box');
    highlights.addClass('no-highlight')
    predBox.show()

  }
  else if (current_condition == 'xai') {
    qBox.toggleClass('ai-box');
    highlights.removeClass('no-highlight')
    predBox.show()
  }

  if (training_phase) {
    if (training_phase_count == 0 || training_phase_count == 3) { 
      $('#training-modal').modal('toggle')

      if (current_setting == 'long') {
        $('#training-modal-text').html('You will complete the next 3 question answering tasks by youself and receive 100 gold credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini.png"> for each question you answer correctly. These passages are long, which is why you receive gold credits.')
      }
      else {
        $('#training-modal-text').html('You will complete the next 3 question answering tasks by youself and receive 100 silver credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png"> for each question you answer correctly. These passages are short, which is why you receive silver credits.')
      }
    }
  }

  if (!tutorial_phase) {
    predBox.css('backgroundColor',model_prediction_background_colors[task_repeat])
    $('#task-ai-name').html('AI ' + ai_names[task_repeat] + "\'s")
    $('.ai-box').css('backgroundColor', ai_box_background_colors[task_repeat])
    $('.ai-box').css('border', ai_box_border[task_repeat])
  }

  // enable callbacks
  if (callback) {
    $('#answer-question').unbind('click').click(callback)
  }

  question_start_time = Date.now()
}

function questionnaireCallback() {
    if (ai_condition[0] == 'long') {
    output['costs'].push({'final cost' : gold_cost_of_ai, 'length': 'long', 'task':ai_condition[1], 'coin': 'gold'})
   }
   else {
     output['costs'].push({'final cost' : silver_cost_of_ai, 'length': 'short', 'task':ai_condition[1], 'coin': 'silver'})
   }

  let questions = ['#Q-1','#Q-2', '#Q-3', '#Q-4'];
  let total_checked = 0;

  let q_response = {}

  for (let i = 0; i < questions.length; i++) {
    for (let j = 0; j < 5; j++) {
      if ($(questions[i] + "-" + (j+1)).is(":checked")) {

        q_response[questions[i].slice(1)] = j+1
        total_checked += 1;
      }
    }
  }

  q_response['value-of-range'] = document.querySelector('#value-of-range').value;
  q_response['AI-usage'] = $("#AI-usage").val();
  q_response['choice-selection'] = $("#choice-selection").val();



  if (total_checked == questions.length && slider_changed == true 
    && $.trim($("#AI-usage").val()) && $.trim($("#choice-selection").val())) {
    output['questionnaire-'+task_repeat] = q_response

    if (task_repeat < max_repeat) {
      transition("questionnaire","repeat-task");
      repeatTask(input['coged-order'][task_repeat][1]);
      }
    else {
      transition("questionnaire","questionnaire-human");
      output['final_balance'] = { 
        'gold': num_gold_credits,
        'silver': num_silver_credits
      }
      $('#progress-text').html(progress_bar_text[progress_num]);
      progress_num += 1;
      coged_phase = false;
    }
  } else {
    if (total_checked != questions.length) {
      alert("Please answer all of the questions.")
    }
    else if (slider_changed == false) {
      alert("Please answer the slider question.")
    }
    else if (!$.trim($("#AI-usage").val()) || !$.trim($("#choice-selection").val())) {
      alert("Please input your response in the text box.")
    }
   }
 } 

function questionnaireHumanCallback() {
  // window.scrollTo(0,0);
  let questions = ['#NFC-1','#NFC-2', '#NFC-3', '#NFC-4', '#NFC-5', '#NFC-6'];
  let total_checked = 0;

  let nfc_response = {}

  for (let i = 0; i < questions.length; i++) {
    for (let j = 0; j < 5; j++) {
      if ($(questions[i] + "-" + (j+1)).is(":checked")) {

        nfc_response[questions[i].slice(1)] = j+1
        total_checked += 1;
      }
    }
  }

  if (total_checked == questions.length) {
    output['nfc'] = nfc_response
    transition("questionnaire-human","feedback");
    $('#progress-text').html(progress_bar_text[progress_num]);
    progress_num += 1;
  } else {
    alert("Please answer all of the questions.")
  }
 } 

function repeatTask(condition, id ='switch-tasks') {
      var coin_id;
      var length_id;
      var explanation_id;
      if (id == 'switch-tasks') {
        coin_id = '#bonus-repeat-task'
        length_id = "#length-repeat-task"
        explanation_id = "#xai-repeat-task"
      }
      else {
        coin_id = '#bonus-begin-task'
        length_id = "#length-begin-task"
        explanation_id = "#xai-begin-task"
      }
      curr = condition.split(" ");
      current_length = curr[0];
      current_xai_setting = curr[1];
      $('#' + id).html("AI " + (ai_names[task_repeat]))
      $('#' + id).css('color', ai_colors[task_repeat])
      if (current_length == 'long') {
          $(coin_id).html('50 gold credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini.png">')
          $(length_id).html('long, which is why you receive gold credits')
      }
        else {
          $(coin_id).html('50 silver credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png">')
          $(length_id).html('short, which is why you receive silver credits')
     }
     if (current_xai_setting == 'xai') {
        $(explanation_id).css('display','inline-block')
        $('.main-highlight').removeClass('no-highlight')
     }
     else {
       $(explanation_id).css('display','none')
     }

}

function feedbackCallback() {
  output['feedback'] = $('#feedbackform').val();
  transition("feedback","submission");
  $('#progress-text').html(progress_bar_text[progress_num]);
    progress_num += 1;
}

function saveOutput() {
  output['total_time'] = (Date.now() - startTime) / 1000;
  //https://stackoverflow.com/questions/28464449/how-to-save-json-data-locally-on-the-machine
  // function saveText(text, filename){
  //   var a = document.createElement('a');
  //   a.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(text));
  //   a.setAttribute('download', filename);
  //   a.click()
  // } 
  // saveText(JSON.stringify(output), Date.now())
  // if (easyturk.isPreview()) {
  //   alert("This is only a preview. Here is your output: \n" + JSON.stringify(output));
  //   return false;
  // } else {
    proliferate.submit(output)
    // easyturk.setOutput(output);
    //return true;
  // }
}

// Enable the UI.
function enableTask() {
  enabled = true;
  // easyturk.setupSubmit();
  

  // Enable components
  $('#consent-button').click(consentCallback);

  $('#demographic-button').click(demographicsCallback);

  $('#questionnaire-button').click(questionnaireCallback);

  $('#questionnaire-human-button').click(questionnaireHumanCallback);

  $('#feedback-button').click(feedbackCallback);

  $('#submit-btn').click(saveOutput);

}

function outputUpdate(vol) {
  document.querySelector('#value-of-range').value = vol + "%";
}

function setSlider(bool) {
  slider_changed = bool;
}

main();



// disables CMD + F
// https://stackoverflow.com/questions/7091538/is-it-possible-to-disable-ctrl-f-of-find-in-page 
window.addEventListener("keydown",function (e) {
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 70) { 
      e.preventDefault();
    }
})

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})