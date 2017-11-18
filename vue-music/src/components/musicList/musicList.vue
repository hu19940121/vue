<template>
        <transition name="slide">

        <div class="musicList">
           <div class="music-top" :style="{background:'url('+singerAvatar+')',backgroundSize:'cover'}">
                <span class="goback"  @click="back">
                     <i class="icon-back"></i>
                </span>

               <p class="music-title">
                   {{singerName}}
               </p>
               <span class="suiji">
                   <i class="icon-play"></i> 随机播放全部
               </span>
           </div>
           <div class="music-bottom">
               <ul class="song-list">
                   <li class="song-item" v-for="(item,index) in detail" @click='selectItem(item,index)'>
                       <p class="song-item-name">{{item.musicData.songname}}</p>
                       <p class="song-item-singer">{{item.musicData.singer[0].name}}-{{item.musicData.albumname}}</p>
                   </li>
               </ul>
           </div>
        </div>
        </transition>
</template>

<script>
import {getSongList} from '../../api/singerSongList.js'
import Bscroll from 'better-scroll'
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
import fetchJsonp from'fetch-jsonp'
    export default{

        data(){
            return {
             detail:[],
             musicData:[],
             singerName:'',
             singerAvatar:'',
            }

        },
        created(){
            var singerId=this.$route.params.id  //获取路由传过来的id
            var tabName=this.$route.params.tabName
            this.singerName=this.$route.params.singerName
            this.singerAvatar=this.$route.params.singerAvatar
          if(tabName=='singer'){
            getSongList(singerId).then((res)=>{
              if (res.code===0) {

                this.detail=res.data.list
                console.log(res.data.list)
                console.log(tabName)

              }else{
                console.log('err')
              }
            })
            

          }

           console.log(this.singer)
        },
        methods:{
            back(){
                this.$router.go(-1)
            },
            selectItem(item,index){
                this.selectPlay({
                    list:this.detail,
                    index
                })
            },
            ...mapActions([
                'selectPlay'
                ])
        },
        computed:{
            ...mapGetters([
                'singer'
                ])
        },

    }
</script>

<style lang="stylus">
    ::-webkit-scrollbar
                display none
    .slide-enter-active,.slide-leave-active
        transition all 0.3s
    .slide-enter,.slide-leave-to
        transform translate3d(100%,0, 0)
    .musicList
        width 100%
        min-height 100%
        position fixed
        top 0
        background-color #222
        .music-top
            height 4.8rem
            width 100%
            position relative
            .goback
                display  block
                position absolute
                top 0.15rem
                left 0.2rem
                color #ffcd32
                font-size 0.4rem
            .music-title
                width 100%
                padding 0.3rem 0 0.3rem 0
                text-align center
                font-size 0.28rem
            .suiji
                display inline-block
                padding 0.2rem 0.3rem 0.2rem 0.3rem
                border 1px  solid yellow
                position absolute
                bottom 0.3rem
                left 2.6rem
                font-size 0.26rem
                border-radius 0.24rem
                color:#ffcd32
        .music-bottom

            height 100%
            width 90%
            padding 0.3rem 5% 0.3rem 5%
            font-size 0.26rem
        .song-list
            height 100%
            position absolute
            overflow-y auto

            .song-item
                margin-top 0.3rem
                .song-item-name
                    color white
                .song-item-singer
                    color #7f8184
                    margin-top 0.2rem


</style>
