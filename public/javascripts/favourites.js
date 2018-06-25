window.onload = function () {
  let wordBlocks = $(".content");
  wordBlocks.each(function () {
    let block = $(this);
    $(".hearts", block).on("click", function (e) {
      let word = $(".word", block);
      let definition = $(".definition", block);
      let usage = $(".usage", block);
      alert(word.text());
      $.ajax({
        url: "/words/favourites/new",
        type: "POST",
        data: {
          word: word.text(),
          definition: definition.text(),
          usage: usage.text(),
        },
        success: function (data) {
          alert(data);
        }
      });
    });
  });
};


// find word block
// then look for the heart
// then look for the heart within the element
// this will point to the element that was selected