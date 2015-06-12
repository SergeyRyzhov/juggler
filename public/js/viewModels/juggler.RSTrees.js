//RS tree builder
(function(app, $) {
  ko.components.register('juggler-rstrees', {
    viewModel: function(params) {
    },
    template: {
      fromUrl: 'rstrees.html',
      maxCacheAge: 60000
    }
  });
})(window.juggler = window.juggler || {}, jQuery);
