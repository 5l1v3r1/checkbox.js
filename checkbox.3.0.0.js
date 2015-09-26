(function() {

  var ANIMATION_DURATION = 150;

  var XMLNS = 'http://www.w3.org/2000/svg'
  var DEFAULT_SIZE = 22;
  var MAX_SHIELD_WIDTH = 18;
  var DEFAULT_LABEL_MARGIN = 5;

  function Checkbox() {
    this._svg = document.createElementNS(XMLNS, 'svg');
    setSVGAttributes(this._svg, {
      version: '1.1',
      viewBox: '0 0 22 22',
      style: 'width: 100%; height: 100%'
    });

    var border = document.createElementNS(XMLNS, 'polygon');
    setSVGAttributes(border, {
      stroke: '#d5d5d5',
      'stroke-width': '2',
      fill: 'white',
      points: '1,1 21,1 21,21 1,21'
    });
    this._svg.appendChild(border);

    var path = document.createElementNS(XMLNS, 'path');
    setSVGAttributes(path, {
      stroke: 'currentColor',
      'stroke-width': '2',
      fill: 'none',
      d: 'M4,12 l5,5 l9,-11'
    });
    this._svg.appendChild(path);

    this._shield = document.createElementNS(XMLNS, 'rect');
    setSVGAttributes(this._shield, {
      fill: 'white',
      x: '2',
      y: '2',
      height: '18',
      width: '0'
    });
    this._svg.appendChild(this._shield);

    this._element = document.createElement('div');
    this._element.appendChild(this._svg);
    setStyle(this._element, {
      width: DEFAULT_SIZE + 'px',
      height: DEFAULT_SIZE + 'px',
      cursor: 'pointer',
      display: 'inline-block'
    });

    this._checked = true;
    this._animationStart = null;
    this._animationFrame = null;

    this.onChange = null;
    this._registerMouseEvents();
  }

  Checkbox.prototype.element = function() {
    return this._element;
  };

  Checkbox.prototype.getChecked = function() {
    return this._checked;
  };

  Checkbox.prototype.setChecked = function(c) {
    if (this._animationFrame !== null) {
      window.cancelAnimationFrame(this._animationFrame);
      this._animationFrame = null;
    }
    this._checked = c;
    if (c) {
      this._shield.setAttribute('width', '0');
    } else {
      this._shield.setAttribute('width', MAX_SHIELD_WIDTH + '');
    }
  };

  Checkbox.prototype.setCheckedAnimate = function(c) {
    if (c === this._checked) {
      return;
    }
    this._checked = c;

    var startTime = new Date().getTime();
    if (this._animationFrame !== null) {
      window.cancelAnimationFrame(this._animationFrame);
      startTime -= ANIMATION_DURATION - (startTime - this._animationStart);
    }

    this._animationStart = startTime;
    this._animationFrame = window.requestAnimationFrame(this._animate.bind(this));
  };

  Checkbox.prototype._animate = function() {
    var elapsed = new Date().getTime() - this._animationStart;
    if (elapsed > ANIMATION_DURATION) {
      elapsed = ANIMATION_DURATION;
      this._animationFrame = null;
    } else {
      this._animationFrame = window.requestAnimationFrame(this._animate.bind(this));
    }

    var percent = elapsed / ANIMATION_DURATION;
    var width;
    if (this._checked) {
      width = MAX_SHIELD_WIDTH * (1 - percent);
    } else {
      width = MAX_SHIELD_WIDTH * percent;
    }
    this._shield.setAttribute('width', '' + width);
    this._shield.setAttribute('x', '' + (20-width));
  };

  Checkbox.prototype._registerMouseEvents = function() {
    this._element.addEventListener('click', function(e) {
      e.stopPropagation();
      this.setCheckedAnimate(!this._checked);
      if ('function' === typeof this.onChange) {
        this.onChange();
      }
    }.bind(this));
  };

  function LabeledCheckbox(text) {
    this._element = document.createElement('div');
    setStyle(this._element, {
      height: DEFAULT_SIZE + 'px',
      display: 'inline-block',
      cursor: 'pointer'
    });

    this._element.addEventListener('click', function() {
      this._checkbox.setCheckedAnimate(!this._checkbox.getChecked());
      if ('function' === typeof this._checkbox.onChange) {
        this._checkbox.onChange();
      }
    }.bind(this));

    this._checkbox = new Checkbox();
    this._checkbox.element().style.float = 'left';
    this._element.appendChild(this._checkbox.element());

    this._label = document.createElement('label');
    this._label.innerText = text || '';
    setStyle(this._label, {
      lineHeight: DEFAULT_SIZE + 'px',
      float: 'left',
      marginLeft: DEFAULT_LABEL_MARGIN + 'px',
      pointerEvents: 'none',
      '-webkit-touch-callout': 'none',
      '-webkit-user-select': 'none',
      '-khtml-user-select': 'none',
      '-moz-user-select': 'none',
      '-ms-user-select': 'none',
      'user-select': 'none'
    });
    this._element.appendChild(this._label);
  }

  LabeledCheckbox.prototype.checkbox = function() {
    return this._checkbox;
  };

  LabeledCheckbox.prototype.element = function() {
    return this._element;
  };

  LabeledCheckbox.prototype.label = function() {
    return this._label;
  };

  function setSVGAttributes(element, attributes) {
    var keys = Object.keys(attributes);
    for (var i = 0, len = keys.length; i < len; ++i) {
      var key = keys[i];
      element.setAttribute(key, attributes[key]);
    }
  }

  function setStyle(element, attributes) {
    var keys = Object.keys(attributes);
    for (var i = 0, len = keys.length; i < len; ++i) {
      var key = keys[i];
      element.style[key] = attributes[key];
    }
  }

  window.checkboxjs = {
    Checkbox: Checkbox,
    LabeledCheckbox: LabeledCheckbox
  };

})();
