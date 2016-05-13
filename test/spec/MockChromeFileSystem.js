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

function MockFileEntry(name) {
  this.isFile = true;
  this.isDirectory = false;
  this.name = name;
}


function MockDirectoryEntry(name, entries) {
  this.isDirectory = true;
  this.name = name;
  this.entries = entries;
}

MockDirectoryEntry.prototype.createReader = function() {
  return new MockDirectoryReader(entries);
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
  return this.entries;
}