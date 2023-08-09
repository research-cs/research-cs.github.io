function populate_LFQ(screen_info, screen_name) {
  $('#LFQ-feeds').empty();
  $('#LFQ-questions-container').empty();
  
  let feed = json_posts["posts"].slice(post_index, post_index + 10);
  post_index += 10;

  const screen_type = screen_info["study_type"];
  const questions = get_questions(screen_type);
  const num_feeds = screen_type == "post-placement" ? 1 : screen_type == "feed-comparison" ? 2 : 2;
  const num_features = screen_info['feature_count'];

  let feeds = [shallowCopy(feed)];

  if (screen_type == "feed-comparison-B") {
    feed = json_posts["posts"].slice(post_index, post_index + 10);
    post_index += 10;
  }

  for (let i = 1; i < num_feeds; i++) {
    feeds.push(shallowCopy(feed));
  }

  const unit_width = Math.min(12 / (num_feeds + 1), num_feeds * 5);

  const feed_column_width = Math.floor(unit_width * num_feeds);
  questions_column_width = Math.ceil(unit_width);

  $('#LFQ-feed-container').removeClass(function (index, className) {
    return (className.match(/\bcol-md-\S+/g) || []).join(' ');
  }).addClass(`col-md-${feed_column_width}`);
  
  $('#LFQ-questions-container').removeClass(function (index, className) {
    return (className.match(/\bcol-md-\S+/g) || []).join(' ');
  }).addClass(`col-md-${questions_column_width}`);


  let weights = generate_weights(feature_keys, num_features);
  let text = "";
  let labeled = false;

  if (screen_type == "feed-selection") {
    text = `A scoring function is defined as follows:`;
    labeled = true;
    let correct_feed_idx = Math.floor(Math.random() * feeds.length);

    questions['Q1']['options'] = Array.from({ length: feeds.length }, (value, index) => ("Feed " + String.fromCharCode(65 + index)));
    questions['Q1']['option-key'] = Array.from({ length: feeds.length }, (value, index) => index === correct_feed_idx ? 1 : 0);
  
    for (let i = 0; i < feeds.length; i++) {
      const feed = feeds[i];
      if (i == correct_feed_idx) {
        linear_combination_sort(feed, weights);
      } else {
        shuffle_array(feed);
      }
    }
  } else if (screen_type == "post-placement") {
    text = `This feed was sorted using the following scoring function:`;
    labeled = false;
    linear_combination_sort(feeds[0], weights);
    let randomIndex = Math.floor(Math.random() * feeds[0].length);
    let extractedPost = feeds[0][randomIndex];
    extractedPost['correct_position'] = randomIndex;
    
    let question_feed = [extractedPost];
    
    feeds[0].splice(randomIndex, 1);
    
    questions['Q1']['feed'] = question_feed;
  } else if (screen_type == "feed-comparison") {
    text = `Feed A was generated according to the following scoring function:`;
    labeled = true;

    let original_weights = shallowCopy(weights);

    linear_combination_sort(feeds[0], weights);
    let permuted_feature, permuted_weights;

    do {
      permuted_weights = shallowCopy(weights);
      permuted_feature = permute_weights(permuted_weights);
      linear_combination_sort(feeds[1], permuted_weights);
    } while (JSON.stringify(feeds[0]) == JSON.stringify(feeds[1]));

    let change_direction = permuted_weights[permuted_feature] > original_weights[permuted_feature] ? 1 : -1;

    let feature_options = shallowCopy(feature_names);
    shuffle_array(feature_options);
    questions['Q1']['options'] = feature_options;
    questions['Q1']['option-key'] = Array.from({ length: feature_keys.length }, (value, index) => index === feature_keys.indexOf(feature_options[permuted_feature]) ? 1 : 0);

    questions['Q2']['option-key'] = change_direction > 0 ? [1, 0] : [0, 1];
  } else if (screen_type == "feed-comparison-B") {
    text = `Feed A was generated according to the following scoring function:`;
    labeled = true;

    linear_combination_sort(feeds[0], weights);

    linear_combination_sort(feeds[1], weights);
    let same_sort_B = JSON.stringify(feeds[1]);

    let permuted = Math.random() > 0.5;
    let permuted_weights = shallowCopy(weights);

    if (permuted) {
      do {
        permute_weights_valence(permuted_weights);
        linear_combination_sort(feeds[1], permuted_weights);
      } while (JSON.stringify(feeds[1]) == same_sort_B);
    } else {
      linear_combination_sort(feeds[1], weights);
    }

    questions['Q1']['options'] = ["Yes", "No"];
    questions['Q1']['option-key'] = permuted ? [1, 0] : [0, 1];
  }

  text += generate_ranking_text(weights, screen_type == "feed-comparison");
  insert_text(text, document.getElementById('LFQ-questions-container'));

  populate_feed_container(feeds, document.getElementById('LFQ-feeds'), labeled);
  populate_questions_container(questions, document.getElementById('LFQ-questions-container'), screen_name);
}
