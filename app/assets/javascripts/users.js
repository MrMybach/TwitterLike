(function() {
    'use strict';

    var $reTweetLink = null,
        $addToFriendsLink = null,
        $flashMessagesWrapper = null,
        $flashMessage = '<div class="alert alert-info" role="alert" style="display:none"></div>';

    function reTweetHandler(event) {
        var $that = $(this),
            url = $that.attr('href'),
            method = $that.data('method');

        event.preventDefault();

        $.ajax({
            url: url,
            method: method,
            dataType: 'html',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
            },
            statusCode: {
                201: function() {
                    $flashMessagesWrapper.append($flashMessage);
                    $('.alert-info').text('Retweet successful! [201]').fadeIn('fast');
                    setTimeout(function() {
                        $('.alert-info').fadeOut('slow').remove();
                    }, 1700);

                    $that.prop('disabled', 'disabled').addClass('disabled').text('Retweeted');
                }
            }
        });
    }

    function addToFriendsHandler(event) {
        var $that = $(this),
            url = $that.data('url'),
            method = $that.data('method'),
            friendId = $that.data('friend-id');

        event.preventDefault();

        $.ajax({
            url: url,
            method: method,
            data: { 'friend_id': friendId },
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
            },
            statusCode: {
                201: function() {
                    $flashMessagesWrapper.append($flashMessage);
                    $('.alert-info').text('You have new friend! [201]').fadeIn('fast');
                    setTimeout(function() {
                        $('.alert-info').fadeOut().remove();
                    }, 1700);
                    $that.fadeOut('slow').remove();
                },
                422: function() {
                    $flashMessagesWrapper.append($flashMessage);
                    $('.alert-info')
                        .removeClass('alert-info')
                        .addClass('alert-danger')
                        .text('You don\'t have new friend! [422]')
                        .fadeIn('fast');
                    setTimeout(function() {
                        $('.alert-danger').fadeOut().remove();
                    }, 2000);
                    $that.fadeOut('slow').remove();
                }
            }
        });
    }

    $(function() {
        $reTweetLink = $('.retweet-js');
        $flashMessagesWrapper = $('.system-messages');
        $addToFriendsLink = $('.add-to-friend-js');

        $reTweetLink.on('click', reTweetHandler);
        $addToFriendsLink.on('click', addToFriendsHandler);
    });
})();
