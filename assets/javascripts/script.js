(function() {
  jQuery(function() {
    var filterPath, locationPath, scrollElem, scrollableElement, slider;
    slider = $('#projects-slider').bxSlider({
      auto: true,
      pager: true
    });
    $('.bx-prev').click(function() {
      slider.goToPreviousSlide();
      return false;
    });
    $('.bx-next').click(function() {
      slider.goToNextSlide();
      return false;
    });
    filterPath = function(string) {
      return string.replace(/^\//, '').replace(/(index|default).[a-zA-Z]{3,4}$/, '').replace(/\/$/, '');
    };
    scrollableElement = function(els) {
      var el, isScrollable, scrollElement, _i, _len;
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        el = arguments[_i];
        scrollElement = $(el);
        if (scrollElement.scrollTop() > 0) {
          return el;
        } else {
          scrollElement.scrollTop(1);
          isScrollable = scrollElement.scrollTop() > 0;
          scrollElement.scrollTop(0);
          if (isScrollable) {
            return el;
          }
        }
      }
      return [];
    };
    locationPath = filterPath(location.pathname);
    scrollElem = scrollableElement('html', 'body');
    return $('a[href*=#]').each(function() {
      var target, targetID, targetOffset, thisPath;
      thisPath = filterPath(this.pathname) || locationPath;
      if (locationPath === thisPath && (location.hostname === this.hostname || !this.hostname) && this.hash.replace(/#/, '')) {
        targetID = this.hash;
        target = $(targetID);
        if (this.hash) {
          targetOffset = target.offset().top;
          return $(this).click(function(event) {
            event.preventDefault();
            return $(scrollElem).animate({
              scrollTop: targetOffset
            }, 400, function() {
              return location.hash = targetID;
            });
          });
        }
      }
    });
  });
}).call(this);
