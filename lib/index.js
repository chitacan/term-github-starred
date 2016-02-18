const vorpal = require('vorpal')();

require('./cmds/login')(vorpal);
require('./cmds/latest')(vorpal);

vorpal
  .command('token', 'Update github token')
  .action(function(args, cb) {
    this.log(args);
    cb();
  });

// clear screen
vorpal.on('keypress', obj => {
  if (obj.key === 'l' && obj.e.key.ctrl) {
    vorpal.ui.redraw('\u001B[2J\u001B[0;0f');
    vorpal.ui.redraw.done();
  }
});

vorpal
  .delimiter('tgs $')
  .show();
