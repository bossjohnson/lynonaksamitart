$(function() {
    $('.title').on('click', function() {
        // console.log('click');
        var xhr = new XMLHttpRequest();
        xhr.open('post', '/admin/edit');
        xhr.send();
    });

    $('.delete').on('click', function() {
        var image_id = $(this).data().imageId;
        var xhr = new XMLHttpRequest();
        xhr.open('post', '/admin/delete/' + image_id);
        xhr.send();
        document.location.reload();
    });
});
