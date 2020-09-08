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


    render() {
        return `
        <div data-id=${this.id}>
        <h3>${this.market.name}<h3>
        <p>${this.groceryItem}</p>
        <p>${this.qty}</p>
        <p>${this.notes}</p>
        <button data.id=${this.id}>Edit</button>
        </div>
        <br><br>`;

    }


}

Grocery.all = [];