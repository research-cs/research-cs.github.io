function insert_label(labelText, labelContainer, label_width) {
  const label_div = document.createElement("div");
  label_div.className = `col-${label_width} d-flex align-items-center`;
  label_div.innerHTML = 
  `<div class="feed-label">
    <span class="font-weight-bold h2">${labelText}</span>
  </div>`;
  labelContainer.appendChild(label_div);
}

function insert_feed(feed_data, container, feed_width, locked) {
  const feedBankContainer = document.createElement("div");
  feedBankContainer.className = `col-md-${feed_width} p-md-1`;

  const feedParentUl = document.createElement("ul");
  feedParentUl.className = `feed sortable${locked ? ' locked' : ''} feed-list-bank list-unstyled`;

  feed_data.forEach(post => {
    insert_post(post, feedParentUl, locked);
  });

  feedBankContainer.appendChild(feedParentUl);

  container.appendChild(feedBankContainer);

  $('.sortable').sortable({
    connectWith: '.sortable',
    cancel: '.static',
    scroll: false,
    zIndex: 9999,
    appendTo: $('.feed').not('.locked'),
  });
}

function insert_post(post, feed_parent_list, locked) {
  const postListItem = document.createElement("li");
  postListItem.className = `bg-white border mt-2 post${locked ? ' static' : ''} rounded`;
  let rgb = string_to_rgb(post.author_name);

  postListItem.innerHTML = `
    <div class="d-flex flex-row justify-content-between align-items-center p-1 border-bottom">
      <div class="d-flex flex-row align-items-center feed-text px-2">
        <div style="width: 40px; height: 40px; border-radius: 50%; background-color: rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]});"></div>
        <div class="d-flex flex-column flex-wrap ml-2">
          <span class="font-weight-bold">${post.author_name}</span>
          <span class="small-text">${post.days_since_posted} hour${post.days_since_posted != 1 ? "s" : ""} ago</span>
        </div>
      </div>
      <div class="feed-icon px-2"><i class="fa fa-ellipsis-v text-black-50"></i></div>
    </div>
    <div class="p-1 px-1">
      <span class="small-text">${post.text}</span>
    </div>
    <div class="d-flex justify-content-between p-1 py-1">
      <div class="character-count p-1 px-1">
        <span class="xs-text">${post.text.length} characters</span>
      </div>
      <div class="socials d-flex justify-content-end socials">
        <div class="social-item">
          <i class="fa fa-thumbs-up"></i>
          <span class="count">${post.like_count}</span>
        </div>
        <div class="social-item">
          <i class="fa fa-comments-o"></i>
          <span class="count">${post.comment_count}</span>
        </div>
        <div class="social-item">
          <i class="fa fa-eye"></i>
          <span class="count">${post.view_count}</span>
        </div>
      </div>
    </div>
  `;

  postListItem.setAttribute("data-number", post.correct_position ?? -1);

  feed_parent_list.appendChild(postListItem);
}

function populate_feed_container(feeds, container, labeled) {
  const feed_width = Math.floor(12 / feeds.length);
  const label_width = feed_width;

  const labelRow = document.createElement("div");
  labelRow.className = "row label-container align-items-start pl-1 pr-3 pb-2";
  container.appendChild(labelRow);

  const feedRow = document.createElement("div");
  feedRow.className = "row feed-scroll visible-scrollbar";
  container.appendChild(feedRow);

  for (let i = 0; i < feeds.length; i++) {
    if (labeled) {
      let labelText = String.fromCharCode(65 + i);
      insert_label(labelText, labelRow, label_width);
    }

    insert_feed(feeds[i], feedRow, feed_width, true);
  }
}

