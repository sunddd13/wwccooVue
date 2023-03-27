
<template>
 

 <!-- 聊天框 -->

<div class="chat-conversation">



<!-- 提示信息 -->
 <div class="container p-lg-4">
  <h2 class="element">chatGpt3.5</h2>
  
   <a class="target a-0" style="text-decoration:underline;" href="https://jq.qq.com/?_wv=1027&k=z1ckR9td" target="_blank" title="加入qq群"><Icon icon="noto-v1:penguin" /> QQ群①:(满)。</a>
   <a class="target a-0" style="text-decoration:underline;" href="https://jq.qq.com/?_wv=1027&k=OWK9u5XB" target="_blank" title="加入qq群"><Icon icon="noto-v1:penguin" /> QQ群②:(满)。</a>
   <br><br>
   <a class="target a-0" style="text-decoration:underline;" href="https://jq.qq.com/?_wv=1027&k=jO2u9Fm1" target="_blank" title="加入qq群"><Icon icon="noto-v1:penguin" /> QQ群③:708613202。</a>
   <br><br>

  <span class="span-0"><Icon icon="mdi:lightbulb-help" /> p-web 网络搜索，例如：p-web-流浪地球2。</span>
  <br><br>
  <span class="span-0"><Icon icon="mdi:lightbulb-help" /> p-fy 翻译发送的内容(自适应语言),例如：p-fy-你好。</span>
  <br><br>
  <span class="span-0"><Icon icon="material-symbols:tips-and-updates-rounded" />
    当前Free库数:{{ gptDataSum.freeDataSum }},可用:{{ gptDataSum.freeDataIdleSum }}。Vip库数:{{ gptDataSum.vipDataSum }},可用:{{ gptDataSum.vipDataIdleSum }}。
  </span>

    <br><br>
    <li class="btn btn-light btn-sm"   onclick="window.open('https://afdian.net/a/wwccoo', '_blank')" >#前往爱发电支持作者</li>
    <br><br>
    <li class="btn btn-light btn-sm"   onclick="window.open('https://docs.qq.com/doc/DYUx1c2V0YkJLSHly', '_blank')" >说明与介绍</li>

    <template v-if="userData.userToken == ''" >
    <br><br>
     <a style="font-size: 15px;">
    您暂未登录，未登录用户<a style='color:#FF4040'>每天限定问答次数且不会关联对话上下文和保留聊天记录。</a><br> 点击左侧小图标即可进入个人中心。
    </a>
   </template><template v-else>
    <!-- <Icon icon="mingcute:vip-1-fill" />
       Vip到期时间：{{  userData.viptime < dayjs().unix() ? "已过期" :   dayjs(userData.viptime*1000).format('YYYY-MM-DD HH:mm:ss') }}
      ,剩余提问次数：{{userData.vipconut}}。
      <br>
      Tips: 提问次数 = Vip  <br> (Vip仅作演示，本站是免费的。) -->
    </template> 

 </div>


 <!-- 对话 -->
<div class="list-unstyled p-lg-3">

  <template v-for="(item, index) in chatContent.state" :key="index"   >
  <li>
  <div class="conversation-list-right">   
    <div class="ctext-wrap">
    <div class="ctext-wrap-content">
       <MdEditor  class="mychatMd" preview-only
       v-model="item.sendChatData"
      ></MdEditor>           

    </div>
  </div>
  </div>
</li>

<li>
  <div class="conversation-list">   
    <div class="ctext-wrap">
    <div class="ctext-wrap-content">

      <template  v-if = "item.roboTaskData.fanyi == false">
       <MdEditor  class="robotMd"  v-model="item.roboTaskData.data" preview-only 
            :class="item.code === 0 ? '' : 'robotMd-redColor'"
         ></MdEditor> 
        </template><template v-else>
           <MdEditor  class="robotMd"  v-model="item.roboTaskData.data_fanyi" preview-only 
             :class="item.code === 0 ? '' : 'robotMd-redColor'" >
            </MdEditor> 
        </template>
        <template v-if = !item.roboTaskData.end_turn > 
          <span class="animate-typing">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
           </span>
        </template><template v-else>
          <p class="chat-time mb-0" >
          <button class="chat-button" @click="fanyiRobotData(index)"><Icon icon="heroicons-solid:translate" />{{ item.roboTaskData.fanyi ? '原文' : '翻译' }}</button> 
           <button class="chat-button" @click="copyRobotData(index)"><Icon icon="icon-park-twotone:copy-one" />复制</button> 
          </p>


        </template>

        
      </div>
    </div>
  </div>
</li>
</template>

</div>


</div>

<!-- 输入框 -->

