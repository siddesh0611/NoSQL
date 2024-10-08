const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        item: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true }
            }
        ]
    }
});

userSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.item.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItem = [...this.cart.item]
    if (cartProduct >= 0) {
        newQuantity = this.cart.item[cartProductIndex].quantity + 1;
        updatedCartItem.push({ productId: new ObjectId(product._id), quantity: newQuantity })
    }
    else {
        updatedCartItem.push({
            productId: product._id,
            quantity: newQuantity
        })
    }
    const updatedCart = { item: [{ productId: new ObjectId(product._id), quantity: 1 }] };
    this.cart = updatedCart;
    return this.save
}

userSchema.methods.removeFromCart = function () {
    const updatedCartItems = this.cart.items
        .filter(item => {
            return item.productId.toString() !== productId.toString();
        });
    this.cart.items = updatedCartItems;
    return this.save();
}

userSchema.methods.clearCart = function () {
    this.cart = { items: [] };
    return this.save;
}


module.exports = mongoose.model('User', userSchema);



// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;
// const ObjectId = mongodb.ObjectId;

// class User {
//   constructor(username, email, cart, id) {
//     this.username = username;
//     this.email = email;
//     this.cart = cart;
//     this._id = id;
//   }

//   save() {
//     const db = getDb();
//     return db.collection('users').insertOne(this);
//   }

//   addToCart(product) {
//     const db = getDb();
//     const cartProductIndex = this.cart.item.findIndex(cp => {
//       return cp.productId.toString() === product._id.toString();
//     });
//     let newQuantity = 1;
//     const updatedCartItem = [...this.cart.item]
//     if (cartProduct >= 0) {
//       newQuantity = this.cart.item[cartProductIndex].quantity + 1;
//       updatedCartItem.push({ productId: new ObjectId(product._id), quantity: newQuantity })
//     }
//     else {
//       updatedCartItem.push({
//         productId: new ObjectId(product._id),
//         quantity: newQuantity
//       })
//     }
//     const updatedCart = { item: [{ productId: new ObjectId(product._id), quantity: 1 }] };
//     return db.collection('user')
//       .updatedOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { cart: updatedCart } }
//       );
//   }

//   getCart() {
//     const db = getDb();
//     const productIds = this.cart.item.map(i => {
//       return i.productId;
//     })
//     return db.collection('products')
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then(product => {
//         return productIds.map(p => {
//           return {
//             ...p, quantity: this.cart.items.find(i => {
//               return i.productId.toString() === p._id.toString();
//             }).quantity
//           };
//         })
//       })

//   }

//   deleteItemFromCart(productId) {
//     const updatedCartItems = this.cart.items
//       .filter(item => {
//         return item.productId.toString() !== productId.toString();
//       });
//     return db.collection('user')
//       .updatedOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { cart: { items: updatedCartItems } } }
//       );
//   }

//   addOrder() {
//     const db = getDb();
//     return this.getCart().then(products => {
//       const order = {
//         item: products,
//         user: {
//           _id: new ObjectId(this._id),
//           name: this.name
//         }
//       };
//       return db.collection('orders')
//         .insertOne(this.cart)
//     })
//       .then(result => {
//         this.cart = { item: [] };
//         return db.collection('users')
//           .updatedOne({ _id: new ObjectId(this._id) }, { $set: { cart: { items: [] } } })
//       });
//   }

//   getOrder() {
//     const db = getDb();
//     return db.collection('orders')
//       .find({ 'user._id': new ObjectId(this._id) })
//       .toArray();
//   }
//   static findUserById(userId) {
//     const db = getDb();
//     return db.collection('users')
//       .findOne({ _id: new ObjectId(userId) })
//       .next()
//       .then(result => {
//         console.log(result);
//         return result;
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   }
// }

// module.exports = User;
