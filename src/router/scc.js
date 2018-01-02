import scc from 'socketcluster-client';


export default scc.connect({
			host: API_HOST,
			secure: true,
			autoReconnectOptions: {
				initialDelay: 1000, //milliseconds
				randomness: 1000, //milliseconds
				multiplier: 1.5, //decimal
				maxDelay: 4000 //milliseconds
			},
		})