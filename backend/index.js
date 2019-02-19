const http = require('http');
const Axios = require('axios'); 
const querystring = require('querystring');

const FORGE_CLIENT_ID = 'p2AS8P66YNbwUdJ0k2TiCHAKJ8AgH750';
const FORGE_CLIENT_SECRET = 'xA0MQ9OPQuoqmZ53';
var scopes = 'data:read data:write data:create bucket:create bucket:read';

const server = http.createServer(function (request, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');
    res.writeHead(200, {
        "Content-Type": "application/json"
    });
    Axios({
            method: 'POST',
            url: 'https://developer.api.autodesk.com/authentication/v1/authenticate',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            data: querystring.stringify({
                client_id: FORGE_CLIENT_ID,
                client_secret: FORGE_CLIENT_SECRET,
                grant_type: 'client_credentials',
                scope: scopes
            })
        })
        .then(function (response) {
            console.log(response);
            res.end(JSON.stringify(response.data));
        })
        .catch(function (error) {
            // Failed
            console.log(error);
            res.end('Failed to authenticate');
        });
});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);