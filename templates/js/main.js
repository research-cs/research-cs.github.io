function main() {
  screen_order.push(...generate_study_array(3, 3, 2));

  shuffle_array(json_posts["posts"])
  sanitizePosts(json_posts["posts"]);

  activate_screen(screen_order[0], "introduction");
}

main();
