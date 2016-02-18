const C = require('chalk');
const github = require('../apis/github');

module.exports = function(args, cb) {
  console.log('');
  return this.prompt([{
    type: 'input',
    name: 'username',
    message: C.gray('  github username: '),
    validate: value => {
      if (value.length === 0) {
        return 'Please enter valid github username';
      }
      return true;
    }
  }, {
    type: 'password',
    name: 'password',
    message: C.gray('  github password: ')
  }], result => {
    const obj = Object.assign(result, {type: 'basic'});
    github.authenticate(obj);
    console.log('');
    cb();
  });
};
