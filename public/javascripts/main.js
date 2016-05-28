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
