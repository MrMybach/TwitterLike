$(document).ready(function(){
    $('#new-tweet-js').on('ajax:success', function(xhr, data, status) {
        var tweet = '<div class="post">' +
                    '<small>' + data.published_at + '</small>' +
                    '<p>' + data.post + '</p>' +
                    '<div class="btn-group btn-group-xs" role="group">' +
                    '<a class="btn btn-warning" data-method="delete" href="/tweets/' + data.id + '" rel="nofollow">Delete</a>' +
                    '</div>' +
                    '</div>';

        $(tweet).hide().prependTo('.tweets-js').fadeIn(500);
        $('.form-group').removeClass('has-error');
        $('#new-tweet-js textarea').val('');
    }).on('ajax:error', function(xhr, error, status) {

        $('.form-group').addClass('has-error').on('keyup', function(){
            $(this).removeClass('has-error');
        });

        $('.alert-js').text(error.responseJSON.Text[0]).fadeIn().delay(3000).fadeOut();
    });

    $('#new-tweet-js textarea').on('keyup', function() {
        var textArea = $(this).val().length;
        var maxChar = 140;
        var charLeft = maxChar - textArea;
        $('.label-js').text(charLeft);
        $('input[type="submit"]').on('click', function (){
            $('.label-js').text(maxChar);
        });
    });

    $('.alert-dismissible').delay(2000).fadeOut();
    $('[data-toggle="tooltip"]').tooltip('.btn-group-xs');
});