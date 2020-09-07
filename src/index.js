const baseUrl = "http://localhost:3000/api/v1/groceries"

document.addEventListener('DOMContentLoaded', () => {

    getGroceries()

    const createGroceryForm = document.querySelector("#create-grocery-form")

    createGroceryForm.addEventListener("submit", (e) =>
    createFormHandler(e))
})

    function getGroceries() {
        fetch(baseUrl)
        .then(response => response.json())
        .then(grocery => {
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
