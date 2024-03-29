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
    // $('#progress-text').html(progress_bar_text[progress_num]);
    $('#payment').html(payment);
    $('#time').html(time);
    $('#consent-form').attr("href", href);

    progress_num += 1;
    idx += 1
    input_imgs = {

    }
    input_imgs['training'] = [[], []]
    for (let i = 0; i < input['training'].length; i++) {
      for (let j = 0; j < input['training'][i].length; j++){
        input_imgs['training'][i].push(preloadImage(input['training'][i][j]['maze']))
      }
    }
    input_imgs['training-AI'] = [[], []]
    for (let i = 0; i < input['training-AI'].length; i++) {
      for (let j = 0; j < input['training-AI'][i].length; j++){
        input_imgs['training-AI'][i].push(preloadImage(input['training-AI'][i][j]['maze']))
      }
    }
    input_imgs['collaboration'] = [[], []]
    for (let i = 0; i < input['collaboration'].length; i++) {
      for (let j = 0; j < input['collaboration'][i].length; j++){
        input_imgs['collaboration'][i].push(preloadImage(input['collaboration'][i][j]['maze']))
      }
    }

    input_imgs['coged'] = [[], []]
    for (let i = 0; i < input['coged'].length; i++) {
      for (let j = 0; j < input['coged'][i].length; j++){
        input_imgs['coged'][i].push(preloadImage(input['coged'][i][j]['maze']))
      }
    }
    
    input_imgs_xai = {

    }
    input_imgs_xai['training'] = [[], []]
    for (let i = 0; i < input['training'].length; i++) {
      for (let j = 0; j < input['training'][i].length; j++){
        input_imgs_xai['training'][i].push(preloadImage(input['training'][i][j]['blue salient explanation']))
      }
    }
    input_imgs_xai['training-AI'] = [[], []]
    for (let i = 0; i < input['training-AI'].length; i++) {
      for (let j = 0; j < input['training-AI'][i].length; j++){
        input_imgs_xai['training-AI'][i].push(preloadImage(input['training-AI'][i][j]['blue salient explanation']))
      }
    }
    input_imgs_xai['collaboration'] = [[], []]
    for (let i = 0; i < input['collaboration'].length; i++) {
      for (let j = 0; j < input['collaboration'][i].length; j++){
        input_imgs_xai['collaboration'][i].push(preloadImage(input['collaboration'][i][j]['blue salient explanation']))
      }
    }
    input_imgs_xai['coged'] = [[], []]
    for (let i = 0; i < input['coged'].length; i++) {
      for (let j = 0; j < input['coged'][i].length; j++){
        input_imgs_xai['coged'][i].push(preloadImage(input['coged'][i][j]['blue salient explanation']))
      }
    }

    input_imgs_circle_xai = {

    }
    input_imgs_circle_xai['training-AI'] = [[], []]
    for (let i = 0; i < input['training-AI'].length; i++) {
      for (let j = 0; j < input['training-AI'][i].length; j++){
        input_imgs_circle_xai['training-AI'][i].push(preloadImage(input['training-AI'][i][j]['circle blue salient explanation']))
      }
    }
  }
}

function preloadImage(url)
{
    var img=new Image();
    img.src=url;
    return img
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
    // $('#progress-text').html(progress_bar_text[progress_num]);
    progress_num += 1;
  }
  else if ($("#disagree").is(":checked")) {
    output['consent'] = 'disagree'
    transition("onboarding","exit");
    // $('#progress-text').html('Exit');
  }
  else {
    alert('Please answer the consent question.');
  }
}

