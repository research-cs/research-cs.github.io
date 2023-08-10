
/* takes in a feed array of posts and weights it's features according to the weights dictionary 
 */
function linear_combination_sort(feed, weights) {
    feed.sort(function(a, b){
        let a_score = 0;
        let b_score = 0;
        for (let key in weights) {
            if (key == "character_count") {
                a_score += weights[key] * a["text"].length;
                b_score += weights[key] * b["text"].length;
            } else {
                a_score += weights[key] * a[key];
                b_score += weights[key] * b[key];
            }   
        }
        return  b_score - a_score;
    });
}

// given an array of features (strings) and the number of features that should have
// weight > 0, generates a random weight dictionary
function generate_weights(features, num_features) {
    let weights = {};
    let num_features_set = 0;
    while (num_features_set < num_features) {
        let random_feature = features[Math.floor(Math.random() * features.length)];
        if (weights[random_feature] == undefined) {
            do {
                weights[random_feature] = truncate(Math.random() * 2 - 1);
            } while (Math.abs(weights[random_feature]) <= 0.1);
            num_features_set++;
        }
    }

    // set all other features to 0
    for (let feature of features) {
        if (weights[feature] == undefined) {
            weights[feature] = 0;
        }
    }

    return weights;
}

// function permute_weights(weights) {
// modifies the weights dictionary with one of the weights changed
// returns a the name of the weight that was changed
function permute_weights(weights) {
    let keys = Object.keys(weights);
    let random_key = keys[Math.floor(Math.random() * keys.length)];
    weights[random_key] = truncate(Math.random() * 2 - 1);
    return random_key;
}

// function permute_weights_valence(weights) {
// modifies the weights dictionary with one of the weights changed to another sign
// returns a the name of the weight that was changed
function permute_weights_valence(weights) {
    let keys = Object.keys(weights);

    let random_key = keys[Math.floor(Math.random() * keys.length)];

    if (weights[random_key] == 0) {
        do {
            weights[random_key] = truncate(Math.random() * 2 - 1);
        } while (Math.abs(weights[random_key]) <= 0.1);
    } else {
        weights[random_key] = -weights[random_key];
    }
    
    return random_key;
}
