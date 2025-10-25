const http = require('http');

const server = (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello World from Vercel!</h1>');
};

// Export cho Vercel
module.exports = server;

// Local development
if (require.main === module) {
    const port = process.env.PORT || 3000;
    const httpServer = http.createServer(server);
    httpServer.listen(port, () => {
        console.log(`Server running at port ` + port);
    });
}