const searchBtn = document.getElementById("search-btn");
const clickedItemSec = document.getElementById("clicked-item-section")

let divs = "";
let itemIngre = [];
let itemList = [];

searchBtn.addEventListener("click", function () {
    divs = "";
    itemIngre = [];
    itemList = [];
    clickedItemSec.innerText = '';

    const mealItem = document.getElementById("input-meal").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${mealItem}`)
        .then(res => res.json())
        .then(data => {
            let i = 0;
            data.meals.map(meal => {
                i++;
                setIngredients(meal, i);
                setMealItems(meal, i);
            })
            const itemsSection = document.getElementById("items-section");
            itemsSection.innerHTML = divs;
        })
        .catch(error => {
            console.log(error);
        })
})

const setMealItems = (meal, i) => {
    const div = ` 
       <div onclick="eventHandler(${i})" class="card col-md-3 m-5 shadow-lg" style="width: 18rem;">
           <img src="${meal.strMealThumb}" class="card-img-top" style = " marging-top = 20px; border-radius: 10px;" alt="...">
           <div class="card-body">
                <p class="text-center fw-bold">${meal.strMeal}</p>
           </div>
       </div>`;
    itemList.push(div);
    divs += div;
}


const setIngredients = (meal, i) => {
    const ingreList = `
                <div class="mt-5 ">
                    <h3>Ingredients</h3>
                       <ul>
                           <li>${meal.strIngredient1}</li>
                           <li>${meal.strIngredient2}</li>
                           <li>${meal.strIngredient3}</li>
                           <li>${meal.strIngredient4}</li>
                           <li>${meal.strIngredient5}</li>
                           <li>${meal.strIngredient6}</li>
                           <li>${meal.strIngredient7}</li>
                           <li>${meal.strIngredient8}</li>
                           <li>${meal.strIngredient9}</li>
                        </ul>
                </div>`
    itemIngre.push(ingreList);
}

const eventHandler = id => {
    console.log(id);
    const clickedItem = itemList[id - 1];
    const clickedItemIngre = itemIngre[id - 1];;
    clickedItemSec.innerHTML = clickedItem + clickedItemIngre;
}

