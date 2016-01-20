require('babel/polyfill');

const environment = {
	development: {
		isProduction: false
	},
	production: {
		isProduction: true
	}
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
	host: process.env.HOST || 'localhost',
	port: process.env.PORT,
	apiHost: '127.0.0.1', // UPDATE WHEN SERVER IS READY
	apiPort: '5000',
	app: {
		title: "Branch",
		description: "Chat for the 21st century.",
		head: {
			titleTemplate: 'Branch',
			meta: [
				{name: 'description', content: 'Chat for the 21st century.'},
				{charset: 'utf-8'},
				{property: 'og:title', content: 'Branch'},
				{property: 'og:description', content: 'Chat for the 21st century.'}
			]
		}
	}
})