<template v-if=" openUserChatMod.state.open_chatId_conversation_id=='' ">


  
<div class="chat-1" :style="{'height': formWorkData == ''?  inputHeight + 9 + 'px' : formWorkHeight  + 'px'}">

<template v-if="formWorkData == ''">
  
<textarea    
class="textarea-msg"
type="text"     
:style="{'height': inputHeight+'px'}"
maxlength="10000" 
placeholder="ctrl+enter快捷发送。"
v-model="inputMessage"
@keydown.ctrl.enter="sendMessage"
></textarea>   

</template><template v-else>




<div style="width:100% ; max-height: 100%;  overflow: auto;">
  
<!-- 语法模板提示信息 -->
  <div style="margin-bottom: 7px; margin-top: 7px;  margin-left: 15px;" >   {{ formWorkDataTips }}  </div>
<!-- 语法模板渲染 -->
  <div v-for="(item, index) in formWorkList" :key="index" style="margin-bottom: 5px;  margin-left: 15px;"> 
    <div>
      <a style="vertical-align: 5px; ">{{ item.text }}:</a>
      <textarea :id="'textarea-' + index" v-model="item.data"  style="height: 23px; margin-left: 10px; border: none; border-bottom: 1px solid #8D8D8D; background-color: #ffffff00; resize: none;"></textarea>
    </div>

  </div>

   
</div>

<!-- 清除语法模板 -->
<button class="button-1"  @click="formWorkCloseClick"> 
    <Icon icon="fluent:chat-arrow-back-20-regular"   :color="theme.state.data?'#36404a':''" /> 
</button> 

</template>

<!-- 语法模板 -->
<button class="button-1"  @click="formWorkClick"> 
    <Icon icon="ph:puzzle-piece"   :color="theme.state.data?'#36404a':''" /> 
</button> 
<!-- 切换主题 -->
<button class="button-1" @click="themeClick"> 
  <template v-if="theme.state.data">
    <Icon icon="ph:moon"   :color="theme.state.data?'#36404a':''" />   </template><template v-else>
   <Icon icon="ph:sun-bold"   :color="theme.state.data?'#36404a':''" />
    </template>
</button> 
<!-- 发送 -->
<button class="button-1"  @click="sendMessage"   :disabled="sendDisbled">
<template v-if=sendDisbled>
 <Icon icon="quill:send-later"  :color="theme.state.data?'#36404a':''"  />
</template><template v-else>
  <Icon icon="carbon:send-alt"   :color="theme.state.data?'#36404a':''"  />
 </template>
</button>

</div>


</template><template v-else>
  <div class="chat-2">
  <button class="btn btn-primary btn-block left"   @click="openChatDataId"   :disabled="openChatDataButtonCode"  >拉取本次会话</button>
  </div>
</template>

<!-- 侧边 -->

  <div :class="{'expanded': isExpanded}" class="container-menu" >
    <userCenter />
  </div>


  <li class="circle-button" :class="{'expanded': isExpanded}"  @click="toggleExpand">
    <Icon icon="ic:round-data-saver-off" />
  </li> 
 
  <li class="circle-button-down"    @click="scrollDown">
    <Icon icon="material-symbols:swipe-down" />
  </li> 



  <!-- 语法模板页面 -->
<!-- <van-overlay :show="formWorkHtml" @click="formWorkHtml = false" style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
 -->
 
 <div v-show="formWorkHtml" @click="formWorkHtml = false" style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;  position: fixed;top: 0; left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,.7);"> 
 
  <div style="overflow: auto; width: 85%; height: 70%; background-color: var(--formWorkHtml-background-color); display: flex; flex-direction: column; align-items: center;" @click.stop>
 <h2 style="margin-bottom: 7px; margin-top: 30px;">语法模板</h2>
     
 <van-search
  :clearable="false"
  v-model="formWorkSearchData"
  show-action
  placeholder="请输入搜索关键词"
>
  <template #action>
    <div @click="formWorkSearchClick">搜索</div>
  </template>
</van-search> 
 
<van-pagination
  v-model="formWorkSearchPageNow"
  :page-count=formWorkSearchPage
  :show-page-size="3"
  force-ellipses
  @change="formWorkSearchPageClick"
/>

<van-space wrap :size="25" style="margin-top: 15px; margin-left: 30px; margin-right: 5px;">

<van-cell  v-for="item in formWorkHtmlData"  :key="item.id"  :clickable="true"   :border="false" 
  :label="'简介:'+item.tipsText" 
  style="min-height: 130px; width: 260px; box-shadow: 0px 0px 1px 1px #979798;"
  @click="formWorkOpen(item)"  >

    <!-- 使用 title 插槽来自定义标题 -->
  <template #title>
    <span class="custom-title">{{item.templateName}}</span>
    <van-tag type="primary">{{item.userName}}</van-tag>
  </template>
  
