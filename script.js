const mealContainer = document.getElementById("meal-container");

const renderMeal = (meal) => {
  const { strMeal, strMealThumb, strInstructions } = meal;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure ? measure : ""} ${ingredient}`.trim());
    }
  }

  const mealHTML = `
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow mb-4">
      <a href="#">
        <img
          class="rounded-t-lg"
          src="${strMealThumb}"
          alt="${strMeal}"
        />
      </a>
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            ${strMeal}
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700">
          ${strInstructions.slice(0, 150)}...
        </p>
        <h6 class="text-lg font-semibold mt-4">Ingredients:</h6>
        <ul class="list-disc list-inside text-gray-700">
          ${ingredients.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;

  return mealHTML;
};

const fetchMealButton = document.getElementById("fetch-meal-btn");

fetchMealButton.addEventListener("click", () => {
  mealContainer.innerHTML = `<p class="text-lg text-gray-600">Loading...</p>`;

  axios
    .get("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => {
      const meal = response.data.meals[0];
      const mealHTML = renderMeal(meal);
      mealContainer.innerHTML = mealHTML;
    })
    .catch((error) => {
      console.error("Error fetching meal:", error.message);
      mealContainer.innerHTML = `<p class="text-lg text-red-600">Failed to fetch meal. Please try again later.</p>`;
    });
});
