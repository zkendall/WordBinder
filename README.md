# WordBinder
An opinionated text editor for long-form stories.

## Motivation
I want to make a minimalist text editor that binds my research notes to the novel that I'm working on. I want 'type-safe' tooling around my story as I have around programming. The writer should be able to jump from idea to idea easily and without breaking flow, and auxiliary research should automatically be provided on the side lines for quick reference.

## Running the development version

* Check `Developer Mode` in `chrome://extensions`
* Click "Load unpacked extension..." in `chrome://extensions` and select the `text-app` directory.

## Building the package

You do not have to build the app to install it in Chrome. Building will just extract all the required files and minify the JS code.

Building script requires Python3 and will use online Closure Compiler. Just run

    python3 build.py

and the package will be written to `text-app/build/` directory in zipped and unzipped formats.

## Forked from Chrome Text App
Originally, I forked Google's simple text app as a foundation as I learn javascript.

## Hours worked
For my own curiosity, I want to try to track my hours on this project.
Hours: 30

## To Do
- Implement rest of file behavior (save, move, rename, etc)
- Mimic 'tab' behavior in tree:
	- [DONE] Nodes hold instance of CodeMirror.Doc as 'sessions'.
	- UI events should be replicated.
	- File rename
	- File move
	- Close?
- Build CodeMirror syntax highlighting from indexer results.
- Split file tree into two, one for Text and one for Notes.

