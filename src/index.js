const baseUrl = "http://localhost:3000/api/v1/groceries"

document.addEventListener('DOMContentLoaded', () => {

    getGroceries()

    const createGroceryForm = document.querySelector("#create-grocery-form")
    const groceryContainer = document.querySelector("#grocery-container")

    createGroceryForm.addEventListener("submit", (e) =>
    createFormHandler(e))

    const sortBtn = document.getElementById('sort-button')

    sortBtn.addEventListener('click', (e) => {
        e.preventDefault()
        sortGroceries()
    })

    groceryContainer.addEventListener("click", (e) => {
        const groceryId = e.target.dataset.id
        if (e.target.id == 'delete-btn') {
            deleteGrocery(groceryId)
        }
    })


   


})

    function getGroceries() {
        fetch(baseUrl)
        .then(response => response.json())
        .then(grocery => {
            //clears out the div 
            document.querySelector("#grocery-container").innerHTML =""
            grocery.data.forEach(grocery => {
                let newGrocery = new Grocery(grocery, grocery.attributes)
                document.querySelector("#grocery-container").innerHTML += newGrocery.render()
            })
        })
    }

// function grabs all the values for the inputs on the form
    function createFormHandler(e) {
        e.preventDefault()
        const marketId = parseInt(document.querySelector('#markets').value)
        const groceryItemInput = document.querySelector('#input-grocery-item').value
        const qtyInput = document.querySelector('#input-qty').value
        const notesInput = document.querySelector('#input-notes').value
        postFetch(marketId, groceryItemInput, qtyInput, notesInput)
        clearValues()
    }

    function clearValues() {
        const marketId = parseInt(document.querySelector('#markets').value = "")
        const groceryItemInput = document.querySelector('#input-grocery-item').value = "";
        const qtyInput = document.querySelector('#input-qty').value = "";
        const notesInput = document.querySelector('#input-notes').value = "";
    }

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






