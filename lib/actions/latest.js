const _ = require('lodash');
const Rx = require('rx');
const opn = require('opn');
const github = require('../apis/github');

const getStarred$ = Rx.Observable.fromNodeCallback(
    github.repos.getStarred,
    github
  );

module.exports = function(args, cb) {
  getStarred$({})
    .map(repos => {
      const maxLen = _.chain(repos)
        .map(repo => repo.name.length)
        .max()
        .value();
      return repos.map(repo => {
        const value = {
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          stargazers_count: repo.stargazers_count
        };
        const spaces = _.chain(maxLen - repo.name.length)
          .range()
          .map(() => ' ')
          .value()
          .join('');
        const name = repo.name + spaces + ` ⭐️  ${repo.stargazers_count}`;
        return {
          name,
          short: repo.name,
          value
        };
      });
    })
  .subscribe(repos => {
    const question = {
      type: 'list',
      name: 'repo',
      message: 'select a repo',
      paginated: true,
      choices: repos
    };
    this.prompt(question, selected => {
      if (!this.parent.ui._sigintCalled) {
        opn(selected.repo.url);
        cb();
      }
    });
  }, err => {
    console.log(err);
  });
};
