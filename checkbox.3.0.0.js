(function() {

  var XMLNS = 'http://www.w3.org/2000/svg'
  var DEFAULT_SIZE = 22;

  function Checkbox() {
    this._svg = document.createElementNS(XMLNS, 'svg');
    setSVGAttributes(this._svg, {
      version: '1.1',
      viewBox: '0 0 22 22',
      style: 'width: 100%; height: 100%'
    });

    var path = document.createElementNS(XMLNS, 'path');
    setSVGAttributes(path, {
      stroke: 'currentColor',
      'stroke-width': '2',
      fill: 'none',
      d: 'M4,12 l5,5 l9,-11'
    });
    this._svg.appendChild(path);

    var border = document.createElementNS(XMLNS, 'polygon');
    setSVGAttributes(border, {
      stroke: '#d5d5d5',
      'stroke-width': '2',
      fill: 'none',
      points: '1,1 21,1 21,21 1,21'
    });
    this._svg.appendChild(border);

    this._element = document.createElement('div');
    this._element.appendChild(this._svg);
    this._element.style.width = DEFAULT_SIZE + 'px';
    this._element.style.height = DEFAULT_SIZE + 'px';
  }

  Checkbox.prototype.element = function() {
    return this._element;
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
