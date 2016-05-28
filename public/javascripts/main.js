$('.thumbnail').on('mouseenter', function() {
    $(this).animate({
        top: '-=10px',
        height: '+=20px',
        width: '+=20px'
    }, 100);
});

$('.thumbnail').on('mouseleave', function() {
    $(this).animate({
        top: '+=10px',
        height: '-=20px',
        width: '-=20px'
    }, 100);
});

$('.thumbnail').on('click', function() {
    $('.current').attr('src', $(this).attr('src'));
    $('.current').show();
});

$('.current').on('click', function() {
    $(this).hide();
});

window.setInterval(function() {
    var randNum = Math.floor(Math.random() * $('.thumbnail').length);
    var url = $('.thumbnail')[randNum].src;
    console.log(url);
    $('main').css('background-image', 'url(' + url + ')');
}, 5000);
