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






}

Grocery.all = [];