var startTime;

function main() {
  // If this is a HIT on AMT, then replace the default input with the real
  // input.
  // input = easyturk.getInput(input);
  // console.log(input);

  // Enable the task.
  // if (!easyturk.isPreview()){
    enableTask();
  // }

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
  window.scrollTo(0,0); 
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
    // $('#progress-bar').attr('aria-valuenow', Math.round(progress_bar_current)).css('width', Math.round(progress_bar_current)+'%');
    // document.getElementById("progress-bar").innerHTML = Math.round(progress_bar_current) + '%';
}


function consentCallback() {
  startTime = Date.now()
  if ($("#agree").is(":checked")) {
    output['consent'] = 'agree'
    transition("onboarding", "demographics");
    // only for debugging submission
    // transition("onboarding", "questionnaire");
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
    alert('Please answer the question about your ID');
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
    // uncomment the following for real task 
    // transition("demographics", "tutorial-start");
    // uncomment the following for between subjects without training
     // transition("demographics", 'begin-task');
     // repeatTask(input['coged-order'][task_repeat][1], 'collaboration-task-first-text')
     // runTask();
     // training_phase = false;
    // uncomment the following for between subjects with training
     transition('demographics', 'training-intermediate');
     runTrainingAI();
     // var training_credits_text = ""
     // if (curr_reward_system == "overreliance") {
     //    training_credits_text += "You will only get rewarded for the question if BOTH you and the AI are correct. "
     //    // $("#training-credits-overreliance").show()
     // }

     if (ai_condition[0] == 'short') {
        // "Gained" writing
        // $('#training-credits').html('For each question you get correct alone, you will gain 100 silver credits<img src="https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png">, which is equal to $0.05. ')
        
        // "Receive" writing
        // $('#training-credits').html('For each question you get correct alone, you will receive 50 silver credits<img src="https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png">, which is equal to $0.025.')
        // $('#training-credits').html('For each question you get correct alone, you will receive 100 silver credits<img src="https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png">, which is equal to $0.05.')
        // $('#training-credits-ai').html('For each question you get correct with the AI, you will receive 50 silver credits<img src="https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png">, which is equal to $0.025.')

        // if (curr_reward_system == "overreliance") {
        //   training_credits_text += "You will only get rewarded for the question if BOTH you and the AI are correct. "
        //   training_credits_text += 'For each question that you answer correctly AND that the AI answers correctly, you will gain 50 silver credits<img src="https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png">, which is equal to $0.025. '
        //   training_credits_text += "<strong>If you answer a question correctly that the AI answered incorrectly, you will receive 0 silver credits. "
        //   $("#training-reward-table").html("You can also view the reward format in the table below. <br><br> <img src=\"https://cs.stanford.edu/people/joerke/xai/overreliance-short.svg\">")
        // }
        // else if (curr_reward_system == "double") {
        //   $("#training-credits-double").show()
        //   training_credits_text += 'For each question that you answer correctly and that the AI answers correctly, you will gain 50 silver credits<img src="https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png">, which is equal to $0.025. '  
        //   training_credits_text += "However, if you answer a question correctly that the AI answered incorrectly, you will gain 10x credits (in this case, 500 silver credits = $0.25). "
        //   if (curr_penalty_system) {
        //     training_credits_text += "For each question you get incorrect with the AI, you will lose the amount of credits offered."
        //   }
        //   $("#training-reward-table").html("You can also view the reward format in the table below. <br><br> <img src=\"https://cs.stanford.edu/people/joerke/xai/verification-10x.svg\">")
        // }
        // else {

          // "Gained" writing
          // training_credits_text += 'For each question that you answer correctly, you will gain 50 silver credits<img src="https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png">, which is equal to $0.025. '
        
        // }
     }
     else {
        // "Gained" writing
        // $('#training-credits').html('For each question you get correct alone, you will gain 100 gold credits<img src="https://cs.stanford.edu/people/joerke/xai/coin-mini.png">, which is equal to $0.10. ')
        
        // "Receive" writing
        // $('#training-credits').html('For each question you get correct alone, you will receive 50 gold credits<img src="https://cs.stanford.edu/people/joerke/xai/coin-mini.png">, which is equal to $0.05.')
        // $('#training-credits').html('For each question you get correct alone, you will receive 100 gold credits<img src="https://cs.stanford.edu/people/joerke/xai/coin-mini.png">, which is equal to $0.10.')
        // $('#training-credits-ai').html('For each question you get correct with the AI, you will receive 50 gold credits<img src="https://cs.stanford.edu/people/joerke/xai/coin-mini.png">, which is equal to $0.05.')


        // if (curr_reward_system == "overreliance") {
        //   training_credits_text += "You will only get rewarded for the question if BOTH you and the AI are correct. "
        //   training_credits_text += 'For each question that you answer correctly AND that the AI answers correctly, you will gain 50 gold credits<img src="https://cs.stanford.edu/people/joerke/xai/coin-mini.png">, which is equal to $0.05. '  
        //   training_credits_text += "<strong>If you answer a question correctly that the AI answered incorrectly, you will receive 0 gold credits. "
        //   $("#training-reward-table").html("You can also view the reward format in the table below. <br><br> <img src=\"https://cs.stanford.edu/people/joerke/xai/overreliance.svg\">")
        // }
        // else if (curr_reward_system == "double") {
        //   $("#training-credits-double").show()
        //   training_credits_text += 'For each question that you answer correctly and that the AI answers correctly, you will gain 50 gold credits<img src="https://cs.stanford.edu/people/joerke/xai/coin-mini.png">, which is equal to $0.05. '  
        //   training_credits_text += "However, if you answer a question correctly that the AI answered incorrectly, you will gain 10x credits (in this case, 500 gold credits = $0.5). "
        //   if (curr_penalty_system) {
        //     training_credits_text += "For each question you get incorrect with the AI, you will lose the amount of credits offered."
        //   }
        //   $("#training-reward-table").html("You can also view the reward format in the table below. <br><br> <img src=\"https://cs.stanford.edu/people/joerke/xai/verification.svg\">")
        // }
        // else {

          // "Gained" writing
          // training_credits_text += 'For each question that you answer correctly, you will gain 50 gold credits<img src="https://cs.stanford.edu/people/joerke/xai/coin-mini.png">, which is equal to $0.05. '   
        
        // }
     }

    // if (curr_reward_system == "overreliance") {
    //     training_credits_text += "<strong>If you answer a question correctly that the AI answered incorrectly, you will receive 0 silver credits. "
    //     // $("#training-credits-overreliance").show()
    //  }

    // "Gained" writing
    // $('#training-credits-ai').html(training_credits_text)

     // $('#credits-box').show()
     // if (ai_condition[0] == 'short') {
     //    $('#silver-credits-box').show()
     // }
     // else {
     //    $('#gold-credits-box').show()
     //    // uncomment if you want to have a modal for the long task 
     //    // $('#post-demographics-long-modal').modal('toggle')
     // }
    // uncomment the following for dummy task
    // transition("demographics", "submission");
    // runTutorial();
    $('#progress-text').html(progress_bar_text[progress_num]);
    save_progress_text = progress_num
    progress_num += 1;
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
      intro: 'For each task, you will be asked to answer a <strong>multiple-choice question</strong> about the provided text passage on the left.<br><br>For now, you do not need to worry about answering the question correctly. Later on in the study, you will be asked to complete questions like this by yourself.'
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
      intro: "You will have to decide whether to accept the AI's suggested answer or not. In this case, the AI's suggestion is correct."
      // intro: "This AI is 80% accurate, which means that its suggestions <strong>will not always be correct</strong>. You will have to decide for yourself whether to accept its suggested answer or not. In this case, the AI's suggestion is correct."
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
      // renderTask(tutorial_setting + " " + 'baseline', input['tutorial'][0])
      renderTask(tutorial_setting + " " + 'baseline', input['tutorial'][0], dimensions['tutorial'][0])
      $('#answer-question').attr('disabled', true)
      $('#q1,#q2,#q3,#q4').attr('disabled', true)
    // transition from task back to choice
    } else if (this._currentStep == 5) {
      transition('task', 'tutorial-choose');

    // second transition from choice to task
    } else if (this._currentStep == 6) {
      transition("tutorial-choose","task");
      renderTask(tutorial_setting + " " + tutorial_task, input['tutorial'][0], dimensions['tutorial'][0])
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
    $('#tutorial-acc-score').html(curr_acc_score)

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
  $('#progress-box').show()


  function trainingCallback() {
    response = readTaskResponse()

    if (response) {
      output['training'].push(response)

      if (training_phase_count == training_phase_order.length - 1) {
        if (compare_conditions && compare_conditions_training_phase_num == 0) {
          compare_conditions_training_phase_num += 1
          ai_condition[1] = 'prediction'
          training_phase_order_ai = training_phase_order_ai_pred
        }
        runTrainingAI();
        $('.alert-link').unbind('click').click(function() {
          transition('task', 'training-intermediate')
        }
        )
      }
      else {
        training_phase_count += 1;
        $('.alert-link').unbind('click').click(function() {
          renderTask(training_phase_order[training_phase_count], input['training'][0][training_phase_count], 
            dimensions['training'][0][training_phase_count]);
          progress();
        })
      }
    }
  }

  $('#training-start-button').click(function() {
    transition('training-start', 'task');
    renderTask(training_phase_order[0], input['training'][0][0], dimensions['training'][0][0], trainingCallback)

  })
}

  function runTrainingAI() {
  training_phase_ai = true;
  training_phase_count_ai = 0;
  if (compare_conditions && compare_conditions_training_phase_num == 1) {
    $('#training-ai-name').css('color',ai_colors[task_repeat]);
    $('#training-ai-name').html('the AI');
  }
  else {
    $('#training-ai-name').css('color',ai_colors[task_repeat]);
    $('#training-ai-name').html('the AI');
  }
  $('#training-ai-acc').html(curr_acc_score);
  if (ai_condition[1] == 'xai') {
    $('#xai-begin-training').css('display','inline-block')
    $('.main-highlight').removeClass('no-highlight')
  }
  else {
    $('#xai-begin-training').css('display','none')
  }

  function trainingCallback() {
    response = readTaskResponse()

    if (response) {
      output['training'].push(response)

      if (training_phase_count_ai == training_phase_order_ai.length - 1) {
        if (compare_conditions && compare_conditions_training_phase_num == 1) {
          compare_conditions_training_phase_num += 1
          ai_condition[1] = 'xai'
          training_phase_order_ai = [coged_order_temp[0][1], coged_order_temp[0][1], coged_order_temp[0][1], 
                              coged_order_temp[0][1], coged_order_temp[0][1]]
          runTrainingAI();
          $('.alert-link').unbind('click').click(function() {
            transition('task', 'training-intermediate')
            $('#training-ai-name').css('color',ai_colors[task_repeat]);
            $('#training-ai-name').html('the AI');
            $('#training-ai-acc').html(curr_acc_score);
            $('#training-same-AI-text').show()
            if (ai_condition[1] == 'xai') {
              $('#xai-compare-training').show()
              $('#training-same-AI-text').show()
              $('.main-highlight').removeClass('no-highlight')
            }
            else {
              $('#xai-compare-training').css('display','none')
            }
          })
        }
        else {
          $('.alert-link').unbind('click').click(function() {
            //transition('task', 'training-end')
            transition('task', 'begin-task');
            $('#gold-credits').hide()
            $('#silver-credits').hide()
            $('#total-credits').hide()
            repeatTask(input['coged-order'][task_repeat][1], 'collaboration-task-first-text')
            runTask();
            $('#progress-text').html(progress_bar_text[progress_num]);
            progress_num += 1;
            training_phase = false;
            training_phase_ai = false;
            output['coged-order'] = input['coged-order']
          })
        }
      }
      else {
        training_phase_count_ai += 1;
        $('.alert-link').unbind('click').click(function() {
          if (compare_conditions && compare_conditions_training_phase_num == 2) {
            renderTask(training_phase_order_ai[training_phase_count_ai], input['training-AI-compare'][training_phase_count_ai], 
              dimensions['training-AI-compare'][0][training_phase_count_ai]);
          }
          else {
            renderTask(training_phase_order_ai[training_phase_count_ai], input['training-AI'][0][training_phase_count_ai],
              dimensions['training-AI'][0][training_phase_count_ai]);
          }
          progress();
        })
      }
    }
  }
  $('#training-intermediate-button').click(function() {
    training_phase = false;
    transition('training-intermediate', 'task');
    if (compare_conditions && compare_conditions_training_phase_num == 2) {
      renderTask(training_phase_order_ai[0], input['training-AI-compare'][0][0], dimensions['training-AI-compare'][0][0], trainingCallback)
    }
    else {
      renderTask(training_phase_order_ai[0], input['training-AI'][0][0], dimensions['training-AI'][0][0], trainingCallback)
    }
  })
}





  $('#training-end-button').click(function() {
    transition('training-end', 'begin-task');
    $('#gold-credits').hide()
    $('#silver-credits').hide()
    $('#total-credits').hide()
    repeatTask(input['coged-order'][task_repeat][1], 'collaboration-task-first-text')
    runTask();
    $('#progress-text').html(progress_bar_text[progress_num]);
    progress_num += 1;
    training_phase = false;
    training_phase_ai = false;
    output['coged-order'] = input['coged-order']
    // transition('training-end', 'questionnaire-trust');
    // if (anthropomorphic == true) {
    //   $('#questionnaire-ai-1-trust').css('color',ai_colors[task_repeat]);
    //   $('#questionnaire-ai-1-trust').html('AI ' + ai_names[task_repeat]);
    //   $('#questionnaire-ai-2-trust').css('color',ai_colors[task_repeat]);
    //   $('#questionnaire-ai-2-trust').html('AI ' + ai_names[task_repeat]);
    //   $('#questionnaire-ai-3-trust').css('color',ai_colors[task_repeat]);
    //   $('#questionnaire-ai-3-trust').html('AI ' + ai_names[task_repeat]);
    //   $('#questionnaire-ai-4-trust').css('color',ai_colors[task_repeat]);
    //   $('#questionnaire-ai-4-trust').html('AI ' + ai_names[task_repeat]);
    //   $('#questionnaire-ai-5-trust').css('color',ai_colors[task_repeat]);
    //   $('#questionnaire-ai-5-trust').html('AI ' + ai_names[task_repeat]);
    //   $('#questionnaire-ai-6-trust').css('color',ai_colors[task_repeat]);
    //   $('#questionnaire-ai-6-trust').html('AI ' + ai_names[task_repeat]);
    // }
    // else {
    //   $('#questionnaire-ai-1-trust').css('color',ai_colors[task_repeat]);
    //   $('#questionnaire-ai-1-trust').html('the AI');
    //   $('#questionnaire-ai-2-trust').css('color',ai_colors[task_repeat]);
    //   $('#questionnaire-ai-2-trust').html('the AI');
    //   $('#questionnaire-ai-3-trust').css('color',ai_colors[task_repeat]);
    //   $('#questionnaire-ai-3-trust').html('the AI');
    //   $('#questionnaire-ai-4-trust').css('color',ai_colors[task_repeat]);
    //   $('#questionnaire-ai-4-trust').html('the AI');
    //   $('#questionnaire-ai-5-trust').css('color',ai_colors[task_repeat]);
    //   $('#questionnaire-ai-5-trust').html('the AI');
    //   $('#questionnaire-ai-6-trust').css('color',ai_colors[task_repeat]);
    //   $('#questionnaire-ai-6-trust').html('the AI');
    // }
    // window.scrollTo(0,0); 
    // $("#questionnaire-form-1-trust")[0].reset();
    // $("#questionnaire-form-2-trust")[0].reset();
    // $("#questionnaire-form-3-trust")[0].reset();
    // $("#questionnaire-form-4-trust")[0].reset();
    // $("#questionnaire-form-5-trust")[0].reset();
    // $("#questionnaire-form-6-trust")[0].reset();
  })



var wager;

function runTask() {
  coged_phase_count = 0;
  function populateChoice() {
    coged_phase = true;
    ai_condition = input['coged-order'][task_repeat][1].split(" ");
    baseline_condition = input['coged-order'][task_repeat][0].split(" ");
    if(curr_choose_coged[num_comparative] == "human-forced-AI") {
      $(choose_text_AI).html("Only use the AI's response")
    }
    else if (compare_conditions) {
      $(choose_text_baseline).html("Only get suggestion from AI")
      $(choose_text_AI).html("Get suggestion and explanation from AI")
      baseline_condition[1] = 'prediction'
    }
    else {
      $(choose_text_AI).html("Get suggestion from AI")
    }
    if (ai_condition[0] == 'long') {
      $(choose_cost_AI).html(gold_cost_of_ai + " gold credits")
      $(choose_cost_human).html(cost_of_human + " gold credits")
      $(choose_silver_img).css('display','none')
      $(choose_gold_img).css('display','inline-block')
      $(choose_gold_img_2).css('display','inline-block')
      $(choose_silver_img_2).css('display','none')
    }
    else {
      $(choose_cost_AI).html(silver_cost_of_ai + " silver credits")
      $(choose_cost_human).html(cost_of_human + " silver credits")
      $(choose_silver_img).css('display','inline-block')
      $(choose_gold_img).css('display','none')
      $(choose_gold_img_2).css('display','none')
      $(choose_silver_img_2).css('display','inline-block')
    }
    if (compare_conditions) {
      $(choose_human_type).css('color', ai_colors[task_repeat])
      $(choose_human_type).css('backgroundColor', ai_background_colors[task_repeat])
      $(choose_human_type).css('border', ai_border[task_repeat])
    }
      $(choose_AI_type).css('color', ai_colors[task_repeat])
      $(choose_AI_type).css('backgroundColor', ai_background_colors[task_repeat])
      $(choose_AI_type).css('border', ai_border[task_repeat])
      $(choose_AI_name).html(ai_names[task_repeat])
  }
  var collaboration_count = 0;
  function collaborationCallBack() {
    response = readTaskResponse();
    if (response) {
      // output['collaboration'][task_repeat].push(response)
      output['collaboration'].push(response)
      if (collaboration_count == input['collaboration'][task_repeat].length - 1) {
        $('.alert-link').unbind('click').click(function(){
          if (have_coged_phase) {
            transition('task', 'coged-task')
          $('#coged-ai-name').css('color',ai_colors[task_repeat]);
          $('#coged-ai-name').html('the AI\'s');
          if (compare_conditions) {
            $('#coged-DIY-AI').hide()
            $('#coged-AI-xai').show()
            $("#summary-coged-change-AI-compare").show()
            $("#coged-DIY-AI-attention").hide()
            $("#coged-AI-xai-attention").show()
          }
          else {
            $('#coged-DIY-AI').show()
            $('#coged-AI-xai').hide()
            $("#summary-coged-change-AI-compare").hide()
            $("#coged-DIY-AI-attention").show()
            $("#coged-AI-xai-attention").hide()
          }
          if (current_length == 'long') {
            $("#coged-text-long").show()
              if (curr_reward_system == "overreliance") {
              $("#coged-text-overreliance-long").show()
              $("#reward-table-coged-overreliance-long").show()
              }
              else if (curr_reward_system == "double") {
                $("#coged-text-double-long").show()
                $("#reward-table-coged-double-long").show()
                if (curr_penalty_system) {
                  $('#coged-text-penalty').show()
                }
              }
            }
            else {
              $("#coged-text-short").show()
              if (curr_reward_system == "overreliance") {
                $("#coged-text-overreliance-short").show()
                $("#reward-table-coged-overreliance-short").show()
              }
              else if (curr_reward_system == "double") {
                $("#coged-text-double-short").show()
                $("#reward-table-coged-double-short").show()
                if (curr_penalty_system) {
                  $('#coged-text-penalty').show()
                }
              }
          }
          if(curr_choose_coged[num_comparative] == "human-forced-AI") {
            $("#coged-forced-AI").show()
            $("#summary-coged-change-forced-AI").show()

            $("#coged-AI").hide()
            $("#summary-coged-change-AI").hide()
          }
          else if (curr_choose_coged[num_comparative] == "human-AI") {
            $("#coged-AI").show()
            $("#summary-coged-change-AI").show()

            $("#coged-forced-AI").hide()
            $("#summary-coged-change-forced-AI").hide()
          }
          }
          else {
            transition('task', 'questionnaire-trust')
            FillQuestionnaireTrust()
          }
          });
          
    }
    else {
      $('.alert-link').unbind('click').click(function() {
        collaboration_count +=1;
        renderTask(input['coged-order'][task_repeat][1], input['collaboration'][0][collaboration_count], 
          dimensions['collaboration'][0][collaboration_count], collaborationCallBack);
        progress();
         });
    }
  }
}

$('#coged-task-button').click(function() {
    populateChoice()
    transition('coged-task', choose_type)
    if (curr_reward_system == "overreliance") {
      $('#coged-modal-overreliance').show()
      $('#coged-modal-double').hide()
      $('#coged-modal-penalty').hide()
    }
    if (curr_reward_system == "double") {
      $('#coged-modal-double').show()
      $('#coged-modal-overreliance').hide()
      $('#coged-modal-penalty').hide()
    }
    if (curr_penalty_system) {
      $('#coged-modal-penalty').show()
      $('#coged-modal-overreliance').hide()
      $('#coged-modal-double').hide()
    }
    if(curr_choose_coged[num_comparative] == "human-forced-AI") {
      $("#coged-modal-forced-AI").show()
      $("#coged-modal-AI").hide()
    }
    else if(curr_choose_coged[num_comparative] == "human-AI") {
      $("#coged-modal-forced-AI").hide()
      $("#coged-modal-AI").show()
    }
    if (compare_conditions) {
      $('#coged-modal-AI-xai').show()
    }
    else {
      $('#coged-modal-DIY-AI').show()
    }
    $('#coged-modal').modal('toggle')

});

  function taskCallBack() {
    response = readTaskResponse();
    if (response) {

      // output['coged'][task_repeat].push(response)
      output['coged'].push(response)

      if (coged_phase_count == max_coged) {

          $('.alert-link').unbind('click').click(function(){
            if (comparative_coged && num_comparative == 0) {
               if (ai_condition[0] == 'long') {
                 output['costs'].push({'final cost': gold_cost_of_ai, 
                                       'length': 'long', 
                                       'task': ai_condition[1], 
                                       'coin': 'gold',
                                       'model_acc':curr_acc_score,
                                       'strategy': curr_reward_system,
                                       // 'choice-type': curr_choose_coged[num_comparative],
                                       'coged-comparison': compare_conditions_type,
                                       'coged-available': coged_available})
              }
              else {
                output['costs'].push({'final cost': silver_cost_of_ai, 
                                     'length': 'short',
                                     'task': ai_condition[1], 
                                     'coin': 'silver',
                                     'model_acc': curr_acc_score,
                                     'strategy': curr_reward_system,
                                     // 'choice-type': curr_choose_coged[num_comparative],
                                      'coged-comparison': compare_conditions_type,
                                    'coged-available': coged_available})
              }
              num_comparative +=1
              transition('task', 'coged-task')
              if(curr_choose_coged[num_comparative] == "human-forced-AI") {
                $("#coged-forced-AI").show()
                $("#coged-AI").hide()
                $("#summary-coged-change-forced-AI").hide()
                $("#summary-coged-change-AI").hide()
                $("#summary-coged-change-forced-AI-second").show()
                $("#summary-coged-change-AI-second").hide()
              }
              else {
                $("#coged-forced-AI").hide()
                $("#coged-AI").show()
                $("#summary-coged-change-forced-AI-second").hide()
                $("#summary-coged-change-AI-second").show()
                $("#summary-coged-change-forced-AI").hide()
                $("#summary-coged-change-AI").hide()
              }
              coged_phase_count = 0
              gold_lower_bound = 0
              gold_upper_bound = 100
              silver_lower_bound = 0
              silver_upper_bound = 100
              gold_cost_of_ai = Math.round(average(gold_lower_bound, gold_upper_bound));
              silver_cost_of_ai = Math.round(average(silver_lower_bound, silver_upper_bound));
            }
            else {
              transition('task', 'questionnaire-trust');
              FillQuestionnaireTrust()
              $('#progress-box').hide()
            }
          });
        // }
      }
      else {
        populateChoice();
        $('.alert-link').unbind('click').click(
            ()=>transition('task', choose_type)
        )
      }
    }
  }


  function FillQuestionnaireTrust() {
    if (anthropomorphic == true) {
      $('#questionnaire-ai-1-trust').css('color',ai_colors[task_repeat]);
      $('#questionnaire-ai-1-trust').html('AI ' + ai_names[task_repeat]);
      $('#questionnaire-ai-2-trust').css('color',ai_colors[task_repeat]);
      $('#questionnaire-ai-2-trust').html('AI ' + ai_names[task_repeat]);
      $('#questionnaire-ai-3-trust').css('color',ai_colors[task_repeat]);
      $('#questionnaire-ai-3-trust').html('AI ' + ai_names[task_repeat]);
      $('#questionnaire-ai-4-trust').css('color',ai_colors[task_repeat]);
      $('#questionnaire-ai-4-trust').html('AI ' + ai_names[task_repeat]);
      $('#questionnaire-ai-5-trust').css('color',ai_colors[task_repeat]);
      $('#questionnaire-ai-5-trust').html('AI ' + ai_names[task_repeat]);
      $('#questionnaire-ai-6-trust').css('color',ai_colors[task_repeat]);
      $('#questionnaire-ai-6-trust').html('AI ' + ai_names[task_repeat]);
    }
    else {
      // if (compare_conditions) {
      //   $('#questionnaire-ai-1-trust').html('the AI');
      //   $('#questionnaire-ai-2-trust').html('the AI');
      //   $('#questionnaire-ai-3-trust').html('the AI');
      //   $('#questionnaire-ai-4-trust').html('the AI');
      //   $('#questionnaire-ai-5-trust').html('the AI');
      //   $('#questionnaire-ai-6-trust').html('the AI');
      // }
      // else {
        $('#questionnaire-ai-1-trust').css('color',ai_colors[task_repeat]);
        $('#questionnaire-ai-1-trust').html('the AI');
        $('#questionnaire-ai-2-trust').css('color',ai_colors[task_repeat]);
        $('#questionnaire-ai-2-trust').html('the AI');
        $('#questionnaire-ai-3-trust').css('color',ai_colors[task_repeat]);
        $('#questionnaire-ai-3-trust').html('the AI');
        $('#questionnaire-ai-4-trust').css('color',ai_colors[task_repeat]);
        $('#questionnaire-ai-4-trust').html('the AI');
        $('#questionnaire-ai-5-trust').css('color',ai_colors[task_repeat]);
        $('#questionnaire-ai-5-trust').html('the AI');
        $('#questionnaire-ai-6-trust').css('color',ai_colors[task_repeat]);
        $('#questionnaire-ai-6-trust').html('the AI');
      // }
    }
    window.scrollTo(0,0); 
    $("#questionnaire-form-1-trust")[0].reset();
    $("#questionnaire-form-2-trust")[0].reset();
    $("#questionnaire-form-3-trust")[0].reset();
    $("#questionnaire-form-4-trust")[0].reset();
    $("#questionnaire-form-5-trust")[0].reset();
    $("#questionnaire-form-6-trust")[0].reset();
  }



  $(choose_human_type).click(function(){
    wager = 100;

    if (ai_condition[0] == 'long') {
      choice = {
      'length': 'long',
      'task': baseline_condition[1],
      'wager': wager,
      'lower': gold_lower_bound,
      'upper': gold_upper_bound,
      'balance': num_gold_credits,
      'model_acc': curr_acc_score,
      'strategy': curr_reward_system,
      // 'choice-type': curr_choose_coged[num_comparative],
      'coged-comparison': compare_conditions_type,
      'coged-available': coged_available
    }
   }
   else {
     choice = {
      'length': 'short',
      'task': baseline_condition[1],
      'wager': wager,
      'lower': silver_lower_bound,
      'upper': silver_upper_bound,
      'balance': num_silver_credits,
      'model_acc': curr_acc_score,
      'strategy': curr_reward_system,
      // 'choice-type': curr_choose_coged[num_comparative],
      'coged-comparison': compare_conditions_type,
      'coged-available': coged_available
    }
   }

    // output['choices'][task_repeat].push(choice)
    output['choices'].push(choice)

    gold_lower_bound = gold_cost_of_ai;
    silver_lower_bound = silver_cost_of_ai;
    gold_cost_of_ai = Math.round(average(gold_lower_bound, gold_upper_bound));
    silver_cost_of_ai = Math.round(average(silver_lower_bound, silver_upper_bound));
    transition(choose_type,"task");
    renderTask(input['coged-order'][task_repeat][0], input['coged'][0][coged_phase_count], 
      dimensions['coged'][0][coged_phase_count], taskCallBack);
    coged_phase_count += 1;
  });

  $(choose_AI_type).click(function(){
    var task = ai_condition[1]
    if (ai_condition[0] == 'long') {
      wager = gold_cost_of_ai;
      choice = {
      'length':'long',
      'task': task,
      'wager': wager,
      'lower': gold_lower_bound,
      'upper': gold_upper_bound,
      'balance': num_gold_credits,
      'model_acc': curr_acc_score,
      'strategy': curr_reward_system,
      // 'choice-type': curr_choose_coged[num_comparative],
      'coged-comparison': compare_conditions_type,
      'coged-available': coged_available
      }
    }
    else {
      wager = silver_cost_of_ai;
      choice = {
      'length':'short',
      'task': task,
      'wager': wager,
      'lower': silver_lower_bound,
      'upper': silver_upper_bound,
      'balance': num_silver_credits,
      'model_acc': curr_acc_score,
      'strategy': curr_reward_system,
      // 'choice-type': curr_choose_coged[num_comparative],
      'coged-comparison': compare_conditions_type,
      'coged-available': coged_available
      }
    }

    //output['choices'][task_repeat].push(choice)
    output['choices'].push(choice)

    gold_upper_bound = gold_cost_of_ai;
    silver_upper_bound = silver_cost_of_ai;
    gold_cost_of_ai = Math.round(average(gold_lower_bound, gold_upper_bound));
    silver_cost_of_ai = Math.round(average(silver_lower_bound, silver_upper_bound));
    transition(choose_type, "task");
    renderTask(input['coged-order'][task_repeat][1], input['coged'][num_comparative][coged_phase_count], 
      dimensions['coged'][0][coged_phase_count], taskCallBack);
    coged_phase_count += 1;
  });

  $('#begin-task-button').click(function() {
    // output['coged'].push([])
    // output['choices'].push([])
    // output['collaboration'].push([])

    transition('begin-task', 'task');
    renderTask(input['coged-order'][task_repeat][1], input['collaboration'][0][collaboration_count], 
      dimensions['collaboration'][0][collaboration_count], collaborationCallBack)
    collaboration_phase = true;
    coged_phase = false;
  })

  $('#repeat-task-button').click(function() {
    // output['coged'].push([])
    // output['choices'].push([])
    // output['collaboration'].push([])

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
    renderTask(input['coged-order'][task_repeat][1], input['collaboration'][0][collaboration_count], 
      dimensions['collaboration'][0][collaboration_count], collaborationCallBack)
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
  else if (training_phase_ai) {
    mode = 'training-AI'
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
  var correct_label = current_question['possible_answers'][current_question_2['c_r']];
  var model_response = current_question['possible_answers'][current_question_2['m_r']];
  for (let i = 0; i < questions.length; i++) {
    var input = $(questions[i])
    var label = $(labels[i])

    if(input.is(":checked")) {
      checked_question = true;
      checked_question_label = label.data('possible_answers');
    }
    else if (current_condition != "baseline" && curr_choose_coged[num_comparative] == "human-forced-AI" && coged_phase) {
      if (label.data('possible_answers') == model_response) {
        $(input).prop("checked", true);
        checked_question = true;
        checked_question_label = label.data('possible_answers');
      }
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
      'model_response': model_response,
      'time': (question_stop_time - question_start_time) / 1000,
      'scroll': current_label,
      'model_acc': curr_acc_score,
      'strategy': curr_reward_system,
      'coged-comparison': compare_conditions_type,
      'coged-available': coged_available
    }

    $("#question-box").addClass('muted')
    $('#answer-question').attr('disabled', true)
    $('#q1,#q2,#q3,#q4').attr('disabled', true)

    for (let i = 0; i < labels.length; i++) {
      var label = $(labels[i])
      if (label.data('possible_answers') == correct_label && (training_phase || training_phase_ai)){
        label.css('font-weight', 'bold')
        label.append(' <span class="badge badge-success">Correct</span>')
      }
    }
    
    if (checked_question_label == correct_label) {
      // alert("Correct!")
      if (training_phase || training_phase_ai) {
        $('.alert-success').show()
      }
      else {
        $('.alert-secondary').show()
      }

      if (mode == 'coged') {
        if (ai_condition[0] == 'long'){
          if (correct_label != model_response && curr_reward_system=="double") {
            num_gold_credits += wager * 5;
          }
          else if (correct_label != model_response && curr_reward_system == "overreliance"){
            num_gold_credits = num_gold_credits;
          }
          else {
            num_gold_credits += wager;
          }
          $('#gold-credits').text(num_gold_credits)
        }
        else {
          if (correct_label != model_response && curr_reward_system=="double") {
            num_silver_credits += wager * 5;
          }
          else if (correct_label != model_response && curr_reward_system == "overreliance") {
            num_silver_credits = num_silver_credits;
          }
          else {
            num_silver_credits += wager;
          }
          $('#silver-credits').text(num_silver_credits)
        }
      }
      else if (mode == 'collaboration'){
        if (ai_condition[0] == 'long'){
          if (correct_label != model_response && curr_reward_system=="double") {
            num_gold_credits += collaboration_wager * 5;
          }
          else if (correct_label != model_response && curr_reward_system == "overreliance") {
            num_gold_credits = num_gold_credits;
          }
          else {
            num_gold_credits += collaboration_wager;
          }
          $('#gold-credits').text(num_gold_credits)
        }
        else {
          if (correct_label != model_response && curr_reward_system=="double") {
            num_silver_credits += collaboration_wager * 5;
          }
          else if (correct_label != model_response && curr_reward_system == "overreliance") {
            num_silver_credits = num_silver_credits;
          }
          else {
            num_silver_credits += collaboration_wager;
          }
          $('#silver-credits').text(num_silver_credits)
        }
      }
      else if (mode == 'training'){
        if (training_phase_order[training_phase_count].split(" ")[0] == 'long'){
          // if (correct_label != model_response && curr_reward_system == "overreliance") {
            // num_gold_credits = num_gold_credits;
          // }
          // else {
            num_gold_credits += 50;
            $('#gold-credits').text(num_gold_credits)
          // }
        }
        else {
          // if (correct_label != model_response && curr_reward_system == "overreliance") {
            // num_silver_credits = num_silver_credits;
          // }
          // else {
            num_silver_credits += 50;
            $('#silver-credits').text(num_silver_credits)
          // }
        }
      }
      else if (mode == 'training-AI'){
        if (training_phase_order_ai[training_phase_count_ai].split(" ")[0] == 'long'){
          // if (correct_label != model_response && curr_reward_system=="double") {
          //   num_gold_credits += 50 * 5;
          // }
          // else if (correct_label != model_response && curr_reward_system == "overreliance") {
          //   num_gold_credits = num_gold_credits;
          // }
          // else {
            num_gold_credits += 50;
          // }
          $('#gold-credits').text(num_gold_credits)
        }
        else {
          // if (correct_label != model_response && curr_reward_system=="double") {
          //   num_silver_credits += 50 * 5;
          // }
          // else if (correct_label != model_response && curr_reward_system == "overreliance"){
          //   num_silver_credits = num_silver_credits;
          // }
          // else {
            num_silver_credits += 50;
          // }
          $('#silver-credits').text(num_silver_credits)
        }
      }
    } else {
      if (training_phase || training_phase_ai) {
        $('.alert-danger').show()
      }
      else {
        $('.alert-secondary').show()
      }
      // if (curr_penalty_system && checked_question_label == model_response) {
      //   if (mode == 'coged') {
      //     if (ai_condition[0] == 'long'){
      //       num_gold_credits -= wager;
      //       $('#gold-credits').text(num_gold_credits)
      //     }
      //     else {
      //       num_silver_credits -= wager;
      //     $('#silver-credits').text(num_silver_credits)
      //     }
      //   }
      //   else if (mode == 'collaboration'){
      //     if (ai_condition[0] == 'long'){
      //       num_gold_credits -= collaboration_wager;
      //       $('#gold-credits').text(num_gold_credits)
      //     }
      //     else {
      //       num_silver_credits += collaboration_wager;
      //       $('#silver-credits').text(num_silver_credits)
      //     }      
      //   }
      //   else if (mode == 'training-AI'){
      //     if (training_phase_order_ai[training_phase_count_ai].split(" ")[0] == 'long'){
      //       num_gold_credits -= 50;
      //       $('#gold-credits').text(num_gold_credits)
      //     }
      //     else {
      //       num_silver_credits -= 50;
      //       $('#silver-credits').text(num_silver_credits)
      //     }
      //   }
      // }
      // alert("Incorrect. The correct answer was: " + correct_label)
    }
    // TODO
    return answer
  }
}

var current_question;
var current_question_2;
var current_condition;
var current_setting;
function renderTask(condition, data, data_2, callback=null) {
  questions_num += 1;
  // $("#progress-text").html(questions_num + " / 28")
  curr = condition.split(" ");
  current_question = data;
  current_question_2 = data_2
  current_condition = curr[1];
  current_setting = curr[0];

  if (coged_phase && compare_conditions && current_condition == 'baseline') {
    current_condition = 'prediction'
  }

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

  $('#question-text').html(data['interface_question'])
  disable($('#question-text'))

  // $('#model-prediction').html(data['interface_model_response'])
  $('#model-prediction').html(data['interface_possible_answers'][data_2['m_r']])
  disable($('#model-prediction'))
  $('#confidence').html(data['confidence'])

  let labels = ['#q1-label', '#q2-label', '#q3-label', '#q4-label']

  shuffle(labels)
  for (let i = 0; i < labels.length; i++) {
    $(labels[i]).html(data['interface_possible_answers'][i])
    disable($(labels[i]))
    $(labels[i]).data('possible_answers',data['possible_answers'][i])
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

  if (training_phase || training_phase_ai) {
    if (training_phase_count == 0 || training_phase_count_ai == 0) { 
    // if (training_phase_count == 0) { 
      // $('#training-modal').modal('toggle')
      // "Received writing"
      if (current_setting == 'long') {
        // $('#training-modal-text').html('You will complete the next 5 question answering tasks by yourself and receive 100 gold credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini.png"> for each question you answer correctly. These passages are long, which is why you receive gold credits.')
        if (current_condition == 'baseline') {
          // $('#training-modal-text').html('You will complete the next 3 question answering tasks by yourself and receive 50 gold credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini.png"> for each question you answer correctly.')
          $('#training-modal-text').html('You will complete the next 3 question answering tasks by yourself.')
        }
        else if (current_condition == 'prediction'){
          // $('#training-modal-text').html('You will complete the next 5 question answering tasks with the AI to experience using the AI. You will receive 50 gold credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini.png"> for each question you answer correctly.')
          $('#training-modal-text').html('You will complete the next 5 question answering tasks with the AI to experience using the AI.')
        }
        else {
          // $('#training-modal-text').html('You will complete the next 5 question answering tasks with the AI to experience using the AI. You will receive 50 gold credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini.png"> for each question you answer correctly. This AI has the ability to give <span class=\'main-highlight\'>explanations</span>.')
          $('#training-modal-text').html('You will complete the next 5 question answering tasks with the AI to experience using the AI. This AI has the ability to give <span class=\'main-highlight\'>explanations</span>.')

        }
      }
      else {
        // $('#training-modal-text').html('You will complete the next 5 question answering tasks by yourself and receive 100 silver credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png"> for each question you answer correctly. These passages are short, which is why you receive silver credits.')
        if (current_condition == 'baseline') {
          $('#training-modal-text').html('You will complete the next 3 question answering tasks by yourself.')

        // $('#training-modal-text').html('You will complete the next 3 question answering tasks by yourself and receive 50 silver credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png"> for each question you answer correctly.')
        }
        else if (current_condition == 'prediction'){
        // $('#training-modal-text').html('You will complete the next 5 question answering tasks with the AI to experience using the AI. You will receive 50 silver credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png"> for each question you answer correctly.')
        $('#training-modal-text').html('You will complete the next 5 question answering tasks with the AI to experience using the AI.')
        }
        else {
        // $('#training-modal-text').html('You will complete the next 5 question answering tasks with the AI to experience using the AI. You will receive 50 silver credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png"> for each question you answer correctly. This AI has the ability to give <span class=\'main-highlight\'>explanations</span>.')
        $('#training-modal-text').html('You will complete the next 5 question answering tasks with the AI to experience using the AI. This AI has the ability to give <span class=\'main-highlight\'>explanations</span>.')
        }
      }
    }
  }




      // "Gained" writing
      // var training_modal_text = ""
      // if (current_setting == 'long') {
      //   if (current_condition == "baseline") {
      //     training_modal_text += "You will complete the next 3 question answering tasks by yourself. "
      //     // if (curr_reward_system == "overreliance") {
      //     //   training_modal_text += "You will gain 100 gold credits <img src='https://cs.stanford.edu/people/joerke/xai/coin-mini.png'> for each question BOTH you and the AI answer correctly. "
      //     // } 
      //     // else {
      //       training_modal_text += "You will gain 100 gold credits <img src='https://cs.stanford.edu/people/joerke/xai/coin-mini.png'> for each question you answer correctly. "
      //     // }
      //   }
      //   else {
      //     training_modal_text += "You will complete the next 5 question answering tasks with the AI to experience using the AI. "
      //     if (current_condition == 'xai' && !compare_conditions){
      //       training_modal_text += "This AI has the ability to give <span class=\'main-highlight\'>explanations</span>. "
      //     }
      //     if (compare_conditions && compare_conditions_training_phase_num == 2) {
      //       training_modal_text += "This is the same AI you used previously. "
      //       training_modal_text += "The AI will now show you <span class=\'main-highlight\'>explanations</span>. "
      //     }
      //     // if (curr_reward_system == "overreliance") {
      //     //   training_modal_text += "<br><br>You will only get rewarded for the question if BOTH you and the AI are correct. "
      //     //   training_modal_text += 'For each question that you answer correctly AND that the AI answers correctly, you will gain 50 gold credits<img src="https://cs.stanford.edu/people/joerke/xai/coin-mini.png">, which is equal to $0.05. '
      //     //   training_modal_text += "<strong>If you answer a question correctly that the AI answered incorrectly, you will receive 0 gold credits. "
      //     // }
      //     // else if (curr_reward_system == "double") {
      //     //   training_modal_text += "For each question that you answer correctly and that the AI answers correctly, you will gain 50 gold credits<img src=\"https://cs.stanford.edu/people/joerke/xai/coin-mini.png\">, which is equal to $0.05. "
      //     //   training_modal_text += "However, if you answer a question correctly that the AI answered incorrectly, you will gain 10x credits (in this case, 500 gold credits = $0.50). " 
      //     //   if (curr_penalty_system) {
      //     //     training_modal_text += "For each question you get incorrect with the AI, you will lose the amount of credits offered. "
      //     //   }
      //     // }
      //     // else {
      //       training_modal_text += "<br><br>For each question you get correct, you will gain 50 gold credits<img src=\"https://cs.stanford.edu/people/joerke/xai/coin-mini.png\">, which is equal to $0.05. "
      //     // }
      //   }
      // }
      // else {
      //   // $('#training-modal-text').html('You will complete the next 5 question answering tasks by yourself and gain 100 silver credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png"> for each question you answer correctly. These passages are short, which is why you gain silver credits.')
      //   if (current_condition == "baseline") {
      //     training_modal_text += "You will complete the next 3 question answering tasks by yourself. "
      //     // if (curr_reward_system == "overreliance") {
      //     //   training_modal_text += "You will gain 100 silver credits <img src='https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png'> for each question BOTH you and the AI answer correctly. "
      //     // } 
      //     // else {
      //       training_modal_text += "You will gain 100 silver credits <img src='https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png'> for each question you answer correctly. "
      //     // }
      //   }
      //   else {
      //     training_modal_text = "You will complete the next 5 question answering tasks with the AI to experience using the AI. "
      //     if (current_condition == 'xai'  && !compare_conditions){
      //       training_modal_text += "This AI has the ability to give <span class=\'main-highlight\'>explanations</span>. "
      //     }
      //     if (compare_conditions && compare_conditions_training_phase_num == 2) {
      //       training_modal_text += "This is the same AI you used previously. "
      //       training_modal_text += "The AI will now show you <span class=\'main-highlight\'>explanations</span>. "
      //     }
      //     // if (curr_reward_system == "overreliance") {
      //     //   training_modal_text += "<br><br>You will only get rewarded for the question if BOTH you and the AI are correct. "
      //     //   training_modal_text += 'For each question that you answer correctly AND that the AI answers correctly, you will gain 50 silver credits<img src="https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png">, which is equal to $0.025. '
      //     //   training_modal_text += "<strong>If you answer a question correctly that the AI answered incorrectly, you will receive 0 silver credits. "
      //     // }
      //     // else if (curr_reward_system == "double") {
      //     //   training_modal_text += "<br><br>For each question that you answer correctly and that the AI answers correctly, you will gain 50 silver credits<img src=\"https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png\">, which is equal to $0.025. "
      //     //   training_modal_text += "However, if you answer a question correctly that the AI answered incorrectly, you will gain 10x credits (in this case, 500 silver credits = $0.25). " 
      //     //   if (curr_penalty_system) {
      //     //     training_modal_text += "For each question you get incorrect with the AI, you will lose the amount of credits offered. "
      //     //   }
      //     // }
      //     // else {
      //       training_modal_text += "<br><br>For each question you get correct, you will gain 50 silver credits<img src=\"https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png\">, which is equal to $0.025. "
      //     // }

      //   }
      // }
      // $('#training-modal-text').html(training_modal_text)
    // }
  // }

  if (!tutorial_phase) {
    predBox.css('backgroundColor',model_prediction_background_colors[task_repeat])
    if (anthropomorphic == true) {
      $('#task-ai-name').html('AI ' + ai_names[task_repeat] + "\'s")
    }
    else {
      $('#task-ai-name').html('AI\'s')
    }
    if (compare_conditions && current_condition == 'prediction') {
      $('.ai-box').css('backgroundColor', ai_box_background_colors[task_repeat])
      $('.ai-box').css('border', ai_box_border[task_repeat])
      predBox.css('backgroundColor',model_prediction_background_colors[task_repeat])
    }
    else {
      $('.ai-box').css('backgroundColor', ai_box_background_colors[task_repeat])
      $('.ai-box').css('border', ai_box_border[task_repeat])
    }
  }

  // enable callbacks
  if (callback) {
    $('#answer-question').unbind('click').click(callback)
  }

  if (current_condition != "baseline" && curr_choose_coged[num_comparative] == "human-forced-AI" && coged_phase) {
    $(document).ready(function(){
      $('#answer-question').trigger('click');
    });
  }

  question_start_time = Date.now()
}
function questionnaireTrustCallback() {

  let questions = ['#Q-1-trust','#Q-2-trust', '#Q-3-trust', '#Q-4-trust', "#Q-5-trust", '#Q-6-trust'];
  let total_checked = 0;

  let q_response = {}

  for (let i = 0; i < questions.length; i++) {
    for (let j = 0; j < 7; j++) {
      if ($(questions[i] + "-" + (j+1)).is(":checked")) {
        if (training_phase || training_phase_ai) {
          var index = questions[i].slice(1) + "-pre"
        }
        else {
          var index = questions[i].slice(1) + "-post"
        }
        q_response[index] = j+1
        total_checked += 1;
      }
    }
  }

  q_response['setting'] = ai_condition[0]
  q_response['condition'] = ai_condition[1]
  q_response['model_acc'] = curr_acc_score


  if (total_checked == questions.length) {
    
    output['questionnaire-trust'].push(q_response)

    if (training_phase || training_phase_ai) {
      transition('questionnaire-trust', 'begin-task');
      $('#gold-credits').hide()
      $('#silver-credits').hide()
      $('#total-credits').hide()
      repeatTask(input['coged-order'][task_repeat][1], 'collaboration-task-first-text')
      runTask();
      $('#progress-text').html(progress_bar_text[progress_num]);
      progress_num += 1;
      training_phase = false;
      training_phase_ai = false;
      output['coged-order'] = input['coged-order']
      }
    else {
      transition("questionnaire-trust","questionnaire");
      
    if (anthropomorphic == true) {
      // $('#questionnaire-ai-1').css('color',ai_colors[task_repeat]);
      // $('#questionnaire-ai-1').html('AI ' + ai_names[task_repeat] + "\'s");
      $('#questionnaire-ai-2').css('color',ai_colors[task_repeat]);
      $('#questionnaire-ai-2').html('AI ' + ai_names[task_repeat]);
      $('#questionnaire-ai-3').css('color',ai_colors[task_repeat]);
      $('#questionnaire-ai-3').html('AI ' + ai_names[task_repeat]);
      $('#questionnaire-ai-4').css('color',ai_colors[task_repeat]);
      $('#questionnaire-ai-4').html('AI ' + ai_names[task_repeat] + "\'s");
      $('#questionnaire-ai-5').css('color',ai_colors[task_repeat]);
      $('#questionnaire-ai-5').html('AI ' + ai_names[task_repeat]);
      $('#questionnaire-ai-6').css('color',ai_colors[task_repeat]);
      $('#questionnaire-ai-6').html('AI ' + ai_names[task_repeat]);
      $('#questionnaire-ai-6a').css('color',ai_colors[task_repeat]);
      $('#questionnaire-ai-6a').html('AI ' + ai_names[task_repeat]);
      $('#questionnaire-ai-7').css('color',ai_colors[task_repeat]);
      $('#questionnaire-ai-7').html('AI ' + ai_names[task_repeat]);
      $('#questionnaire-ai-8').css('color',ai_colors[task_repeat]);
      $('#questionnaire-ai-8').html('AI ' + ai_names[task_repeat]);
    }
    else {
      if (compare_conditions) {
        // $('#questionnaire-ai-2').html('the AI');
        // $('#questionnaire-ai-3').html('the AI');
        // $('#questionnaire-ai-4').html('the AI\'s');
        // $('#questionnaire-ai-5').html('the AI');
        // $('#questionnaire-ai-6').html('the AI');
        // $('#questionnaire-ai-6a').html('the AI');
        // $('#questionnaire-ai-7').html('the AI');
        // $('#questionnaire-ai-8').html('the AI');
        $('#questionnaire-form-8-text').html('In the box below, please describe how you chose between using the AI\'s suggestions and the AI\'s suggestions with explanations.')

      }
      // else {
      // $('#questionnaire-ai-1').css('color',ai_colors[task_repeat]);
      // $('#questionnaire-ai-1').html('the AI\'s');
      $('#questionnaire-ai-2').css('color',ai_colors[task_repeat]);
      $('#questionnaire-ai-2').html('the AI');
      $('#questionnaire-ai-3').css('color',ai_colors[task_repeat]);
      $('#questionnaire-ai-3').html('the AI');
      $('#questionnaire-ai-4').css('color',ai_colors[task_repeat]);
      $('#questionnaire-ai-4').html('the AI\'s');
      $('#questionnaire-ai-5').css('color',ai_colors[task_repeat]);
      $('#questionnaire-ai-5').html('the AI');
      $('#questionnaire-ai-6').css('color',ai_colors[task_repeat]);
      $('#questionnaire-ai-6').html('the AI');
      $('#questionnaire-ai-6a').css('color',ai_colors[task_repeat]);
      $('#questionnaire-ai-6a').html('AI');
      $('#questionnaire-ai-7').css('color',ai_colors[task_repeat]);
      $('#questionnaire-ai-7').html('the AI');
      $('#questionnaire-ai-8').css('color',ai_colors[task_repeat]);
      $('#questionnaire-ai-8').html('the AI');
    // }
    }
    window.scrollTo(0,0);
    $("#questionnaire-form-1")[0].reset();
    $("#questionnaire-form-2")[0].reset();
    $("#questionnaire-form-3")[0].reset();
    $("#questionnaire-form-4")[0].reset();
    $("#questionnaire-form-5")[0].reset();
    $("#questionnaire-form-6")[0].reset();
    $("#questionnaire-form-7")[0].reset();
    $("#questionnaire-form-8")[0].reset();
      progress_num += 1;
      task_repeat += 1;
    }
  } else {
      alert("Please answer all of the questions.")
   }
 } 


function questionnaireCallback() {

  let questions = ['#Q-1', '#Q-2', '#Q-3', '#Q-4', "#Q-5"];
  let total_checked = 0;

  let q_response = {}

  for (let i = 0; i < questions.length; i++) {
    for (let j = 0; j < 7; j++) {
      if ($(questions[i] + "-" + (j+1)).is(":checked")) {

        q_response[questions[i].slice(1)] = j+1
        total_checked += 1;
      }
    }
  }

  q_response['value-of-range'] = document.querySelector('#value-of-range').value;
  q_response['AI-usage'] = $("#AI-usage").val();
  q_response['choice-selection'] = $("#choice-selection").val();
  q_response['setting'] = ai_condition[0]
  q_response['condition'] = ai_condition[1]
  q_response['model_acc'] = curr_acc_score


  if (total_checked == questions.length && slider_changed == true 
    && $.trim($("#AI-usage").val()) && $.trim($("#choice-selection").val())) {
    
    output['questionnaire'].push(q_response)
    if (ai_condition[0] == 'long') {
      output['costs'].push({'final cost': gold_cost_of_ai, 
                            'length': 'long', 
                            'task': ai_condition[1], 
                            'coin': 'gold',
                            'model_acc':curr_acc_score,
                            'strategy': curr_reward_system,
                            // 'choice-type': curr_choose_coged[num_comparative],
                            'coged-comparison': compare_conditions_type,
                          'coged-available': coged_available})
   }
   else {
     output['costs'].push({'final cost': silver_cost_of_ai, 
                          'length': 'short',
                          'task': ai_condition[1], 
                          'coin': 'silver',
                          'model_acc': curr_acc_score,
                          'strategy': curr_reward_system,
                          // 'choice-type': curr_choose_coged[num_comparative],
                          'coged-comparison': compare_conditions_type,
                        'coged-available': coged_available})
   }

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
        acc_id = "#repeat-acc-score"
      }
      else {
        coin_id = '#bonus-begin-task'
        length_id = "#length-begin-task"
        explanation_id = "#xai-begin-task"
        acc_id = "#acc-score"
      }
      curr = condition.split(" ");
      current_length = curr[0];
      current_xai_setting = curr[1];
      if (anthropomorphic == true) {
        $('#' + id).html("AI " + (ai_names[task_repeat]))
      }
      else {
        $('#' + id).html("the AI")
      }
      $('#' + id).css('color', ai_colors[task_repeat])

      $(acc_id).html(curr_acc_score)
      // "Received" writing
      if (current_length == 'long') {
        // $(coin_id).html('For each question you get correct, you will initially receive 50 gold credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini.png"> in bonus.')
        // $(length_id).html('long, which is why you receive gold credits')
          // $('#coin-explanation').html('Note that 100 gold credits equals $0.10.')      
      }
      else {
        // $(coin_id).html('For each question you get correct, you will initially receive 50 silver credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png"> in bonus.')
        // $(length_id).html('short, which is why you receive silver credits')
          // $('#coin-explanation').html('Note that 100 silver credits equals $0.05.')
     }

      // "Gained" writing 
      // var bonus_text = ""
      // if (current_length == 'long') {
      //     if (curr_reward_system == "overreliance") {
      //       bonus_text += "You will only get rewarded for the question if BOTH you and the AI are correct. "
      //       bonus_text += 'For each question that you answer correctly AND that the AI answers correctly, you will gain 50 gold credits<img src="https://cs.stanford.edu/people/joerke/xai/coin-mini.png">, which is equal to $0.05. '
      //       bonus_text += "<strong>If you answer a question correctly that the AI answered incorrectly, you will receive 0 gold credits. "
      //       $("#reward-table-begin-task").html("You can also view the reward format in the table below. <br><br> <img src=\"https://cs.stanford.edu/people/joerke/xai/overreliance.svg\">")
      //     }
      //     else if (curr_reward_system == "double") {
      //       bonus_text += "For each question that you answer correctly and that the AI answers correctly, you will gain 50 gold credits<img src=\"https://cs.stanford.edu/people/joerke/xai/coin-mini.png\">, which is equal to $0.05. "
      //       bonus_text += "However, if you answer a question correctly that the AI answered incorrectly, you will gain 5x credits (in this case, 250 gold credits = $0.25). "           
      //       $("#reward-table-begin-task").html("You can also view the reward format in the table below. <br><br> <img src=\"https://cs.stanford.edu/people/joerke/xai/verification.svg\">")
      //       if (curr_penalty_system) {
      //         bonus_text += "For each question you get incorrect with the AI, you will lose the amount of credits offered. "
      //       }
      //     }
      //     else {
      //       bonus_text += 'For each question you get correct, you will gain 50 gold credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini.png">, which is equal to $0.05. '
      //     }
      //     // $(length_id).html('long, which is why you gain gold credits')
      //     // $('#coin-explanation').html('Note that 100 gold credits equals $0.10.') 
      //   }
      //   else {
      //     if (curr_reward_system == "overreliance") {
      //       bonus_text += "You will only get rewarded for the question if BOTH you and the AI are correct. "
      //       bonus_text += 'For each question that you answer correctly AND that the AI answers correctly, you will gain 50 silver credits<img src="https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png">, which is equal to $0.025. '
      //       bonus_text += "<strong>If you answer a question correctly that the AI answered incorrectly, you will receive 0 silver credits. "
      //       $("#reward-table-begin-task").html("You can also view the reward format in the table below. <br><br> <img src=\"https://cs.stanford.edu/people/joerke/xai/overreliance-short.svg\">")
      //     }
      //     else if (curr_reward_system == "double") {
      //       bonus_text += "For each question that you answer correctly and that the AI answers correctly, you will gain 50 silver credits<img src=\"https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png\">, which is equal to $0.025. "
      //       bonus_text += "However, if you answer a question correctly that the AI answered incorrectly, you will gain 5x credits (in this case, 500 silver credits = $0.125). "           
      //       $("#reward-table-begin-task").html("You can also view the reward format in the table below. <br><br> <img src=\"https://cs.stanford.edu/people/joerke/xai/verification-short.svg\">")
      //       if (curr_penalty_system) {
      //         bonus_text += "For each question you get incorrect with the AI, you will lose the amount of credits offered. "
      //       }
      //     }
      //     else {
      //       bonus_text += 'For each question you get correct, you will gain 50 silver credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png">, which is equal to $0.025. '
      //     }
      // }
     // $(coin_id).html(bonus_text)

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
  progress_bar_current += (11 * progress_bar_increments)
  transition("feedback","submission");
  $('#progress-text').html(progress_bar_text[progress_num]);
    progress_num += 1;
  if (ai_condition[0] == 'long') {
      // uncomment here if you want to have an extra bonus for long
      // $('#long-extra-bonus').css('display','inline-block')
      // $('#total-bonus-text').html(num_gold_credits + ' gold credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini.png"> in bonus.')
    }
  else {
    $('#long-extra-bonus').css('display','none')
    // $('#total-bonus-text').html(num_silver_credits + ' silver credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini-silver.png"> in bonus.')

  }
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
    // return true;
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

  $('#questionnaire-trust-button').click(questionnaireTrustCallback);

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

function disable(jQelement) {
    jQelement.disableFind()
    jQelement.bind('copy paste cut',function(e) {
      e.preventDefault(); return false;
  });
}

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