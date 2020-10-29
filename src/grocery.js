console.log("Now I'm in grocery.js")

class Grocery {

    constructor(grocery, groceryAttributes){
        this.id = grocery.id
        this.groceryItem = groceryAttributes.groceryItem
        this.qty = groceryAttributes.qty
        this.notes = groceryAttributes.notes
        this.market = groceryAttributes.market
        Grocery.all.push(this)
    }

//How does name render id .name is not part of the class
    render() {
        return `
        <div data-id=${this.id}>
        <h3>${this.market.name}<h3>
        <p>${this.groceryItem}</p>
        <p>${this.qty}</p>
        <p>${this.notes}</p>
        <button id="delete-btn" data-id=${this.id}>delete</button>
        </div>
        <br><br>`;

    }

    //static method finds object by ID
    static findById(id) {
        return this.all.find(grocery => grocery.id == id)
    }

    //static method to sort grocery object 
    static sortGroceries(groceries) {
        const sortedItems = groceries.sort((first, second) => first.attributes.groceryItem.toUpperCase() > second.attributes.groceryItem.toUpperCase() ? 1 : - 1
        )
        return sortedItems
    }

    

   


}

Grocery.all = [];