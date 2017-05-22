//We ensure document is loaded before executing all JS.
$(document).ready(function() {
  $('.quote-card').addClass('animated fadeInUp'); //intro animation
  $('#site-title').addClass('animated fadeInDown'); //intro animation

  $('.btn-cta').hover(function () { //button hover animation
   $(this).toggleClass('animated tada');
  });

  //produces a random number within a range of IDs that are present in JSON.
  function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  //function to load JSON file, pull random object and populate all HTML elements with relevant content.
  function loadRandomQuote() {
    $.getJSON('https://api.myjson.com/bins/9jjxb', function(singleQuote) {
      var randomNum = randomIntFromInterval(1,34);

      $('#movieQuote').empty().append(singleQuote.quoteId[randomNum].quoteText);
      $('#quoteAttribution').empty().append("- " + singleQuote.quoteId[randomNum].quoteMovie);
      $('#quoteImg').attr("src", singleQuote.quoteId[randomNum].quoteImgUrl);
      $('#quoteImg').attr("alt", singleQuote.quoteId[randomNum].imgAltText);
      $('.twitter-share-button').attr("href", "https://twitter.com/intent/tweet?text=" + singleQuote.quoteId[randomNum].quoteText + "  - " + singleQuote.quoteId[randomNum].quoteMovie);
    });
  }

  //execute function on page load
  loadRandomQuote();

  //add function execution when user clicks "Gimme Another!" button. This also times the in/out animation of the element.
  $('.btn-cta').click(function() {
    $('.quote-card').removeClass('animated fadeInUp');
    $('.quote-card').addClass('animated fadeOutRight');
    setTimeout(function() {
            $('.quote-card').removeClass('fadeOutRight');
            $('.quote-card').toggle();
            loadRandomQuote();
        }, 850);
    setTimeout(function() {
            $('.quote-card').addClass('fadeInLeft');
            $('.quote-card').toggle();
        }, 1100);




  });


  //ensures a new window is opened when user wants to tweet a quote.
  jQuery('a[target^="_newwin"]').click(function(e) {
    e.preventDefault();
    var width = 500;
    var height = 300;
    window.open(this.href , 'newwindow', 'width=' + width + ', height=' + height + ', top=' + ((window.innerHeight - height) / 2) + ', left=' + ((window.innerWidth - width) / 2));
  });

});
