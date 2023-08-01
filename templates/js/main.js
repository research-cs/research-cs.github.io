function main() {
  screen_order.push(...generate_study_array(3, 2, 1));

  shuffle_array(json_posts["posts"])
  sanitizePosts(json_posts["posts"]);

  console.log(screen_order);
  activate_screen(screen_order[0], "introduction");
}

main();
