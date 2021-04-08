const express = require('express')
const app = express()
const axios = require('axios').default
const port = 3000
const cors = require('cors')
const ext_url = "http://rdweb.spica.com:5213"



app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/proxy/*', (req, res) => {
    var url = req.url;
    url = url.slice(6); // w slash
    var auth_headers = req.headers.authorization;
    axios.get(ext_url + url, {headers: {"Authorization": auth_headers}}).then(data => {
        console.log(data.data);
        res.status(data.status).json({"data": JSON.parse(JSON.stringify(data.data))});
    }).catch(err => { console.log(err); res.send(err) });
})

app.put('/proxy/*', (req, res) => {
	console.log(req);
	var url = req.url;
	url = url.slice(6) //w slash
	let auth_headers = req.headers.authorization;
	let body = req.body;
	axios.put(ext_url + url, body, {headers: {"ContentType": "application/json", "Authorization": auth_headers}}).then(data => {
        //console.log(data.data);
		//console.log(data.status);
        res.status(data.status).json({"data": JSON.parse(JSON.stringify(data.data))});
    }).catch(err => { console.log(err); res.send(err) });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})