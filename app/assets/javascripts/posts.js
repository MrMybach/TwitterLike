(function() {
    'use strict';

    var $flashAlert = null,
        $form = null,
        $currentTweet = null,
        $deleteButton = null,
        $submitButton = null,
        $tweetInput = null,
        $tweetsList = null;

    function newTweetHandler(event) {
        var url = $form.prop('action'),
            data = $form.serialize();

        event.preventDefault();

        $form.find('#post_text').on('focus', $('.alert-js').fadeOut() );

        $.ajax({
            url: url,
            data: data,
            dataType: 'html',
            method: 'POST',
            statusCode: {
                201: function(data) {
                    $tweetsList.prepend(data);
                    $form.find('#post_text').val('');
                },
                422: function(error) {
                    var responseMsg = $.parseJSON(error.responseText);

                    $tweetInput.parent().addClass('has-error');

                    $flashAlert.text(responseMsg.Text[0] + '. ' + responseMsg.Text[1]).fadeIn();
                }
            }
        });
    }

    function removeTweet(event) {
        var url = $(this).prop('href');

        $currentTweet = $(this).parents('.post');

        event.preventDefault();

        $.ajax({
            url: url,
            method: 'DELETE',
            statusCode: {
                204: function() {
                    $currentTweet.fadeOut();
                    $currentTweet.remove();
                },
                404: function(error) {
                    console.log(error);
                }
            }
        });
    }

    function countCharacters() {
        var textArea = $(this).val().length,
            maxChar = 140,
            charLeft = maxChar - textArea;

        $('.input-group [data-toggle="tooltip"]').trigger('mouseenter');
        $tweetInput.parent().removeClass('has-error');
        $flashAlert.hide('fast').text('');
        $('.label-js').text(charLeft);
        $('input[type="submit"]').on('click', function () {
            $('.label-js').text(maxChar);
        });
    }

    $(function() {
        $flashAlert = $('.alert-js');
        $form = $('#new-tweet-js');
        $tweetsList = $('.tweets-js');
        $tweetInput = $form.find('#post_text');
        $submitButton = $form.find('input[type="submit"]');
        $deleteButton = $('.btn-delete-js');

        $tweetInput
            .on('keyup', countCharacters)
            .on('blur',
                function() {
                    $('.input-group [data-toggle="tooltip"]').trigger('mouseleave');
                });

        $('.input-group [data-toggle="tooltip"]').tooltip({container: 'body'});
        $submitButton.on('click', newTweetHandler);
        $deleteButton.on('click', removeTweet);
    });
})();
