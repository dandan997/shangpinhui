import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
//引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopCart from './shopCart'
import users from './users'
import trade from './trade'



export default new Vuex.Store({
	modules: {
		home,
		search,
		detail,
		shopCart,
		users,
		trade
	}
})