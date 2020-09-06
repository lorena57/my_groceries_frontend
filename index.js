const baseUrl = "http://localhost:3000/api/v1/groceries"

document.addEventListener('DOMContentLoaded', () => {
    console.log("I'm still here")

    getGroceries()
   
})


function getGroceries() {
    fetch(baseUrl)
    .then(response => response.json())
    .then(grocery => {
    grocery.data.forEach(grocery => {
        const groceryMarkup = `
        <div data-id=${grocery.id}>
        <h3>${grocery.attributes.market.name}<h3>
        <p>${grocery.attributes.groceryItem}</p>
        <p>${grocery.attributes.qty}</p>
        <p>${grocery.attributes.notes}</p>
        <button data.id=${grocery.id}>Edit</button>
        </div>
        <br><br>`;

        document.querySelector('#grocery-container').innerHTML +=groceryMarkup
    })
    })
}


