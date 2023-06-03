
// MULTISTEP FORM

// Code taken from https://webdesign.tutsplus.com/tutorials/how-to-build-a-multi-step-form-wizard-with-javascript--cms-93342

const previousButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
const submitButton = document.querySelector('#submit');
const addDishButton = document.getElementById("addDish");
const removeDishButton = document.getElementById("removeDish");

const tabTargets = document.querySelectorAll('.tab');
const tabPanels = document.querySelectorAll('.tabpanel');
const form = document.getElementById("form-contents");
const dishList = document.getElementById("dishList");
const restaurantList = document.getElementById("restaurant-list");

const isEmpty = (str) => !str.trim().length
let currentStep = 0;

// Validate first input on load
validateEntry()

// Display restuarants on load
// displayRestaurants();

// add review
const addReview = () => {

}

// Next: Change UI relative to current step and account for button permissions
nextButton.addEventListener('click', (event) => {
    event.preventDefault()

    // Hide current tab
    tabPanels[currentStep].classList.add('hidden')
    // tabTargets[currentStep].classList.remove('active')

    // Show next tab
    tabPanels[currentStep + 1].classList.remove('hidden')
    // tabTargets[currentStep + 1].classList.add('active')
    currentStep += 1

    validateEntry()
    updateStatusDisplay()
})

// Previous: Change UI relative to current step and account for button permissions
previousButton.addEventListener('click', (event) => {
    event.preventDefault()

    // Hide current tab
    tabPanels[currentStep].classList.add('hidden')
    // tabTargets[currentStep].classList.remove('active')

    // Show previous tab
    tabPanels[currentStep - 1].classList.remove('hidden')
    // tabTargets[currentStep - 1].classList.add('active')
    currentStep -= 1

    nextButton.removeAttribute('disabled')
    updateStatusDisplay()
})


function updateStatusDisplay() {
    // If on the last step, hide the next button and show submit
    if (currentStep === 2) {
        nextButton.classList.add('hidden')
        previousButton.removeAttribute('inactive')
        submitButton.classList.remove('hidden')
        validateEntry()

        // If it's the first step hide the previous button
    } else if (currentStep == 0) {
        console.log('curr step 0')
        nextButton.classList.remove('hidden')
        previousButton.classList.add('disabled')
        previousButton.setAttribute('inactive', true)
        submitButton.classList.add('hidden')
        // In all other instances display both buttons
    } else {
        console.log('curr step ', currentStep)
        nextButton.classList.remove('hidden')
        previousButton.removeAttribute('inactive')
        submitButton.classList.add('hidden')
    }
}

function validateEntry() {
    let inputs = tabPanels[currentStep].querySelectorAll('.form-input');

    // Start but disabling continue button
    nextButton.setAttribute('disabled', true)
    submitButton.setAttribute('disabled', true)

    console.log(inputs);

    // Validate on initial function fire
    setButtonPermissions(inputs)

    inputs.forEach((input) => {
        // Validate on input
        input.addEventListener('input', () => setButtonPermissions(inputs))
        // Validate if bluring from input
        input.addEventListener('blur', () => setButtonPermissions(inputs))
    })
}

function setButtonPermissions(inputs) {
    inputs.forEach((input) => {
        // If any are empty set buttons disabled
        if (isEmpty(input.value)) {
            nextButton.setAttribute('disabled', true)
            submitButton.setAttribute('disabled', true)
            return;
        }
        // If none are empty set buttons enabled
        nextButton.removeAttribute('disabled')
        submitButton.removeAttribute('disabled')
    });
}
//open multistep form

const openForm = document.querySelector('#log')
const closeForm = document.querySelector('#close')
const dialog = document.querySelector("dialog")

openForm.onclick = function () {

    dialog.showModal()

    updateStatusDisplay();
}

// close multistep form


closeForm.onclick = function () {
    dialog.close()
}

// Append new dish to form
addDishButton.addEventListener('click', (event) => {
    event.preventDefault();

    let dish = document.createElement("div");

    let dishCount = dishList.childElementCount + 1;

    dish.innerHTML = `
    <label for="dish${dishCount}">Dish ${dishCount}</label>
    <input name="dish${dishCount}" class="form-input">
    `;

    dishList.appendChild(dish);
});

// Remove dish from form
removeDishButton.addEventListener('click', (event) => {
    event.preventDefault();

    dishList.removeChild(dishList.lastChild);
});






