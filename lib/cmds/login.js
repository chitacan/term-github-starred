const loginAction = require('../actions/login');

module.exports = vorpal => {
  vorpal
    .command('login', 'Login to github')
    .action(loginAction);
};
