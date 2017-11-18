<template>
        <div class="recommend" ref="recommend">
            <div>
            <div class="lunbo">
                     <div>
                        <swiper :options="swiperOption"  ref="mySwiper">
                            <!-- 这部分放你要渲染的那些内容 -->
                            <swiper-slide v-for="(imgUrl,index) in lunboimgs" key="index">
                                <a :href="imgUrl.linkUrl">
                                     <img :src="imgUrl.picUrl" alt="">
                                </a>

                            </swiper-slide>
                            <!-- 这是轮播的小圆点 -->
                            <div class="swiper-pagination" slot="pagination"></div>
                        </swiper>
                    </div>
            </div>
            <p class="recommend-title">
                热门歌单推荐
            </p>
            <div class="recommend-list" v-show='discListShow' >
                <ul>

                    <li class="recommend-list-item" v-for="(item,index) in discList">
                        <div class="recommend-img">
                            <img  v-lazy="item.imgurl" alt="">
                        </div>
                        <div class="recommend-info">
                            <p class="recommend-info-title">
                               {{item.creator.name}}
                            </p>
                            <p class="recommend-info-desc">
                                {{item.dissname}}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="loading" v-show="!discListShow" >
                    <div class="loadEffect">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
            </div>
            </div>
        </div>
</template>

<script>

import axios from 'axios'
import  {getRecommend,getDiscList} from '../../api/recommend.js'
import {ERR_OK} from '../../api/config.js'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'   //引入懒加载插件
import Vue from 'vue'
import Bscroll from 'better-scroll' //引入better-scroll插件
Vue.use(VueLazyload,
{
    loading:require('../../common/image/default.png'),  //应用懒加载插件
})
require('swiper/dist/css/swiper.css')
    export default{
           components: {
            swiper,
            swiperSlide
        },
         data() {
            return {
                discListShow:false,
                lunboimgs:[],
                discList:[],

                //轮播图初始化
                swiperOption: {
                 autoplay: 3000,
                pagination: '.swiper-pagination',
                slidesPerView: 'auto',
                centeredSlides: true,
                paginationClickable: true,
                spaceBetween: 30,
                    onSlideChangeEnd: swiper => {
                        //这个位置放swiper的回调方法
                        this.page = swiper.realIndex+1;
                        this.index = swiper.realIndex;
                    },
                }  ,
                swiperSlides: [1, 2, 3, 4, 5]
            }
        },
        created(){
                 this._getRecommend(),  //调用获取轮播图方法
                 this._getDiscList()  //调用获取推荐歌单列表方法
        },
        methods:{
            _getRecommend(){  //定义一个获取轮播图方法
                getRecommend().then((res)=>{
                    if (res.code===ERR_OK) {
                        console.log(res.data.slider)
                        this.lunboimgs=res.data.slider
                    }
                })
            },
            _getDiscList(){   //定义获取歌单列表方法

                getDiscList().then((res)=>{
                     if (res.code===ERR_OK) {
                        console.log(res.data.list)
                       this.discList=res.data.list //取出数据付给data中的discList
                      this.discListShow=true
                      this.$nextTick(() => {   //获取到数据后初始化scroll插件
                        this.scroll = new Bscroll(this.$refs.recommend, {
                            click:true
                        })
                    })
                    } else{
                        console.log('dfdf')
                    }
                })

            }
        },
          computed: {

            swiper() {
              return this.$refs.mySwiper.swiper;
            }
        },
        mounted () {
            //这边就可以使用swiper这个对象去使用swiper官网中的那些方法

        }

    }
</script>

<style lang="stylus">

    .recommend
        position fixed
        top 1.7rem
        height 100%
        z-index -1
    .lunbo
        width 100%
        height 2.73rem
       .recommend-title
           margin-top 0.3rem
           height 0.96rem
           width 100%
           font-size 0.28rem
           line-height 0.96rem
           text-align center
        .recommend-list
            width 90%
            padding 0 5% 0 5%
            font-size 0

            .recommend-list-item
                height 1.3rem
                width 100%
                margin-bottom 0.3rem
                .recommend-img
                    width 20%
                    height 100%
                    display inline-block
                    background-color white
                    img
                        width 100%
                        height 100%
                .recommend-info
                    width 76%
                    height 100%
                    display inline-block
                    vertical-align top
                    font-size 0.28rem
                    padding-left 4%
                    .recommend-info-title
                        padding 0.14rem 0 0.2rem 0
                    .recommend-info-desc
                        color #7f8184
                        line-height 0.36rem

    .swiper-container
             width 100%
             height 100%

    .swiper-container img
        width 100%
        height 100%

//loading..
.loadEffect{
            width: 100px;
            height: 100px;
            position: relative;
            margin: 0 auto;

        }
        .loadEffect span{
            display: inline-block;
            width: 30px;
            height: 10px;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            background: gray;
            position: absolute;
            -webkit-animation: load 1.04s ease infinite;
        }
        @-webkit-keyframes load{
            0%{
                opacity: 1;
            }
            100%{
                opacity: 0.2;
            }
        }
        .loadEffect span:nth-child(1){
            left: 0;
            top: 50%;
            margin-top:-5px;
            -webkit-animation-delay:0.13s;
        }
        .loadEffect span:nth-child(2){
            left: 10px;
            top: 20px;
            -webkit-transform: rotate(45deg);
            -webkit-animation-delay:0.26s;
        }
        .loadEffect span:nth-child(3){
            left: 50%;
            top: 10px;
            margin-left: -15px;
            -webkit-transform: rotate(90deg);
            -webkit-animation-delay:0.39s;
        }
        .loadEffect span:nth-child(4){
            top: 20px;
            right:10px;
            -webkit-transform: rotate(135deg);
            -webkit-animation-delay:0.52s;
        }
        .loadEffect span:nth-child(5){
            right: 0;
            top: 50%;
            margin-top:-5px;
            -webkit-transform: rotate(180deg);
            -webkit-animation-delay:0.65s;
        }
        .loadEffect span:nth-child(6){
            right: 10px;
            bottom:20px;
            -webkit-transform: rotate(225deg);
            -webkit-animation-delay:0.78s;
        }
        .loadEffect span:nth-child(7){
            bottom: 10px;
            left: 50%;
            margin-left: -15px;
            -webkit-transform: rotate(270deg);
            -webkit-animation-delay:0.91s;
        }
        .loadEffect span:nth-child(8){
            bottom: 20px;
            left: 10px;
            -webkit-transform: rotate(315deg);
            -webkit-animation-delay:1.04s;
        }
</style>
