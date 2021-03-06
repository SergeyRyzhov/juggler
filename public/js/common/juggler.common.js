(function (app, $) {
  app.ready = function (fn) {
    if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', function () {
        fn(app);
      });
    } else {
      document.attachEvent('onreadystatechange', function () {
        if (document.readyState === 'interactive')
          fn(app);
      });
    }
  };

  app.ajax = function (url, data, type, dataType) {
    return $.ajax({
      type: type || 'get',
      url: url,
      data: data,
      dataType: dataType || 'json'
    });
  };

  app.unwrap = function (wrapper) {
    if (typeof wrapper != 'function') {
      return wrapper;
    } else {
      return app.unwrap(wrapper());
    }
  };
  
  app.random = function (max, min) {
    min = min || 0;    
    return Math.floor( (max - min) * Math.random()) + min;
  };

})(window.juggler = window.juggler || {}, jQuery);
