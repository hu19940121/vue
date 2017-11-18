import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '../components/recommend/recommend.vue'
import Singer from '../components/singer/singer.vue'
import Search from '../components/search/search.vue'
import musicList from '../components/musicList/musicList.vue'
import Rank from '../components/rank/rank.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
         path:'/',
        redirect:'/recommend'
    },
    {
        path:'/recommend',
        component:Recommend
    },
    {
        path:'/singer',
        component:Singer,
        children:[
                {
                    path:'/musicList',
                    name:'musicList',
                    component:musicList
                }
        ]
    },
    {
        path:'/rank',
        component:Rank
    },
    {
        path:'/search',
        component:Search
    },
  ]
})
