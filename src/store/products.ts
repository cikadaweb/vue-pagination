import { defineStore } from 'pinia';

import axios from 'axios';

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: []
  }),
  actions: {
    async fetchData() {
      const respone = await axios.get('https://vue-pagination-b8d64-default-rtdb.firebaseio.com/products.json');
      const data = await respone.data;
      this.products = data.products;
    }
  },
})
