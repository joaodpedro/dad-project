function logSocket(from, event, msg){
    console.log('[%s]::(%s)::%s', from, event.toUpperCase(), msg);
}

module.exports = function(server, db){
    var io = require('socket.io')(server);

    io.on('connection', function(socket){
        logSocket(socket.id, 'connection', 'Socket connected');
        
        socket.on('msg', function(data){
            logSocket(socket.id, 'msg', data);
            io.emit('response', data);
        });
    });

    return io;
}