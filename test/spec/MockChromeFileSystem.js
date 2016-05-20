function MockChromeFileSystem(directoryEntry, fileEntry) {
  this.chosenFileEntry = directoryEntry;
  this.chosenDirectoryEntry = fileEntry;
}

// The callback parameter should be a function that looks like this:
// function(Entry entry, array of FileEntry fileEntries) {...};
MockChromeFileSystem.prototype.chooseEntry = function(options, callback) {
  if(directoryEntry) {
   callback(directoryEntry);
  } else {
   callback(fileEntry);
  }
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