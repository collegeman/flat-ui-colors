!function() {
  var shades = [
        'darkest',
        'darker',
        'dark',
        'normal',
        'light',
        'lighter',
        'lightest'
      ],
      hexDigits = [
        "0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"
      ],
      currentShade = 3,
      $lastClicked = null,
      $notice = $('.notice'),
      $input = $notice.find('input'),
      $swatch = $notice.find('.swatch');

  function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  }

  function hex(x) {
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
  }

  function updateNotice() {
    var rgb = $lastClicked.css('backgroundColor'),
        hex = rgb2hex(rgb);
    $notice.show();
    $input.val(hex).select();
    $swatch.css('backgroundColor', rgb);
  }

  $(window).on('darken-palette', function() {
    currentShade--;
    if (currentShade < 0) {
      currentShade = 0;
    }
    $('body').removeClass().addClass(shades[currentShade]);
    updateNotice();
  });

  $(window).on('lighten-palette', function() {
    currentShade++;
    if (currentShade === shades.length) {
      currentShade = shades.length - 1;
    }
    $('body').removeClass().addClass(shades[currentShade]);
    updateNotice();
  });

  $(window).on('reset-palette', function() {
    currentShade = 3;
    $('body').removeClass().addClass(shades[currentShade]);
    updateNotice();
  });

  $('.row > *').click(function(e) {
    $lastClicked = $(e.target);
    updateNotice();
    return false;
  });

}();
