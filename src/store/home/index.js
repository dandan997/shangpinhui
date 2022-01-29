import {reqCategoryList,reqbanner,reqFloor} from '@/api/index'


const actions = {
    //通过api调用接口函数，调用服务器的数据
    // categoryList({commit}){
    //     reqCategoryList().then((res)=>{console.log(res)})
       
    // },
    async categoryList({commit}){
        let result = await reqCategoryList()
        if (result.code = 200){
            commit('CATEGORYLIST',result.data)
        }
    },
    async bannerList({commit}){
        let result = await reqbanner()
        if (result.code = 200){
            commit('BANNERLIST',result.data)
        }
    },
    async floorList({commit}){
        let result = await reqFloor()
        if (result.code = 200){
            commit('FLOORLIST',result.data)
        }
    }
}
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
        // console.log(state.categoryList)
    },
    BANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    FLOORLIST(state,floorList){
        state.floorList = floorList
    }
}

const state = {
    categoryList : [],
    bannerList:[],
    floorList:[]
}

const getters = {}

export default {
	state,
	mutations,
	actions,
	getters
}