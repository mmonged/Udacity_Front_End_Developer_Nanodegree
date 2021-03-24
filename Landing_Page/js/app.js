/**
* 
* Manipulating the DOM exercise.
* Exercise programmatically builds navigation,
* scrolls to anchors from navigation,
* and highlights section in viewport upon scrolling.
* 
* Dependencies: None
* 
* JS Version: ES2015/ES6
* 
* JS Standard: ESlint
* 
*/

// Define Global Variables
const sectionsList = document.querySelectorAll('section');                                                          // Get All Sections As an NodeList.
const navBar = document.getElementById('navbar__list');                                                             // Get the Navigation Bar Element Object.

//// Start Helper Functions
// 1- Function To Create Navigation Bar List of Items Linked To Each Section.
function createNavigationBarList() {
    for (section of sectionsList) {
        const sectionName = section.getAttribute('data-nav');                                                       // Get Section Name To Be Used As the Text of the List.
        const ListElement = document.createElement('li');                                                           // Create List Element.
        ListElement.id = sectionName;                                                                               // Set Section ID To Be Used In Active Section.
        ListElement.innerHTML = `<span class='menu__link' classList='${sectionName}'>${sectionName}</span>`         // Create Span Element Using Section Name As Text and Adding Class.                                                                               // Add ID to List Element To Be Used in Active Section.        
        navBar.appendChild(ListElement);                                                                            // Add the Element To the Unordered List.
    }
}

// 2- Function To Activate the Section Appearing in the Viewport and Change Related Navigation Item Background Color.
function updateActiveSection() {
    let currentView = document.documentElement.scrollTop;                                                           // Get the Top Position of the Viewport.
    for (section of sectionsList) {
        const navBarItem = document.getElementById(section.getAttribute('data-nav'));                               // Get Navigation Bar Item Related To the Each Section.
        if (currentView >= section.offsetTop - 1 && currentView < section.offsetTop + section.offsetHeight - 1) {   // Checking If the Section is Inside the Viewport (Viewport is Bounded by the Section).
            if (!section.classList.contains('your-active-class')) {
                section.classList.add('your-active-class');                                                         // Set Section To Active If It Is Not.
                navBarItem.classList.add('active');                                                                 // Add To Class List 'active' Class Which Highlights the Nav. Bar Item of Section In View Port.
            }
        }
        else {
            section.classList.remove('your-active-class');                                                          // If Section is not in Viewport Unset Active Status.
            navBarItem.classList.remove('active');                                                                  // Remove Background Color of In-Active Section.
        }
    }
}

// 3- Function To Scrolling To Selected Section When Nav. Item Is Clicked.
function ScrollingTo(event) {
    // Check If Nav. Items Is Clicked.
    if (event.target.parentElement.nodeName === 'LI' && event.target.tagName === 'SPAN' && event.target.getAttribute('class') === 'menu__link') {
        const sectionNumber = event.target.getAttribute('classList');                                               // Get Section Number of the Clicked Item.
        for (section of sectionsList) {
            if (event.target.getAttribute('classList') === section.getAttribute('data-nav')) {                      // If Section That Matched Section Number.
                section.scrollIntoView({ behavior: "smooth" });                                                     // Scroll Smoothly To It.
                break;                                                                                              // Break the Loop When Reached.
            }
        }
    }
}
//// End Helper Functions.

//// Begin Main Functions
// Build the Nav
createNavigationBarList();                                                                                          // Call The Create Navigation Bar List Function.
// Add class 'active' to section when near top of viewport
document.addEventListener('scroll', updateActiveSection);                                                           // Create Event Listener To Update Active Section While Scrolling Up and Down.
// Scroll to section on nav bar click
document.addEventListener("click", ScrollingTo);                                                                    // Create Event Listener To Scroll To Section the Clicked Section.
////End Main Functions
