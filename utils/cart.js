module.exports = class Carts {
    constructor(oldCart) {
        this.items = oldCart.items || {};
        this.totalQty = oldCart.totalQty || 0;
        this.totalPrice = oldCart.totalPrice || 0;
    }

    add(item, id) {
        if(!this.items[id]) {
            this.items[id] = this.createCart(item);
        }
        this.items[id].qty++;
        this.items[id].total = this.items[id].item.price * this.items[id].qty;
        this.updateTotal(this.items[id].item);
    };

    createCart(item) {
        return {
            item: item,
            qty: 0,
            total: 0
        }
    }

    updateTotal(item) {
        this.totalQty++;
        this.totalPrice += item.price;
    }

    generateArray() {
        return this.items.map(item => item);
    }
};
