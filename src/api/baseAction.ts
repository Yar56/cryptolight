import axios from "axios";


const testApi = () => {
	let response = null;
	return new Promise(async (resolve, reject) => {
		try {
			response = await axios.get('https://api.coingecko.com/api/v3/search?query=btc', {

			});
		} catch(ex) {
			response = null;
			// error
			console.log(ex);
			reject(ex);
		}
		if (response) {
			// success
			const json = response.data;
			console.log(json);
			resolve(json);
		}
	});
}

export default testApi;
