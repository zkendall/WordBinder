/*
*
* Reference: http://www.html5rocks.com/en/tutorials/file/filesystem/
*/
function FileSystemService(fileSystem) {
  this._fileSystem = fileSystem;
}


function toArray(list) {
  return Array.prototype.slice.call(list || [], 0);
}

function errorHandler(error) {
  console.log("Error: " + error.message);
}

FileSystemService.prototype.getDirectoryEntries = function(directoryEntry) {
  var results = []

  var getEntries = function(directoryReader, resultCallback) {
    var entries = [];

    // Call the reader.readEntries() until no more results are returned.
    var readEntries = function() {
       directoryReader.readEntries (function(results) {
        if (!results.length) {
          resultCallback(entries.sort());
        } else {
          entries = entries.concat(toArray(results));
          readEntries();
        }
      }, errorHandler);
    };
    readEntries(); // Start reading dirs.
  }

  var reader = directoryEntry.createReader();

  getEntries(reader, function(entries){ results = entries; });
  return results;
}

function entryToModel(entry) {
  return { 
    label: entry.name,
    children: []
  }
}

/**
 * @param  {DirectoryEntry}
 * @return {tree}
 */
FileSystemService.prototype.getTreeModel = function(rootDirEntry) {
  var root = []

  var entries = this.getDirectoryEntries(rootDirEntry)
  for (var i = 0, len = entries.length; i < len; ++i) {
    var entry = entries[i];
    var model = entryToModel(entry);

    if(entry.isDirectory) {
      model.children = this.getTreeModel(entry);
    }

    root.push(model);
  }
  return root;
}