function demographicsCallback() {
  let confirm = ['#yes','#no'];
  let checked_confirm = false;
  let chosen_confirm;
  for (let i = 0; i < confirm.length; i++) {
    if($(confirm[i]).is(":checked")) {
      chosen_confirm = confirm[i].slice(1)
      checked_confirm = true;
      break;
    }
  }

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

  let checked_age = false;
  let written_age;
  if ($.trim($("#age").val())) {
        written_age = $("#age").val();
        checked_age = true;
  }
  
  // let age = ['#under18','#18-24yo', '#25-34yo', '#35-44yo', '#45-54yo', '#55-64yo', '#65-74yo', '#over74'];
  // let checked_age = false;
  // let chosen_age;
  // for (let i = 0; i < age.length; i++) {
  //   if($(age[i]).is(":checked")) {
  //     chosen_age = age[i].slice(1)
  //     checked_age = true;
  //     break;
  //   }
  // }
  if (checked_confirm == false) {
    alert('Please answer the question about whether or not you have completed this study before.');
  }
  if (checked_prolificID == false) {
    alert('Please answer the question about your ID.');
  }

  if (checked_gender == false) {
    alert('Please answer the question about your gender.');
  }
  if (checked_age == false) {
    alert('Please answer the question about your age.');
  }
  if (checked_confirm == true && checked_gender == true && checked_age == true && checked_prolificID == true) {
    output['demographics'] = {
      'prolific':written_prolificID,
      'gender': chosen_gender,
      'age': written_age
    }
    if (chosen_confirm == 'no') {
      transition("demographics","exit");
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
    transition('demographics', 'introduction')  
    save_progress_text = progress_num
    progress_num += 1;
  }
}

$('#introduction-button').click(function(){
  if (ai_condition[0] == 'short') {
   transition('introduction', 'tutorial-maze-short');
   $('#easy-maze-photo').html('<img src=\"' + input['tutorial'][0]['maze'] +"\">")
   $('#easy-maze-solution').html(input['tutorial'][0]['c_r'])
  }
  else {
   transition('introduction', 'tutorial-maze-long');
   $('#hard-maze-photo').html('<img src=\"' + input['tutorial'][1]['maze'] +"\">")
   $('#hard-maze-solution').html(input['tutorial'][1]['c_r'])
  }

  if (ai_condition[0] == 'long') {
    $('#length-repeat-training').html('long')
  }
  else {
    $('#length-repeat-training').html('short')
  }
})

$('#tutorial-maze-button-short').click(function() {
    transition('tutorial-maze-short', 'training-start');
    $('#training-start-ai-name').css('color',ai_colors[task_repeat]);
    $('#training-start-ai-name').html('the AI\'s');
    runTraining()
});

$('#tutorial-maze-button-long').click(function() {
    transition('tutorial-maze-long', 'training-start');
    $('#training-start-ai-name').css('color',ai_colors[task_repeat]);
    $('#training-start-ai-name').html('the AI\'s');
    runTraining()
});


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
  $('#progress-box').show()


  function trainingCallback() {
    response = readTaskResponse()

    if (response) {
      output['training'].push(response)

      if (training_phase_count == input['training'][task_repeat].length - 1) {
        $('.alert-link').unbind('click').click(function() {
          transition('task', 'training-intermediate')
          runTrainingAI();
        }
        )
      }
      else {
        training_phase_count += 1;
        $('.alert-link').unbind('click').click(function() {
          renderTask(training_phase_order[task_repeat], input['training'][task_repeat][training_phase_count]);
          progress();
        })
      }
    }
  }

  $('#training-start-button').click(function() {
    transition('training-start', 'task');
    renderTask(training_phase_order[task_repeat], input['training'][task_repeat][0], trainingCallback)

  })
}

  function runTrainingAI() {
  training_phase_ai = true;
  training_phase_count_ai = 0;

  if (ai_condition[1] == 'xai' || ai_condition[1] == 'xai-arrow'|| ai_condition[1] == 'xai-written') {
    $('#xai-begin-training').css('display','inline-block')
    $('.main-highlight').removeClass('no-highlight')
  }
  else {
    $('#xai-begin-training').css('display','none')
  }


    $('#training-ai-name').css('color',ai_colors[task_repeat]);
    $('#training-ai-name').html('the AI');
    //$('#xai-begin-training').css('display','none')
  


  function trainingCallback() {
    response = readTaskResponse()

    if (response) {
      output['training'].push(response)

      if (training_phase_count_ai == input['training-AI'][task_repeat].length - 1) {

          $('.alert-link').unbind('click').click(function() {
            //transition('task', 'training-end')
            transition('task', 'begin-task');
            $('#gold-credits').hide()
            $('#silver-credits').hide()
            $('#total-credits').hide()
            repeatTask(input['coged-order'][task_repeat][1], 'collaboration-task-first-text')
            runTask();
            // $('#progress-text').html(progress_bar_text[progress_num]);
            progress_num += 1;
            training_phase = false;
            training_phase_ai = false;
            output['coged-order'] = input['coged-order']
          })
        
      }
      else {
        training_phase_count_ai += 1;
        $('.alert-link').unbind('click').click(function() {

            renderTask(training_phase_order_ai[task_repeat], input['training-AI'][task_repeat][training_phase_count_ai]);
          progress();
        })
      }
    }
  }
  $('#training-intermediate-button').click(function() {
    training_phase = false;
    transition('training-intermediate', 'task');

      renderTask(training_phase_order_ai[task_repeat], input['training-AI'][task_repeat][0], trainingCallback)
  })
}





  $('#training-end-button').click(function() {
    transition('training-end', 'begin-task');
    $('#gold-credits').hide()
    $('#silver-credits').hide()
    $('#total-credits').hide()
    repeatTask(input['coged-order'][task_repeat][1], 'collaboration-task-first-text')
    runTask();
    // $('#progress-text').html(progress_bar_text[progress_num]);
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

      $(choose_text_AI).html("Get suggestion and explanation from AI")
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
      // MAKING SHORT GOLD 
      // $(choose_cost_AI).html(silver_cost_of_ai + " gold credits")
      // $(choose_cost_human).html(cost_of_human + " gold credits")
      // $(choose_silver_img).css('display','none')
      // $(choose_gold_img).css('display','inline-block')
      // $(choose_gold_img_2).css('display','inline-block')
      // $(choose_silver_img_2).css('display','none')
    }
      $(choose_human_type).css('color', ai_colors[task_repeat])
      $(choose_human_type).css('backgroundColor', ai_background_colors[task_repeat])
      $(choose_human_type).css('border', ai_border[task_repeat])
      // $(choose_AI_name).html(ai_names[task_repeat])

      $(choose_AI_type).css('color', ai_colors[task_repeat])
      $(choose_AI_type).css('backgroundColor', ai_background_colors[task_repeat])
      $(choose_AI_type).css('border', ai_border[task_repeat])
      // $(choose_AI_name).html(ai_names[task_repeat])
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

            $('#coged-DIY-AI').hide()
            $('#coged-AI-xai').show()
            $("#summary-coged-change-AI-compare").hide()
            $("#coged-DIY-AI-attention").hide()
            $("#coged-AI-xai-attention").show()
          if (current_length == 'long') {
            $("#coged-text-long").show()
            $("#coged-text-short").hide()
            }
            else {
              $("#coged-text-short").show()
              $("#coged-text-long").hide()
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
        renderTask(input['coged-order'][task_repeat][1], input['collaboration'][task_repeat][collaboration_count], 
          collaborationCallBack);
        progress();
         });
    }
  }
}

