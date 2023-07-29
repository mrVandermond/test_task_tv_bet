import { defineStore } from 'pinia';
import { ref } from 'vue';
import initialBrands from '@/data/brands.json';
import initialCatalog from '@/data/catalog.json';
import initialStock from '@/data/stock.json';

export default defineStore('store', () => {
  const brands = ref(initialBrands);
  const catalog = ref(initialCatalog);
  const stock = ref(initialStock);

  return { brands, catalog, stock };
});
