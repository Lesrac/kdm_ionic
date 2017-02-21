/**
 * Created by Daniel on 21.02.2017.
 */
'use strict';
startWebServer('127.0.0.1', 'www', startTest);
function startWebServer(host, root, cb) {
    // Serve up public/ftp folder
    var serve = require('serve-static')(root);
    // Create server
    var server = require('http').createServer(function (req, res) { return serve(req, res, require('finalhandler')(req, res)); });
    // Listen
    server.listen(0, host);
    server.on('listening', function () {
        var port = server.address().port;
        console.log("Started web server on " + host + ":" + port);
        process.on('exit', function () { return server.close(); });
        cb("http://" + host + ":" + port);
    });
}
function startTest(url) {
    var argv = ['--baseUrl', url] // use the correct URL
        .concat(process.argv.slice(2)); // forward args to protractor
    require('child_process')
        .spawn('protractor', argv, { stdio: 'inherit', shell: true })
        .once('close', function (code) { return process.exit(code); });
}
