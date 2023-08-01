
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
            } while (weights[random_feature] == 0);
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

    // // This function sorts the feed on only a single variable. 
    // // @param feed is the original unsorted feed, type: Array of dictionary
    // // @param variable is the variable we are sorting on, type: string
    // // @param increasing represents if we are sorting in increasing or decreasing order
    // function sortSingleVar(feed, variable, increasing) {
        
    //     // sorts name alphabetically
    //     if (variable == "name") {
    //         sorted_feed = feed.sort(function(a, b){
    //             let x = a[variable].toLowerCase();
    //             let y = b[variable].toLowerCase();
    //             if (x < y) {return -1;}
    //             if (x > y) {return 1;}
    //             return 0;
    //         });
        
    //     // sorts on text length
    //     } else if (variable == "text") {
    //         sorted_feed = feed.sort(function(a, b){
    //             return a[variable].toLowerCase().length - b[variable].toLowerCase().length
    //         });
    //     }

    //     // sorts on quantitative key
    //     else {
    //         sorted_feed = feed.sort(function(a, b){
    //             return a[variable] - b[variable]; 
    //         });
    //     }
    
    // // reverse the ordering if the flag is on
    // if (increasing) {
    //     sorted_feed.reverse(); 
    // }
    //     return sorted_feed; 
    // }
