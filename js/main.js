
// import * as tasks from "./search.js";



if ($(document).ready()) {
    $(".reloadlayer").fadeOut(500)
    $(document.body).css("overflow" , "visible")
}

let sideNavWidth = $(".sideNav").innerWidth();
let innerNav = $(".innerNav").innerWidth();
$(".sideNav").animate({left: - (sideNavWidth - innerNav) },0)
$(".show").click(function () {

    if($(".sideNav").css("left") == "0px"){

        
        $(".sideNav").animate({left: -(sideNavWidth - innerNav)}, 500 ,function () {
            $(".close").css("display","none")
            $(".hide").css("display","unset")
        })

       
        $(".nav-content").slideToggle(150)

    }
    else{
        
        $(".sideNav").animate({left: 0 }, 500 ,function(p) {
            $(".close").css("display","unset")
            $(".hide").css("display","none")
        })
        $(".nav-content").slideToggle(1000)
       
    } 
})


let data;
let meals =[]
let areaArray =[];

async function fetchMeal() {
    
    let resHome = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s") ;
    let response = await resHome.json()
    data =response.meals
    meals = data
    displayHome()
    innerMeals()

}
fetchMeal()


function displayHome(){
    let mealsBox = "";
    for (let i = 0; i < meals.length; i++) {
        // mealsArray = meals[i];
        mealsBox +=`<div class="col-lg-3 p-4 ">
        <div id="${meals[i].idMeal}" class="homeMeal position-relative my-1 rounded-2 shadow-lg">
            <img src="${meals[i].strMealThumb}" class="w-100" alt="meal">
            <div class="mealLayer position-absolute  d-flex align-items-center">
                <h2 class="ms-2 fw-light">${meals[i].strMeal}</h2>
            </div>
        </div>
        </div>`

    }
    $(".home").html(mealsBox)
}

    function innerMeals() {
     
            $(".homeMeal").click(function (){
            console.log("gamd")
            
                
            let fetchId = async() => {
                let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.id}`)
                let result = await response.json();
                
                 localStorage.setItem("mealsData",JSON.stringify(result.meals))
                console.log(this.id);  
            }
            
            fetchId().then(function () {
            location.href ="meals.html"
            })
    })
    
    }
    (function () {
        let data =JSON.parse(localStorage.getItem("mealsData"))
        // console.log(data);
        $('.mealsHeaders img').attr("src",data[0].strMealThumb)
        $('.captionHeader p').html(data[0].strInstructions)
        $('.captionHeader p').html(data[0].strInstructions)
        $('.mealscaption .one').append(data[0].strArea)
        $('.mealscaption .two').append(data[0].strCategory)
        $(".source").click(function () {location.href= data[0].strSource})
        $(".youtube").click(function () {location.href= data[0].strYoutube})
        console.log(data[0].substring(data[0].strIngredient14 , data[0].strIngredient14) );
    })()



    //////////////////////////

async function areaApi() {
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    let result = await response.json()
    // console.log(result);
    areaArray = result.meals
    displayArea()
}
areaApi()


function displayArea() {
    let areaBox ="";
    for (let i = 0; i < areaArray.length; i++) {
        areaBox += `<div class="col-lg-3">
        <div class="areaDiv d-flex flex-column justify-content-center align-items-center p-2 my-2">
            <i class="fa-solid fa-city fa-3x text-danger mb-2 "></i>
            <h2 class="text-white fw-light">${areaArray[i].strArea}</h2>
        </div>
    </div>`
    }
    $(".area").html(areaBox)
}


//////////////////////////////////////
let ingredientsArray =[];
(async function ingredientsApi() {
    let respone = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    let result = await respone.json()
    ingredientsArray = result.meals
    // console.log(ingredientsArray);
    displayIngredients()

})()


function displayIngredients() {
    let ingred ="";
    for (let i = 0; i < 20; i++) {
        ingred += `<div class="col-lg-3 col-md-6">
        <div class="innerIngredients d-flex flex-column justify-content-center align-items-center text-center py-4 my-2 ">
            <div class=" w-75 shadow-sm">
            <i class="fa-solid fa-bowl-food fa-3x text-success"></i>
            <h3 class="text-white fw-light">${ingredientsArray[i].strIngredient}</h3>
            <p class="text-white lh-sm ">${ingredientsArray[i].strDescription} </p>
            </div>
        </div>
    </div>`
    }
    $(".ingredients").html(ingred)
}


















////////////////////////////////////
    




    // ***nameInput-validation***
var nameAlert =document.getElementById('nameAlert');
var  nameInput=document.getElementById('nameInput');
var submit=document.getElementById('submit');
nameInput.onkeyup=function()
{
    var nameRejex=/[a-z A-Z][^#&<>\"~;$^%{}?]{1,20}$/
    if(nameRejex.test(nameInput.value))
    {//lw valid 7elo
        submit.removeAttribute('disabled')
        nameInput.classList.add('is-valid');
        nameInput.classList.remove('is-invalid');
        nameAlert.classList.add('d-none')

    }
    else{// not valid we74
        submit.disabled='true';
        nameInput.classList.add('is-invalid');
        nameInput.classList.remove('is-valid');
        nameAlert.classList.remove('d-none')

    }
}
// ****************E-mail-input-validation*************
var emailAlert =document.getElementById('emailAlert');
var  emailInput=document.getElementById('emailInput');
emailInput.onkeyup=function()
{
    var  mailRejex=(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(mailRejex.test(emailInput.value))
    {
        submit.removeAttribute('disabled')
        emailInput.classList.add('is-valid');
        emailInput.classList.remove('is-invalid');
        emailAlert.classList.add('d-none')

    }
    else{
        submit.disabled='true';
        emailInput.classList.add('is-invalid');
        emailInput.classList.remove('is-valid');
        emailAlert.classList.remove('d-none')

    }
}
// -*********************phone-input-validation******************
var phoneAlert =document.getElementById('phoneAlert');
var  phoneInput=document.getElementById('phoneInput');
phoneInput.onkeyup=function()
{
    var  phoneRejex=/^01[0125][0-9]{8}$/
    if(phoneRejex.test(phoneInput.value))
    {
        submit.removeAttribute('disabled');
        phoneInput.classList.add('is-valid');
        phoneInput.classList.remove('is-invalid');
        phoneAlert.classList.add('d-none')

    }
    else{
        submit.disabled='true';
        phoneInput.classList.add('is-invalid');
        phoneInput.classList.remove('is-valid');
        phoneAlert.classList.remove('d-none')

    }
}
// ********age-input-validation***********
var ageAlert =document.getElementById('ageAlert');
var  ageInput=document.getElementById('ageInput');
ageInput.onkeyup=function()
{
    var  ageRejex= /^[1-9]?[0-9]{1}$|^100$/
    if(ageRejex.test(ageInput.value))
    {//lw valid 7elo
        submit.removeAttribute('disabled');
        ageInput.classList.add('is-valid');
        ageInput.classList.remove('is-invalid');
        ageAlert.classList.add('d-none')

    }
    else{// not valid we74
        submit.disabled='true';
        ageInput.classList.add('is-invalid');
        ageInput.classList.remove('is-valid');
        ageAlert.classList.remove('d-none')

    }
}
// *************************password-input-validation**********
var passAlert =document.getElementById('passAlert');
var  passInput=document.getElementById('passInput');
passInput.onkeyup=function()
{
    var  passRejex= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(passRejex.test(passInput.value))
    {//lw valid 7elo
        submit.removeAttribute('disabled');
        passInput.classList.add('is-valid');
        passInput.classList.remove('is-invalid');
        passAlert.classList.add('d-none')

    }
    else{// not valid we74
        submit.disabled='true';
        passInput.classList.add('is-invalid');
        passInput.classList.remove('is-valid');
        passAlert.classList.remove('d-none')

    }
}
// ***********************Repassword-input-validation************
var repassAlert =document.getElementById('repassAlert');
var  repassInput=document.getElementById('repassInput');
repassInput.onkeyup=function()
{
    var  repassRejex= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(repassRejex.test(passInput.value))
    {//lw valid 7elo
        submit.removeAttribute('disabled');
        repassInput.classList.add('is-valid');
        repassInput.classList.remove('is-invalid');
        repassAlert.classList.add('d-none')

    }
    else{// not valid we74
        submit.disabled='true';
        repassInput.classList.add('is-invalid');
        repassInput.classList.remove('is-valid');
        repassAlert.classList.remove('d-none')

    }
}







