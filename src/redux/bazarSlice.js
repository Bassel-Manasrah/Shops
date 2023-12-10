import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: [],
  total: 0,
  isMember: false,
  email: "",
  isAdmin: false,
  isLogin: false,
  selectStore: {},
  userInfo: null,
  orderId: 0,
};

export const bazarSlice = createSlice({
  name: "bazar",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.productData.find(
        (item) => item.idProduct === action.payload.idProduct
      );
      if (item) {
        item.QuantityOfProduct += action.payload.QuantityOfProduct;
      } else {
        state.productData.push(action.payload);
      }
    },
    increamentQuantity: (state, action) => {
      const item = state.productData.find(
        (item) => item.idProduct === action.payload.idProduct
      );
      if(item.isGrams){
        if (item && item.QuantityOfProduct < item.availableQuantity) {
          item.QuantityOfProduct += 100;
          //console.log(typeof(action.payload.PriceProduct))
          state.total += parseInt(action.payload.PriceProduct)
        }
      }
      else{
        if (item && item.QuantityOfProduct < item.availableQuantity*100) {
          item.QuantityOfProduct += 100;
          //console.log(typeof(action.payload.PriceProduct))
          state.total += parseInt(action.payload.PriceProduct)
        }
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.productData.find(
        (item) => item.idProduct === action.payload.idProduct
      );
      if (item && item.QuantityOfProduct) {
        if (item.QuantityOfProduct === 100) {
          item.QuantityOfProduct = 100;
        } else {
          item.QuantityOfProduct -= 100;
          //console.log(typeof(action.payload.PriceProduct))
          state.total -= parseInt(action.payload.price)
        }
      }
    },
    deleteItem: (state, action) => {
      const itemId = action.payload;
      const deletedItem = state.productData.find(
        (item) => item.idProduct === itemId
      );
      if (deletedItem) {
        state.total -=
          deletedItem.PriceProduct * (deletedItem.QuantityOfProduct / 100);
      }
      state.productData = state.productData.filter(
        (item) => item.idProduct !== itemId
      );
    },
    resetCart: (state) => {
      state.productData = [];
      state.total = 0;
    },
    setMember: (state, action) => {
      state.isMember = action.payload;
    },
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setSelectStore: (state, action) => {
      state.selectStore = action.payload;
    },
    setEmailf: (state, action) => {
      state.email = action.payload;
    },
    setPrice: (state, action) => {
      state.total = action.payload;
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
    decrementTotal: (state, action) => {

      if(state.total - parseInt(action.payload) > 0 ){
        state.total -= parseInt(action.payload);
      }
    },
    incrementTotal: (state, action) => {
      state.total += parseInt(action.payload);
    },
  },
});

export const {
  addToCart,
  deleteItem,
  resetCart,
  increamentQuantity,
  decrementQuantity,
  setMember,
  setEmailf,
  setLogin,
  setSelectStore,
  setPrice,
  decrementTotal,
  setAdmin,
  setOrderId,
  incrementTotal,
} = bazarSlice.actions;

export default bazarSlice.reducer;
