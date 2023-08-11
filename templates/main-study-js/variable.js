var questions_column_width;

var startTime;

let screen_order = generate_study_array(["feed-comparison-B"], [1, 2, 5], 5, "left-feed-questions");

var post_index = 0;
var screen_index = 0;

var feature_dict = 
{
    "days_since_posted": "Hours Since Posted", 
    "like_count": "Like Count", 
    "view_count": "View Count", 
    "comment_count": "Comment Count", 
    "character_count": "Character Count"
};

var feature_keys = Object.keys(feature_dict);
var feature_names = Object.values(feature_dict);


var start_times = {};

output = {
    
}
