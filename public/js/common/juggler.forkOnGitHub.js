//Fork on GitHub ribbon
(function (app) {
  ko.components.register('juggler-forkongithub', {
    viewModel: function (params) {
      return {
        text: 'Следите за мной на GitHub',
        href: 'https://github.com/SergeyRyzhov/juggler'
      };
    },
    template: {
      fromUrl: 'forkongithub.html',
      maxCacheAge: 60000
    }
  });
})(window.juggler = window.juggler || {});
