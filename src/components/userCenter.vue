
<template>


<div class="container-user">

  <template v-if="userData.userToken ==''">
  <h3 style="padding: 30px 0px 0px 0px;">  {{ formData.type== 0 ? "登录" : "注册" }} </h3>
  


  <van-form label-align="top" >
      
      <van-field
        class="form-vant"
        name="用户名"
        label="用户名"
        placeholder="请输入用户名"
        v-model="openFormData.userName"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
      class="form-vant"
        name="密码"
        label="密码"
        type="password"
        placeholder="请输入密码"
        v-model="openFormData.userPwd"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <van-field
      class="form-vant"
        v-if="formData.type==1"
        name="安全信息"
        label="安全信息"
        placeholder="qq或者任意字母+数字组合"
        v-model="openFormData.securitymsg"
        :rules="[{ required: true, message: '请输入安全信息' }]"
      />

      <div style="display: flex; align-items: center; padding-right: 20px">
      <van-field
      class="form-vant"
        name="验证码"
        label="验证码"
        placeholder="请输入验证码"
        v-model="openFormData.authCode"
        :rules="[{ required: true, message: '请输入验证码' }]"
      />
      <van-image
      class="form-vant"
          width="160"
          height="50"
          :src="'data:image/png;base64,' + authCodeData.img"
          @click="getAuthCode"
        />
    </div>
 

     </van-form>
          
     <div class="card-body" >
     <button class="btn btn-primary btn-block"  style="margin-top: 10px;"  @click="openFormGo">
        {{ formData.type== 0 ? "登录" : "注册" }}</button>       
      </div>
      <div  class="mb-4 text-r" >
        <a href="javascript:;" :style="theme.state.data?'color: #4E4545;':'color: #9aa1b9;'" @click="openForm" >
           {{ formData.type== 0 ? "还有没有账号？点我注册！" : "我已有账号，点我返回登录页！" }}</a>
      </div>
    </template><template v-else>
      <h3 style="padding: 30px 0px 0px 0px;"> 个人中心 </h3>

      <div style="padding-bottom: 35px">
         <button class="btn btn-primary btn-block"  style="margin-top: 10px;  width: 65%; margin: auto;" @click="formWorkSendHtmlClick()" > <Icon icon="material-symbols:text-snippet-outline" /> 分享语法模板</button>       
      </div>

      <div class="container" >

       <div style="padding-bottom: 20px">
        Vip到期时间：{{  userData.viptime < dayjs().unix() ? "已过期" :   dayjs(userData.viptime*1000).format('YYYY-MM-DD HH:mm:ss') }}
        ,剩余提问次数：{{userData.vipconut}}。
       </div>

        <h5 style="padding-bottom: 0px"> 
           <a href="javascript:;"  style="color: #9aa1b9;text-decoration:underline;"  @click="delUserData" >
           <Icon icon="simple-icons:cookiecutter" />  退出登录</a>
        </h5>

       
         <h3 >聊天记录</h3>
         <div style="padding-bottom: 35px">
         <button class="btn btn-primary btn-block"  style="margin-top: 10px; " :disabled="openUserChatButtonCode"  @click="openUserChatList" > <Icon icon="octicon:log-24" /> 获取聊天记录列表</button>       
         </div>
         <ul class="list-unstyled chat-list"> <!--  style="pointer-events: auto;" >   -->
                <template v-for="(item, index) in userChatListReturn" :key="index"   >
                    <li>
                    <a href="javascript:;" @click="openUserChatData(index)">
                        <div class="media" style="padding-bottom: 10px;" >
                    
                      
                             <p class="chat-user-message mb-0" style="overflow: hidden; font-size:15px;">
                                <template v-if="item.open"><van-tag type="primary" style="margin-right: 10px;">Open</van-tag></template>
                                {{ item.myChatData }}</p>
                            <div style="font-size:12px;" >{{ dayjs(Number(item.time)*1000).format('YYYY-MM-DD HH:mm:ss') }}</div>
                        
                        </div>
                    </a>
                   </li>
                </template>


         </ul>
       
      
        
      </div>

    </template>
