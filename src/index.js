const baseUrl = 'http://localhost:3000/api/v1/groceries';

document.addEventListener('DOMContentLoaded', () => {
  getGroceries();

  const createGroceryForm = document.querySelector('#create-grocery-form');
  const groceryContainer = document.querySelector('#grocery-container');
  createGroceryForm.addEventListener('submit', (e) => createFormHandler(e));

  groceryContainer.addEventListener('click', (e) => {
    const groceryId = e.target.dataset.id;
    if (e.target.id == 'delete-btn') {
      deleteGrocery(groceryId);
    }
  });
});

//function clears out the input field and then renders grocery objects
function getGroceries() {
  fetch(baseUrl)
    .then((response) => response.json())
    .then((grocery) => {
      //clears out the div
      document.querySelector('#grocery-container').innerHTML = '';
      grocery.data.forEach((grocery) => {
        let newGrocery = new Grocery(grocery, grocery.attributes);
        //The data is rendered into the div element
        // document.querySelector("#grocery-container").innerHTML += newGrocery.render()
        document
          .querySelector('#grocery-container')
          .appendChild(newGrocery.render());
      });
    });
}
// function grabs all the values of the inputs on the form
function createFormHandler(e) {
  // console.log(new FormData(e.target))
  e.preventDefault();
  const form = document.querySelector('#create-grocery-form');

  const bodyData = {};

  [...form.elements]
    .filter((element) => {
      return element.type !== 'submit';
    })
    .forEach((formElement) => {
      const name = formElement.name;
      if (name.endsWith('[]')) {
        if (!bodyData.hasOwnProperty(name)) bodyData[name] = [];
        bodyData[name].push(formElement.value);
      } else {
        bodyData[name] = formElement.value;
      }
    });
  console.log(bodyData);
  postFetch(bodyData);
  clearFunction();
  // clearValues();
}

function clearFunction() {
  document.getElementById('create-grocery-form').reset();
}

//function post grocery object created and renders object
function postFetch(bodyData = {}) {
  // const bodyData = { market_id, groceryItem, qty, notes };
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
      document
        .querySelector('#grocery-container')
        .appendChild(newGrocery.render());
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
      Grocery.all = [];
      getGroceries();
    });
}
