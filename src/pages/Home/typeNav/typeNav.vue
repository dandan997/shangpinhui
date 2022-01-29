<template>
    <div class="type-nav come">
        
            <div class="container">
                <div @mouseenter="enterShow" @mouseleave="leaveTitle">
                <h2 class="all">全部商品分类</h2>
                <transition>
                
                <div v-show="show" class="sort">
                    <div  @click="goSearch" class="all-sort-list2">
                        <div class="item bo" @mouseenter="enterTitle(index)" v-for="item,index in categoryList" :key='item.categoryId'>
                            <h3 :class="{cur:currentIndex == index}">
                                <a href=javascript:; :data-categoryName='item.categoryName' :data-category1Id='item.categoryId'>{{item.categoryName}}</a>
                            </h3>
                            <div :style="{ display: currentIndex == index?'block':'none'}" class="item-list clearfix">
                                <div  class="subitem">
                                    <dl  class="fore" v-for="catechild in item.categoryChild" :key="catechild.categoryId">
                                        <dt>
                                            <a :data-categoryName='catechild.categoryName' :data-category2Id='catechild.categoryId' >{{catechild.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="children in catechild.categoryChild" :key="children.categoryId">
                                                <a :data-categoryName='children.categoryName' :data-category3Id='children.categoryId' >{{children.categoryName}}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </transition>
                </div>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
            </div>
            
        </div>
</template>

<script>

import throttle from 'lodash/throttle'
import {mapState} from 'vuex'
export default {
    name:'TypeNav',
    mounted() {
        if(this.$route.path!='/home'){
            this.show = false
        }
    },
    computed:{
        ...mapState({
            categoryList:(state)=>{
                // console.log(state)
                return state.home.categoryList
            }
        })
    },
    data(){
        return{
            currentIndex:-1,
            show:true
        }
    },
    methods:{
        
        enterTitle:throttle(function(index){
            this.currentIndex = index
        },50),
        leaveTitle(){
            this.currentIndex = -1
            if(this.$route.path !='/home'){
                this.show = false
            }
        },
        goSearch(event){
            let{categoryname,category1id,category2id,category3id} = event.target.dataset
            if(categoryname){
                let location = {name:'search',query:{categoryName:categoryname}}
                if(category1id){
                    location.query.category1Id = category1id
                }else if(category2id){
                    location.query.category2Id = category2id
                }else{
                    location.query.category3Id = category3id
                }
                if(this.$route.params){
                    location.params = this.$route.params
                }else{
                    location.params = {keyword:undefined}
                }
                this.$router.push(location)
            }
        },
        enterShow(){
            this.show = true
        }
    }
}
</script>

<style scoped lang='less'>
.type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .cur{background-color: rgb(238, 134, 49);}

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        // &:hover {
                        //     .item-list {
                        //         display: block;
                        //     }
                        // }
                    }
                }
            }
        }
    }
    .v-enter-active{
        animation: donghua 0.5s;
    }
    .v-leave-active{
        animation: donghua 0.5s reverse;
    }

    @keyframes donghua {
        to{
            opacity: 1;
        }
        from{
            opacity: 0;
        }
    }
</style>