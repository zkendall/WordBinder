describe("File System Directory", function() {

  var entries = [new MockDirectoryEntry("text"), new MockDirectoryEntry("research")];
  var dirEntry = new MockDirectoryEntry("root", entries);

  chrome.fileSystem = new MockChromeFileSystem(dirEntry);

  var service = new FileSystemService(); 

  beforeEach(function() {
    chrome.fileSystem.chosenFileEntry = {};
  });

  it("has chosenFileEntry", function() {
    expect(chrome.fileSystem.chosenFileEntry).toBeTruthy();
  });

  it("when given directory reader, returns entries", function() {
  	console.log(entries);
  	var reader = new MockDirectoryReader();
  	var results = service.getEntries(reader);
  	expect(results.length).toEqual(2);
  });

});
