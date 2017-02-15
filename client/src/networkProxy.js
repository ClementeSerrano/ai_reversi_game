import fetch from 'isomorphic-fetch'

const executeRequest = (uri, method, data) => {
	var domain = 'http://localhost:8080/api';
	return fetch(domain + uri, {
		method: method || 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(response => response.json())
		.catch(err => console.log(err))
}

function networkProxy() {
    		
}

export default new networkProxy
