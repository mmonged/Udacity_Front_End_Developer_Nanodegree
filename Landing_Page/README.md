#  Udacity Front End Web Developer Nanodegree (Landing Page)
First Project: Landing Page.
The Project starter code is here: https://github.com/udacity/fend/tree/refresh-2019/projects/landing-page

## Folder Strucutre
	./css/style.css					Cascading Style Sheets File
	./js/app.js					JavaScript File
	index.html					Hypertext Markup Language File
	README.md					Markdown File
	
## Required Features
    1- Navigation: 			It should be built dynamically as an unordered list.
	2- Section Active State:	It should be clear which section is being viewed while scrolling through the page.
	3- Scroll to Anchor:		When clicking an item from the navigation menu, the link should scroll to the appropriate section.
	4- HTML Structure:		There are at least 4 sections that have been added to the page.

## Project Development
	A) index.html: 		HTML file has been edited to have another section (4th section) as required.
	B) ./js/app.js: 	I) It has 3 Main helper Functions:
					1- createNavigationBarList: Which gets the sections and create an unordered list of the sections in the navigation bar that go to each section specifically.
					2- updateActiveSection: 	Which unset all sections except the one that appears in the viewport as well as highlighting its navigation bar reference item in the navigation bar.
					3- smoothScrolling:			Which creates and appened a style element in the head part to set the scrolling behavior.						
				II) it uses event listener to update the active section while scrolling and clicking on the navigation bar items.
	c) ./css/style.css: No edits has been made on this file.
