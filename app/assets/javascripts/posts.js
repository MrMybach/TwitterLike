(function() {
    'use strict';

    var $flashAlert = null,
        $form = null,
        $currentTweet = null,
        $submitButton = null,
        $tweetInput = null,
        $tweetsList = null;

    function newTweetHandler(event) {
        var url = $form.prop('action'),
            data = $form.serialize();

        event.preventDefault();

        $form.find('#post_text').on('focus', $('.alert-js').fadeOut());

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
        var url = $(this).data('url'),
            method = $(this).data('method');

        event.preventDefault();

        $currentTweet = $(this).parents('.post');

        $.ajax({
            url: url,
            method: method,
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
            },
            statusCode: {
                204: function() {
                    $currentTweet.fadeOut(400);

                    setTimeout(function() {
                        $currentTweet.remove();
                    }, 400);
                },
                404: function(error) {
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

        $('#tweets').infinitescroll({
            navSelector: 'nav .pagination',
            nextSelector: 'nav .pagination a[rel=next]',
            contentSelector: '#tweets',
            itemSelector: '#tweets > div.post',
            loading: {
                msgText: '<small class="text-muted">Loading more Tweets</small>',
                finishedMsg: '<small class="text-muted">No more Tweets</small>'
            }
        });

        $tweetInput
            .on('keyup', countCharacters)
            .on('blur',
                function() {
                    $('.input-group [data-toggle="tooltip"]').trigger('mouseleave');
                });

        $('.input-group [data-toggle="tooltip"]').tooltip({container: 'body'});
        $submitButton.on('click', newTweetHandler);
        $('#tweets').on('click', '.btn-delete-js', removeTweet);
    });
})();
