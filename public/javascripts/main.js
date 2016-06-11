$(function() {

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
        $('header, footer, main').css('opacity', '.2');
        $('.current').attr('src', $(this).attr('src'));
        $('#imgPlacement').show();

    });

    $('.current').on('click', function() {
        $('#imgPlacement').hide();
        $('header, footer, main').css('opacity', '1');
    });

});
