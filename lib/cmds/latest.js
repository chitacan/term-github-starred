const latestAction = require('../actions/latest');

module.exports = vorpal => {
  vorpal
    .command('latest', 'Get latest starred list')
    .alias('l')
    .action(latestAction);
};