</div>



</template>


<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { getCurrentInstance ,ref,watch,reactive} from "vue";
import { getData,postData,getUserData } from "@/api/api";
import {setCookie , getCookie, delCookie } from '@/api/cookie'
import { showDialog } from "vant";
import dayjs from 'dayjs';
import { openUserChatMod,robotaskReturn,roboTaskDataReturn,chatContent, theme ,formWorkSendHtml} from "./store";

const formWorkSendHtmlClick = () => {
    formWorkSendHtml.state.data = true
}

const userData = getCurrentInstance()?.appContext.config.globalProperties.$getUserData
const limitWords = (txt:string) =>{
    if(txt.length<10)
    {
        return txt
    }
    var str = txt;
    str = str.substr(0,10) + '...';
    return str;
}
const chatFormat = (str: string) => {
  var val = str.replace(/\\u/g, '%u')
  var val_str = unescape(val)
  return val_str
}

interface userChatListType {
    conversation_id?: string
    myChatData?: string
    time?: number
    open?:boolean
}
const userChatListReturn = reactive<userChatListType[]>([]); 
const openUserChatButtonCode = ref(false)
const openUserChatList = () =>{

    openUserChatButtonCode.value=true
    postData('chatlist',{
         user:{
             token: getCookie('userToken') 
            },
    }).then( (res: any) => {
        openUserChatButtonCode.value=false
        if(res.retCode === -1){
            showDialog({message:res.data.msg})
            return
        }
        userChatListReturn.length=0
        var chatList = res.chatList
        for(var i =0 ; i<chatList.length; i++)
        {
             userChatListReturn.push({  
                conversation_id:chatList[i].conversation_id,
                myChatData: limitWords(chatFormat(chatList[i].myChatData)),
                time:chatList[i].time,
                open:false
            }) 
        }

    
    for(var i = 0;i<userChatListReturn.length;i++){
        if(userChatListReturn[i].conversation_id==openUserChatMod.state.now_chatId_conversation_id)
        {
            userChatListReturn[i].open=true
        }else{
            userChatListReturn[i].open=false
        }
    }

    }).catch((err: any) => {
        openUserChatButtonCode.value=false
    })

}

 const openUserChatData=async (index:number)=>{

    if(chatContent.state.length>0 && chatContent.state[chatContent.state.length - 1].roboTaskData.end_turn != true){
        showDialog({message:"当前聊天对话正在回复，请稍后。"})
        return
    }

    for(var i = 0;i<userChatListReturn.length;i++){
        if(index==i)
        {
            userChatListReturn[i].open=true
        }else{
            userChatListReturn[i].open=false
        }

    }
    var conversation_id = String(userChatListReturn[index].conversation_id)


    /* 读取聊天记录到Ui */
    chatContent.state.length=0

    var chatdataList = [{
        parent_message_id:"",
        conversation_id:"",
        myChatData:"",
        robotChatData:"",
        time:0
    }]

    await postData('chatdata',{
         user:{
             token: getCookie('userToken') 
        },chat:{
            conversation_id:conversation_id
        }
    }).then( (res: any) => {
         console.log(res)
        if(res.retCode === -1){
            showDialog({message:res.data.msg})
            return
        } 
        chatdataList=res.chatData
    }).catch((err: any) => {
     
    })
    for (let i = 0; i < chatdataList.length; i++) {
       
        chatContent.state.push({
           code:0,
           sendChatData: chatFormat(chatdataList[i].myChatData),
           roboTaskData: {
           code:0,
           data:chatFormat(chatdataList[i].robotChatData),
           end_turn:true,
           data_fanyi:"",
           fanyi:false
           }} );


     roboTaskDataReturn.state.conversation_id =  chatdataList[i].conversation_id
     roboTaskDataReturn.state.parent_message_id =  chatdataList[i].parent_message_id

    }

    if(conversation_id==openUserChatMod.state.now_chatId_conversation_id ){
        /* 不重复进入相同会话 */
        return
    } 
    openUserChatMod.state.now_chatId_conversation_id = ''
    openUserChatMod.state.open_chatId_conversation_id = conversation_id
   /*  console.log(  store.state.open_chatId_conversation_id ) */
    
}


