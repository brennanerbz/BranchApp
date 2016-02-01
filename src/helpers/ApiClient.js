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
}

class _ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, data) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        if (data) {
          request.send(data);
        }

        request.end((err, res) => {
          if(err) {
            reject(res)
          } else {
            resolve(res.body)
          }
        })
          
      }));
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
