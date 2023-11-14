// button used to animate the button-triggered animation
const animatorButton = document.getElementById("animator");

/**
 * When the event onclick is triggered, the animator button will activate the animation
 * @param {Event} event
 */
animatorButton.onclick = (event) => {
    // animatorButton.parentNode is the div that we want to animate
    // By adding the class "right-to-left" to this div, the animation is triggered
    animatorButton.parentNode.classList.add("active");
    // Once the animation is triggered, disable the animator button as the button will not work until the class is not present again
    animatorButton.disabled = true;
    // Once the animation is triggered, enable the reset button so that the right-to-left class can be removed
    resetButton.disabled = false;
}

//button used to reset the button-triggered animation
const resetButton = document.getElementById("reset-animation");

/**
 * When the event onclick is triggered, the reset button will reset the state of the animation so it can be triggered again
 * @param {Event} event 
 */
resetButton.onclick = (event) => {
    // resetButton.parentNode is the div that we want to animate
    // By removing the class "right-to-left" from this div, we allow the animation to be retriggered
    resetButton.parentNode.classList.remove("active");
    // Set opacity to one to make sure element doesn't disappear upon reset
    resetButton.parentNode.style.opacity = 1;
    // Once the animation is reset, enable the animation trigger button
    animatorButton.disabled = false;
    // Once the animation is reset/ disable the reset button as it won't have any effect until the animation is triggered again
    resetButton.disabled = true;
}

//================= INTERSECTION OBSERVER =================

// The options object is necessary for the Intersection Observer
// rootMargin: "0px" tells the observer that it should use the whole viewport (with no margin) to observe
// threshold: 0.1 tells the observer that an intersection should be triggered when the element is slightly inside the viewport
// if the threshold was 0, the observer might detect an intersection just before the element is in view
const options = {
    rootMargin: "0px",
    threshold: 0.1
}

/**
 * The callback is triggered when the observer intersects with any of the observed elements.
 * The callback manages the adding and removing of the class "active".
 * @param entries 
 * @param observer 
 */
const callback = (entries, observer) => {
    /**
     * for(const entry of entries) {
     * 
     * }
     * for(let i = 0; i < entries.length; i++) {
     *  const entry = entries[i]; 
     * }
     */

    /**
     * Loop through the entries array.
     * Each element of this array is an object that contains information related to each of the observed HTMl Elements.
     * Specifically to our interest:
     *  entry.isIntersecting -> is a boolean that will be true when the lement is in view and false when the element is out of view
     *  entry.target -> is a reference to the HTML element that allows us to change its class
     */
    for(const entry of entries) {
        // If the element is in view (i.e. intersecting), then add the class "active" to trigger the corresponding animation
        if(entry.isIntersecting) {
            entry.target.classList.add("active");
        } 
        //If the element is not in view (i.e. not intersecting), then remove the class "active" to reset the corresopnding animation
        else {
            entry.target.classList.remove("active");
            entry.target.style.opacity = 0;
        }
    }
}

/**
 * The observer object is linked to the viewport and contains the logic to trigger the callback every time an intersection is detected
 * To create the observer we need to have the callback and options predefined
 * new IntersectionObserver(callback, options) is a precoded javascript function that we can freely use
 */
const observer = new IntersectionObserver(callback, options);

// targetList is an array that contains all html elements with the class observable
// We add this class to detect elements in which an animation should be triggered upon intersecting with the viewport
const targetList = document.getElementsByClassName("observable");

/**
 * To link each of the targets inside the targetList array we need to loop through them and let the observer object know these
 * should be observerd
 */
for(const target of targetList) {
    //observer.observe(target) is a precoded javascript function that we can freely use. It individually links each target to the observer.
    observer.observe(target);
}