</van-cell>  

</van-space>


  </div> 


</div>


<!-- 语法模板提交页面 -->

<!-- <van-overlay :show="formWorkSendHtml.state.data" @click="formWorkSendHtml.state.data = false" style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
 -->  
 <div v-show="formWorkSendHtml.state.data" @click="formWorkSendHtml.state.data = false" style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;  position: fixed;top: 0;left: 0;right: 0;bottom: 0; background-color: rgba(0,0,0,.7);"> 
 <div style="overflow: auto; width: 85%; height: 70%; background-color: var(--formWorkHtml-background-color); display: flex; flex-direction: column; align-items: center;" @click.stop>
      <h2 style="margin-bottom: 25px; margin-top: 30px;">提交语法模板</h2>

      <van-form label-align="top" >
      
      <van-field
       v-model="formWorkHtmlSendData.templateName"
       rows="1"
       autosize
       label="模板名称"
       type="textarea"
       placeholder="请输入模板名称"
       :rules="[{ required: true, message: '请输入模板名称' }]"
      />
      <van-field
      v-model="formWorkHtmlSendData.tipsText"
       rows="2"
       autosize
       label="模板提示信息"
       type="textarea"
       placeholder="请输入模板提示信息,将会作为该模板的简介"
       :rules="[{ required: true, message: '模板提示信息' }]"
      />
      <van-field
      v-model="formWorkHtmlSendData.templateText"
       rows="3"
       autosize
       label="模板发送消息"
       type="textarea"
       placeholder="模板发送消息，比如: 你好，我叫{名称}。"
       :rules="[{ required: true, message: '模板发送消息' }]"
      />


     </van-form>
          
     <button class="btn btn-primary btn-block" :disabled="openformWorkHtmlSendButtonCode" style="margin-top: 25px;  width: 150px;" @click="formWorkHtmlSendClick()" >
        提交
      </button>       
      
    </div>
  </div> 



 </template>



<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref,watch,reactive,getCurrentInstance } from 'vue';
import dayjs from 'dayjs';
import userCenter from "./userCenter.vue";
import { getData,postData,getData_robotAskData,search , fanyi } from "@/api/api";
import { delCookie, getCookie, setCookie } from '@/api/cookie'
import { showToast,showDialog } from "vant";

import MdEditor from "md-editor-v3";
import 'md-editor-v3/lib/style.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';

import { openUserChatMod,robotaskReturn,roboTaskDataReturn,chatContent,theme ,formWorkSendHtml} from "./store";



MdEditor.config({
  markedRenderer(renderer) {
    renderer.link = (href:string, title:string, text:string) => {
      return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
    };

    return renderer;
  },
  editorExtensions: {
    katex: {
      instance: katex
    }}
    
})


/* 语法模板功能 */
const formWorkHeight = ref(0)
const formWorkDataTips = ref('')
const formWorkData = ref(``)
const formWorkList =  ref<{ id: number; text: string; data:string }[]>([]);
const formWorkHtml = ref(false)
const formWorkHtmlData =  ref<{ id: number; userName: string; templateText:string,tipsText:string,templateName:string,time:number }[]>([]);
/* 搜索 */
const formWorkSearchData = ref('')
const formWorkSearchPageNow = ref(1)//当前页
const formWorkSearchPage = ref(1)//总页数 


const formWorkSearchClick = () => {
 
  formWorkSearchPageNow.value=1
  formWorkSearchPage.value=1

  postData("formworkSearch",{
  search:{ 
    data: formWorkSearchData.value,
    page:formWorkSearchPageNow.value
  }
  }).then( (res: any) => {

    formWorkHtmlData.value = []
    formWorkHtmlData.value =   res.search.data.map((item:any,index:number) => ({
        id: index + 1,
        userName:item.userName,
        templateText:chatFormat(item.templateText),
        tipsText:chatFormat(item.tipsText),
        templateName:chatFormat(item.templateName),
        time:item.time,
    }));
    formWorkSearchPage.value =  res.search.page
  


  }).catch((err: any) => {
      console.log(err)
  })

}
formWorkSearchClick()

const formWorkSearchPageClick = () => {

  postData("formworkSearch",{
  search:{ 
    data: formWorkSearchData.value,
    page:formWorkSearchPageNow.value
  }
  }).then( (res: any) => {
    formWorkHtmlData.value = []
    formWorkHtmlData.value =   res.search.data.map((item:any,index:number) => ({
        id: index + 1,
        userName:item.userName,
        templateText:chatFormat(item.templateText),
        tipsText:chatFormat(item.tipsText),
        templateName:chatFormat(item.templateName),
        time:item.time,
    }));
  }).catch((err: any) => {
      console.log(err)
  })

}

