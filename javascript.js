//finding sections and button
const searchBtn = document.getElementById("search-btn");
const clickedItemArea = document.getElementById("clicked-item-area")
const errorArea = document.getElementById("error-area");
const itemsArea = document.getElementById("items-area");
//initialize variables
let divs = "";
let itemIngre = [];
let itemList = [];
let inputMeal = '';
let flag = 1;

searchBtn.addEventListener("click", function () {
    //to hold every search result initialize them 
    flag = 1;
    divs = "";
    itemIngre = [];
    itemList = [];
    clickedItemArea.innerText = '';
    itemsArea.innerText = '';

    inputMeal = document.getElementById("input-meal").value;
    inputMeal = inputMeal.toLowerCase();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputMeal.slice(0, 1)}`)
        .then(res => res.json())
        .then(data => {
            let i = 0;
            data.meals.map(meal => {
                const Name = meal.strMeal.toLowerCase();
                if (Name.search(inputMeal) >= 0) {
                    i++;
                    setIngredients(meal, i);
                    setMealItems(meal, i);
                    flag = 0;
                }
            })
            if (flag) {
                errorHandler();
            } else {
                errorArea.style.display = 'none';
                itemsArea.innerHTML = divs;
            }
        })
})
//insert each meal item into div
const setMealItems = (meal, i) => {
    const div = ` 
       <div onclick="clickedItemEventHandler(${i})" class="card col-md-3 m-5 shadow-lg" style="width: 18rem;">
           <img src="${meal.strMealThumb}" class="card-img-top" style = " marging-top = 20px; border-radius: 10px;" alt="...">
           <div class="card-body">
                <p class="text-center fw-bold">${meal.strMeal}</p>
           </div>
       </div>`;
    itemList.push(div);
    divs += div;
}
//insert corresponding ingredients
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
//clicked meal display 
const clickedItemEventHandler = id => {
    console.log(id);
    const clickedItem = itemList[id - 1];
    const clickedItemIngre = itemIngre[id - 1];;
    clickedItemArea.innerHTML = clickedItem + clickedItemIngre;
}
//display error massage
const errorHandler = () => {
    const div = document.createElement('div');
    const p = document.createElement('p');
    p.innerText = `${inputMeal} did not found`;
    div.appendChild(p);
    errorArea.innerText = '';
    errorArea.style.display = 'block';
    errorArea.appendChild(div);
}

