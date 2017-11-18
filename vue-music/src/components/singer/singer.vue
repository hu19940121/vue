<template>
    <div>
        <div class="singer" ref="singer">

            <ul>
                <li class="singers singers-hook" v-for="(item,index) in singerlist">
                    <h3 class="singers-tag">
                        {{item.title}}
                    </h3>
                    <ul class="singers-item-wrapper">

                        <li class="singers-item" v-for="(item,index) in item.items" @click="clickSinger(item)">
                             <router-link :to="{name:'musicList',params:{id:item.id,singerName:item.name,singerAvatar:item.avatar,tabName:'singer'}}">
                            <div class="singer-avatar">
                                <img :src="item.avatar" alt="">
                            </div>
                            <div class="singer-name">
                               {{item.name}}
                            </div>
                        </router-link>
                        </li>

                    </ul>

                </li>
            </ul>
            <div class="quick">
                <span class="quick-letter" v-for="(item,index) in singerlist" :class="{'quick-active':CurrentIndex===item.sort}" @click="selectSinger(item.sort,$event)" >
                   {{item.title}}

                </span>
            </div>
        </div>
       <router-view></router-view>
    </div>
</template>

<script>
import axios from 'axios'
import {getSinger} from '../../api/singer.js'
import Bscroll from 'better-scroll'
import musicList from '../../components/musicList/musicList.vue'
import {mapMutations} from 'vuex'
    export default{
        data(){
            return{
                singerlist:[],
                scrollY:0,
                heightList:[]

            }

        },
        created(){
            getSinger().then((res)=>{        //获取歌手数据
                      if (res.code===0) {

                        console.log((res.data.list))
                        this.singerlist=this._formatSinger(res.data.list)
                        console.log(this.singerlist)
                        this.$nextTick(()=>{
                            this.scroll=new Bscroll(this.$refs.singer,{
                                click:true,
                                probeType:3,
                            })
                            this.scroll.on('scroll',(pos)=>{

                                this.scrollY=Math.abs(Math.round(pos.y))
                                // console.log('实时Y'+this.scrollY)
                            })
                        this.caculateListHeight()
                        // console.log('高度数组'+this.caculateListHeight())

                        })
                    }else{
                        console.log('error')
                    }
            })
        },
        methods:{
            clickSinger(singer){
                this.setSinger(singer)
            },
            _formatSinger(list){ //格式化数据
                let map={
                    hot:{
                        title:'热',
                        items:[]
                    }
                }
                list.forEach((item,index)=>{
                  if(index<10){
                    map.hot.items.push({
                        id:item.Fsinger_mid,
                        name:item.Fsinger_name,
                        avatar:'http://y.gtimg.cn/music/photo_new/T001R300x300M000'+item.Fsinger_mid+'.jpg'
                    })
                  }

                  const key =item.Findex
                  if (!map[key]) {
                    map[key]={
                        title:key.substr(0,1),
                        items:[]
                    }
                  }
                  map[key].items.push({
                     id:item.Fsinger_mid,
                        name:item.Fsinger_name,
                        avatar:'http://y.gtimg.cn/music/photo_new/T001R150x150M000'+item.Fsinger_mid+'.jpg'
                  })
                  delete map[9]
                })

            //排序函数
                var newkey=Object.keys(map).sort()  //取出map对象中的所有的key值 存入newkey
                newkey.pop()
                newkey.unshift('hot')
                console.log(newkey)
                var newObj={}

                for (var i = 0; i < newkey.length; i++) {
                         newObj[newkey[i]] = map[newkey[i]];
                           newObj[newkey[i]].sort=i

                }

                 return newObj

            },
            caculateListHeight(){  //计算元素高度
                let singerList=this.$refs.singer.getElementsByClassName('singers-hook')
                let height=0;
                this.heightList.push(height)
                for (var i = 0; i < singerList.length; i++) {
                   height+= singerList[i].clientHeight
                 this.heightList.push(height)
                }
                return this.heightList
            },
            selectSinger(index,event){  //右侧快速选择
                if(!event._constructed){
                    return false
                }
                 let singerList=this.$refs.singer.getElementsByClassName('singers-hook')
                 this.scroll.scrollToElement(singerList[index],500)

            },
            ...mapMutations({
                setSinger:'SET_SINGER'
            })

        },
        computed:{
            CurrentIndex(){    //改变scrollY的值就会执行 计算当前
                for (var i = 0; i < this.heightList.length; i++) {
                     let height1=this.heightList[i]
                    let height2=this.heightList[i+1]
                    if (!height2 || (this.scrollY>=height1 && this.scrollY<height2)) {
                        return i

                    }

                }
                 return 0
            }
        },
        components:{

            musicList
        }
    }
</script>

<style lang="stylus">
    .singer
        width 100%
        height 100%
        position fixed
        top 1.7rem
        z-index -2
        .quick
            padding-top 0.3rem
            padding-bottom 0.3rem
            padding-left 0.1rem
            border-radius 0.7rem
            position fixed
            top 2.8rem
            right 0
            background-color rgba(0,0,0,0.3)
            .quick-letter
                display block
                font-size 0.2rem
                padding 0.06rem
            .quick-active
                color:#ffcd32
        .singers-item-wrapper
            margin-top 0.4rem
        .singers
            .singers-tag
                width 90%
                font-size 0.22rem
                background-color #4f4e4e
                padding 0.15rem 5% 0.15rem 5%
            .singers-item
                padding-left 0.4rem
                margin-top 0.1rem
                padding-bottom 0.1rem
                .singer-avatar
                    display inline-block
                    width 1.1rem
                    height 1.1rem
                    border-radius 50%
                    img
                        width 100%
                        height 100%
                        border-radius 50%
                .singer-name
                    display inline-block
                    height 1.1rem
                    vertical-align top
                    line-height 1.1rem
                    font-size 0.28rem





</style>
