$(function() {
    var images = JSON.parse($('#images').val());
    var currentImageIndex = 0;
    var catShow = false;
    var showingInfo = false;

    $('.infoPane').hide();
    $('.showInfo').hide();
    $('#categories').css('opacity', 0);
    $('.thumbnails').hide();
    $('#prev, #next').css('opacity', 0);

    // Previous and next button functionality
    $('#next').on('click', function() {
        currentImageIndex =
            currentImageIndex < images.length - 1 ?
            ++currentImageIndex :
            0;
        $('main').find('img').attr('src', encodeUrl(images[currentImageIndex].url));
        $('.infoPane').hide();
        showingInfo = false;
    });
    $('#prev').on('click', function() {
        currentImageIndex =
            currentImageIndex > 0 ?
            --currentImageIndex :
            images.length - 1;
        $('main').find('img').attr('src', encodeUrl(images[currentImageIndex].url));
        $('.infoPane').hide();
        showingInfo = false;
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
        !catShow ? $('#categories').css('opacity', 1) : $('#categories').css('opacity', 0);
        catShow = !catShow;
    });
    $('.category').on('click', function() {
        $('.infoPane').hide();
        showingInfo = false;
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

        var imagesInPane = 0;
        var numPanes = 1;
        $('.thumbnails').append('<div class="pane"></div>');

        for (var i = 0; i < imagesToShow.length; i++) {
            ++imagesInPane;
            if (imagesInPane > 4) {
                imagesInPane = 1;
                numPanes++;
                $('.thumbnails').append('<div class="pane"></div>');
            }
            var image = '<img src=' + encodeUrl(imagesToShow[i].url) + '>';
            $('.thumbnails').find('.pane').last().append(image);
        }

        for (var i = 0; i < $('.pane').length; i++) {
            $('.pane').eq(i).prepend('<span class="prevPane fa fa-chevron-left fa-2x"></span>');
            $('.pane').eq(i).append('<span class="nextPane fa fa-chevron-right fa-2x"></span>');
        }

        $('.prevPane').on('click', function() {
            var index = $('.pane').index($(this).parent());
            $(this).parent().hide();
            $('.pane').eq(index).prev().show();
        });
        $('.nextPane').on('click', function() {
            var index = $('.pane').index($(this).parent());
            $(this).parent().hide();
            $('.pane').eq(index).next().show();
        });

        $('.pane').first().find('.prevPane').css({
            color: 'lightgray',
            opacity: .1
        });
        $('.pane').first().find('.prevPane').off('click');

        $('.pane').last().find('.nextPane').css({
            color: 'lightgray',
            opacity: .1
        });
        $('.pane').last().find('.nextPane').off('click');

        if (numPanes === 1) {
            $('.prevPane, .nextPane').css({
                'color': 'lightgray',
                'opacity': .1
            });
            $('.prevPane, .nextPane').off('click');
        }

        $('.thumbnails').find('.pane').hide();
        $('.thumbnails').find('.pane').first().show();
        var previews = $('.thumbnails').find('img');

        $('main').addClass('faded');

        previews.on('mouseenter', function() {
            $(this).prop('oldHeight', $(this).css('height'));
            $(this).prop('oldWidth', $(this).css('width'));
            var newMaxHeight = Number($(this).css('height').split('px')[0]) + 10 + 'px';
            $(this).css({
                'max-height': newMaxHeight,
                height: '+=10px',
                width: '+=10px',
                'box-shadow': '5px 5px 5px rgba(0,0,0,.4)'
            });
        });
        previews.on('mouseleave', function() {
            $(this).css({
                'max-height': '100%',
                height: $(this).prop('oldHeight'),
                width: $(this).prop('oldWidth'),
                'box-shadow': 'none'
            });
        });
        previews.on('click', function() {
            $('main').removeClass('faded');
            $('main').find('img').attr('src', $(this).attr('src'));
            for (var i = 0; i < images.length; i++) {
                if (encodeUrl(images[i].url) === $(this).attr('src')) {
                    currentImageIndex = i;
                }
            }
            $('.thumbnails').hide();
        });
    });

    $('main').on('click', function() {
        $(this).removeClass('faded');
        $('.thumbnails').hide();
    });

    $('main img').on('mouseenter', function() {
        $('.showInfo').show();
    });
    $('main img').on('mouseleave', function() {
        if ($('.showInfo:hover').length === 0) {
            $('.showInfo').hide();
        }
    });

    // Show info functionality
    $('.showInfo').on('mouseleave', function() {
        $(this).hide();
    });
    $('.showInfo').on('click', function() {
        $('.infoPane').text(images[currentImageIndex].description);
        if (showingInfo) {
            $('.infoPane').hide()
        } else {
            $('.infoPane').show();
        }
        showingInfo = !showingInfo;
    });
    $('.infoPane').on('click', function() {
        $(this).hide();
        showingInfo = false;
    });
});

function encodeUrl(url) {
    return url.split(' ').join('%20');
}
