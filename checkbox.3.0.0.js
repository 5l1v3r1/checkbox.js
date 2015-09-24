(function() {

  var XMLNS = 'http://www.w3.org/2000/svg'
  var DEFAULT_SIZE = 22;
  var MAX_SHIELD_WIDTH = 18;

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
    this._element.style.width = DEFAULT_SIZE + 'px';
    this._element.style.height = DEFAULT_SIZE + 'px';
    this._element.style.cursor = 'pointer';
    
    this._checked = true;
    this._animationFrame = null;
  }

  Checkbox.prototype.element = function() {
    return this._element;
  };
  
  Checkbox.prototype.getChecked = function() {
    return this._checked;
  };
  
  Checkbox.prototype.setChecked = function(c) {
    if (this._animationFrame !== null) {
      window.clearAnimationFrame(this._animationFrame);
      this._animationFrame = null;
    }
    this._checked = c;
    if (c) {
      this._shield.setAttribute('width', '0');
    } else {
      this._shield.setAttribute('width', MAX_SHIELD_WIDTH + '');
    }
  };

  function setSVGAttributes(element, attributes) {
    var keys = Object.keys(attributes);
    for (var i = 0, len = keys.length; i < len; ++i) {
      var key = keys[i];
      element.setAttribute(key, attributes[key]);
    }
  }

  window.checkboxjs = {Checkbox: Checkbox};

})();
