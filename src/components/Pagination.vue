<script setup lang="ts">

import { computed } from 'vue';

const emits = defineEmits(['pagechanged',]);

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  maxVisibleButtons: {
    type: Number,
    required: false,
    default: 3
  },
  totalPages: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  },
});

const paginatedData = computed(() => {
  let start = (props.currentPage - 1) * props.perPage, end = start + props.perPage;
  return props.data.slice(start, end);
});

const startPage = computed(() => {
  if (props.currentPage === 1) {
    return 1;
  }
  if (props.currentPage === props.totalPages) {
    return props.totalPages - props.maxVisibleButtons + (props.maxVisibleButtons - 1);
  }
  return props.currentPage - 1;
});

const endPage = computed(() => {
  return Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages)
});

const pages = computed(() => {
  let range = []
  for (let i = startPage.value; i <= endPage.value; i += 1) {
    range.push({
      number: i,
      isDisabled: i === props.currentPage
    });
  }
  return range;
});

const isInFirstPage = computed(() => { return props.currentPage === 1 });

const isInLastPage = computed(() => { return props.currentPage === props.totalPages });

const onClickFirstPage = () => {
  emits('pagechanged', 1);
};

const onClickPreviousPage = () => {
  emits('pagechanged', props.currentPage - 1);
};

const onClickPage = (page) => {
  emits('pagechanged', page);
};

const onClickNextPage = () => {
  emits('pagechanged', props.currentPage + 1);
};

const onClickLastPage = () => {
  emits('pagechanged', props.totalPages);
};

const isPageActive = (page) => {
  return props.currentPage === page
};

const onPageChange = (page) => {
  props.currentPage = page;
}

</script>

<template>
  <div class="products">
    <h2>Products</h2>
    <div class="head">
      <div class="row">
        <div class="col">id</div>
        <div class="col">date</div>
        <div class="col">amount</div>
        <div class="col">type</div>
      </div>
    </div>
    <hr>
    <div class="items">
      <div class="row" v-for="product in paginatedData" :key="product.id">
        <div class="col">{{ product.id }}</div>
        <div class="col">{{ product.date }}</div>
        <div class="col">${{ product.amount }}</div>
        <div class="col" v-if="product.type === 'success'"><span style="color: green">{{ product.type }}</span></div>
        <div class="col" v-if="product.type === 'error'"><span style="color: red">{{ product.type }}</span></div>
        <div class="col" v-if="product.type === 'processing'"><span style="color: silver">{{ product.type }}</span></div>
      </div>
    </div>

    <ul class="pagination" v-if="data.length > 5 || currentPage > 1">
        <li class="pagination-item" title="Первая страница">
          <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage">
            &#9668;&#9668;
          </button>
        </li>

        <li class="pagination-item" title="Предыдущая страница">
          <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage">
            &#9668;
          </button>
        </li>

        <li class="pagination-item" v-for="(page, index) in pages" :key="index">
          <button 
            type="button" 
            @click="onClickPage(page.number)" 
            :disabled="page.isDisabled" 
            :class="{ active: isPageActive(page.number) }"
            >{{ page.number }}
          </button>
        </li>

        <li class="pagination-item" title="Следующая страница">
          <button type="button" @click="onClickNextPage" :disabled="isInLastPage">
            &#9658;
          </button>
        </li>
        <li class="pagination-item" title="Последняя страница">
          <button type="button" @click="onClickLastPage" :disabled="isInLastPage">
            &#9658;&#9658;
          </button>
        </li>
      </ul>
  </div>
</template>