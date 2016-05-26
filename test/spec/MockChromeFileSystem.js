function MockChromeFileSystem(directoryEntry, fileEntry) {
  // this.chosenFileEntry = fileEntry;
  this.root = directoryEntry;
}


MockChromeFileSystem.prototype.chooseEntry = function(options, callback) {
  if(this.root) {
   callback(this.root);
  }
};

MockChromeFileSystem.prototype.getFile = function(path, options, successCallback, errorCallback) {
  var arr = path.split('/');
  var curDir = this.root;
  var result;
  for (var i = 0, len = arr.length; i < len; i++) {
    var found = false;
    _(curDir.entries).forEach(function(value) {
      if(value.isDirectory == true) {
        if(arr[i].toLowerCase() == value.name.toLowerCase()) {
          found = true;
          curDir = value;
        } 
      } else if (i == arr.length -1) { // Last element should be file 
        if(arr[i].toLowerCase() == value.name.toLowerCase()) {
          found = true;
          successCallback(value);
          return;
        }
      }
    });
    // Don't try next path, if no current match
    if(found == false) {
      errorCallback({message:`No file found for: ${path}`}); return;
    }
  };
};

function MockFileEntry(name, content) {
  this.isFile = true;
  this.isDirectory = false;
  this.name = name;
  this.content = content;
}

MockFileEntry.prototype.file = function(successCallback, errorCallback) {
  // Ignore File interface, and just pass through FileEntry for now.
  successCallback(this);
};

/*
This is a mock, but named to override instantiation in FileSystemService
 */
function FileReader() {
}

FileReader.prototype.readAsText = function(file) {
  this.result = file.content;
  this.onloadend();
};


function MockDirectoryEntry(name, entries) {
  this.isDirectory = true;
  this.name = name;
  if(entries === undefined) {
    this.entries = [];
  } else {
    this.entries = entries;
  }
}

MockDirectoryEntry.prototype.createReader = function() {
  return new MockDirectoryReader(this.entries);
}

function MockDirectoryReader(entries) {
  this.entries = entries;
}

/**
* successCallback: delivers the next previously unreported set of entries
*  in the associated directory until an empty array is returned.
*/
MockDirectoryReader.prototype.readEntries = function(successCallback, errorCallback) {
  //TODO: If more than one entry, return half at a time to mimic Chrome.  
  
  // Clear out entries before sending to callback.
  var cache = this.entries;
  this.entries = []
  successCallback(cache);

}