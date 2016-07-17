/*
* // ToDo: Limit size of files and total file count/size to load.
* // Limit extension to .txt and .md?
* 
* Reference: http://www.html5rocks.com/en/tutorials/file/filesystem/
*/
class FileSystemService {
  constructor(fileSystem) {
    this._fileSystem = fileSystem;
  }

  chooseDirectoryAsModel(callback) {
    var params = {'type': 'openDirectory'};
    var getTree = this.getTreeModel.bind(this);
    this._fileSystem.chooseEntry(
      params,
      function(entry, fileEntries) {
        getTree(entry, callback);
      });
  }

  /**
   * @param  {DirectoryEntry}
   * @return {tree}
   */
  getTreeModel(rootDirEntry, callback) {
    var entries = this.getDirectoryEntries(rootDirEntry, function gotEntries(entries){
      var root = []

      var counter = 0;
      var callbackCounter = function() {
        if (++counter == entries.length) {
          callback(root);
        }
      };

      for (var i = 0, len = entries.length; i < len; ++i) {
        let entry = entries[i];
        let model = _entryToModel(entry);
        if(entry.isDirectory) {
          this.getTreeModel(entry, function gotChildTree(children) {
            model.children = children;
            callbackCounter();
          });
        } else {
          this.readFileEntry(entry, function gotFileContents(content) {
            model.textContent = content;
            callbackCounter();
          });
        }
        root.push(model);
      } // End for-loop
    }.bind(this));
  }

  getDirectoryEntries(directoryEntry, resultCallback) {
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
    getEntries(reader, resultCallback);
  }

  readFileEntry(fileEntry, successCallback, errorCallback = _errorHandler) {
    fileEntry.file(_fileReaderSuccessCallback(successCallback), errorCallback);
  }

  readFile(path, successCallback, errorCallback =_errorHandler) {
    this._fileSystem.getFile(path, {}, function(fileEntry) {
      fileEntry.file(_fileReaderSuccessCallback(successCallback));
    }, errorCallback);
  }

}

function _fileReaderSuccessCallback(successCallback) {
  return function(file) {
    var reader = new FileReader();
    // Prepare reader
    reader.onloadend = function(e) {
      // Pass content to callback
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
  return new FileModel( 
    entry.name,
    entry.fullPath
  );
}
