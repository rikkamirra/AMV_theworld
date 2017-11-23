import { each, find } from 'underscore';

function CryptoService($cookies) {
  var key = '';

  function isCryptableParam(name) {
    const paramsForCrypt = ['title', 'body'];
    for (let i = 0; i < paramsForCrypt.length; i+=1) {
      if (name == paramsForCrypt[i]) return true;
    }
    return false;
  };

  return {
    setKey(newKey) {
      key = newKey;
      $cookies.put('thwKey', key);
    },

    getKey() {
      if (!key) {
        key = $cookies.get('thwKey');
      }
      return key;
    },

    handleParams(params, action) {
      if (!key) return params;
      for (let fieldName in params) {
        if (isCryptableParam(fieldName)) {
          params[fieldName] = this[action](params[fieldName]);
        }
      }
      return params;
    },

    encrypt(body) {
      if (!key) return body;
      var index_key = 0;
      var encrypted_body = '';
      for (let i = 0; i < body.length; i+=1) {
        encrypted_body += String.fromCharCode(body[i].charCodeAt() + key[index_key].charCodeAt());
        index_key = (index_key + 1) % key.length;
      }
      return encrypted_body;
    },

    decrypt(encrypted_body) {
      if (!key) return encrypted_body;
      var index_key = 0;
      var decrypted_body = '';
      for (let i = 0; i < encrypted_body.length; i+=1) {
        decrypted_body += String.fromCharCode(encrypted_body[i].charCodeAt() - key[index_key].charCodeAt());
        index_key = (index_key + 1) % key.length;
      }
      return decrypted_body;
    }
  }
}

CryptoService.$inject = ['$cookies'];

export default CryptoService;