const formData = reactive({
    type:0
})

const openFormData= reactive({
    userName:"",
    userPwd:"",
    securitymsg:"",
    authCode:""
})

const authCodeData = reactive({
    img:""
    ,key:""
    ,time:0
})
const openForm = () =>{
    if (formData.type == 0) {
        formData.type = 1
    }
    else {
        formData.type = 0
    }
}
const openFormGo = () =>{
    var c = ''
    if (formData.type == 0) {
        c= 'login'
    }else{
        c= 'reg'
    }
    postData(c,{
        userName:openFormData.userName,
        userPwd:openFormData.userPwd,
        userSecurityMsg:openFormData.securitymsg,
        auth:{
            code:openFormData.authCode,
            key:authCodeData.key
        }

    }).then( (res: any) => {
   
        showDialog({message:res.data.msg})

        if(res.data.code === 0){
            if(c =="reg"){
                formData.type = 0
                openFormData.authCode=""
                getAuthCode()
            }else{
                setCookie('userToken',res.user.token,30)
                getUserData()
            }
        }else{
            openFormData.authCode=""
            getAuthCode()
        }

    }).catch((err: any) => {
    })
   
}

const getAuthCode = () => {
    getData("authImg").then( (res: any) => {
        authCodeData.img = res.auth.img
        authCodeData.key = res.auth.key
        authCodeData.time =  new Date().getTime() / 1000 + 60 
    }).catch((err: any) => {

    })
}

if(userData.userToken ==''){
    getAuthCode()
}

const delUserData = ()=>{
    delCookie('userToken')
    localStorage.removeItem("userVipTime");
    localStorage.removeItem("userVipconut");
}

setInterval(() => {
    if(authCodeData.time < new Date().getTime() / 1000)
    {
        if(userData.userToken ==''){
            getAuthCode()
        }
    }
}, 30000);

</script>


<style lang="scss" scoped>
:root{

}
.form-vant{
    background: var(--container-menu-color);   
    :deep(.van-field__control::-webkit-input-placeholder ){
                 color: #b8b6b6
    }
   
}
</style>

<style>

.text-r{
  margin-left: auto;
  margin-right: 10px;
  text-align: right;
  font-size: 13px;
}


.btn-primary {
    color: #fff;
    background-color: #7269ef;
    border-color: #7269ef
}

.btn-primary:hover {
    color: #fff;
    background-color: #5246eb;
    border-color: #473bea
}

.btn-primary.focus,.btn-primary:focus {
    color: #fff;
    background-color: #5246eb;
    border-color: #473bea;
    -webkit-box-shadow: 0 0 0 .15rem rgba(135,128,241,.5);
    box-shadow: 0 0 0 .15rem rgba(135,128,241,.5)
}

.btn-primary.disabled,.btn-primary:disabled {
    color: #fff;
    background-color: #7269ef;
    border-color: #7269ef
}

.btn-primary:not(:disabled):not(.disabled).active,.btn-primary:not(:disabled):not(.disabled):active,.show>.btn-primary.dropdown-toggle {
    color: #fff;
    background-color: #473bea;
    border-color: #3c2fe9
}

.btn-primary:not(:disabled):not(.disabled).active:focus,.btn-primary:not(:disabled):not(.disabled):active:focus,.show>.btn-primary.dropdown-toggle:focus {
    -webkit-box-shadow: 0 0 0 .15rem rgba(135,128,241,.5);
    box-shadow: 0 0 0 .15rem rgba(135,128,241,.5)
}



.btn {
    display: inline-block;
    font-weight: 400;
    color: #a6b0cf;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: .47rem .75rem;
    font-size: .9375rem;
    line-height: 1.5;
    border-radius: .25rem;
    -webkit-transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out
}

