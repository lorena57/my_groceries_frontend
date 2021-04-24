console.log("Now I'm in grocery.js");

class Grocery {
  constructor(grocery, groceryAttributes) {
    this.id = grocery.id;
    this.groceryItem = groceryAttributes.groceryItem;
    this.qty = groceryAttributes.qty;
    this.notes = groceryAttributes.notes;
    this.market = groceryAttributes.market;
    Grocery.all.push(this);
  }

  render() {
    const element = document.createElement('div');
    element.setAttribute('data-id', this.id);
    element.innerHTML = `
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${this.market.name}</h5>
          <p class="card-text">Qty: ${this.qty}</p>
          <p class="card-text">Item: ${this.groceryItem}</p>
          <p class="card-text">Notes: ${this.notes}</p>
          
          <button type="button" id="delete-btn" data-id=${this.id} class="btn btn-sm btn-danger">Delete</button>
          <form data-id=${this.id}>
              <span id="this-one">Importance: </span>
              <input type="button" id="number-${this.id}" value="0" />
          </form>
        </div>
      </div>


		
    `;
    return element;
  }
  //static method finds object by ID
  static findById(id) {
    return this.all.find((grocery) => grocery.id == id);
  }

  //static method to sort grocery object
  static sortGroceries(groceries) {
    const sortedItems = groceries.sort((first, second) =>
      first.attributes.groceryItem.toUpperCase() >
      second.attributes.groceryItem.toUpperCase()
        ? 1
        : -1
    );
    return sortedItems;
  }
}

Grocery.all = [];
