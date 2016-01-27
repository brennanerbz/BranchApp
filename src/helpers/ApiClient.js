import superagent from 'superagent';
import config from '../config';
import cookie from 'react-cookie';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if(__HEROKUSERVER__) {
    return config.herokuApi + adjustedPath
  }
  return 'http://' + config.apiHost + ':' + config.apiPort + adjustedPath;
  // if (__SERVER__) {
    // Prepend host and port of the API server to the path.
  // }
  // Prepend `/api` to relative URL, to proxy to API server.
  // return 'http://' + config.apiHost + ':' + config.apiPort + '/api' + adjustedPath;
}

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, data) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        if(cookie && cookie.load('loginResult')) {
          request.set('authorization', 'Bearer ' + cookie.load('loginResult').id)
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