function insert_text(question_text, container) {
  const question_div = document.createElement("div");
  question_div.className = "pr-3";

  const question_element = document.createElement("p");
  question_element.className = "small-text font-weight-bold mb-0";
  question_element.innerHTML = question_text;
  question_div.appendChild(question_element);

  container.appendChild(question_div);
}
function insert_mcq(question, container, screen_name, question_name) {
  const question_div = document.createElement("div");
  question_div.className = "study-question pl-2 mb-2 mr-3 rounded";
  question_div.id = `${screen_name}-${question_name}`;

  insert_text(question.text, question_div);

  for (let i = 0; i < question.options.length; i++) {
    const radio_div = document.createElement("div");
    const radio_input = document.createElement("input");
    const radio_label = document.createElement("label");

    radio_div.className = "form-check mt-2";
    radio_input.className = "form-check-input";
    radio_label.className = "form-check-label";
    radio_label.style.display = "inline-block";
    radio_label.style.paddingLeft = "25px";
    radio_label.style.marginLeft = "-25px";

    radio_input.type = "radio";
    radio_input.name = `question_${container.id}_${question_name}`;
    radio_input.value = question["option-key"][i];
    radio_input.id = `${container.id}_${question.options[i].replace(/\s+/g, "_").toLowerCase()}`;

    radio_label.for = radio_input.id;
    radio_label.textContent = question.options[i];

    radio_div.appendChild(radio_input);
    radio_div.appendChild(radio_label);

    question_div.appendChild(radio_div);

    radio_label.addEventListener("click", () => {
      radio_input.checked = true;
    });
  }

  container.appendChild(question_div);
}

function insert_radio_buttons(question, container, screen_name, question_name) {
  const question_div = document.createElement("div");
  question_div.className = "study-question pl-2 mb-2 mr-3 rounded";
  question_div.id = `${screen_name}-${question_name}`;

  insert_text(question.text, question_div);

  const radioButtonsRow = document.createElement("div");
  radioButtonsRow.className = "radio-buttons-row";

  radioButtonsRow.style.display = "flex";
  radioButtonsRow.style.justifyContent = "between";

  question_div.appendChild(radioButtonsRow);

  let selectedButton = null;

  const min_length = question.options.reduce((min, current) => {
    return current.length < min ? current.length : min;
  }, question.options[0].length);

  for (let i = 0; i < question.options.length; i++) {
    const radio_button = document.createElement("button");

    radio_button.className = "btn btn-outline-primary mr-1 pt-2 d-flex justify-content-center align-items-center";
    radio_button.type = "button"; 

    radio_button.style.width = `${90 / question.options.length}%`;

    radio_button.addEventListener("click", () => {
      const selectedRadio = radio_button.querySelector("input[type='radio']");
      selectedRadio.checked = true;

      if (selectedButton) {
        selectedButton.classList.remove("btn-primary");
        selectedButton.querySelector("label").classList.remove("selected-label");
      }

      radio_button.classList.add("btn-primary");
      selectedButton = radio_button;
      selectedButton.querySelector("label").classList.add("selected-label"); 

      radio_button.blur();
    });

    const radio_input = document.createElement("input");
    radio_input.type = "radio";
    radio_input.name = `question_${container.id}_${question_name}`;
    radio_input.value = question['option-key'][i];
    radio_input.id = `${container.id}_${question.options[i].replace(/\s+/g, "_")}`.toLowerCase();
    radio_input.style.display = "none";

    const radio_label = document.createElement("label");
    radio_label.for = radio_input.id;
    radio_label.textContent = question.options[i];

    const maxFontSize = (100 *  Math.sqrt(questions_column_width)) / min_length;

    radio_label.style.fontSize = `${maxFontSize}px`;

    radio_label.classList.add("d-flex", "justify-content-center", "align-items-center");

    radio_button.appendChild(radio_input);
    radio_button.appendChild(radio_label);
    radioButtonsRow.appendChild(radio_button);
  }

  container.appendChild(question_div);
}

function insert_checkbox(question, container, screen_name, question_name) {
  const question_div = document.createElement("div");
  question_div.className = "study-question mb-4 rounded"; 
  question_div.id = `${screen_name}-${question_name}`;
  
  insert_text(question.text, question_div);

  for (let i = 0; i < question.options.length; i++) {
    const checkbox_div = document.createElement("div");
    const checkbox_input = document.createElement("input");
    const checkbox_label = document.createElement("label");

    checkbox_div.className = "form-check mt-2"; 
    checkbox_input.className = "form-check-input";
    checkbox_label.className = "form-check-label";

    checkbox_input.type = "checkbox";
    checkbox_input.name = `question_${container.id}`;
    checkbox_input.value = question['option-key'][i];
    checkbox_input.id = `${container.id}_${question.options[i].replace(/\s+/g, "_").toLowerCase()}`;

    checkbox_label.for = checkbox_input.id;
    checkbox_label.textContent = question.options[i];
    
    checkbox_div.appendChild(checkbox_input);
    checkbox_div.appendChild(checkbox_label);
    question_div.appendChild(checkbox_div);
  }
  
  container.appendChild(question_div);
}

