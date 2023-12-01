//Managing View Category Button

document.getElementById("viewCategory").addEventListener("click",()=>{
    let category = document.getElementById("categories")
    let searchResult = document.getElementById("searchResult")
    category.classList.remove("hide")
    searchResult.classList.add("hide")
})
document.querySelector(".logo").addEventListener("click",()=>{
    let main = document.getElementById("main")
    window.scrollTo(main.offsetLeft,main.offsetTop-200)
})

//Managing Function to show dynamic Random Cards on every reload
async function showRandomCard() {
  const randomMealApi = "https://www.themealdb.com/api/json/v1/1/random.php";
  try {
    let res = await axios.get(randomMealApi);
    let data = await res.data.meals[0];

    document.getElementById(
      "right"
    ).style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 32.79%, rgba(0, 0, 0, 0.50) 68.64%), url(${data.strMealThumb}), lightgray 50% / cover no-repeat`;
    document.getElementById("name").textContent = data.strMeal;
    document.getElementById("Area").textContent = data.strArea;

    //Managing View details Button on random card div to show details of that random card

    id = data.idMeal;
    document.getElementById("viewDetails").addEventListener("click", () => {
      displayDetailCard(data.idMeal);
    });
  } catch (error) {
    console.log(error);
  }
}


//Managing Fuction to view details as popup for every card
async function displayDetailCard(id) {
  const idApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  try {
      let res = await axios.get(idApi);
      let data = await res.data.meals[0];
      console.log(data);


      //Making String for proper Ingredient text
      let ingredientsArr = [
          data.strIngredient1,
          data.strIngredient2,
          data.strIngredient3,
          data.strIngredient4,
          data.strIngredient5,
          data.strIngredient6,
          data.strIngredient7,
          data.strIngredient8,
          data.strIngredient9,
          data.strIngredient10,
          data.strIngredient11,
          data.strIngredient12,
          data.strIngredient13,
          data.strIngredient14,
          data.strIngredient15,
          data.strIngredient16,
          data.strIngredient17,
          data.strIngredient18,
          data.strIngredient19,
          data.strIngredient20,
        ]
        let measurementArr = [
            data.strMeasure1,
            data.strMeasure2,
            data.strMeasure3,
            data.strMeasure4,
            data.strMeasure5,
            data.strMeasure6,
            data.strMeasure7,
            data.strMeasure8,
            data.strMeasure9,
            data.strMeasure10,
            data.strMeasure11,
            data.strMeasure12,
            data.strMeasure13,
            data.strMeasure14,
            data.strMeasure15,
            data.strMeasure16,
            data.strMeasure17,
            data.strMeasure18,
            data.strMeasure19,
        data.strMeasure20,
    ]
    
    let ingredients = ingredientsArr.filter((e)=> e != null)
    let measurement = measurementArr.filter((e)=> e != null)
    
    let string = ""
    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i] != "") {
            if (measurement[i] != " " ) {
                string += `<b>${ingredients[i]}</b> :- ${measurement[i]} <br>`
            } else {
                string += `<b>${ingredients[i]}</b><br>`
            }
        }
        
    }
    
    //Displaying popup
    
    document.querySelector(".blur").style.display = "flex";

    document.querySelector(".blur").innerHTML = `<div id="detailCard" class="flex">
    <img src="./Assets/Icons/Cross.png" alt="" id="cross">
    <div id="cardImage">
    <img src="${data.strMealThumb}" alt="" class="detailImage" />
    <div id="text">
    <h3 id="detailCardName">${data.strMeal}</h3>
    <p id="detailCardArea">${data.strArea}</p>
    </div>
    </div>
    <div id="cardInstruction" class="">
    <div id="ingredients">
    <h3>Ingredients</h3>
    <p>${string}</p>
    </div>
    <div id="instruction">
    <h3>Instruction</h3>
    <p>${data.strInstructions}</p>
    </div>
    </div>
    </div>`;
    
    document.getElementById("body").style.overflow = "hidden"
    //Closing Popup
    document.getElementById("cross").addEventListener("click",()=>{
        document.querySelector(".blur").style.display = "none";
        document.getElementById("body").style.overflow = "auto"
   })
} catch (error) {
}
}



//Managing Function to show Cards, buttons
async function displayCategories(){
    const categoryApi = "https://www.themealdb.com/api/json/v1/1/categories.php"
    
    try {
        let res = await axios.get(categoryApi)
        let data = await res.data.categories
        

        //Added Cards for popular category
        // data.forEach(ele => {
        //     document.getElementById("buttons").innerHTML += `<button class="category-btn" id="${ele.strCategory}">${ele.strCategory}</button>`
        // });
        document.getElementById("buttons").innerHTML += `<button class="category-btn" id="Chicken">Chicken</button>`

        for (let i = data.length-6; i < data.length-1; i++) {
            document.getElementById("buttons").innerHTML += `<button class="category-btn" id="${data[i].strCategory}">${data[i].strCategory}</button>`
            
        }


        //displayed every cards for chicken bt default
        document.getElementById("Chicken").classList.add("active")
        displayCards()

        //Managing category buttons to show cards based on categories
        let categoryBtn = document.querySelectorAll(".category-btn")
        for (i of categoryBtn) { 
            i.addEventListener("click",(e)=>{
                categoryBtn.forEach(ele => {
                    ele.classList.remove("active")
                });
                e.target.classList.add("active")
                categoryBtn.forEach(ele =>{
                    if (ele.classList.contains("active")) {
                        let id = ele.getAttribute("id")
                        displayCards(id,"cards")
                    }
                })

            })
        }
        
        
        
    } catch (error) {
        console.log(error);
        
    }
}



//Function to show cards that take 2 Arguments (category,location)
// --> location arguma=en is used, so that we can reuse it to show cards of search page also
async function displayCards(name="Chicken",location="cards") {
    const API = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
    
    
    try {
        let res = await axios.get(API)
        let data = await res.data.meals

        //Adding Cards
        document.getElementById(`${location}`).innerHTML = ""
        let output = ""
        data.forEach(e =>{
            
            output += `
                <div class="card flex" id="${e.idMeal}">
                    <div class="img">
                    <img id="${e.idMeal}img"
                        src=${e.strMealThumb}
                            alt=""
                                    />
                        </div>
                        <div class="About">
                     <h3 id="${e.idMeal}h3" class="cardName">${e.strMeal}</h3>
                    </div>
                    </div>`
        })
        //showing Cards
        document.getElementById(`${location}`).innerHTML = output

        //Managing popup for displayed cards
        let allCards = document.getElementsByClassName("card")
        let allCardsImg = document.getElementsByClassName("img")
        let allCardsH3 = document.getElementsByClassName("cardName")
        for (i of allCards) {
            i.addEventListener("click",e=>{
                let id = e.target.id
                displayDetailCard(id)
            })
        }
        for (i of allCardsImg) {
            i.addEventListener("click",e=>{
                let id = e.target.id
                displayDetailCard(id.slice(0,5))
            })
        }
        for (i of allCardsH3) {
            i.addEventListener("click",e=>{
                let id = e.target.id
                displayDetailCard(id.slice(0,5))
            })
        }
        

        
    } catch (error) {
        console.log(error);
        document.getElementById(`${location}`).innerHTML = `<h1>"${name}" not found</h1>`
    }
}

//Function to control Search behaviour
async function searchResult() {
    document.getElementById("searchbar").addEventListener("submit",(e)=>{
        e.preventDefault();
        let searchPage = document.getElementById("scroll")
        let search = document.querySelector("#searchbar>input")
        console.log(search);
        document.getElementById("categories").classList.add("hide")
        document.getElementById("searchResult").classList.remove("hide")
        window.scrollTo(searchPage.offsetLeft,searchPage.offsetTop-100)
        document.getElementById("result").textContent = search.value
        
        
        try {
            displayCards(search.value,"searchCards")
            
            document.getElementById("searchCross").addEventListener("click",()=>{
                document.getElementById("categories").classList.remove("hide")
                document.getElementById("searchResult").classList.add("hide")
            })
        } catch (error) {
        }
        search.value = ""

    })
}
searchResult()
displayCategories()
showRandomCard();


// function animate(id) {
    
// }
