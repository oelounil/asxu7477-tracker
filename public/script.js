
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

const isEmpty = (str) => !str.trim().length
let currentStep = 0;

// Validate first input on load
validateEntry()

// add review
const addReview = () => {

}

submitButton.addEventListener('click', (event) => {
    console.log(form)
    // addTask(
    //     form.elements.taskName.value,
    //     form.elements.taskType.value,
    //     form.elements.taskRate.value,
    //     form.elements.taskTime.value,
    //     form.elements.taskClient.value,
    //     tagsArray,
    //     form.elements.taskAutocomplete.value
    // );
})

// Next: Change UI relative to current step and account for button permissions
nextButton.addEventListener('click', (event) => {
    event.preventDefault()

    // Hide current tab
    tabPanels[currentStep].classList.add('hidden')
    tabTargets[currentStep].classList.remove('active')

    // Show next tab
    tabPanels[currentStep + 1].classList.remove('hidden')
    tabTargets[currentStep + 1].classList.add('active')
    currentStep += 1

    validateEntry()
    updateStatusDisplay()
})

// Previous: Change UI relative to current step and account for button permissions
previousButton.addEventListener('click', (event) => {
    event.preventDefault()

    // Hide current tab
    tabPanels[currentStep].classList.add('hidden')
    tabTargets[currentStep].classList.remove('active')

    // Show previous tab
    tabPanels[currentStep - 1].classList.remove('hidden')
    tabTargets[currentStep - 1].classList.add('active')
    currentStep -= 1

    nextButton.removeAttribute('disabled')
    updateStatusDisplay()
})


function updateStatusDisplay() {
    // If on the last step, hide the next button and show submit
    if (currentStep === tabTargets.length - 1) {
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
    let input = tabPanels[currentStep].querySelector('.form-input')

    // Start but disabling continue button
    nextButton.setAttribute('disabled', true)
    submitButton.setAttribute('disabled', true)

    // Validate on initial function fire
    setButtonPermissions(input)

    // Validate on input
    input.addEventListener('input', () => setButtonPermissions(input))
    // Validate if bluring from input
    input.addEventListener('blur', () => setButtonPermissions(input))
}

function setButtonPermissions(input) {
    if (isEmpty(input.value)) {
        nextButton.setAttribute('disabled', true)
        submitButton.setAttribute('disabled', true)
    } else {
        nextButton.removeAttribute('disabled')
        submitButton.removeAttribute('disabled')
    }
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