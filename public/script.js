// NAVBAR FUNCTIONALITY – Code modified from past assessment https://replit.com/@oelounil/Japan-Website#script.js
const navToggle = document.getElementsByClassName("nav-toggle");
const navMenu = document.getElementsByClassName("nav-menu");

let navVisible = false;

navToggle[0].addEventListener("click", () => {
  toggleNav();
});

navMenu[0].addEventListener("click", () => {
  toggleNav();
});

function toggleNav() {
  if (navVisible) {
    navMenu[0].classList.remove("nav-active");
    // navWrapper[0].classList.remove("nav-active");
    navVisible = false;
  } else {
    navMenu[0].classList.add("nav-active");
    // navWrapper[0].classList.add("nav-active");
    navVisible = true;
  }
}

// MULTISTEP FORM – Code modified from https://webdesign.tutsplus.com/tutorials/how-to-build-a-multi-step-form-wizard-with-javascript--cms-93342
import images from "./images/*.png";

const previousButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const submitButton = document.querySelector("#submit");
const addDishButton = document.getElementById("addDish");
const removeDishButton = document.getElementById("removeDish");

const tabPanels = document.querySelectorAll(".tabpanel");
const form = document.getElementById("form-contents");
const dishList = document.getElementById("dishList");
const restaurantList = document.getElementById("restaurant-list");

const restaurantCount = document.getElementById("restaurant-count");
const restaurantAverage = document.getElementById("restaurant-total-average");
const topRatedRestaurant = document.getElementById("restaurant-top-rated");

const progressBar = document.getElementById("progress-bar");

const isEmpty = (str) => !str.trim().length;
let currentStep = 0;
const MAX_STEPS = 2;

// Validate first input on load
validateEntry();

// Display restuarants on load
displayRestaurants();

// Add review
const addReview = () => {};

const changeStep = (newStep) => {
  // Hide current tab
  tabPanels[currentStep].classList.add("hidden");

  // Show new tab
  tabPanels[newStep].classList.remove("hidden");

  progressBar.style.width = `${((newStep + 1) / (MAX_STEPS + 1)) * 100}%`;
};

// Continue button: Change UI relative to current step and account for button permissions
nextButton.addEventListener("click", (event) => {
  event.preventDefault();

  changeStep(currentStep + 1);

  currentStep += 1;

  validateEntry();
  updateStatusDisplay();
});

// Back icon: Change UI relative to current step and account for button permissions
previousButton.addEventListener("click", (event) => {
  event.preventDefault();

  changeStep(currentStep - 1);

  currentStep -= 1;

  nextButton.removeAttribute("disabled");
  updateStatusDisplay();
});

function updateStatusDisplay() {
  // If on the last step, hide the next button and show submit
  if (currentStep === 2) {
    nextButton.classList.add("hidden");
    previousButton.removeAttribute("inactive");
    submitButton.classList.remove("hidden");
    validateEntry();

    // If it's the first step hide the previous button
  } else if (currentStep == 0) {
    nextButton.classList.remove("hidden");
    previousButton.classList.add("disabled");
    previousButton.setAttribute("inactive", true);
    submitButton.classList.add("hidden");
    // In all other instances display both buttons
  } else {
    nextButton.classList.remove("hidden");
    previousButton.removeAttribute("inactive");
    submitButton.classList.add("hidden");
  }
}

function validateEntry() {
  let inputs = tabPanels[currentStep].querySelectorAll(".form-input");

  // Start but disabling continue button
  nextButton.setAttribute("disabled", true);
  submitButton.setAttribute("disabled", true);

  // Validate on initial function fire
  setButtonPermissions(inputs);

  inputs.forEach((input) => {
    // Validate on input
    input.addEventListener("input", () => setButtonPermissions(inputs));
    // Validate if bluring from input
    input.addEventListener("blur", () => setButtonPermissions(inputs));
  });
}

function setButtonPermissions(inputs) {
  inputs.forEach((input) => {
    // If any are empty set buttons disabled
    if (isEmpty(input.value)) {
      nextButton.setAttribute("disabled", true);
      submitButton.setAttribute("disabled", true);
      return;
    }
    // If none are empty set buttons enabled
    nextButton.removeAttribute("disabled");
    submitButton.removeAttribute("disabled");
  });
}

// OPEN MULTISTEP FORM – Code modified from https://blog.webdevsimplified.com/2023-04/html-dialog/
const openForm = document.querySelector("#log");
const closeForm = document.querySelector("#close");
const dialog = document.querySelector("dialog");

openForm.onclick = function () {
  dialog.showModal();

  // Display first step
  changeStep(0);
  currentStep = 0;

  // Reset form contents
  form.reset();

  updateStatusDisplay();
};

