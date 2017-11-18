import jsonp from '../common/js/jsonp.js'
import {commonParams,options} from './config.js'

export function getSongList(singerId){
    const url='https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
    const data=Object.assign({},commonParams,{
       platform:'yqq',
       singermid:singerId,
       needNewCode:0,
       order:'listen',
       songstatus:1,
       format:'jsonp',
       loginUid:0,
       hostUin:0,
       begin:0,
       num:100
    })
return jsonp(url,data,options)
}
