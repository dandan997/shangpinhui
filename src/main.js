import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import store from'@/store/index.js'
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/loading.gif'

Vue.config.productionTip = false

//引入全局组件
import TypeNav from '@/pages/Home/typeNav/typeNav.vue'
import Carousel from '@/components/carousel.vue'
import Pagination from '@/components/pagination.vue'

import '@/plugins/vee-validate'

//引入mock的数据
import '@/mock/mockServe'
import 'swiper/css/swiper.css'

import * as $API from '@/api'

//引入element组件
import { MessageBox,Message,Button } from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;

Vue.use(Button)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: loading,
  // attempt: 1
})

//注册全局组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

Vue.prototype.$bus = new Vue()
Vue.prototype.$API = $API

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
