import Mock from 'mockjs'

//引入json数据
import banners from './banners.json'
import floors from './floors.json'

//第一个参数是请求的地址，第二个参数是请求相应的数据
Mock.mock('/mock/banner',{code:200,data:banners})
Mock.mock('/mock/floor',{code:200,data:floors})