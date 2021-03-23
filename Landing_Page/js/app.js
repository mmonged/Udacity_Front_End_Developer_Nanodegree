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
const sectionsList  = document.querySelectorAll('section');                                                         // Get All Sections As an NodeList.
const navBar        = document.getElementById('navbar__list');                                                      // Get the Navigation Bar Element Object.

//// Start Helper Functions
// 1- Function To Create Navigation Bar List of Items Linked To Each Section.
function createNavigationBarList() {
    for (section of sectionsList) {
        const sectionName           = section.getAttribute('data-nav');                                             // Get Section Name To Be Used As the Text of the List.
        const sectionID             = section.id;                                                                   // Get Section ID As a Reference To Be Used in Anchor.
        const ListElement           = document.createElement('li');                                                 // Create List Element.
        ListElement.id              = sectionName;                                                                  // Set ID For List Item To Be Used in Active Section.
        ListElement.innerHTML       = `<a class='menu__link' href='#${sectionID}'>${sectionName}</a>`               // Create Anchor Using Section ID and Name.
        navBar.appendChild(ListElement);                                                                            // Add the Element To the Unordered List.
    }
}

// 2- Function To Activate the Section Appearing in the Viewport and Change Related Navigation Item Background Color.
function updateActiveSection() {
    let currentView                 = document.documentElement.scrollTop;                                           // Get the Top Position of the Viewport.
    for (section of sectionsList) {
        const navBarItem            = document.getElementById(section.getAttribute('data-nav'));                    // Get Navigation Bar Item Related To the Each Section.
        if (currentView >= section.offsetTop - 1 && currentView < section.offsetTop + section.offsetHeight - 1) {   // Checking If the Section is Inside the Viewport (Viewport is Bounded by the Section).
            if(!section.classList.contains('your-active-class')) { 
                section.classList.add('your-active-class');                                                         // Set Section to Active If it is not.
                navBarItem.style.backgroundColor = '#333';                                                          // Set Background Color Of the Active Section To Dark.
            }
        }
        else {
            section.classList.remove('your-active-class');                                                          // If Section is not in Viewport Unset Active Status.
            navBarItem.style.backgroundColor = '';                                                                  // Remove Background Color of In-Active Section.
        }
    }
}

// 3- Function To Add Style Scrolling Behavior. 
function smoothScrolling()  {
    const styleElement              = document.createElement('style');                                              // Create Style Element.                                                  
    styleElement.innerHTML          = 'html { scroll-behavior: smooth }';                                           // Set Style Element Attribute.
    document.head.appendChild(styleElement);                                                                        // Append Style To Head.
}
//// End Helper Functions.

//// Begin Main Functions
// Build the Nav
createNavigationBarList();                                                                                          // Call The Create Navigation Bar List Function.
// Add class 'active' to section when near top of viewport
document.addEventListener('scroll', updateActiveSection);                                                           // Create Event Listener To Update Active Section While Scrolling Up and Down.
// Scroll to section on link click
smoothScrolling();
////End Main Functions