// function insert_step_slider(question, container, screen_name, question_name) {

//   // const slider_input = document.createElement("input");
//   // slider_input.type = "range";
//   // slider_input.className = "form-range mt-2"; 
//   // slider_input.min = 1;
//   // slider_input.max = question.options.length;
//   // slider_input.step = 1;
//   // slider_input.value = Math.ceil(question.options.length / 2);
//   // slider_input.id = `${screen_name}-${question_name}-slider`;

//   // const output_div = document.createElement("div");
//   // output_div.className = "small-text mt-1 text-center";

//   // function updateOutputText() {
//   //   const index = parseInt(slider_input.value) - 1;
//   //   output_div.textContent = question.options[index];
//   // }

//   // slider_input.addEventListener('input', updateOutputText);

//   // updateOutputText();

//   // question_div.appendChild(slider_input);
//   // question_div.appendChild(output_div);

//   // container.appendChild(question_div);
// }

function insert_post_placement(question, container, screen_name, question_name) {
  const question_div = document.createElement("div");
  question_div.className = "post-placement-question pl-2 mb-3 mr-3 rounded";
  question_div.id = `${screen_name}-${question_name}`;

  insert_text(question.text, question_div);

  container.appendChild(question_div);

  insert_feed(question['feed'], question_div, 12, false);
}

function insert_radio_grid(question, container, screen_name, question_name) {
  const question_div = document.createElement("div");
  question_div.className = "study-question mb-4";
  question_div.id = `${screen_name}-${question_name}`;

  insert_text(question.text, question_div);

  const gridDiv = document.createElement("div");
  gridDiv.className = "radio-grid";

  for (let i = 0; i < question.entries.length; i++) {
    const entryDiv = document.createElement("div");
    entryDiv.className = "radio-grid-row row mb-2";

    const entryLabel = document.createElement("div");
    entryLabel.className = "col-md-3 radio-grid-entry";
    entryLabel.textContent = question.entries[i];
    entryDiv.appendChild(entryLabel);

    const optionDiv = document.createElement("div");
    optionDiv.className = "col-md-9 radio-grid-options";

    for (let j = 0; j < question.options.length; j++) {
      const radio_input = document.createElement("input");
      const radio_label = document.createElement("label");

      radio_input.className = "form-check-input";
      radio_label.className = "form-check-label";

      radio_input.type = "radio";
      radio_input.name = `question_${container.id}_${i}`;
      radio_input.value = question['option-key'][i][j];
      radio_input.id = `${container.id}_${question.entries[i]}_${question.options[j].replace(/\s+/g, "_").toLowerCase()}`;
      radio_input.setAttribute("data-entry", i);

      radio_label.for = radio_input.id;
      radio_label.textContent = question.options[j];

      optionDiv.appendChild(radio_input);
      optionDiv.appendChild(radio_label);
    }

    entryDiv.appendChild(optionDiv);
    gridDiv.appendChild(entryDiv);
  }

  question_div.appendChild(gridDiv);
  container.appendChild(question_div);
}

function populate_questions_container(questions, container, screen_name) {
  
  for (let question_name in questions) {
    let question = questions[question_name];

    if (question['type'] == 'checkbox') {
      insert_checkbox(question, container, screen_name, question_name);
    } else if (question['type'] == 'multiple-choice') {
      insert_mcq(question, container, screen_name, question_name);
    } else if (question['type'] == 'post-placement') {
      insert_post_placement(question, container, screen_name, question_name);
    } else if (question['type'] == 'radio-buttons') {
      insert_radio_buttons(question, container, screen_name, question_name);
    } else if (question['type'] == 'radio-grid') {
      insert_radio_grid(question, container, screen_name, question_name);
    } else {
      console.log('unknown question type');
    }
  }
}
