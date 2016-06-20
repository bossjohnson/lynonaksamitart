$(function() {
    $('.title').on('click', function() {
        var xhr = new XMLHttpRequest();
        xhr.open('post', '/admin/edit');
        xhr.send();
    });

    $('.delete').on('click', function() {
        var image_id = $(this).data().imageId;
        var xhr = new XMLHttpRequest();
        xhr.open('post', '/admin/delete/' + image_id);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                document.location.reload();
            }
        };
        xhr.send();
    });
});
