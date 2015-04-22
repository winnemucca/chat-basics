console.log('in the house');
// io creates a manager
var socket = io();
socket.emit('message','hello from client');

$(document).ready(function() {

	
	var socket = io();
    var input = $('input');
    var messages = $('.messages');

    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = input.val();
        addMessage(message);
        socket.emit('message',message);
        input.val('');
        // why is the default required below?
        event.preventDefault();

    });
    socket.on('message',addMessage);

});