// CLOSE MULTISTEP FORM
closeForm.onclick = function () {
  dialog.close();
};

// Append and remove dishes when inputting food ordered

// APPEND NEW DISH TO FORM
addDishButton.addEventListener("click", (event) => {
  event.preventDefault();

  let dish = document.createElement("div");

  let dishCount = dishList.childElementCount + 1;

  dish.innerHTML = `
    <label for="dish">Dish ${dishCount}</label>
    <input name="dish" class="form-input dish-input">
    `;

  dishList.appendChild(dish);
});

// REMOVE DISH FROM FORM
removeDishButton.addEventListener("click", (event) => {
  event.preventDefault();

  dishList.removeChild(dishList.lastChild);
});

// HANDLE FORM SUBMISSION, using input values to log new restaurant, modified from https://github.com/robdongas/deco2017-task-tracker/blob/solutions/public/script.js
var restaurantLog = [];

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Array to store the logged dishes in
  const dishes = [];

  // Text fields for dishes
  const dishInputs = document.getElementsByClassName("dish-input");

  for (let i = 0; i < dishInputs.length; i++) {
    // Only log dishes if not blank
    if (dishInputs[i].value !== "") dishes.push(dishInputs[i].value);
  }

  addRestaurant(
    form.elements.restaurant.value,
    form.elements.cuisine.value,
    form.elements.location.value,
    form.elements.visitDate.value,
    form.elements.waitTime.value,
    form.elements.cost.value,
    dishes,
    form.elements.foodRating.value,
    form.elements.serviceRating.value,
    form.elements.ambienceRating.value,
    form.elements.comments.value,
    form.elements.verdict.value
  );

  dialog.close();
});

