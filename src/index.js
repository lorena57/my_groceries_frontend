const baseUrl = "http://localhost:3000/api/v1/groceries"

document.addEventListener('DOMContentLoaded', () => {

    document.querySelector(".fa").addEventListener("click", function (event) {
        toggleLike(event);
    });
    function toggleLike(ele) {
        ele.target.classList.toggle("fa-thumbs-down");
    }

    getGroceries()
    // forAlice()

    const createGroceryForm = document.querySelector("#create-grocery-form")
    const groceryContainer = document.querySelector("#grocery-container")

    createGroceryForm.addEventListener("submit", (e) => createFormHandler(e))

    const sortBtn = document.getElementById('sort-button')

    sortBtn.addEventListener('click', (e) => {
        e.preventDefault()
        sortGroceries()
    })

    const addOne = document.querySelector('#fave-grocery')

    addOne.addEventListener('click', (e) => {
        addone()
    });


    groceryContainer.addEventListener("click", (e) => { 
        const groceryId = e.target.dataset.id
        if (e.target.id == 'delete-btn') {
            deleteGrocery(groceryId)
        }
    })

})
//function clears out the input field and then renders grocery objects
    function getGroceries() {
        fetch(baseUrl)
        .then(response => response.json())
        .then(grocery => {
            //clears out the div 
            document.querySelector("#grocery-container").innerHTML =""
            //grocery.data.forEach iterates through the array 
            grocery.data.forEach(grocery => {
                let newGrocery = new Grocery(grocery, grocery.attributes)
                //The data is the rendered into the div element
                document.querySelector("#grocery-container").innerHTML += newGrocery.render()
            })
        })
    }

// function grabs all the values for the inputs on the form
    function createFormHandler(e) {
        // console.log(new FormData(e.target))
        e.preventDefault()
        const marketId = parseInt(document.querySelector('#markets').value)
        const groceryItemInput = document.querySelector('#input-grocery-item').value
        const qtyInput = document.querySelector('#input-qty').value
        const notesInput = document.querySelector('#input-notes').value
        postFetch(marketId, groceryItemInput, qtyInput, notesInput)
        clearValues()
    }

    //function clears the values once object is submitted
    function clearValues() {
        const marketId = document.querySelector('#markets').value = "";
        const groceryItemInput = document.querySelector('#input-grocery-item').value = "";
        const qtyInput = document.querySelector('#input-qty').value = "";
        const notesInput = document.querySelector('#input-notes').value = "";
    }

    //function post grocery object created and renders object
    function postFetch(market_id, groceryItem, qty, notes) {
        const bodyData = {market_id, groceryItem, qty, notes}
        fetch(baseUrl, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(bodyData)
        })
        .then(response => response.json())
        .then(grocery => { 
            console.log(grocery)
            const groceryData = grocery.data
            let newGrocery = new Grocery(groceryData, groceryData.attributes)
            document.querySelector("#grocery-container").innerHTML += newGrocery.render()
        })
    }

    //function iterates through object ID and grocery attributes and renders
    function sortGroceries() {
        document.querySelector('#grocery-container').innerHTML = ''
        fetch(baseUrl)
        .then(response => response.json())
        .then(groceries => {
            const grocerylist = Grocery.sortGroceries(groceries.data)
            groceries.data.forEach(grocery => {
                let findGrocery = Grocery.findById(grocery.id)
                let newItem = new Grocery(grocery, grocery.attributes)
                document.querySelector('#grocery-container').innerHTML +=newItem.render()
            })
        })
    }
    //function deletes grocery object 
    function deleteGrocery(id) {
        fetch(`http://localhost:3000/api/v1/groceries/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
    })
            .then(response => response.json())
            .then(grocery => {

            // console.log(grocery)
            Grocery.all = []
            getGroceries()
        })



    }

// function forAlice(){
//     // document.querySelector('#grocery-container').innerHTML = ''
//     fetch(baseUrl)
//     .then(response => response.json())
//     .then(groceries => {
//         const grocerylist = Grocery.forAlice(groceries.data)
//         groceries.data.forEach(grocery => {
//             let findGrocery = Grocery.findById(grocery.id)
//             let newItem = new Grocery(grocery, grocery.attributes)
//             document.querySelector('#grocery-container').innerHTML += newItem.render()
//         })
//     })
    
// }

function addone(){
    let faveItem = document.getElementById('thisone').innerHTML
    faveItem++;
    document.getElementById('thisone').innerHTML = faveItem;
}


