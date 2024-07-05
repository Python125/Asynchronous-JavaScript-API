const searchForm = document.querySelector("form"); // Selects the first form tag ONLY
const searchResultDiv = document.querySelector(".search-result"); // Because this is selecting a class, there is a dot before the class name
const container = document.querySelector(".container");
const APP_ID = "";
const APP_key = "";
let searchQuery = ""; // The search query variable is using let because this allows the user to search for a specific search. Using const would prevent that

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}

function generateHTML(results) {
  container.classList.remove("initial");
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
    <div class="card mb-5">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${result.recipe.image}" class="card-img" alt="img">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${result.recipe.label}</h5>
            <a target="_blank" href="${
              result.recipe.url
            }" class="btn btn-primary">View Recipe</a>
            <ul class="list-group list-group-flush mt-3">
              <li class="list-group-item">Calories: ${result.recipe.calories.toFixed(
                2
              )}</li>
              <li class="list-group-item">
                Diet Label: ${
                  result.recipe.dietLabels.length > 0
                    ? result.recipe.dietLabels.join(", ")
                    : "No Data Found"
                }
              </li>
              <li class="list-group-item">Health Labels: ${result.recipe.healthLabels.join(
                ", "
              )}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}