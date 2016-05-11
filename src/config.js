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
  herokuApi: 'https://thecommonsapp.herokuapp.com',
  apiHost: '127.0.0.1',
  apiPort: '5000',
  app: {
    title: 'Flunk',
    description: 'Private chat for students.',
    head: {
      titleTemplate: 'Flunk',
      meta: [
        {name: 'description', content: 'Private chat for students.'},
        {charset: 'utf-8'},
        {property: 'og:title', content: 'Flunk'},
        {property: 'og:description', content: 'Private chat for students.'}
      ]
    }
  },
}, environment);

