function main() {
  shuffle_array(json_posts["posts"]);
  sanitizePosts(json_posts["posts"]);

  activate_screen(screen_order[0], "introduction");
}

main();
