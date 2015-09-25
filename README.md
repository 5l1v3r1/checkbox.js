# checkbox.js

This is a beautiful checkbox for the web.

# Dependencies

This depends on [crystal](https://github.com/unixpickle/crystal). Crystal must be included before the checkbox is used.

# Usage

Simply include the checkbox.2.1.0.js JavaScript file in your webpage and then instantiate a checkbox as follows:

```javascript
var checkbox = new window.checkboxjs.Checkbox(color, [checked]);
```

Color must be an array with three numeric values between 0 and 1. These values represent the red, green and blue color components of the check color.

If you choose to specify the second argument of the constructor (which should be a boolean), then you can determine whether or not the checkbox begins as checked. This is different than creating the checkbox and then doing `checkbox.setChecked(true)` because that would animate in the checkmark.

Once your checkbox has been created, you can use the following functions on it:

 * element() - get a DOM element to add to your webpage
 * getChecked() - get a boolean indicating whether the checkbox is checked.
 * getColor() - get the checkbox's current color.
 * getVisible() - get whether or not the checkbox is currently listening for resolution updates from crystal.
 * setChecked(flag) - set whether the checkbox is checked.
 * setColor(color) - change the color of the checkmark.
 * setVisible(flag) - set whether or not the checkbox is on-screen. While the checkbox is visible, it listens for screen resolution updates from crystal. Thus, **you must remember to setVisible(true) when creating a checkbox and to setVisible(false) when you no longer need it.**

# Dependencies of 3.0

This does not depend on any 3rd party libraries, but it does use `window.requestAnimationFrame` and `window.cancelAnimationFrame`. If you want to support IE9, you must setup a polyfill for these functions.

# Usage of 3.0

A new version of checkbox.js is underway. This is how it will be used.

Include the checkbox.3.0.0.js file in your webpage:

```html
<script src="checkbox.3.0.0.js"></script>
```

Now you can create a checkbox from JavaScript as follows:

```javascript
var checkbox = new window.checkboxjs.Checkbox();
```

Once your checkbox has been created, you can use the following functions on it:

 * element() - get a DOM element to add to your webpage. Setting the CSS `color` of this element will color the checkbox accordingly.
 * getChecked() - get a boolean indicating whether the checkbox is checked.
 * setChecked(flag) - set whether the checkbox is checked.
 * setCheckedAnimate(flag) - set whether the checkbox is checked, animating the change.

# LICENSE

```
Copyright (c) 2015, Alexander Nichol and Jonathan Loeb.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer. 
2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
```

