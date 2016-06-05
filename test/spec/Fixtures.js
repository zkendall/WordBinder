
class Fixtures {
}

Fixtures.text1 = new MockFileEntry("text1", Content.text1_content);
Fixtures.text2 = new MockFileEntry("text2", Content.text2_content);
Fixtures.texts = [Fixtures.text1, Fixtures.text2];
Fixtures.textDir = new MockDirectoryEntry("Text", Fixtures.texts);
Fixtures.research1 = new MockFileEntry("research1", Content.research1_content);
Fixtures.research2 = new MockFileEntry("research2", Content.research2_content);
Fixtures.researches = [Fixtures.research1, Fixtures.research2];
Fixtures.researchDir = new MockDirectoryEntry("Research", Fixtures.researches);
Fixtures.entries = [Fixtures.textDir, Fixtures.researchDir];
Fixtures.dirEntry = new MockDirectoryEntry("root", Fixtures.entries);
