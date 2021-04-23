const baseUrl = 'http://localhost:3000/api/v1/groceries';

document.addEventListener('DOMContentLoaded', () => {
  getGroceries();
  // addNum()

  const createGroceryForm = document.querySelector('#create-grocery-form');
  const groceryContainer = document.querySelector('#grocery-container');
  createGroceryForm.addEventListener('submit', (e) => createFormHandler(e));
  const sortBtn = document.getElementById('sort-button');
  sortBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sortGroceries();
  });

  // const addOne = document.querySelector('#number')
  // addOne.addEventListener('click', (e) => {
  //     e.preventDefault()
  //     addNum()
  // });

  groceryContainer.addEventListener('click', (e) => {
    const groceryId = e.target.dataset.id;
    if (e.target.id == 'delete-btn') {
      deleteGrocery(groceryId);
    }
  });
});
//function clears out the input field and then renders grocery objects
function getGroceries() {
  //debugger
  fetch(baseUrl)
    .then((response) => response.json())
    .then((grocery) => {
      //clears out the div
      document.querySelector('#grocery-container').innerHTML = '';
      //grocery.data.forEach iterates through the array
      grocery.data.forEach((grocery) => {
        let newGrocery = new Grocery(grocery, grocery.attributes);
        //The data is rendered into the div element
        // document.querySelector("#grocery-container").innerHTML += newGrocery.render()
        document
          .querySelector('#grocery-container')
          .appendChild(newGrocery.render());
        const addOne = document.querySelector(`#number-${newGrocery.id}`);
        // console.log(addOne)
        addOne.addEventListener('click', (e) => {
          e.preventDefault();
          addNum(newGrocery.id);
        });
      });
    });
}
// function grabs all the values for the inputs on the form
function createFormHandler(e) {
  // console.log(new FormData(e.target))
  e.preventDefault();
  const marketId = parseInt(document.querySelector('#markets').value);
  const groceryItemInput = document.querySelector('#input-grocery-item').value;
  const qtyInput = document.querySelector('#input-qty').value;
  const notesInput = document.querySelector('#input-notes').value;
  postFetch(marketId, groceryItemInput, qtyInput, notesInput);
  clearValues();
}

// function createFormHandler(e) {
//     e.preventDefault()

//     let groceryData = Array.from(document.querySelectorAll('#create-grocery-form input')).reduce((acc, input) => ({...acc, [input.id]: input.value}),{});
//     postFetch(groceryData)
//     clearValues()
// }

//function clears the values once object is submitted
function clearValues() {
  const marketId = (document.querySelector('#markets').value = '');
  const groceryItemInput = (document.querySelector(
    '#input-grocery-item'
  ).value = '');
  const qtyInput = (document.querySelector('#input-qty').value = '');
  const notesInput = (document.querySelector('#input-notes').value = '');
}
//function post grocery object created and renders object
function postFetch(market_id, groceryItem, qty, notes) {
  const bodyData = { market_id, groceryItem, qty, notes };
  fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyData),
  })
    .then((response) => response.json())
    .then((grocery) => {
      console.log(grocery);
      const groceryData = grocery.data;
      let newGrocery = new Grocery(groceryData, groceryData.attributes);
      document.querySelector(
        '#grocery-container'
      ).innerHTML += newGrocery.render();
    });
}
//function iterates through object ID and grocery attributes and renders
function sortGroceries() {
  document.querySelector('#grocery-container').innerHTML = '';
  fetch(baseUrl)
    .then((response) => response.json())
    .then((groceries) => {
      const grocerylist = Grocery.sortGroceries(groceries.data);
      groceries.data.forEach((grocery) => {
        let findGrocery = Grocery.findById(grocery.id);
        let newItem = new Grocery(grocery, grocery.attributes);
        document.querySelector(
          '#grocery-container'
        ).innerHTML += newItem.render();
      });
    });
}
//function deletes grocery object
function deleteGrocery(id) {
  fetch(`http://localhost:3000/api/v1/groceries/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((grocery) => {
      // console.log(grocery)
      Grocery.all = [];
      getGroceries();
    });
}

function addNum(id) {
  let value = parseInt(document.querySelector(`#number-${id}`).value, 2);
  console.log(value);
  value = isNaN(value) ? 0 : value;
  console.log(value);
  value++;
  document.querySelector(`#number-${id}`).value = value;
}
