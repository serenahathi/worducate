window.onload = function () {
  let wordBlocks = $(".content");
  wordBlocks.each(function () {
    let block = $(this);
    $(".hearts", block).on("click", function (e) {
      alert("this is a fave");
      let word = $(".word", block);
      alert(word.text());
      $.ajax({
        url: "/words/favourites/new",
        type: "POST",
        data: {},
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