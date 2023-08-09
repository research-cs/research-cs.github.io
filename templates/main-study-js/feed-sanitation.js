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

