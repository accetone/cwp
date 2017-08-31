$(function () {
  $('.task__code').each((index, block) => {
    hljs.highlightBlock(block);
  });

  const solution = $('.solution code');

  solution.append(`(async function () {<br>`);

  $('.task').each((index, block) => {
    block = $(block);

    if (block.hasClass('task_questions')) {
      block.prepend($(`<div class="task__begin">function questions() {</div>`));
      solution.append(`<br>  await questions();`);
    } else if (block.hasClass('task_extras')) {
      block.prepend($(`<div class="task__begin">function extras() {</div>`));
      solution.append(`<br>  if (wantToLearnMore) {<br>`);
      solution.append(`    await extras();<br>`);
      solution.append(`  }<br>`);
    } else {
      block.prepend($(`<div class="task__begin">function task${index.toString().padStart(2, '0')}() {</div>`));
      solution.append(`  await task${index.toString().padStart(2, '0')}();`);
    }

    block.append($('<div class="task__end">}</div>'));
    solution.append(`<br>`);
  });

  solution.append(`  console.log('Congratulations!');<br>`);
  solution.append(`})();`);

  hljs.highlightBlock(solution[0]);
});