@media (prefers-reduced-motion:reduce) {
    .btn {
        -webkit-transition: none;
        transition: none
    }
}

.btn:hover {
    color: #a6b0cf;
    text-decoration: none
}

.btn.focus,.btn:focus {
    outline: 0;
    -webkit-box-shadow: 0 0 0 .15rem rgba(114,105,239,.25);
    box-shadow: 0 0 0 .15rem rgba(114,105,239,.25)
}

.btn.disabled,.btn:disabled {
    opacity: .65
}

.btn:not(:disabled):not(.disabled) {
    cursor: pointer
}
.btn-block {
    display: block;
    width: 100%
}

.btn-block+.btn-block {
    margin-top: .5rem
}

.btn-primary {
    color: #fff;
    background-color: #7269ef;
    border-color: #7269ef
}

.btn-primary:hover {
    color: #fff;
    background-color: #5246eb;
    border-color: #473bea
}

.btn-primary.focus,.btn-primary:focus {
    color: #fff;
    background-color: #5246eb;
    border-color: #473bea;
    -webkit-box-shadow: 0 0 0 .15rem rgba(135,128,241,.5);
    box-shadow: 0 0 0 .15rem rgba(135,128,241,.5)
}

.btn-primary.disabled,.btn-primary:disabled {
    color: #fff;
    background-color: #7269ef;
    border-color: #7269ef
}

.btn-primary:not(:disabled):not(.disabled).active,.btn-primary:not(:disabled):not(.disabled):active,.show>.btn-primary.dropdown-toggle {
    color: #fff;
    background-color: #473bea;
    border-color: #3c2fe9
}

.btn-primary:not(:disabled):not(.disabled).active:focus,.btn-primary:not(:disabled):not(.disabled):active:focus,.show>.btn-primary.dropdown-toggle:focus {
    -webkit-box-shadow: 0 0 0 .15rem rgba(135,128,241,.5);
    box-shadow: 0 0 0 .15rem rgba(135,128,241,.5)
}




.card-body {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1.25rem
}


.container-user {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  background-color:var(--container-menu-color);
  width: 90%; 

/*   box-shadow: 0px 0px 2px #00000069; */
  overflow-y: auto;
  max-height: 85%;
 /*  color: #fcfcfce8; */
}
/* @media (max-width: 450px) {
 .container-user {
  width:85%
 }
} */
.container-user h3 {

  margin-top: 0;
  /*  background-color: #42bfe910;  */

  text-align:center;
  justify-content: center;
  padding: 25px 0px 15px 0px;
  font-size: 23px;

}





.btn-light {
    color: var( --btn-light-color);
    background-color: var(--btn-light-background-color);
    border-color:  var(--btn-light-background-color)
}

.btn-light:hover {
    color: var( --btn-light-color);
    background-color:var( --btn-light-background-color-on)

}


.btn-light.disabled,.btn-light:disabled {
    color: var( --btn-light-color);
    background-color:  var(--btn-light-background-color);
    border-color:  var(--btn-light-background-color)
}







</style>


<style>

.chat-list {
    margin: 0
}

.chat-list li.active a {
    background-color: #36404a
}

.chat-list li a {
    position: relative;
    display: block;
    padding: 0px 0px;
    
    color: var( --chat-list-li-a-color);
    -webkit-transition: all .4s;
    transition: all .4s;
    border-top: 1px solid #30384100;
    border-radius: 4px
}

.chat-list li a:hover {
    background-color:  var(--chat-list-li-a-background-color)
}

.chat-list li .chat-user-message {
    font-size: 14px
}

.chat-list li.typing .chat-user-message {
    color: #7269ef;
    font-weight: 500
}

.chat-list li.typing .chat-user-message .dot {
    background-color: #7269ef
}

.chat-list li .unread-message {
    position: absolute;
    display: inline-block;
    right: 24px;
    top: 33px
}

.chat-list li .unread-message .badge {
    line-height: 16px;
    font-weight: 600;
    font-size: 10px
}



</style>