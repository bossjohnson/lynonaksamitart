$(function() {
    $('.delete, .edit, .save, .showImageInfo').hide();

    // Edit button functionality
    $('.edit').on('click', function() {
        var header = $(this).parent();
        var container = $(this).parent().parent();

        var imageId = container.find('.imageId').val();
        var imageTitle = container.find('.imageTitle').val();
        var imageCategory = container.find('.imageCategory').val();
        var imageDesc = container.find('.imageDesc').val();

        $(this).hide();
        $(this).siblings('.save').show();
        header.prop('editing', true);
        container.find('.showImageInfo').show();

        container.find('.artTitle').val(imageTitle);
        container.find('.artCat').val(imageCategory);
        container.find('.description').val(imageDesc);

        $(this).parent().parent().find('input').focus();
    });

    // Save button functionality
    $('.save').on('click', function() {
        var container = $(this).parent().parent();
        var body = {
            title: container.find('.artTitle').val(),
            category_id: container.find('.artCat').val(),
            description: container.find('.description').val()
        };

        container.find('.imageTitle').val(body.title);
        container.find('.title').text(body.title);
        container.find('.imageCategory').val(body.category_id);
        container.find('.imageDesc').val(body.description);

        $(this).hide();
        $(this).siblings('.edit').show();
        $(this).parent().prop('editing', false);
        $(this).parent().parent().find('.showImageInfo').hide();

        var xhr = new XMLHttpRequest();
        xhr.open('post', '/admin/edit/' + container.find('.imageId').val());
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                console.log('ok');
            }
        };
        xhr.send(JSON.stringify(body));
    });

    // Delete button functionality
    $('.delete').on('click', function() {
        var image_id = $(this).parent().parent().find('.imageId').val();
        var xhr = new XMLHttpRequest();
        xhr.open('post', '/admin/delete/' + image_id);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                document.location.reload();
            }
        };
        xhr.send();
    });

    // Show edit (or save and delete on mouseover
    $('.imageContainer').on('mouseenter', function() {
        if ($(this).find('.imageHeader').prop('editing')) {
            $(this).find('.delete, .save').show();
        } else {
            $(this).find('.delete, .edit').show();
        }
        $(this).css('box-shadow', '2px 2px 15px black');
    });
    $('.imageContainer').on('mouseleave', function() {
        if (!$(this).find('.imageHeader').prop('editing')) {
            $(this).find('.delete, .edit, .save').hide();
            $(this).css('box-shadow', 'none');
        }
    });

    // Click animation
    $('.delete, .edit').on('mousedown', function() {
        $(this).animate({
            'top': '+=1px',
            'left': '+=1px'
        }, 50);
    });
    $('.delete, .edit').on('mouseup', function() {
        $(this).animate({
            'top': '-=1px',
            'left': '-=1px'
        }, 50);
    });

});
