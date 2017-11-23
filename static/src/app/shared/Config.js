const Config = Object.freeze({
  rsa: {
    publicKeyType: 'public',
    privateKeyType: 'private',
    keyType: 'pkcs1',
    keyHeaders: {
      public: {
        begin: '-----BEGIN RSA PUBLIC KEY-----',
        end: '-----END RSA PUBLIC KEY-----'
      },
      private: {
        begin: '-----BEGIN RSA PRIVATE KEY-----',
        end: '-----END RSA PRIVATE KEY-----'
      }
    },
    encryptEncoding: 'base64',
    decryptEncoding: 'utf-8'
  }
});

export default Config;
