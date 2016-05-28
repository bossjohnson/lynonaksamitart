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
});

$('.current').on('click', function() {
    $(this).toggleClass('largeView');
});
