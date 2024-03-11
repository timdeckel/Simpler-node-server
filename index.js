var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
    var URL = url.parse(req.url, true);
    var parsedUrl = URL.query;
    const lineBreak = '<br>'
    const instructions = "<p>Add /shoes, /hats, /pants or /shirts to the URL to find another page.<p/>" + "<p>To go to the page with queries in the URL you can use: /?Value= and either write red, green or blue </p>"
    if(req.url === "/"){
        const header = '<h2>This is the Home Page</h2>'
        const content = header + lineBreak + instructions;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content); 
    } else if( req.url === "/shoes") {
        res.write('<p>this page is about shoes, they go on your feet</p>' + lineBreak + instructions); 
        res.end();
    }else if( req.url === "/hats") {
        res.write('<p>this page is about hats, it goes on your head</p>' + lineBreak + instructions); 
        res.end();
    }else if( req.url === "/shirts") {
        res.write('<p>this page is about shirts, they go on your torso</p>' + lineBreak + instructions); 
        res.end();
    }else if( req.url === "/pants") {
        fs.readFile('pants.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
          });
    }else if(parsedUrl.value) {
        fs.readFile(`${parsedUrl.value}.txt`, function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write("<p>This text is from a text file</p>" + lineBreak + data + lineBreak + instructions);
            return res.end();
          });
    }
    
}).listen(8080, ()=>console.log("the server has started.")); 