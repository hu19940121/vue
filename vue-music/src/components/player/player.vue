<template>
        <div class="player" v-if="playlist.length>0">
        <!-- <audio :src="'http://ws.stream.qqmusic.qq.com/'+currentSong.musicData.songid+'.m4a?fromtag=46'" autoplay="autoplay"></audio> -->
        <transition name="normal">
          <div class="normal-player" v-show='fullScreen'>
             <div class="background" width="100%" height="100%">
                <img :src="'http://y.gtimg.cn/music/photo_new/T001R300x300M000'+currentSong.musicData.singer[0].mid+'.jpg?max_age=2592000'" alt="">
             </div>
              <div class="top">
                <span class="back" @click='back'>
                       <i class="icon-back"></i>
                </span>
                  <p class="song-title">
                     {{currentSong.musicData.songname}}
                  </p>
                  <p class="singer-name">
                       {{currentSong.musicData.singer[0].name}}
                  </p>
              </div>
              <div class="mid">
                  <img :src="'http://y.gtimg.cn/music/photo_new/T002R300x300M000'+currentSong.musicData.albummid+'.jpg?max_age=2592000'" alt="">
              </div>
              <div class="music-lrc">
                  紧紧埋藏在洗涤
              </div>
              <div class="bottom">
                  <div class="control">
                    <span class="icon mode">
                         <i class="icon-sequence"></i>
                    </span>
                    <span class="icon prev">
                        <i class="icon-prev"></i>
                    </span>
                    <span class="icon zanting">
                        <i class="icon-play"></i>
                    </span>
                    <span class="icon next">
                        <i class="icon-next"></i>
                    </span>
                    <span class="icon collect">
                        <i class="icon-favorite"></i>
                    </span>
                  </div>

              </div>
          </div>
         </transition>
          <div class="mini-player" v-show='!fullScreen'>
              <div class="mini-player-img" @click="showFullScreen">
                <div class="img-wrapper">
                        <img :src="'http://y.gtimg.cn/music/photo_new/T002R300x300M000'+currentSong.musicData.albummid+'.jpg?max_age=2592000'" alt="">
                </div>
              
              </div>
              <div class="mini-player-info">
                  <p class="song-name"> {{currentSong.musicData.songname}}</p>
                  <p class="song-singer"> {{currentSong.musicData.singer[0].name}}</p>
              </div>
              <div class="mini-player-contral">
                    <span class="icon">
                        <i class="icon-play"></i>
                    </span>
                    <span class="icon">
                         <i class="icon-playlist"></i>
                    </span>
              </div>
          </div>
        </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
    export default{
        computed:{

            ...mapGetters([
                'fullScreen',
                'playlist',
                'currentSong'
                ])
        },
        methods:{
            back(){
                this.setFullScreen(false)
            },
            showFullScreen(){
                this.setFullScreen(true)
            },
            ...mapMutations({
                setFullScreen:'SET_FULL_SCREEN'
            })
        }
    }
</script>

<style lang="stylus">

    .player
        .normal-player
            position fixed
            height 100%
            width 100%
            background-color #222
            left 0
            top 0
        .background
            width 100%
            height 100%
            position absolute
            top 0px
            z-index -2
            opacity 0.6
            filter blur(20px)
            img
                width 100%
                height 100%
        .normal-enter-active,.normal-leave-active
            transition all 0.4s
        
        .normal-enter,.normal-leave-to
            opacity 0
            
        .top 
            .back
                position absolute
                top 0.2rem
                left 0.4rem
                color:#ffcd32
                font-size 0.4rem
                transform rotate(270deg)
            .song-title
                width 100%
                padding 0.2rem 0 0.2rem 0
                text-align center
                font-size 0.32rem
            .singer-name
                width 100%
                text-align center
                font-size 0.24rem
        .mid
            width 5.4rem
            height 5.4rem
            border-radius 50%
            margin 0 auto
            margin-top 0.4rem
           
            img
                width 100%
                height 100%
                border-radius 50%
                animation: xuanzhuan 5s linear infinite
        .music-lrc
            margin-top 0.32rem
            width 100%
            text-align center
            font-size 0.30rem
    .bottom
        .control
            width 90%
            padding 0 5% 0 5%
            position absolute
            bottom 1rem
            margin 0 auto
            .icon
                font-size 0.7rem
                margin-left 0.44rem
                color:#ffcd32
            .icon:first-child
                margin-left 0
            .zanting
                font-size 0.9rem
    .mini-player
            position fixed
            left 0
            bottom 0
            height 1.1rem
            width 100%
            background-color #333
            display flex
            .mini-player-img
                flex:1
                width 100%
                height 100%
                margin-left 0.2rem
               
                .img-wrapper
                    width 0.9rem
                    height 0.9rem
                    margin-top 0.1em
                   
                    border-radius 50%
                   
                img
                    width 100%
                    height 100%
                    border-radius 50%
                    animation:xuanzhuan 3s linear infinite
            .mini-player-info
                flex:5
                margin-left 0.3rem
                .song-name
                    font-size 0.26rem
                    margin-top 0.3rem
                .song-singer
                    font-size 0.22rem
                    margin-top 0.1rem
                    color:#7f8184;
            .mini-player-contral
                flex:2
                .icon
                    font-size 0.6rem
                    color:#e4f527
            
    @keyframes xuanzhuan
    {
        from{
            transform :rotate(0deg)
        }
        to{
              transform :rotate(360deg)
        }
    }
</style>