$('#coged-task-button').unbind('click').click(function() {
    populateChoice()
    transition('coged-task', choose_type)
    
      $('#coged-modal-DIY-AI').show()
    // $('#coged-modal').modal('toggle')

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
                                       'coged-available': coged_available})
              }
              else {
                output['costs'].push({'final cost': silver_cost_of_ai, 
                                     'length': 'short',
                                     'task': ai_condition[1], 
                                     'coin': 'silver',
                                    'coged-available': coged_available})
              }
              num_comparative +=1
              transition('task', 'coged-task')

                $("#coged-forced-AI").hide()
                $("#coged-AI").show()
                $("#summary-coged-change-forced-AI-second").hide()
                // $("#summary-coged-change-AI-second").show()
                $("#summary-coged-change-forced-AI").hide()
                $("#summary-coged-change-AI").hide()
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


  // THIS HAS BEEN CHANGED SO WE ARE COMPARING PREDICTION AND EXPLANATION
  $(choose_human_type).unbind('click').click(function(){
    wager = 100;

    if (ai_condition[0] == 'long') {
      choice = {
      'length': 'long',
      // 'task': baseline_condition[1],
      'task': 'prediction',
      'wager': wager,
      'lower': gold_lower_bound,
      'upper': gold_upper_bound,
      'balance': num_gold_credits,
      'coged-available': coged_available
    }
   }
   else {
     choice = {
      'length': 'short',
      // 'task': baseline_condition[1],
      'task': 'prediction',
      'wager': wager,
      'lower': silver_lower_bound,
      'upper': silver_upper_bound,
      'balance': num_silver_credits,
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
    renderTask(input['coged-order'][task_repeat][0].split(' ')[0] + ' prediction', input['coged'][task_repeat][coged_phase_count], 
      taskCallBack);
    coged_phase_count += 1;
  });

  $(choose_AI_type).unbind('click').click(function(){
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
    renderTask(input['coged-order'][task_repeat][1], input['coged'][task_repeat][coged_phase_count], 
      taskCallBack);
    coged_phase_count += 1;
  });

  $('#begin-task-button').click(function() {
    // output['coged'].push([])
    // output['choices'].push([])
    // output['collaboration'].push([])

    transition('begin-task', 'task');
    renderTask(input['coged-order'][task_repeat][1], input['collaboration'][task_repeat][collaboration_count], 
      collaborationCallBack)
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
    renderTask(input['coged-order'][task_repeat][1], input['collaboration'][task_repeat][collaboration_count], 
    collaborationCallBack)
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
  var correct_label =  current_question['c_r'];
  var model_response = current_question['m_r'];
  var current_setting = current_question['maze'].split("/")[8]
  for (let i = 0; i < questions.length; i++) {
    var input = $(questions[i])
    var label = $(labels[i])

    if(input.is(":checked")) {
      checked_question = true;
      checked_question_label = label.data('possible_answers');
    }
    }
  

  if (!checked_question) {
    alert("Please select an answer.")
    return null;
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
      // 'scroll': current_label,
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
        if (training_phase_order[0].split(" ")[0] == 'long'){
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
        if (training_phase_order_ai[0].split(" ")[0] == 'long'){
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
        if (current_condition == 'xai') {
          // circle_xai = current_question['explanation'].split('/')
          // num_ = parseInt(current_question['explanation'].split('/')[10].split('-')[1]) + 3
          // circle_xai[10] = 'download-'+num_ +'.png'
          // circle_xai = circle_xai.join('/')
          // console.log(circle_xai)
          $("#context-text").html("<img src=\"" + current_question['circle blue salient explanation'] + "\"/>")
        }
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
function renderTask(condition, data, callback=null) {
  questions_num += 1;
  // $("#progress-text").html(questions_num + " / 28")
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
  // current_label = "0%";
  // var tracker = window.ScrollTracker({
  //       context: '#context-text'
  //     });

  // tracker.on({
  //  percentages: {
  //   every: [5]
  //   }
  // }, function(evt) {
  //   current_label = evt.data.label
  // });

  // End of scroll tracking

  $('#answer-question').attr('disabled', false)
  $('#q1,#q2,#q3,#q4').attr('disabled', false)
  $('#q1-label,#q2-label,#q3-label,#q4-label').css('font-weight', '')
  $('.alert-link').unbind('click')
  $('.alert').hide()

  // parse and load data
  // if (interleaved_design && collaboration_phase) {
  //   current_setting = interleaved_order_collaboration[interleaved_order_collaboration_count].split(" ")[0]
  //   current_condition = interleaved_order_collaboration[interleaved_order_collaboration_count].split(" ")[1]
  //   interleaved_order_collaboration_count+=1;
  // }
  // else if (interleaved_design && training_phase_ai) {
  //   current_setting = interleaved_order_training_AI[interleaved_order_training_AI_count].split(" ")[0]
  //   current_condition = interleaved_order_training_AI[interleaved_order_training_AI_count].split(" ")[1]
  //   interleaved_order_training_AI_count+=1;
  // }

  // if (current_setting == 'short') {
  //   idx_list = data['short_text']
  // } 
  // else if (current_setting == 'long') {
  //   idx_list = data['long_text']
  // }

  // var innerContextHTML = '';
  // for (var i = 0; i < idx_list.length; i++) {
    // innerContextHTML +="<img src=\"" + data['maze'] + "\""
  // }
  if (current_condition == 'prediction' || training_phase) {
    contextText.html("<img src=\"" + data['maze'] + "\"/>")
  }
  else if (current_condition == 'xai-arrow' || ai_condition[1] == 'xai-written'){
    contextText.html("<img src=\"" + data['maze'] + "\"/>")
  }
  else if (current_condition == 'xai'){
    contextText.html("<img src=\"" + data['explanation'] + "\"/>")
  }
  else if (current_condition == 'xai-white-salient'){
    contextText.html("<img src=\"" + data['white salient explanation'] + "\"/>")
  }
  else if (current_condition == 'xai-blue-salient'){
    contextText.html("<img src=\"" + data['blue salient explanation'] + "\"/>")
  }

  // contextText.disableFind()
  // contextText.bind('copy paste cut',function(e) {
  //     e.preventDefault(); return false; 
  // });

  $('#question-text').html(data['question'])
  // disable($('#question-text'))

  // $('#model-prediction').html(data['interface_model_response'])
  $('#model-prediction').html(data['m_r'])
  $('#model-arrow-explanation').html('<strong>AI\'s Explanation</strong> (From the Start): ' + data['arrow_explanation'])
  $('#model-written-explanation').html('<strong>AI\'s Explanation</strong> (From the Start): ' + data['written_explanation'])
  // disable($('#model-prediction'))
  // $('#confidence').html(data['confidence'])

  let labels = ['#q1-label', '#q2-label', '#q3-label', '#q4-label']

  // shuffle(labels)
  for (let i = 0; i < labels.length; i++) {
    $(labels[i]).html(data['possible_answers'][i])
    // disable($(labels[i]))
    $(labels[i]).data('possible_answers',data['possible_answers'][i])
  }

  // style box correctly
  highlights = $('.answer-highlight, .question-highlight, .main-highlight')
  predBox = $('#model-prediction-box')
  arrowBox = $('#model-arrow-explanation')
  writtenBox = $('#model-written-explanation')

  if (current_condition == 'baseline') {
    qBox.toggleClass('baseline-box');
    highlights.addClass('no-highlight')
    predBox.hide()
    arrowBox.hide()
    writtenBox.hide()
  } 
  else if (current_condition == 'prediction') {
    qBox.toggleClass('ai-box');
    highlights.addClass('no-highlight')
    predBox.show()
    arrowBox.hide()
    writtenBox.hide()
  }
  else if (current_condition == 'xai' ) {
    qBox.toggleClass('ai-box');
    highlights.removeClass('no-highlight')
    predBox.show()
    arrowBox.hide()
    writtenBox.hide()
  }
  else if (current_condition == 'xai-arrow') {
    qBox.toggleClass('ai-box');
    highlights.removeClass('no-highlight')
    predBox.show()
    arrowBox.show()
    writtenBox.hide()
  }
  else if (current_condition == 'xai-written') {
    qBox.toggleClass('ai-box');
    highlights.removeClass('no-highlight')
    predBox.show()
    arrowBox.hide()
    writtenBox.show()
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

  if (!tutorial_phase) {
    predBox.css('backgroundColor',model_prediction_background_colors[task_repeat])
    if (anthropomorphic == true) {
      $('#task-ai-name').html('AI ' + ai_names[task_repeat] + "\'s")
    }
    else {
      $('#task-ai-name').html('AI\'s')
    }
    
      $('.ai-box').css('backgroundColor', ai_box_background_colors[task_repeat])
      $('.ai-box').css('border', ai_box_border[task_repeat])
  }


  // enable callbacks
  if (callback) {
    $('#answer-question').unbind('click').click(callback)
  }

  

  // if (data['possible_answers'][data_2['c_r']] != data['possible_answers'][data_2['m_r']]) {
  //   $('#task-modal').modal('toggle')
  // }

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


  if (total_checked == questions.length) {
    
    output['questionnaire-trust'].push(q_response)

    if (training_phase || training_phase_ai) {
      transition('questionnaire-trust', 'begin-task');
      $('#gold-credits').hide()
      $('#silver-credits').hide()
      $('#total-credits').hide()
      repeatTask(input['coged-order'][task_repeat][1], 'collaboration-task-first-text')
      runTask();
      // $('#progress-text').html(progress_bar_text[progress_num]);
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


  if (total_checked == questions.length && slider_changed == true 
    && $.trim($("#AI-usage").val()) && $.trim($("#choice-selection").val())) {
    
    output['questionnaire'].push(q_response)
    if (ai_condition[0] == 'long') {
      output['costs'].push({'final cost': gold_cost_of_ai, 
                            'length': 'long', 
                            'task': ai_condition[1], 
                            'coin': 'gold',
                          'coged-available': coged_available})
   }
   else {
     output['costs'].push({'final cost': silver_cost_of_ai, 
                          'length': 'short',
                          'task': ai_condition[1], 
                          'coin': 'silver',
                        'coged-available': coged_available})
   }
   if (total_checked != questions.length) {
      alert("Please answer all of the questions.")
    }
    else if (slider_changed == false) {
      alert("Please answer the slider question.")
    }
    else if (!$.trim($("#AI-usage").val()) || !$.trim($("#choice-selection").val())) {
      alert("Please input your response in the text box.")
    }
    else if (task_repeat < input['collaboration'].length) {
      training_phase_order = [coged_order_temp[task_repeat][0], coged_order_temp[task_repeat][0]];
      training_phase_order_ai = [coged_order_temp[task_repeat][1], coged_order_temp[task_repeat][1], coged_order_temp[task_repeat][1], 
                              coged_order_temp[task_repeat][1], coged_order_temp[task_repeat][1]];
      training_phase_count_ai = 0;
      $('#training-ai-name').css('color',ai_colors[task_repeat]);
      $('#training-ai-name').html('the AI');
      $('#training-different-AI-text').show()
      ai_condition = coged_order_temp[task_repeat][1].split(' ')
      baseline_condition = coged_order_temp[task_repeat][0].split(' ')

      if (ai_condition[1] == 'xai' || ai_condition[1] == 'xai-arrow' || ai_condition[1] == 'xai-written') {
        $('#training-different-AI-text').show()
        $('.main-highlight').removeClass('no-highlight')
      }
      if (ai_condition[0] == 'long') {
        $('#length-repeat-training').html('long')
      }
      else {
        $('#length-repeat-training').html('short')
      }
      transition('questionnaire', 'transition')
    }
    else {
      transition("questionnaire","questionnaire-human");
      output['final_balance'] = { 
        'gold': num_gold_credits,
        'silver': num_silver_credits
      }
      // $('#progress-text').html(progress_bar_text[progress_num]);
      progress_num += 1;
      coged_phase = false;
    }
 }
}

$('#transition-button').click(function() {
if (!same_condition && ai_condition[0] == 'short') {
  transition('transition', 'tutorial-maze-short');
  $('#easy-maze-photo').html('<img src=\"' + input['tutorial'][0]['maze'] +"\">")
  $('#easy-maze-solution').html(input['tutorial'][0]['c_r'])
}
else if (!same_condition) {
  transition('transition', 'tutorial-maze-long');
  $('#hard-maze-photo').html('<img src=\"' + input['tutorial'][1]['maze'] +"\">")
  $('#hard-maze-solution').html(input['tutorial'][1]['c_r'])
}
else {
  transition('transition', 'training-start');
  $('#training-start-ai-name').css('color',ai_colors[task_repeat]);
  $('#training-start-ai-name').html('the AI\'s');
  runTraining()
}
// transition('questionnaire', 'training-start');
// runTraining()
coged_phase_count = 0
gold_lower_bound = 0
gold_upper_bound = 100
silver_lower_bound = 0
silver_upper_bound = 100
gold_cost_of_ai = Math.round(average(gold_lower_bound, gold_upper_bound));
silver_cost_of_ai = Math.round(average(silver_lower_bound, silver_upper_bound));
})

// function repeatTaskAndTrain() {
//   ai_condition = input['coged-order'][task_repeat][1].split(" ");
//   baseline_condition = input['coged-order'][task_repeat][0].split(" ");
//   training_phase_order_ai = [coged_order_temp[task_repeat][1], coged_order_temp[task_repeat][1], coged_order_temp[task_repeat][1], 
//                               coged_order_temp[task_repeat][1], coged_order_temp[task_repeat][1]];
//   transition("questionnaire", "training-intermediate")
//   training_phase_count_ai = 0;
//   $('#training-ai-name').css('color',ai_colors[task_repeat]);
//   $('#training-ai-name').html('the AI');
//   $('#training-different-AI-text').show()
//   if (ai_condition[1] == 'xai' || ai_condition[1] == 'xai-arrow' || ai_condition[1] == 'xai-written') {
//     $('#training-different-AI-text').show()
//     $('.main-highlight').removeClass('no-highlight')
//   }
//   if (ai_condition[0] == 'long') {
//     $('#length-repeat-training').html('long')
//   }
//   else {
//     $('#length-repeat-training').html('short')
//   }

//   runTrainingAI();
// }


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
    // $('#progress-text').html(progress_bar_text[progress_num]);
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

      // "Received" writing
      if (current_length == 'long') {
        // $(coin_id).html('For each question you get correct, you will receive 50 gold credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini.png">, which is equal to $0.25.')
        // $(coin_id).html('For each question you get correct, you will receive 50 gold credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini.png">, which is equal to $0.05.')
        // $(length_id).html('long')
          // $('#coin-explanation').html('Note that 100 gold credits equals $0.10.')      
      }
      else {
        // $(coin_id).html('For each question you get correct, you will receive 50 gold credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini.png">, which is equal to $0.05.')
        // $(coin_id).html('For each question you get correct, you will receive 50 gold credits <img src="https://cs.stanford.edu/people/joerke/xai/coin-mini.png">, which is equal to $0.025.')
        // $(length_id).html('short')
          // $('#coin-explanation').html('Note that 100 silver credits equals $0.05.')
     }

      
     if (current_xai_setting == 'xai' || ai_condition[1] == 'xai-arrow'|| ai_condition[1] == 'xai-written') {
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
  // $('#progress-text').html(progress_bar_text[progress_num]);
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

// function disable(jQelement) {
//     jQelement.disableFind()
//     jQelement.bind('copy paste cut',function(e) {
//       e.preventDefault(); return false;
//   });
// }

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