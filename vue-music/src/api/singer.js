import jsonp from '../common/js/jsonp.js'
import {commonParams,options} from './config.js'

export function getSinger(){
    const url='https://c.y.qq.com/v8/fcg-bin/v8.fcg'
    const data=Object.assign({},commonParams,{
        page:'list',
        key:'all_all_all',
        pagesize:100,
        pagenum:1,
        platform:'yqq',
        needNewCode:0,
        channel:'singer'
    })
return jsonp(url,data,options)
}