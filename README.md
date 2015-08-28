# simpleStorage
Module gives you opportunity to store your simple JSON data in localStorage or Cookies (dependent on what is accessible for current browser)

# Usage

To install with npm:

npm install --save simple-browser-storage

And then any where you want to use module:

var browserStorage = require('simple-browser-storage');

browserStorage.init(opts);
// In your Cookies (or localStorage) will be created an empty JSON object.
// You can communicate with it through following intreface:
browserStorage.setState(dataObject);
browserStorage.getState(); // Returns whole data object;
browserStorage.stateIsExpired(); // Returns whether expired or not dataObject; 

# Options

opts = {
  name: 'String', // Name of JSON object which will be created. Default: "SimpleBrowserStorage"
  existenceTime: 'Number' // Time in minutes after which data will be deleted on next browser refresh. Default: 10
}

