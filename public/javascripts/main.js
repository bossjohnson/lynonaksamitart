$(function() {
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

    $('#gallery').on('click', function() {
        !catShow ? $(this).after(categories) : categories.remove();
        catShow = !catShow;
    });

    // $('main').css('background-image', latest.url);
});