const formWorkText=()=>{
  //var regex = /{([^}]+)}/g;
  var regex =  /[{}](.*?)[{}]/g;
  var data = formWorkData.value
  var matches = data.match(regex) || [];
  
  formWorkHeight.value =  (matches?.length??0) * 36 + 50
  if( formWorkHeight.value > 200){
    formWorkHeight.value = 200
  } 

  formWorkList.value = []
   formWorkList.value = matches.map((match, index) => ({
        id: index + 1,
        text: match,
        data:''
    })) ;
 
  if(  formWorkList.value.length == 0)
  {
    formWorkDataTips.value+='(此模板无需参数设置)'
  }

}
const formWorkOpen=(data:any)=>{
  

   formWorkDataTips.value= `${data.templateName}(${data.userName}) ${data.tipsText}`
   formWorkData.value=data.templateText

   formWorkText() 
 

   formWorkHtml.value = false 
}

const formWorkReplacedData=()=>{
  var replacedData = formWorkList.value.reduce((acc, curr) => {
    return acc.replace(`${curr.text}`, curr.data)
  }, formWorkData.value)
  return replacedData
}

const formWorkClick=()=>{
  formWorkHtml.value = !formWorkHtml.value
}
const formWorkCloseClick=()=>{
  formWorkData.value=''
}


/* 语法模板提交功能 */
const formWorkHtmlSendData =  ref({ tipsText:'', templateName:'', templateText:'',});
const openformWorkHtmlSendButtonCode = ref(false)
const formWorkHtmlSendClick = ()=>{
  openformWorkHtmlSendButtonCode.value=true

  postData("addFormwork",{
  user:{  
    token: getCookie('userToken') 
  },
  model:{ 
    tipsText: formWorkHtmlSendData.value.tipsText,
    templateName:formWorkHtmlSendData.value.templateName,
    templateText:formWorkHtmlSendData.value.templateText
  }
  }).then( (res: any) => {
    if(res.data.code===0){
      formWorkHtmlSendData.value.tipsText=''
      formWorkHtmlSendData.value.templateName=''
      formWorkHtmlSendData.value.templateText=''
    }

   showDialog({message:res.data.msg})
   openformWorkHtmlSendButtonCode.value=false
    
  }).catch((err: any) => {
      console.log(err)
      showDialog({message:'网络异常。'})
      openformWorkHtmlSendButtonCode.value=false
  }) 
}



// 让滚动条在最底部
const scrollDown = ()=>{
  var dom =  document.querySelector("html")
  dom?.scrollTo(0,dom?.scrollHeight) 
}


/* theme */

const themeClick = () =>{
  theme.state.data= !theme.state.data
  if (theme.state.data==false) { 
    setCookie('theme','dark',360)
    document.documentElement.removeAttribute('theme')  }
    else{  
    delCookie('theme')
    document.documentElement.setAttribute('theme', 'light')
  }
}

themeClick()

/* 侧边菜单栏 */
const isExpanded = ref(false);
function toggleExpand() {
      isExpanded.value = !isExpanded.value;
    }



/* 用户信息 */
const userData = getCurrentInstance()?.appContext.config.globalProperties.$getUserData
/*  获取服务器账号库信息 */
const  gptDataSum =reactive ({
  freeDataSum:0
  ,vipDataSum:0,
  freeDataIdleSum:0,
  vipDataIdleSum:0
}) 
getData("dbStock").then((res: any) => {
  gptDataSum.freeDataSum=res.sum.freeData,
  gptDataSum.vipDataSum=res.sum.vipData,
  gptDataSum.freeDataIdleSum=res.sum.freeDataIdle,
  gptDataSum.vipDataIdleSum=res.sum.vipDataIdle
}).catch((err: any) => {
})

/* 对话结构体 */
/* 
interface robotaskReturnType {
    retCode?: number
    data?: {
      msg: string
    },
    gpt?: {
      key: string
    }
}
var robotaskReturn = reactive<robotaskReturnType>({});

interface roboTaskDataReturnType {
    code?: number,
    conversation_id?: string
    data?: string
    end_turn?: Boolean 
    parent_message_id?: string
    message_id?:string
    fanyi?:boolean;
    data_fanyi?: string
}

var roboTaskDataReturn = reactive<roboTaskDataReturnType>({}); 

interface chatContentType {
    sendChatData: string
    roboTaskData: roboTaskDataReturnType 
    code?: number
}
var chatContent = reactive<chatContentType[]>([]); 

 */