// FETCHING ITEMS FROM LOCAL STORAGE AND SHOWING ON SCREEN
function displayRestaurants() {
  // Clear the restaurantlist <ul> element's content
  restaurantList.innerHTML = "";

  // Fetch and parse restuarants array from localStorage
  let localRestaurants = JSON.parse(localStorage.getItem("restaurants"));

  // count number of restaurants to display in menu side-bar
  let numOfRestaurants = localRestaurants.length;
  restaurantCount.innerText = numOfRestaurants;

  // calculate the total average rating
  let numOfRatings = numOfRestaurants * 3;
  let sumOfRatings = 0;

  const getRatingSum = (restaurant) => {
    return (
      parseInt(restaurant.foodRating) +
      parseInt(restaurant.ambienceRating) +
      parseInt(restaurant.serviceRating)
    );
  };

  for (let i = 0; i < numOfRestaurants; i++) {
    let restaurantObj = localRestaurants[i];
    let ratingTotal = getRatingSum(restaurantObj);
    sumOfRatings += ratingTotal;
  }

  let avgOfRatings = numOfRatings === 0 ? 0 : sumOfRatings / numOfRatings;
  let intAvgOfRatings = Math.floor(avgOfRatings);
  let roundedAvgOfRatings = Math.floor(10 * avgOfRatings) / 10;
  restaurantAverage.innerText = `${"★".repeat(
    intAvgOfRatings
  )} ${roundedAvgOfRatings}`;

  // determine top rated restaurant – cloned array so that the ratings are not sorted visually on the page
  const sortedRestaurants = [...localRestaurants];
  sortedRestaurants.sort((a, b) => getRatingSum(b) - getRatingSum(a));

  if (sortedRestaurants.length > 0) {
    topRatedRestaurant.innerText = `${sortedRestaurants[0].name} (${
      Math.floor((getRatingSum(sortedRestaurants[0]) * 10) / 3) / 10
    } ★)`;
  }

  // sort localRestaurants by date, with newest ones at the top and oldest at the bottom of the list
  localRestaurants.sort(
    (a, b) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
  );

  // If there are restaurants (localStorage item exists)
  if (localRestaurants !== null) {
    // Loop through all restaurants in the array
    localRestaurants.forEach(function (restaurant) {
      // Create new list item and populate with content (including data attribute for ID)
      let item = document.createElement("li");
      item.setAttribute("data-id", restaurant.id);

      const averageRating = Math.round(
        (parseInt(restaurant.foodRating) +
          parseInt(restaurant.ambienceRating) +
          parseInt(restaurant.serviceRating)) /
          3
      );

      item.innerHTML = `
            <img src="${
              images[restaurant.verdict === "yes" ? "egg" : "bad-egg"]
            }" class="egg-icon" alt="happy egg icon">
            <div class="key-info-wrapper">
                <div class="restaurant-heading-wrapper">
                    <img src="${
                      images[restaurant.cuisine]
                    }" class="cuisine-icon">
                    <div>
                        <h3 class="restaurant-name">${restaurant.name}</h3>
                        <span class="detail-text">${restaurant.cuisine.toUpperCase()} in ${restaurant.location.toUpperCase()}</span>
                    </div>
                </div>
                <div class="right-details-wrapper">
                    <span class="detail-text">${restaurant.visitDate}</span>
                    <div class="average-rating-wrapper">
                    <span class="empty-star">
                    ${"★".repeat(5 - averageRating)}
                    </span><span class="filled-star">${"★".repeat(
                      averageRating
                    )}</span>
                        <a class="info-icon"></a>
                          <ul class="more-info">
                              <li>
                                  <div class="logged-rating-wrapper">
                                      <h4>Food</h4>
                                      <div class="expanded-star-rating">
                                          <span class="empty-star">${"★".repeat(
                                            5 - restaurant.foodRating
                                          )}</span>
                                          <span class="filled-star">${"★".repeat(
                                            restaurant.foodRating
                                          )}</span>
                                      </div>
                                      <div class="speech-bubble"></div>
                                  </div>
                              </li>
                              <li>
                                  <div class="logged-rating-wrapper">
                                      <h4>Service</h4>
                                      <div class="expanded-star-rating">
                                          <span class="empty-star">
                                          ${"★".repeat(
                                            5 - restaurant.serviceRating
                                          )}</span><span class="filled-star">
                                          ${"★".repeat(
                                            restaurant.serviceRating
                                          )}</span>
                                      </div>
                                  </div>
                              </li>
                              <li>
                                  <div class="logged-rating-wrapper">
                                      <h4>Ambience</h4>
                                      <div class="expanded-star-rating">
                                          <span class="empty-star">
                                          ${"★".repeat(
                                            5 - restaurant.ambienceRating
                                          )}</span><span class="filled-star">
                                          ${"★".repeat(
                                            restaurant.ambienceRating
                                          )}</span>
                                      </div>
                                  </div>
                              </li>
                          </ul>
                    </div>
                </div>
            </div>
            <details>
                <summary>
                    <div class="divider"></div>
                    <p>See more</p>
                </summary>
                <div class="expanded-details-wrapper">
                    <p>$${restaurant.cost} pp</p>
                    <h4>FOOD ORDERED</h4>
                    <ul>${restaurant.dishes
                      .map((dish) => `<li>${dish}</li>`)
                      .join("")}</ul>
                    <h4>WAIT TIME</h4>
                    <p>0 – 15 minutes</p>
                    <h4>COMMENTS</h4>
                    <p>${restaurant.comments}</p>
                </div>
            </details>`;

      const details = item.querySelector("details");

      restaurantList.appendChild(item);

      // Clear the value of the input once the restaurant has been added to the page
      form.reset();

      // Setup delete button DOM elements
      let delButton = document.createElement("button");
      // let delButtonText = document.createTextNode("Delete");
      // delButton.appendChild(delButtonText);
      details.appendChild(delButton); // Adds a delete button to every restaurant

      // Listen for when the delete button is clicked
      delButton.addEventListener("click", function (event) {
        // Loop through all the restaurants to find the matching ID and remove it from the array
        localRestaurants.forEach(function (
          restaurantArrayElement,
          restaurantArrayIndex
        ) {
          if (restaurantArrayElement.id == item.getAttribute("data-id")) {
            localRestaurants.splice(restaurantArrayIndex, 1);
          }
        });

        // Update localStorage with the newly spliced array (converted to a JSON string)
        localStorage.setItem("restaurants", JSON.stringify(localRestaurants));

        item.remove(); // Remove the restaurant item from the page when button clicked
        // Because we used 'let' to define the item, this will always delete the right element

        // run displayRestaurants on delete to update menu side bar stats
        displayRestaurants();
      });
    });
  }
}

function addRestaurant(
  name,
  cuisine,
  location,
  visitDate,
  waitTime,
  cost,
  dishes,
  foodRating,
  serviceRating,
  ambienceRating,
  comments,
  verdict
) {
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
    dishes,
    foodRating,
    serviceRating,
    ambienceRating,
    comments,
    verdict,
  };

  // Fetch and parse restaurants array from localStorage
  let localRestaurants = JSON.parse(localStorage.getItem("restaurants"));

  // If no restaurants exist in local storage, create a new array using the current restaurant
  if (localRestaurants == null) {
    localRestaurants = [restaurant];
  } else {
    // Otherwise check to see if a restaurant with the same ID already exists (just in case)
    if (localRestaurants.find((element) => element.id === restaurant.id)) {
    } else {
      // If not, push the new restaurant to the array
      localRestaurants.push(restaurant);
    }
  }

  // Update localStorage with the array (converted to a JSON string)
  localStorage.setItem("restaurants", JSON.stringify(localRestaurants));

  // Call function to display the restaurants on the DOM
  displayRestaurants();
}
