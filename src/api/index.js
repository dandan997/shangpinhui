import requests from "./request";
import mockRequests from './mockAjax'

export const reqCategoryList = ()=>{
    return requests({url:'/api/product/getBaseCategoryList',
    method:'get'})
}

export const reqbanner = ()=>{
    return mockRequests.get('/banner')
}

export const reqFloor = ()=>{
    return mockRequests.get('/floor')
}

export const reqGetSearchInfo =(params)=>{
    return requests({url:"/api/list",method:"post",data:params})};

export const reqDetailInfo = (skuId)=>{
    return requests({
        url:`/api/item/${ skuId }`,
        method: 'get'
    })
}

export const reqAddtoCart = (skuId,skuNum)=>{
    return requests({
        url:`/api/cart/addToCart/${skuId}/${skuNum}`,
        method:'post'
    })
}

export const reqCartList = ()=>{
    return requests({
        url:'/api/cart/cartList',
        method:'get'
    })
}
export const deleteFromCart = (id)=>{
    return requests({
        url:`/api/cart/deleteCart/${id}`,
        method:'DELETE'
    })
}

export const changeCartIschecked = (id,ischecked)=>{
    return requests({
        url:`/api/cart/checkCart/${id}/${ischecked}`,
        method:'get'
    })
}

export const getVcode = (phone)=>{
    return requests({
        url:`/api/user/passport/sendCode/${phone}`,
        method:'get'
    })
}

export const userRegiste = (data) => {
    return requests({
        url:'/api/user/passport/register',
        method:'post',
        data
    })
}

//登录
export const userLogin = (data)=>{
    return requests({
        url:'/api/user/passport/login',
        method:'post',
        data
    })
}

//首页请求用户名
export const reqUserData = ()=>{
    return requests({
        url:'/api/user/passport/auth/getUserInfo',
        method:'get'
    })
}

//用户退出登录
export const reqUserLogout = ()=>{
    return requests({
        url:'/api/user/passport/logout',
        method:'get'
    })
}

//获取订单信息
export const reqTradeInfo = ()=>{
    return requests({
        url:'/api/order/auth/trade',
        method:'get'
    })
}

//获取用户地址
export const reqAddressInfo = ()=>{
    return requests({
        url:'/api/user/userAddress/auth/findUserAddressList',
        method:'get'
    })
}

//提交订单
export const reqSubmitOrder = (tradeNo,data)=>{
    return requests({
        url:`/api/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'post',
        data
    })
}

//获取订单支付信息
export const reqPayInfo = (orderId)=>{
    return requests({
      url:`/api/payment/weixin/createNative/${orderId}`,
        method:'get'
    })
}

//查询订单支付是否成功
export const reqPayStatus = (orderId)=>{
    return requests({
      url:`/api/payment/weixin/queryPayStatus/${orderId}`,
        method:'get'
    })
}

//获取订单信息
export const reqMyOrder = (page,limit)=>{
    return requests({
      url:`/api/order/auth/${page}/${limit}`,
        method:'get'
    })
}