/* 拉取对话 */
const openChatDataButtonCode = ref(false)
const openChatDataId = () =>{
 /*  console.log( "拉取会话", openUserChatMod.state.open_chatId_conversation_id) */
    openChatDataButtonCode.value= true
    var conversation_id =  openUserChatMod.state.open_chatId_conversation_id
   postData('openchatid',{
         user:{
             token: getCookie('userToken') 
        },chat:{
            conversation_id:conversation_id
        }
    }).then( (res: any) => {
      openChatDataButtonCode.value= false
    /*   console.log(res) */
      if(res.retCode === -1){
         showDialog({message:res.data.msg})
         return
      } 
  /*       chatdataList=res.chatData */
     openUserChatMod.state.open_chatId_conversation_id = ''
     openUserChatMod.state.now_chatId_conversation_id = conversation_id
     roboTaskDataReturn.state.message_id =  res.message.message_id


    }).catch((err: any) => {
      openChatDataButtonCode.value= false

    })

}

/* 输入框信息 */
const inputMessage = ref("")
const inputHeight = ref(21)
watch(inputMessage,
  ()=>{
    var l = inputMessage.value.split(/\r\n|\r|\n/).length

    if(l==1){
      inputHeight.value = 21
    }
    else if(l<=7)
    {
      inputHeight.value = l * 19
    }else{
      inputHeight.value = 7 * 19
    }

  }

)
/* 输入框事件 */
const sendDisbled = ref(false); 
const sendMessage = async () => {
  if(formWorkData.value != ''){
    sendDisbled.value = true;
    chatContent.state.push({
    sendChatData: "",
    roboTaskData: {
      data:"",
      data_fanyi:"",
      fanyi:false
    },});
    let msg = formWorkReplacedData()
    formWorkData.value = ''
    await chatSendToSer(msg);
    return
  }


  if (inputMessage.value === "" ||   sendDisbled.value == true) {
    return;
  }
  sendDisbled.value = true;
  chatContent.state.push({
    sendChatData: "",
    roboTaskData: {
      data:"",
      data_fanyi:"",
      fanyi:false
    },
  });
  await chatSendToSer(inputMessage.value);
  inputMessage.value = "";
}
const  chatSendToSer = async (msg: string) => {

/* 处理扩展 */

if (msg.substring(0,6) == 'p-web-')
{
  var search_data = msg.substring(6)
  var __s__  = 'Web search results: \r\n\r\n'
  await  search(search_data,3).then((res: any) => {
    let len = res.length
    for (var i = 0; i < len; i++)
    {
        __s__+=`[${i+1}] "${res[i].body}" \r\nURL:${res[i].href}\r\n\r\n`

    }
    __s__+='Instructions: Using the provided web search results, write a comprehensive reply to the given query. Make sure to cite results using [[number](URL)] notation after the reference. If the provided search results refer to multiple subjects with the same name, write separate answers for each subject.'
    __s__+=`\r\nQuery:${search_data}\r\nReply in 中文`
    search_data = __s__
  })
  msg = search_data
}else if (msg.substring(0,5) == 'p-fy-')
 {
  var fanyi_data = msg.substring(5)
  var __y__  = ''
  await  fanyi(fanyi_data).then((res: any) => {
   
   if(res.errorCode === 0)
   {
     let len = res.translateResult.length
     if(len == 0)
     {
       __y__ = fanyi_data
     }
     for (var i = 0; i < len; i++)
    {
       let let_a = res.translateResult[i].length
       for (var x = 0; x < let_a; x++)
       {
        __y__ +=   `${res.translateResult[i][x].tgt}\r\n`
       }

    }
    msg= __y__
  }
     })

}


/* 发送的内容 */
chatContent.state[chatContent.state.length - 1].sendChatData = msg



 postData("robotAsk",{
  user:{ 
    token: getCookie('userToken') 
  },
  gpt:{
    msg:msg,
    /* 连续对话参数设置 */
    message_id:roboTaskDataReturn.state?.message_id,
    parent_message_id:roboTaskDataReturn.state?.parent_message_id,
    conversation_id:roboTaskDataReturn.state?.conversation_id,
  }
}) 
.then((res: any) => {

    if (res.retCode === 0) {
      chatContent.state[chatContent.state.length - 1].code = 0
      robotaskReturn.state.data = res.data;
      robotaskReturn.state.gpt = res.gpt;
      robotaskReturn.state.retCode = res.retCode;
      setTimeout(() => {
           chatRetForSer(); 
      }, 1000);
    } else {
      chatContent.state[chatContent.state.length - 1].roboTaskData.data = res.data.msg;
      chatContent.state[chatContent.state.length - 1].code = -1
      chatContent.state[chatContent.state.length - 1].roboTaskData.end_turn = true
      sendDisbled.value = false;
    }
    scrollDown()
  })
  .catch((err: any) => {
    /* 不清空 连续对话的 参数 */
  chatContent.state[chatContent.state.length - 1].code = -1
  chatContent.state[chatContent.state.length - 1].roboTaskData.data = "网络访问异常。";
  chatContent.state[chatContent.state.length - 1].roboTaskData.end_turn = true
  sendDisbled.value = false;
    scrollDown()
});
  

};

