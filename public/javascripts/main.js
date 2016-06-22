$(function() {
    var images = JSON.parse($('#images').val());
    var currentImageIndex = 0;
    var catShow = false;

    $('#categories').hide();
    $('.thumbnails').hide();
    $('#prev, #next').css('opacity', 0);

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
    $('.changeImg').on('mouseenter', function() {
        $('#prev, #next').css('opacity', 1);
    });
    $('.changeImg').on('mouseleave', function() {
        $('#prev, #next').css('opacity', 0);
    });

    // Gallery functionality
    $('#gallery').on('click', function() {
        !catShow ? $('#categories').show() : $('#categories').hide();
        catShow = !catShow;
    });
    $('.category').on('click', function() {
        var imagesToShow = [];
        if ($(this).hasClass('showAll')) {
            imagesToShow = images;
        } else {
            for (var i = 0; i < images.length; i++) {
                if ($(this).text() === images[i].category_name) {
                    imagesToShow.push(images[i]);
                }
            }
        }
        $('.thumbnails').children().remove();
        $('.thumbnails').show();
        for (var i = 0; i < imagesToShow.length; i++) {
            var image = '<img src=' + encodeUrl(imagesToShow[i].url) + '>';
            $('.thumbnails').append(image);
        }
        var previews = $('.thumbnails').find('img');
        previews.on('mouseenter', function() {
            $(this).css({
                height: '+=10px',
                width: '+=10px'
            });
        });
        previews.on('mouseleave', function() {
            $(this).css({
                height: '-=10px',
                width: '-=10px'
            });
        });
        previews.on('click', function() {
            // console.log('ok');
            $('main').css('background-image', 'url(' + $(this).attr('src') + ')');
            $('.thumbnails').hide();
        });
    });


});

function encodeUrl(url) {
    return url.split(' ').join('%20');
}