// handle form submission, using input values to log new restaurant, modified from https://github.com/robdongas/deco2017-task-tracker/blob/solutions/public/script.js
var restaurantLog = [];


form.addEventListener("submit", function (event) {
    event.preventDefault();

    // console.log(restaurantLog);

    // const restaurant = 
    addRestaurant(
        form.elements.restaurant.value,
        form.elements.cuisine.value,
        form.elements.location.value,
        form.elements.visitDate.value,
        form.elements.waitTime.value,
        form.elements.cost.value,
        form.elements.dish1.value,
        form.elements.foodRating.value,
        form.elements.comments.value,
        form.elements.return.value,
    );

    // restaurantLog.push(restaurant);
});



// General function for fetching tasks from localStorage and rendering to screen
function displayRestaurants() {
    // Clear the tasklist <ul> element's content
    restaurantList.innerHTML = "";

    // Fetch and parse tasks array from localStorage
    let localRestaurants = JSON.parse(localStorage.getItem("restaurants"));

    // If there are tasks (localStorage item exists)
    if (localRestaurants !== null) {
        // Loop through all tasks in the array
        localRestaurants.forEach(function (restaurant) {
            // let taskImage = null;
            // switch (task.type) {
            //     case "Concept Ideation":
            //         taskImage = images["ideate"];
            //         break;
            //     case "Wireframing":
            //         taskImage = images["design"];
            //         break;
            //     case "Application Coding":
            //         taskImage = images["code"];
            //         break;
            //     default:
            //         break;
            // }

            // Create new list item and populate with content (including data attribute for ID)
            let item = document.createElement("li");
            item.setAttribute("data-id", restaurant.id);
            item.innerHTML = `<h3>${restaurant.name}</h3><span>${restaurant.cuisine.toUpperCase()} in ${restaurant.location.toUpperCase()}</span>`;
            
            // <img src='${taskImage}' width='50'/>
           
            restaurantList.appendChild(item);

            // Clear the value of the input once the task has been added to the page
            form.reset();

            // Setup delete button DOM elements
            let delButton = document.createElement("button");
            let delButtonText = document.createTextNode("Delete");
            delButton.appendChild(delButtonText);
            item.appendChild(delButton); // Adds a delete button to every task

            // Listen for when the delete button is clicked
            delButton.addEventListener("click", function (event) {
                // Loop through all the tasks to find the matching ID and remove it from the array
                localRestaurants.forEach(function (restaurantArrayElement, restaurantArrayIndex) {
                    if (restaurantArrayElement.id == item.getAttribute("data-id")) {
                        localRestaurants.splice(restaurantArrayIndex, 1);
                    }
                });

                // Update localStorage with the newly spliced array (converted to a JSON string)
                localStorage.setItem("restaurants", JSON.stringify(localRestaurants));

                item.remove(); // Remove the task item from the page when button clicked
                // Because we used 'let' to define the item, this will always delete the right element
            });
        });
    }
}


// Create a function called 'logRestaurant'
// Give the function input parameters for: name, type, rate, time, client
// Paste your object definition from above in the function
// Replace the property values with the input paramaters
// Add the object to the taskList array

function addRestaurant(name, cuisine, location, visitDate, waitTime, cost, dish1, foodRating, comments, verdict) {
    // Creating the object, directly passing in the input parameters
    let restaurant = {
        name,
        cuisine,
        id: Date.now(),
        date: new Date().toISOString(),
        location,
        visitDate,
        waitTime,
        cost,
        dish1,
        foodRating,
        comments,
        verdict,
    };

    // Fetch and parse tasks array from localStorage
    let localRestaurants = JSON.parse(localStorage.getItem("restaurants"));

    // If no tasks exist in local storage, create a new array using the current task
    if (localRestaurants == null) {
        localRestaurants = [restaurant];
    } else {
        // Otherwise check to see if a task with the same ID already exists (just in case)
        if (localRestaurants.find((element) => element.id === restaurant.id)) {
            console.log("Task ID already exists");
        } else {
            // If not, push the new task to the array
            localRestaurants.push(restaurant);
        }
    }

    // Update localStorage with the array (converted to a JSON string)
    localStorage.setItem("restaurants", JSON.stringify(localRestaurants));

    // Call function to display the tasks on the DOM
    displayRestaurants();
};