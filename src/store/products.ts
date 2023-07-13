import { defineStore } from 'pinia';

import axios from 'axios';

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: []
  }),
  actions: {
    async fetchData() {
      const respone = await axios.get('src/assets/db.json');
      const data = await respone.data;
      this.products = data.products;
    }
  },
})
