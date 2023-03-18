import request from "./fetch";
import {setCookie , getCookie, delCookie } from '@/api/cookie'


/* 
q:搜索内容
max_results:搜索深度
*/
export const search = (q:string,max_results:number) => {
    return request(
      {
      url: "search",
      method: "get",
      params:{q:q
        ,max_results:max_results
        ,region:'cn-zh'
  
      }
  
    })
}

/* 
i:翻译内容
*/
export const fanyi = (i:string) => {
    return request(
      {
      url: "fanyi",
      method: "get",
      params:{
        doctype:'json'
        ,type:'auto'
        ,i:i
  
      }
  
    })
  
  }
  

  /* 接口函数 */

  export const getData = (c:string) => {
    return request(
      {
      url: "api",
      method: "get",
      params:{c:c
      }
  
    })
  }
  export const getData_robotAskData = (key:string) => {
    return request(
      {
      url: "api",
      method: "get",
      params:{
        c:"robotAskData",
        key:key
      }
  
    })
  }
  
  export const postData = (c:string,jsonData:any) => {
    return request(
      {
      url: "api",
      method: "post",
      params:{c:c},
      data:jsonData
    })
  }

  /* 获取用户信息 */
  
export const  getUserData = () => {
  if( getCookie('userToken') == '')
  {
      localStorage.removeItem("userVipTime");
      localStorage.removeItem("userVipconut");
      return
  }
  //验证token 并获取vip
 postData("query",{
      user:{token: getCookie('userToken')}
  }).then((res: any) => {
      if (res.retCode === -1) {
          delCookie('userToken')
          localStorage.removeItem("userVipTime");
          localStorage.removeItem("userVipconut");
      } else if(res.retCode === 0){
          localStorage.setItem("userVipTime", res.user.vipTime);
          localStorage.setItem("userVipconut",res.user.vipCount);
      }
  }).catch((err: any) => {
          localStorage.removeItem("userVipTime");
          localStorage.removeItem("userVipconut");
    }
  );
}