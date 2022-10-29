
//  let result;
 let categoryBox =[];
 (async function categoryApi() {
    let res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    
    let result = await res.json()
    categoryBox = result.categories
    displayCategory()
})()

function displayCategory() {
    let categ ="";
    for (let i = 0; i < categoryBox.length ; i++) {
        categ +=` <div class="col-lg-3">
        <div class="homeMeal position-relative rounded-1 shadow-lg  border-black border-2">
            <img src="${categoryBox[i].strCategoryThumb}" class="w-100 p-2" alt="category">
            <div class="mealLayer position-absolute d-flex align-items-center flex-column text-center p-3">
                <h3>${categoryBox[i].strCategory}</h3>
                <p>${categoryBox[i].strCategoryDescription}</p>
            </div>
        </div>
    </div>`
    
    }
    $(".category").html(categ)

    
    let innerCategory=[];
    async function innerCategoryApi() {
    let res2 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`)
    let result2= await res2.json()
    innerCategory = result2.meals
    console.log(innerCategory);
    // localStorage.setItem("categoryData",JSON.stringify(innerCategory))

    }

    function displayInnerCategory() {
        let inner ="";
        let data =JSON.parse(localStorage.getItem("mealsData"))
        for (let i = 0; i < innerCategory.length; i++) {
            inner+=` <div class="col-lg-3">
            <div class="homeMeal position-relative">
                      <img src="${data.strMealThumb}" class="w-100" alt="meal">
                       <div class="mealLayer position-absolute d-flex align-items-center">
                       <h2 class="ms-2 fw-light">${data.strMeal}</h2>
                       </div>
                </div>
        </div> `
        }

        $(".category").html(inner)
    }

    $(".category").click(()=>{
        console.log(this.strMeal);
        localStorage.setItem("categoryData",JSON.stringify(this.strMeal))

        innerCategoryApi().then(function(){
            location.href="innerCategory.html"
            displayInnerCategory()

        })
      
        
    
    })
    

}



