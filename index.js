const baseUrl = "http://localhost:3000/api/v1/groceries"

document.addEventListener('DOMContentLoaded', () => {
    console.log("I'm still here")

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
        render(grocery)
        })
    })
}

function render(grocery) {
    const groceryMarkup = `
        <div data-id=${grocery.id}>
        <h3>${grocery.attributes.market.name}<h3>
        <p>${grocery.attributes.groceryItem}</p>
        <p>${grocery.attributes.qty}</p>
        <p>${grocery.attributes.notes}</p>
        <button data.id=${grocery.id}>Edit</button>
        </div>
        <br><br>`;

    document.querySelector('#grocery-container').innerHTML += groceryMarkup
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
        const groceryData = grocery.data.attributes
        const groceryMarkUp = `
        <div data-id=${grocery.id}>
            <h3>${groceryData.market.name}</h3>
            <p>${grocery.groceryItem}</p>
            <p>${grocery.qty}</p>
            <p>${grocery.notes}</p>
            <button data-id=${groceryData.id}>Edit</button>
        </div>
        `;
        document.querySelector('#grocery-container').innerHTML +=groceryMarkUp
    })
}