function parseTextFile() {
    const data = reddit_data;

    const lines = data.trim().split('\n');
    const result = [];

    for (const line of lines) {
      const [submissionId, subreddit, title, author, comments, nsfw, score, upvoted, link, image] = line.split('\t');
      const dictionary = {
        "SUBMISSION_ID": submissionId,
        "SUBREDDIT": subreddit,
        "TITLE": title,
        "AUTHOR": author,
        "#_COMMENTS": parseInt(comments),
        "NSFW": nsfw === 'NSFW',
        "SCORE": parseInt(score),
        "UPVOTED_%": parseFloat(upvoted),
        "LINK": link,
        "IMAGE": image,
      };
      result.push(dictionary);
    }

    return result;
}

function merge_objects(obj1, obj2) {
  const result = {};
  for (const key in obj1) {
    result[key] = obj1[key];
  }
  for (const key in obj2) {
    result[key] = obj2[key];
  }
  return result;
}

function shuffle_array(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// truncates a number to two decimal points
function truncate(number) {
  return Math.round(number * 10) / 10;
}

function shallowCopy(obj) {
  if (Array.isArray(obj)) {
    return obj.map(item => shallowCopy(item));
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, shallowCopy(value)]));
  }
  return obj;
}

function string_to_rgb(string) {
  // Simple hash function to convert the string to a numeric value
  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  // Convert the hash value to RGB values within the range [0, 255]
  function intToRGB(i) {
    const c = (i & 0x00FFFFFF).toString(16).toUpperCase();
    return "00000".substring(0, 6 - c.length) + c;
  }

  // Generate a numeric hash value from the input string
  const hashValue = hashString(string);

  // Convert the hash value to RGB values
  const rgbString = intToRGB(hashValue);

  // Extract the RGB values and convert them to an array
  const r = parseInt(rgbString.slice(0, 2), 16);
  const g = parseInt(rgbString.slice(2, 4), 16);
  const b = parseInt(rgbString.slice(4, 6), 16);

  return [r, g, b];
}

function generate_ranking_text(weights, show_zeroes = false) {
  let text = `$$\\begin{align*} \\text{Score} &= \\begin{aligned}[t]`;

  for (const key in weights) {
    if (weights[key] !== 0 || show_zeroes) {
      
      const sign = weights[key] >= 0 ? " + " : " - ";
      text += `&${sign}${Math.abs(weights[key])} \\times \\text{${feature_dict[key]}} \\\\`;
    }
  }

  text += "\\end{aligned} \\end{align*} $$";

  return text;
}

function generate_study_array(studies, feature_counts, num_repeats, template) {
  const screen_array = [];

  let introduction_screen = {
    'type': "introduction",
    'template': "introduction",
  };

  let submission_screen = {
    'type': "submission",
    'template': "submission",
  };

  screen_array.push(introduction_screen);

  const shuffledStudies = shallowCopy(studies);
  shuffle_array(shuffledStudies);
  
  for (let i = 0; i < shuffledStudies.length; i++) {
    for (let k = 1; k <= num_repeats; k++) {
      for (let j = 0; j < feature_counts.length; j++) {
        const studyObj = {
          'study_type': shuffledStudies[i],
          'feature_count': feature_counts[j],
          'instance_number': k,
          'type': "study",
          'template': template,
        };

        screen_array.push(studyObj);
      }
    }
  }

  screen_array.push(submission_screen);

  return screen_array;
}

function generate_post_survey_array(post_array, num_screens) {
  const screen_array = [];

  let introduction_screen = {
    'type': "introduction",
    'template': "introduction",
  };

  let submission_screen = {
    'type': "submission",
    'template': "submission",
  };

  screen_array.push(introduction_screen);

  for (let i = 0; i < num_screens; i++) {
    const surveyObj = {
      'type': "study",
      'study_type': 'post-question',
      'template': "single-post-question",
      'instance_number': i + 1,
    };

    screen_array.push(merge_objects(surveyObj, post_array[i]));
  }

  screen_array.push(submission_screen);

  return screen_array;
}

function generate_screen_name(screen_info) {
  let screen_name = `study-${screen_info["study_type"]}-features-${screen_info["feature_count"]}-${screen_info["instance_number"]}`;
  if (screen_info.type == 'introduction') {
    screen_name = 'introduction';
  } else if (screen_info.type == 'submission') {
    screen_name = 'submission';
  }
  return screen_name;
}

function get_questions(screen_type, confidence = true) {
  const questions = {};
  for (let i = 0; i < json_questions[screen_type].length; i++) {
    questions[`Q${i+1}`] = json_questions[screen_type][i];
  }

  if (confidence) {
    questions[`CF`] = json_questions["confidence"][0];
    questions[`CF`]['text'] = json_questions["confidence-texts"][screen_type];
  }
  
  return questions;
}
