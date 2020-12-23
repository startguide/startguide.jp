jQuery(function() {
  // Download the data from the JSON file we generated
  var data = $.getJSON('/search_data.json');
  var result = [];
  data.then(function(response) {
    result = response;

    window.idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('author');
      this.field('category');

      var that = this;
      $.each(result, function(i, value) {
        var row = $.extend({ "id": i }, value)
        that.add(row);
      });
    });
  });


  // Event when the form is submitted
  $("#site_search").on('submit', function(event){
      event.preventDefault();
      var query = $("#search_box").val(); // Get the value for the text field
      var results = idx.search(query); // Get lunr to perform a search

      // 検索結果の表示
      display_search_results(results); // Hand the results off to be displayed
  });

  function display_search_results(results) {
    var $search_results = $("#search_results");

    // Are there any results?
    if (results.length) {
      $search_results.empty(); // Clear any old results

      // Iterate over the results
      results.forEach(function(value) {
        var item = result[value.ref];

        // Build a snippet of HTML for this result
        var appendString = '<li><a href="' + item.url + '">' + item.title + '</a></li>';

        // Add it to the results
        $search_results.append(appendString);
      });
    } else {
      $search_results.html('<li>No results found</li>');
    }
  }
});
