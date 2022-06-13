const http  = require('http');
const fs = require('fs');
const host = 'localhost';
const port = 3000;

const server = http.createServer(function (req, res) {
    res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');

	const routeMap = {
		'home.html': 'pages/home.html',
		'about.html': 'pages/about.html',
		'contact.html': 'pages/contact.html'
	}

	render(res, routeMap[req.url.slice(1)]);
});

server.listen(port,host,()=>{
    console.log(`Server running at http://${host}:${port}/`);
});

function render(res, htmlFile) {
    fs.stat(`./${htmlFile}`, (err, stats) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
        if(stats) {
            fs.createReadStream(htmlFile).pipe(res);
        } else {
            res.statusCode = 404;
            res.end('Sorry, page not found!');
        }
    });
}