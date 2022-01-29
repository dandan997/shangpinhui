import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//引入路由组件
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Search from '@/pages/Search/index'
// import Register from '@/pages/Register'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// import GroupOrder from '@/pages/Center/childComponent/GroupOrder'
// import MyOrder from '@/pages/Center/childComponent/MyOrder'
import store from '@/store'

const router = new VueRouter({
    routes:[
        //meta.show控制是否显示footer
        {   
            name:'pay',
            path:'/pay',
            component:()=>import('@/pages/Pay'),
            meta:{
                show:true
            }
        },
        {   
            name:'trade',
            path:'/trade',
            component:()=>import('@/pages/Trade'),
            meta:{
                show:true
            }
        },
        {   
            name:'home',
            path:'/home',
            component:()=>import('@/pages/Home'),
            meta:{
                show:true
            }
        },
        {
            path:'/login',
            name:'login',
            component:()=>import('@/pages/Login'),
            meta:{
                show:false
            }
        },
        {
            path:'/search/:keyword?',
            name:'search',
            component:()=>import('@/pages/Search'),
            meta:{
                show:false
            },
        },
        {
            path:'/register',
            name:'register',
            component:()=>import('@/pages/Register'),
            meta:{
                show:false
            }
        },
        {
            path:'/detail/:id',
            name:'detail',
            component:()=>import('@/pages/Detail'),
            meta:{
                show:true
            }
        },
        {
            path:'/addcartsuccess/:skuNum',
            name:'addcartsuccess',
            component:()=>import('@/pages/AddCartSuccess'),
            meta:{
                show:false
            }
        },
        {
            path:'/shopCart',
            name:'shopCart',
            component:()=>import('@/pages/ShopCart'),
            meta:{
                show:true
            }
        },
        {
            path:'/paySuccess',
            name:'paySuccess',
            component:()=>import('@/pages/PaySuccess'),
            meta:{
                show:true
            }
        },
        {
            path:'/center',
            name:'center',
            component:()=>import('@/pages/Center'),
            redirect:'/center/myorder',
            meta:{
                show:true
            },
            children:[
                {
                    path:'grouporder',
                    component:()=>import('@/pages/Center/childComponent/GroupOrder'),
                },
                {
                    path:'myorder',
                    component:()=>import('@/pages/Center/childComponent/MyOrder'),
                },
                
            ]
        },

        //重定向，在项目跑起来时，访问/，立即使他转到首页
        {
            path:'*',
            redirect:'/home'
        }
    ],
    scrollBehavior(to,from){
        return {x:0,y:0}
    }
})

router.beforeEach(async (to, from, next) => {
    let token  = store.state.users.token;
   let name = store.state.users.userInfo.name;
    
    //如果有token就请求用户信息，并在header组建中展示
    // console.log(store)
    if(token){
        if(name){
            next()
        }else{
            try {
                await store.dispatch('getUserInfo')
                next()
            } catch (error) {
                await store.dispatch('userLogout');
                next();
            }
        }
        if (to.path=='/login') {
            alert('您已登录，如需切换账号请先退出！')
            next({path:'/home'})
        }else{
           next() 
            
        }
    }else{ 
        if (to.path.indexOf('/trade')!=-1||to.path.indexOf('/pay')!=-1||to.path.indexOf('/center')!=-1) {
                alert('请先登录！')
            next('/login?redirect='+to.path)}else{
                next()
            }
       
    }
    
  })


export default router