const chatFormat = (str: string) => {
  var val = str.replace(/\\u/g, '%u')
  var val_str = unescape(val)
  return val_str + '\r\n'
}

const chatRetForSer = () => {
  getData_robotAskData(robotaskReturn.state.gpt?.key!) .then((res: any) => {

if (!res?.message.end_turn){
  //读取中……
  if (res?.message.data !== "") {
    res.message.data = chatFormat(res.message.data);
    chatContent.state[chatContent.state.length - 1].roboTaskData.code=res.message.code
    chatContent.state[chatContent.state.length - 1].roboTaskData.conversation_id=res.message.conversation_id
    chatContent.state[chatContent.state.length - 1].roboTaskData.data=res.message.data
    chatContent.state[chatContent.state.length - 1].roboTaskData.end_turn=res.message.end_turn
    chatContent.state[chatContent.state.length - 1].roboTaskData.parent_message_id=res.message.parent_message_id

    roboTaskDataReturn.state.message_id= res.message.message_id
    roboTaskDataReturn.state.conversation_id = res.message.conversation_id
    roboTaskDataReturn.state.parent_message_id =res.message.parent_message_id
  }
  setTimeout(() => {
      chatRetForSer();
  }, 1000);

} else {
  // end_turn == true  读取完成
  if (res.message.code === 0) {
    res.message.data = chatFormat(res.message.data);
  } else {
    chatContent.state[chatContent.state.length - 1].code = -1;
  }

  chatContent.state[chatContent.state.length - 1].roboTaskData.code=res.message.code
  chatContent.state[chatContent.state.length - 1].roboTaskData.conversation_id=res.message.conversation_id
  chatContent.state[chatContent.state.length - 1].roboTaskData.data=res.message.data
  chatContent.state[chatContent.state.length - 1].roboTaskData.end_turn=res.message.end_turn
  chatContent.state[chatContent.state.length - 1].roboTaskData.parent_message_id=res.message.parent_message_id

  roboTaskDataReturn.state.message_id = res.message.message_id
  roboTaskDataReturn.state.conversation_id = res.message.conversation_id
  roboTaskDataReturn.state.parent_message_id =res.message.parent_message_id


  chatContent.state[chatContent.state.length - 1].roboTaskData.end_turn = true
  sendDisbled.value = false;
}
})
.catch((err: any) => {
chatContent.state[chatContent.state.length - 1].code = -1
chatContent.state[chatContent.state.length - 1].roboTaskData.end_turn = true
sendDisbled.value = false;
});
}
/* 插件功能 */

const copyRobotData = (index:number) => {
 // console.log(index)
   var robotData = chatContent.state[index].roboTaskData.data
   var input = document.createElement('textarea');
   document.body.appendChild(input);
 /*   input.setAttribute('value', robotData); */
   input.value = robotData
   input.select();
   if(document.execCommand('copy')){
    showToast('复制成功');
   }else{
    showToast('复制失败');
   }
   document.body.removeChild(input); 
   /*  navigator.clipboard.writeText(robotData as string)
    .then(() => {
      showToast('复制成功');
    })
    .catch(() => {
      showToast('复制失败');
    }); */

   /* 感谢 诗鸷Temsys的提交 */

}
const fanyiRobotData = (index:number) => {
  if(chatContent.state[index].roboTaskData.fanyi==true)
  {
    chatContent.state[index].roboTaskData.fanyi=false
    return
  }else{
    chatContent.state[index].roboTaskData.fanyi=true
    chatContent.state[index].roboTaskData.data_fanyi = '正在使用有道翻译中……'
  }

  var robotData = chatContent.state[index].roboTaskData.data
  var __y__  = robotData + '\r\n\r\n'
  fanyi(robotData).then((res: any) => {
     if(res.errorCode === 0)
     {
      let len = res.translateResult.length
      for (var i = 0; i < len; i++)
      {
         let let_a = res.translateResult[i].length
         for (var x = 0; x < let_a; x++)
         {
          __y__ +=   `${res.translateResult[i][x].tgt}\r\n`
         }

      }
      chatContent.state[index].roboTaskData.data_fanyi = __y__
     }
})

}




</script>




