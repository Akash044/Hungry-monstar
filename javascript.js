const searchBtn = document.getElementById("search-btn");
    searchBtn.addEventListener("click", function () {
        const mealItem = document.getElementById("input-meal").value.slice(0, 1);
        console.log(mealItem);

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${mealItem}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                let divs = "";
                data.meals.map(meal => {
                    console.log(meal.strMeal);
                    console.log(meal.strMealThumb);





                    let div = `<div class="col-md-3 card m-5" style="width: 18rem;">
                            <img  src="${meal.strMealThumb}" class="card-img-top" style = " marging-top = 20px; border-radius: 10px;" alt="...">
                            <div class="card-body">
                                <p class="text-center fw-bold">${meal.strMeal}</p>
                            </div>
                        </div>`;

                    console.log(div);
                    divs+=div;

                })
                const itemsSection = document.getElementById("items-section");
                itemsSection.innerHTML = divs;

            });
    })

    const itemSection = document.getElementById("items-section");
    itemSection.addEventListener("click",function(event){
        console.log(event.target);

    })