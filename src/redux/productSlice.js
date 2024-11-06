import { createSlice } from '@reduxjs/toolkit';


const loadFromLocalStorage = () => {
  const data = localStorage.getItem('products');
  return data ? JSON.parse(data) : [];
};


const saveToLocalStorage = (products) => {
  localStorage.setItem('products', JSON.stringify(products));
};

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: loadFromLocalStorage(),
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
      saveToLocalStorage(state.items); 
    },
    updateProduct: (state, action) => {
      const { id, name, price } = action.payload;
      const existingProduct = state.items.find((item) => item.id === id);
      if (existingProduct) {
        existingProduct.name = name;
        existingProduct.price = price;
        saveToLocalStorage(state.items); 
      }
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveToLocalStorage(state.items); 
    },
  },
});

export const { addProduct, updateProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
