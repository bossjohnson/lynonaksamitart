$(function() {
    var images = JSON.parse($('#images').val());
    var currentImageIndex = 0;
    var catShow = false;

    $('#prev, #next').css('opacity', 0);

    var all = $('<a class="category">All</a>');
    var ink = $('<a class="category">Ink</a>');
    var paintings = $('<a class="category">Paintings</a>');
    var commissioned = $('<a class="category">Commissioned</a>');
    var categories = $('<div></div>')
        .append(all)
        .append(ink)
        .append(paintings)
        .append(commissioned);

    // Previous and next button functionality
    $('#next').on('click', function() {
        currentImageIndex =
            currentImageIndex < images.length - 1 ?
            ++currentImageIndex :
            0;
        $('main').css('background-image', 'url(' +
            encodeUrl(images[currentImageIndex].url) +
            ')');
    });
    $('#prev').on('click', function() {
        currentImageIndex =
            currentImageIndex > 0 ?
            --currentImageIndex :
            images.length - 1;
        $('main').css('background-image', 'url(' +
            encodeUrl(images[currentImageIndex].url) +
            ')');
    });

    // Show and hide previous and next buttons on mouseover
    $('.changeImg').on('mouseenter', function () {
      $('#prev, #next').css('opacity', 1);
    });
    $('.changeImg').on('mouseleave', function () {
      $('#prev, #next').css('opacity', 0);
    });

    $('#gallery').on('click', function() {
        !catShow ? $(this).after(categories) : categories.remove();
        catShow = !catShow;
    });


});

function encodeUrl(url) {
    return url.split(' ').join('%20');
}
