const latestAction = require('../actions/latest');

module.exports = vorpal => {
  vorpal
    .command('latest', 'Get latest starred list')
    .alias('l')
    .action(latestAction)
    .cancel(() => {
      vorpal.ui.redraw('\u001B[2J\u001B[0;0f');
      vorpal.ui.redraw.done();
    });
};
