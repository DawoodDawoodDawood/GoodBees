import {
  ADD_TO_CART_BUYER,
  DELETE_TO_CART_BUYER,
  SHOW_CART_OF_BUYER,
  INCRIMENT_PRODUCT_CART,
  DECRIMEMT_PRODUCT_CART,
  DELETE_COMPLETE_BUYER_CART,
  ODERLINE_PREPARE,
  PLACE_ORDER,
} from "../../actions/types";

const state = {
  buyerAddedCart: [],
  orderLineCart: [],
};

function CartReducer(mState = { ...state }, action) {
  switch (action.type) {
    case PLACE_ORDER:
      const orderDone = mState.buyerAddedCart.filter(
        (product) => product._id !== action.payload
      );

      mState.buyerAddedCart = [];
      if (orderDone.length > 0) {
        orderDone.map((item) => mState.buyerAddedCart.push(item));
      } else {
        mState.buyerAddedCart = [];
      }

      console.log(mState.buyerAddedCart);
      return clone(mState);
    case ODERLINE_PREPARE:
      mState.orderLineCart = [];
      mState.buyerAddedCart.forEach((item, index) => {
        if (item._id === action.payload) {
          item.foodItems.forEach((foodItem) => {
            mState.orderLineCart.push({
              foodType: foodItem.foodType,
              foodID: foodItem.meal ? foodItem.meal._id : foodItem.menu._id,
              buyerID: item.buyer._id,
              unitPrice: foodItem.meal
                ? foodItem.meal.price
                : foodItem.menu.price,
              quantity: foodItem.quantity,
            });
          });
        }
      });

      return clone(mState);
    case SHOW_CART_OF_BUYER:
      mState.buyerAddedCart = [];
      action.payload.forEach((element, index) => {
        mState.buyerAddedCart.push(element);
      });
      mState.buyerAddedCart.forEach((item, index) => {
        mState.buyerAddedCart[index].totalBill = calculateBill(
          mState.buyerAddedCart[index]
        );
      });
      // console.log(mState.buyerAddedCart);
      // console.log('show added cart response in reducer after assignning');
      return clone(mState);
    case DELETE_COMPLETE_BUYER_CART:
      const data = mState.buyerAddedCart.filter(
        (product) => product._id !== action.payload.buyerCartID
      );
      console.log(data);

      mState.buyerAddedCart = [];
      if (data.length > 0) {
        data.map((item) => mState.buyerAddedCart.push(item));
      } else {
        mState.buyerAddedCart = [];
      }

      console.log(mState.buyerAddedCart);

      return clone(mState);
    // case DELETE_TO_CART_BUYER:
    //   console.log(action.payload);
    //   let id = '';
    //   mState.cartList.forEach(maping => {
    //     if (maping._id === action.payload.DeletedCart._id) {
    //       maping.products = maping.products.filter(
    //         product => product._id !== action.payload.DeletedCart.products._id,
    //       );
    //     }
    //     if (maping.products.length < 1) {
    //       // index = mState.allProductsWishList.findIndex(ls=>ls.products.length<1);
    //       id = maping._id;
    //       console.log(id);
    //     }
    //   });
    //   if (id !== '') {
    //     console.log('In Condition');
    //     console.log(id);
    //     mState.cartList = mState.cartList.filter(ids => ids._id !== id);
    //     console.log(mState.cartList);
    //   } else {
    //     console.log(id);
    //   }
    //   let newmStatecartList = mState.cartList;
    //   mState.cartList = [];
    //   newmStatecartList.forEach(element => {
    //     element.totalBill = calculateBill(element);
    //     mState.cartList.push(element);
    //   });
    //   if (mState.cartList.length < 1) {
    //     mState.cartErrorMessage = true;
    //   }
    //   return clone(mState);

    case INCRIMENT_PRODUCT_CART:
      const { cartId, productId } = action.payload;
      const cIndex = mState.buyerAddedCart.findIndex((c) => c._id === cartId);

      if (cIndex >= 0) {
        const pIndex = mState.buyerAddedCart[cIndex].foodItems.findIndex(
          (p) => p._id === productId
        );

        if (pIndex >= 0) {
          mState.buyerAddedCart[cIndex].foodItems[pIndex].quantity++;
          console.log(mState.buyerAddedCart[cIndex].totalBill);
          mState.buyerAddedCart[cIndex].totalBill = calculateBill(
            mState.buyerAddedCart[cIndex]
          );
          console.log(mState.buyerAddedCart[cIndex].totalBill);
        }
      }
      return clone(mState);
    case DECRIMEMT_PRODUCT_CART:
      // console.log( action.payload );
      const { cartIdd, productIdd } = action.payload;
      const cIndexx = mState.buyerAddedCart.findIndex((c) => c._id === cartIdd);
      if (cIndexx >= 0) {
        const pIndexx = mState.buyerAddedCart[cIndexx].foodItems.findIndex(
          (p) => p._id === productIdd
        );
        if (pIndexx >= 0) {
          mState.buyerAddedCart[cIndexx].foodItems[pIndexx].quantity--;
          console.log(mState.buyerAddedCart[cIndexx].totalBill);
          mState.buyerAddedCart[cIndexx].totalBill = calculateBill(
            mState.buyerAddedCart[cIndexx]
          );
        }
      }
      return clone(mState);
    default:
      return clone(mState);
  }
}
const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const calculateBill = (cart) => {
  // console.log(cart);
  let bill = 0;
  cart.foodItems.forEach((p) => {
    console.log("p.quantity", p.quantity);
    console.log("p.price", p.price);
    let amount = p.quantity * p.price;
    console.log("amount", amount);
    bill += amount;
  });

  return bill;
};

export default CartReducer;
