/*
*
* Reference: http://www.html5rocks.com/en/tutorials/file/filesystem/
*/
function FileSystemService() {
}


function toArray(list) {
  return Array.prototype.slice.call(list || [], 0);
}

function errorHandler(error) {
  console.log("Error: " + error.message);
}

FileSystemService.prototype.getEntries = function(directoryReader) {
  var entries = [];

  // Call the reader.readEntries() until no more results are returned.
  var readEntries = function() {
     directoryReader.readEntries (function(results) {
      if (!results.length) {
        return entries.sort();
      } else {
        entries = entries.concat(toArray(results));
        readEntries();
      }
    }, errorHandler);
  };

  return readEntries(); // Start reading dirs.
}