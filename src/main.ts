import { createApp , reactive } from 'vue'
import App from './App.vue'
import {setCookie , getCookie, delCookie } from '@/api/cookie'
import { getData,postData,getUserData } from "@/api/api";
import dayjs from 'dayjs';
import { theme } from "./components/store";

const app = createApp(App)




app.config.globalProperties.$getUserData = reactive({
    userToken:getCookie('userToken'),
    viptime:0,
    vipconut:0,
    vip: false
})

getUserData()
setInterval(() => {
    getUserData()
}, 60000)

function nowGetUserData(){
    app.config.globalProperties.$getUserData.userToken= getCookie('userToken')
    var viptime =  Number(localStorage.getItem("userVipTime"))
    var vipconut = Number(localStorage.getItem("userVipconut"))

    if(viptime != null && viptime != undefined)
    {
        let n = Number( viptime )
        if(n < dayjs().unix() )
        {
           viptime = 0
        }
    }
    app.config.globalProperties.$getUserData.viptime=viptime
    app.config.globalProperties.$getUserData.vipconut=vipconut
    app.config.globalProperties.$getUserData.vip= viptime>0 || vipconut>0
} 
setInterval(() => {
    nowGetUserData()
}, 1000);

if(getCookie('theme')=='dark'){
    theme.state.data=true
}




app.mount('#app')
