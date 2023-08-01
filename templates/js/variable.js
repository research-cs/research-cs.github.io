var questions_column_width;

var startTime;

let introduction_screen = {
    "type": "introduction",
};

let submission_screen = {
    "type": "submission",
};

let screen_order = [];

var post_index = 0;
var screen_index = 0;

var features = ["days_since_posted", "like_count", "view_count", "comment_count", "character_count"];
var feature_names = ["Hours Since Posted", "Like Count", "View Count", "Comment Count", "Character Count"];

var feature_dict = {"days_since_posted": "Hours Since Posted", "like_count": "Like Count", "view_count": "View Count", "comment_count": "Comment Count", "character_count": "Character Count"};

var start_times = {};

output = {
    
}
