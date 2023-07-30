import 'normalize.css/normalize.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import useStore from '@/store'

import App from './App.vue'
import { SortOrder } from '@/store/types'

const app = createApp(App)

app.use(createPinia())

const store = useStore();

store.updateSortOrder(SortOrder.TITLE_ASC);

app.mount('#app')