<style lang="scss" scoped>
.robotMd {
      font-size: 12px;
      display: flex;
      background-color: transparent;
      border-radius: 2px;
      color: #d1d5db !important;
      :deep(.md-editor-content .md-editor-preview) {
        color: var( --md-text-color)  !important;
      }
    }
.robotMd-redColor{
    :deep(.md-editor-content .md-editor-preview) {
        color: #ff4d4f !important;
      }
}
.mychatMd  {
  font-size: 12px;
  display: flex;
  background-color: transparent;
  border-radius: 2px;
  color: var( --md-text-color)  !important;
  :deep(.md-editor-content .md-editor-preview ) {
    color: var( --md-text-color)  !important ;
  }
}



</style>




<style>

.element {
  background-image:var(--e-color);
  background-clip: text;
  -webkit-background-clip: text; /* 兼容 Safari */
  color: transparent;
  -webkit-text-fill-color: transparent; /* 兼容 Safari */
}

.p-lg-3 {
   padding: 1rem!important ; 
   margin-bottom: 40px;
}

.p-lg-4 {
  padding: 1.5rem!important ;
}

.container {
  position: relative;
  text-align: center;
}

.list-unstyled {
    padding-left: 0;
    list-style: none
}

.chat-conversation {
    top: 8px;
 /*    height: calc(100vh - 163px);  */
    font-size: 13.33px;
  /*   overflow:auto; */
}

.chat-conversation .span-0 {
    background-color:var(--text-link-background-color);
    position: relative;
    padding: 6px 12px;
    border-radius: 5px 
}
.chat-conversation .a-0 {
  color: var(--link-color);
}

.chat-conversation li {
  clear: both
}

/* 左侧聊天气泡 */
.chat-conversation .conversation-list {
    margin-bottom: 24px;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    position: relative;
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
}
/* @media (max-width: 991.98px) {
    .chat-conversation .conversation-list .ctext-wrap-content {
        max-width: calc(100vw - 30px)
    }
} */
.chat-conversation .conversation-list .ctext-wrap {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 10px
}
.chat-conversation .conversation-list .ctext-wrap-content:before {
    border: 5px solid transparent;
}
.chat-conversation .conversation-list .ctext-wrap-content {
    padding: 7px 17px;
    background-color: var( --ctext-wrap-content-background-color);
    border-radius: 8px 8px 8px 8px; 
    color: #fff;
    position: relative;
    max-width: calc(100vw - 110px)
}
.chat-conversation .conversation-list .chat-time {
    font-size: 12px;
    margin-top: 4px;
    text-align: right;
    color: rgba(255, 255, 255, 0.801); 
}

/* 右侧聊天气泡 */
.chat-conversation .conversation-list-right {

  float: right;
  text-align: right ;
  margin-bottom: 24px;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex; 
  position: relative;
  -webkit-box-align: end;
  -ms-flex-align: end;
  align-items: flex-end 
}

.chat-conversation .conversation-list-right .ctext-wrap .ctext-wrap-content {
    -webkit-box-ordinal-group: 3;
    -ms-flex-order: 2;
    order: 2;
    background-color: var( --ctext-wrap-content-background-color-r);
    color: #999;
    text-align: right;
    border-radius: 8px 8px 8px 8px; 
    max-width:calc(100vw - 110px);
  /*   border-radius: 8px 8px 0 8px; */
}
/* @media (max-width: 400px) {
    .chat-conversation .conversation-list-right .ctext-wrap .ctext-wrap-content {
      max-width:calc(100vw - 130px);
    }
} */
.chat-conversation.conversation-list-right .ctext-wrap .ctext-wrap-content:before {
    border: 5px solid transparent;
}
.chat-conversation .conversation-list-right .ctext-wrap-content {
    padding: 7px 17px;
    background-color:  #49506E;
    border-radius: 8px 8px 8px 8px; 
    color: #fff;
    position: relative;
    max-width: calc(100vw - 130px)
}
.chat-conversation .conversation-list-right .chat-time {
    text-align: left;
    color: #abb4d2
}


</style>

<style>

