(function() {
  
  function Checkbox(size) {
    this._size = size;
    this._canvas = document.createElement('canvas');
    this._element = document.createElement('div');
    this._element.appendChild(this._canvas);
    this._element.style.width = size + 'px';
    this._element.style.height = size + 'px';
    
    // This stuff is used to support crystal.
    this._crystalCb = this._updateResolution.bind(this);
    this._removedInterval = null;
    
    // Make sure the resolution is accurate and then draw the initial state.
    this._updateResolution();
  }
  
  // element returns an element for the checkbox. You must call this every time
  // you add the checkbox to the DOM. You should add the returned element to the
  // DOM immediately after calling element() or else it may not be updated for
  // the DPI correctly.
  Checkbox.prototype.element = function() {
    this._startListening();
    return this._element;
  };
  
  // _checkForRemoval unsubscribes to crystal if the element is not in the DOM.
  Checkbox.prototype._checkForRemoval = function() {
    if (this._removedInterval !== null && !document.contains(this._element)) {
      this._stopListening();
    }
  };
  
  // _draw re-draws the checkbox in it's current state.
  Checkbox.prototype._draw = function() {
    var size = this._canvas.width;
    var context = this._canvas.getContext('2d');
    
    context.clearRect(0, 0, size, size);
    
    // TODO: here, draw the rest of the checkbox.
    
    context.fillStyle = 'red';
    context.fillRect(5, 5, 10, 10);
  };
  
  Checkbox.prototype._startListening = function() {
    if (this._removedInterval !== null) {
      return;
    }
    // Every 10 seconds, see if the element was removed from the DOM. If it was,
    // stop listening for crystal changes.
    this._removedInterval = setInterval(this._checkForRemoval.bind(this),
      10000);
    window.crystal.addListener(this._crystalCb);
  };
  
  Checkbox.prototype._stopListening = function() {
    if (this._removedInterval === null) {
      return;
    }
    window.crystal.removeListener(this._crystalCb);
    clearInterval(this._removedInterval);
    this._removedInterval = null;
  };
  
  Checkbox.prototype._updateResolution = function() {
    var ratio = window.crystal.getRatio();
    this._canvas.width = Math.round(ratio * this._size);
    this._canvas.height = Math.round(ratio * this._size)
    this._draw();
    this._checkForRemoval();
  };
  
  window.checkboxjs = {
    Checkbox: Checkbox
  };
  
})();