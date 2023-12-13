import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: [],
  total: 0,
  isMember: false,
  email: "",
  isAdmin: false,
  isLogin: false,
  selectStore: {},
  userInfo: {
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
  },
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
      const { idProduct, discount ,isMember} = action.payload;
      const item = state.productData.find((item) => item.idProduct === idProduct);

        if (item.isGrams) {
          if (item && item.QuantityOfProduct < item.availableQuantity) {
            item.QuantityOfProduct += 100;
            if(isMember){
              state.total += parseInt(item.PriceProduct) * (1 - discount / 100);
            }
            else{
              state.total += parseInt(item.PriceProduct)
            }
          }
        } else {
          if (item && item.QuantityOfProduct < item.availableQuantity * 100) {
            item.QuantityOfProduct += 100;
            if(isMember){
              state.total += parseInt(item.PriceProduct) * (1 - discount / 100);
            }
            else{
              state.total += parseInt(item.PriceProduct)
            }
          }
        }
    },

    decrementQuantity: (state, action) => {
      const { idProduct, discount ,isMember} = action.payload;
      const item = state.productData.find((item) => item.idProduct === idProduct);
      console.log(isMember);
      if (item && item.QuantityOfProduct) {
        if (item.QuantityOfProduct === 100) {
          item.QuantityOfProduct = 100;
        } else {
          item.QuantityOfProduct -= 100;
          if(isMember){
            state.total -= parseInt(item.PriceProduct) * (1 - discount / 100);
          }
          else{
            state.total -= parseInt(item.PriceProduct)
          }
        }
      }
    },
    deleteItem: (state, action) => {
      const { idProduct, discount } = action.payload;
      const deletedItem = state.productData.find(
        (item) => item.idProduct === idProduct
      );
      if (deletedItem) {
        if(state.isMember){
          state.total -= deletedItem.PriceProduct * (deletedItem.QuantityOfProduct / 100) * (1 - discount / 100);
        }
        else{
          state.total -= deletedItem.PriceProduct * (deletedItem.QuantityOfProduct / 100);
        }
      }
      state.productData = state.productData.filter(
        (item) => item.idProduct !== idProduct
      );
    },
    resetCart: (state) => {
      state.productData = [];
      state.total = 0.0;
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
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

// In your actions file (e.g., bazarSlice.js)
export const deleteItem = (idProduct, discount) => ({
  type: 'bazar/deleteItem',
  payload: { idProduct, discount },
});

export const setUserInfo = (userInfo) => ({
  type: 'bazar/setUserInfo',
  payload: userInfo,
});

export const {
  addToCart,
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
