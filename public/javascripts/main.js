$(function() {
    var images = JSON.parse($('#images').val());
    var currentImageIndex = 0;
    var catShow = false;

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
                images[currentImageIndex].url.split(' ').join('%20') +
            ')');
    });
    $('#prev').on('click', function() {
        currentImageIndex =
            currentImageIndex > 0 ?
            --currentImageIndex :
            images.length - 1;
        $('main').css('background-image', 'url(' +
                images[currentImageIndex].url.split(' ').join('%20') +
            ')');
    });

    $('#gallery').on('click', function() {
        !catShow ? $(this).after(categories) : categories.remove();
        catShow = !catShow;
    });


});