.chat-1 {

position: fixed;
bottom: 20px;
left: 50%;
transform: translateX(-50%);
width: 80%;
background-color:var(--chat1-background-color);
padding: 6px;
border-radius: .25rem;

display: flex;
justify-content: space-between;


}
.chat-1 .textarea-msg {
resize: none; 
width: 100%;

/* 去除边框 */
border: none;
resize: none;
/* 去除选中后的边框 */
outline:none;

font-size: 14px;
font-family: "Public Sans",sans-serif;
padding: 5px;

color: var(--chat1-background-background-textarea-color);
background-color:#ffffff00;

}
.chat-1 .button-1 {
margin-left: 6px;
max-height: 26px;
padding: 5px;
align-self: flex-end;
margin-bottom: 1px;
background-color: transparent; /* 设置为透明背景色 */
border: 0px solid transparent; /* 设置为透明边框 */
transition: border-color 0.2s ease-in-out; /* 添加过渡效果 */
outline: none; /* 去除默认的外部边框 */
color: rgb(231, 225, 225); /* 设置为黑色字体 */
font-size: 16px;
border-radius: .25rem;
cursor: pointer;

}
.chat-1 .button-1:hover {
background-color: var(--chat1-button-background) ; /* 焦点时添加黑色边框 */
}
.chat-1 .button-1:disabled {
  background-color: transparent;
  cursor: not-allowed; 
}

.chat-2 {
position: fixed;
bottom: 20px;
left: 50%;
transform: translateX(-50%);
}



</style>


<!-- 重写md -->
<style>

 .md-editor .md-editor-preview {
    --md-theme-color: #222;
    --md-theme-color-reverse: #eee;
    --md-theme-color-hover: #eee;
    --md-theme-color-hover-inset: #ddd;
    --md-theme-link-color: #2d8cf0;
    --md-theme-link-hover-color: #73d13d;
    --md-theme-border-color: #e6e6e6;
    --md-theme-border-color-reverse: #bebebe;
    --md-theme-border-color-inset: #d6d6d6;
    --md-theme-bg-color: #fff;
    --md-theme-bg-color-inset: #ececec;
    --md-theme-bg-color-scrollbar-track: #ffffff00;
    --md-theme-bg-color-scrollbar-thumb: #69727C;
    --md-theme-bg-color-scrollbar-thumb-hover: rgba(0, 0, 0, 0.3490196078);
    --md-theme-bg-color-scrollbar-thumb-active: rgba(0, 0, 0, 0.3803921569);
    --md-theme-code-copy-tips-color: inherit;
    --md-theme-code-copy-tips-bg-color: #fff
} 

.md-editor .default-theme {
    --default-theme-code-block-color: #a9b7c6;
    --default-theme-code-bg-color: #282c34;
    --default-theme-code-before-bg-color: var(--default-theme-code-bg-color);
    --md-theme-code-copy-tips-color: #141414
}


.default-theme pre::before {
    content: "";
    display: block;
   /*  background:  url(data:image/png;base64,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);;
   */ 
    background:none;
    height: 32px;
    width: 100%;
    background-size: 40px;
    background-repeat: no-repeat;
    background-color: var(--default-theme-code-before-bg-color);
    margin-bottom: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-position: 10px 10px
}

.default-theme pre {
    position: relative;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, .3333333333) 0px 2px 2px;
   
}

</style>
 

<style>






.chat-button{
      color:var(--md-text-color);
      background: rgba(0,0,0,0);
      border:none;
      padding:0px 0px 5px 20px;
      cursor:pointer;
}

.animate-typing .dot {
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    margin-right: -1px;
    background: var(--md-text-color);
    -webkit-animation: wave 1.3s linear infinite;
    animation: wave 1.3s linear infinite;
    opacity: .6
}

.animate-typing .dot:nth-child(2) {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s
}

.animate-typing .dot:nth-child(3) {
    -webkit-animation-delay: -.9s;
    animation-delay: -.9s
}

@-webkit-keyframes wave {
    0%,100%,60% {
        -webkit-transform: initial;
        transform: initial
    }

    30% {
        -webkit-transform: translateY(-5px);
        transform: translateY(-5px)
    }
}

@keyframes wave {
    0%,100%,60% {
        -webkit-transform: initial;
        transform: initial
    }

    30% {
        -webkit-transform: translateY(-5px);
        transform: translateY(-5px)
    }
}

</style>


<style>

.container-menu {
  position: fixed;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  margin: 0 auto;
  background-color: var(--container-menu-color); 

}
.container-menu.expanded {
  width: 400px;
  height: 100%;
}
@media (max-width: 400px) {
.container-menu.expanded {
  width: 85%;
}
}

.circle-button {
  cursor: pointer;
  position: fixed;
  width: 30px;
  height: 30px;
  border-radius: 50%; 
  background-color:  var(--container-menu-color);
  border: none;
  box-shadow: none;
  top: 45%;
  left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  
}

.circle-button.expanded {
  left: 385px;
}
@media (max-width: 400px) {
  .circle-button.expanded{
   left: 81%;
}
}


.circle-button-down {
 
  cursor: pointer;
  position: fixed;
  width: 30px;
  height: 30px;
  border-radius: 50%; 
  background-color:  var(--container-menu-color);
  border: none;
  box-shadow: none;
  bottom: 65px; 
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.6;
}

</style>