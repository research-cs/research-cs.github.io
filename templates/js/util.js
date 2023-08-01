function shuffle_array(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// truncates a number to two decimal points
function truncate(number) {
  return Math.round(number * 100) / 100;
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

  console.log(text);
  return text;
}

function generate_study_array(num_studies, num_feature_counts, num_repeats) {
  const studyArray = [];

  studyArray.push(introduction_screen);

  for (let i = 1; i <= num_studies; i++) {
    for (let j = 1; j <= num_feature_counts; j++) {
      for (let k = 1; k <= num_repeats; k++) {
        const studyObj = {
          study_number: i,
          feature_count: j,
          instance_number: k,
          type: "study",
        };

        studyArray.push(studyObj);
      }
    }
  }

  studyArray.push(submission_screen);

  return studyArray;
}

function generate_screen_name(screen_info) {
  let screen_name = `study-${screen_info["study_number"]}-features-${screen_info["feature_count"]}-${screen_info["instance_number"]}`;
  if (screen_info.type == 'introduction') {
    screen_name = 'introduction';
  } else if (screen_info.type == 'submission') {
    screen_name = 'submission';
  }
  return screen_name;
}

function removeEmojis(input) {
  const emojiPattern = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}\u{1F191}-\u{1F251}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F171}\u{1F17E}-\u{1F17F}\u{1F18E}\u{3030}\u{2B50}\u{2B55}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{3297}\u{3299}\u{23F0}\u{23F3}\u{231A}-\u{231B}\u{25FD}-\u{25FE}\u{2B50}\u{23E9}-\u{23EC}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{27A1}]/gu;

  return input.replace(emojiPattern, '');
}

function removeHashtags(input) {
  const hashtagPattern = /#[^\s#]+/g;

  return input.replace(hashtagPattern, '');
}

// https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
function randn_bm(min, max, skew) {
  let u = 0, v = 0;
  while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random()
  let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
  
  num = num / 10.0 + 0.5 // Translate to 0 -> 1
  if (num > 1 || num < 0) 
    num = randn_bm(min, max, skew) // resample between 0 and 1 if out of range
  
  else{
    num = Math.pow(num, skew) // Skew
    num *= max - min // Stretch to fill range
    num += min // offset to min
  }
  return Math.round(num);
}

function sanitizePosts(posts) {

  for (let i = 0; i < posts.length; i++) {
    // if the first character is an emoji, remove it 65% of the time
    if (posts[i].text.charCodeAt(0) >= 0x1F600 && posts[i].text.charCodeAt(0) <= 0x1F64F) {
      if (Math.random() < 0.65) {
        posts[i].text = posts[i].text.slice(2);
      }
    }

    // Randomly remove emojis, hashtags, exclamations, and uppercases
    if (Math.random() < 0.65) {
      posts[i].text = removeEmojis(posts[i].text);
    }

    if (Math.random() < 0.65) {
      posts[i].text = removeHashtags(posts[i].text);
    }

    if (Math.random() < 0.65) {
      posts[i].text = posts[i].text.replace(/!/g, '.');
    }

    if (Math.random() < 0.35) {
      posts[i].text = posts[i].text.toLowerCase();
    }

    // if the author_name is too long, remove the last word
    while (posts[i].author_name.length > 16 && posts[i].author_name.split(" ").length > 1) {
      posts[i].author_name = posts[i].author_name.split(" ").slice(0, -1).join(" ");
    }

    // if the author_name is still too long, remove the last characters starting at the last capital letter
    if (posts[i].author_name.length > 18) {
      const lastCapitalIndex = posts[i].author_name.split("").reverse().join("").search(/[A-Z]/);
      posts[i].author_name = posts[i].author_name.slice(0, -lastCapitalIndex);
    }

    // Assign days_since_posted
    posts[i].days_since_posted = randn_bm(0, 500, 4);

    // Assign view_count, like_count, and comment_count
    posts[i].view_count = randn_bm(0, 2500, 4);

    posts[i].like_count =  randn_bm(posts[i].view_count / 6, posts[i].view_count, 1.1);

    posts[i].comment_count = randn_bm(posts[i].like_count / 6, posts[i].like_count, 1.5);
  }
}

