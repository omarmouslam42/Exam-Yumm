 let BtnSearchName = $(".searchByName").val();
 let BtnSearchLetter = $(".searchByLetter").val();

 let mealsSearch =[];

  async function getSearch() {
  let searchApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`);
  let currentSearch = await searchApi.json();
  mealsSearch = currentSearch.meals;
}
getSearch();


    $(".searchByName").keyup( ()=> {
        
        let cartona = "";
      for (let i = 0 ; i < mealsSearch.length; i++) {
    
        if (  mealsSearch[i].strMeal.includes(BtnSearchName)) {
    
          cartona += `
          <div class="col-lg-3">
          <div class="homeMeal position-relative">
            <img src="${mealsSearch[i].strMealThumb}" class="w-100" alt="meal">
          <div class="mealLayer position-absolute d-flex align-items-center">
            <h2 class="ms-2 fw-light">${mealsSearch[i].strIngredient7}</h2>
            </div>
         </div>
      `
        }
         }
         $(".displaySearch").html(cartona)
    }) 


    $(".searchByLetter").keyup( ()=> {
        let cartona = "";
      for (let i = 0; i < mealsSearch.length; i++) {
        if ( mealsSearch[i].strMeal.includes(BtnSearchLetter) ) {
              
          cartona += `
          <div class="col-lg-3">
          <div class="homeMeal position-relative">
            <img src="${mealsSearch[i].strMealThumb}" class="w-100" alt="meal">
          <div class="mealLayer position-absolute d-flex align-items-center">
            <h2 class="ms-2 fw-light">${mealsSearch[i].strIngredient7}</h2>
            </div>
         </div>
      `
        }
    }
    $(".displaySearch").html(cartona) 

    })
    
   














