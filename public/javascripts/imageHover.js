$(function() {
    $('img').on('mouseenter', function() {
        $(this).css('box-shadow', '2px 2px 15px black');
    });
    $('img').on('mouseleave', function() {
        $(this).css('box-shadow', 'none');
    });
});
