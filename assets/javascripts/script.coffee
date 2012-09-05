jQuery ->
  slider = $('#projects-slider').bxSlider
    auto: true
    pager: true

  $('.bx-prev').click ->
    slider.goToPreviousSlide()
    return false

  $('.bx-next').click ->
    slider.goToNextSlide()
    return false

  filterPath = (string) ->
    string.replace(/^\//,'')
    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
    .replace(/\/$/,'')

  scrollableElement = (els) ->
    for el in arguments
      scrollElement = $(el)
      if scrollElement.scrollTop() > 0
        return el
      else
        scrollElement.scrollTop(1)
        isScrollable = scrollElement.scrollTop() > 0
        scrollElement.scrollTop(0)
        if isScrollable
          return el
    return []

  locationPath = filterPath(location.pathname)
  scrollElem = scrollableElement('html', 'body', 'div#banner-container')

  $('a[href*=#]').each ->
    thisPath = filterPath(this.pathname) || locationPath
    if locationPath == thisPath and (location.hostname == this.hostname or not this.hostname) and this.hash.replace(/#/,'')
      targetID = this.hash
      target = $(targetID)
      if this.hash
        targetOffset = target.offset().top
        $(this).click (event) ->
          event.preventDefault()
          $.scrollTo target, 1000, ->
            location.hash = targetID
