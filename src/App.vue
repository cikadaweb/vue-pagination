<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';

import { ref } from 'vue';

import { useProductsStore } from '@/store/products';

const productsStore = useProductsStore();

productsStore.fetchData();

const currentPage = ref(1);

const onPageChange = (page) => {
  currentPage.value = page;
}

</script>

<template>
  <div id="app">
    <Pagination 
      :data="productsStore.products"
      :total-pages="Math.ceil(productsStore.products.length / 4)"
      :total="productsStore.products.length"
      :per-page="4"
      :current-page="currentPage"
      @pagechanged="onPageChange"
    />
  </div>
</template>

<style lang="scss">
body {
  font-family: "Roboto";
  font-size: 16px;
  color: #505050;
}

#app {
  background-color: #fafafa;
  width: 100%;
  height: 21rem;
  margin: 0 auto;
  margin-top: 3rem;
  border-radius: 1rem;
  padding: 1rem;

  hr {
    border: 1px solid silver;
    width: 100%;
  }

  h2 {
    font-size: 1.5rem;
    text-align: center;
    margin-top: 0;
  }

  .products {
    display: flex;
    height: calc(100% - 1.25rem);
    flex-direction: column;

    .row {
      display: flex;
      align-items: center;
      padding: 0;
      margin: 0.75rem 0;

      .col {
        justify-content: center;
        flex-basis: 25%;
        display: inline-flex;
      }
    }

    .pagination {
      display: flex;
      justify-content: center;
      padding: 0;
      margin: auto 0 0 0;
      list-style-type: none;

      .pagination-item {
        button {
          margin: 0 !important;
          padding: 0.25rem 0.5rem;
          font-size: 1.1rem;
          border: none;
          border-radius: 0.25rem;
          background: none;

          &:hover {
            cursor: pointer;
            background-color: silver;
          }

          &[disabled="disabled"] {
            color: silver;
            cursor: default;

            &:hover {
              cursor: default;
              background-color: transparent;
            }
          }

          &.active {
            color: red;
          }
        }
      }
    }
  }
}
</style>
