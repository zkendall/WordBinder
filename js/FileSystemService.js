/*
*
* Reference: http://www.html5rocks.com/en/tutorials/file/filesystem/
*/
class FileSystemService {
  constructor(fileSystem) {
    this._fileSystem = fileSystem;
  }

  getDirectoryEntries(directoryEntry) {
    var results = []

    var getEntries = function(directoryReader, resultCallback) {
      var entries = [];

      // Call the reader.readEntries() until no more results are returned.
      var readEntries = function() {
         directoryReader.readEntries (function(results) {
          if (!results.length) {
            resultCallback(entries.sort());
          } else {
            entries = entries.concat(_toArray(results));
            readEntries();
          }
        }, _errorHandler);
      };
      readEntries(); // Start reading dirs.
    }

    var reader = directoryEntry.createReader();

    getEntries(reader, function(entries){ results = entries; });
    return results;
  }

  /**
   * @param  {DirectoryEntry}
   * @return {tree}
   */
  getTreeModel(rootDirEntry) {
    var root = []

    var entries = this.getDirectoryEntries(rootDirEntry)
    for (var i = 0, len = entries.length; i < len; ++i) {
      var entry = entries[i];
      var model = _entryToModel(entry);

      if(entry.isDirectory) {
        model.children = this.getTreeModel(entry);
      }

      root.push(model);
    }
    return root;
  }

  readFile(path, successCallback) {
    this._fileSystem.getFile(path, {}, function(fileEntry) {
      fileEntry.file(_fileReaderSuccessCallback(successCallback));
    }, _errorHandler);
  }

  readFileEntry(fileEntry, successCallback) {
    fileEntry.file(_fileReaderSuccessCallback(successCallback), _errorHandler);
  }

}

function _fileReaderSuccessCallback(successCallback) {
  return function(file) {
    var reader = new FileReader();
    // Prepare reader
    reader.onloadend = function(e) {
      // Pass contents to callback
      successCallback(this.result);
    };
    // Trigger read
    reader.readAsText(file);
  }
}

function _toArray(list) {
  return Array.prototype.slice.call(list || [], 0);
}

function _errorHandler(error) {
  console.log("Error: " + error.message);
}

function _entryToModel(entry) {
  return { 
    name: entry.name,
    children: []
  }
}
