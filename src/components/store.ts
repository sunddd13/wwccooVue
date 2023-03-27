
import { createStore } from 'vuex'
import { reactive } from "vue"

export const openUserChatMod = createStore({
    state () {
      return {
     /*    openChatId: false */
           open_chatId_conversation_id: '' 
           ,now_chatId_conversation_id:''
      }
    }
})





interface robotaskReturnType {
    retCode?: number
    data?: {
      msg: string
    },
    gpt?: {
      key: string
    }
}

export const robotaskReturn = createStore({
  state(){
    return reactive<robotaskReturnType>({})
  }
})

interface roboTaskDataReturnType {
    code?: number,
    conversation_id?: string
    data?: string
    end_turn?: Boolean 
    parent_message_id?: string
    message_id?:string
    /* 翻译 */
    fanyi?:boolean;
    data_fanyi?: string
}

export const roboTaskDataReturn = createStore({
  state(){
    return  reactive<roboTaskDataReturnType>({})
  }
})


interface chatContentType {
    sendChatData: string
    roboTaskData: roboTaskDataReturnType 
    code?: number
}
export const chatContent = createStore({
  state(){
    return reactive<chatContentType[]>([]) }
})




export const theme = createStore({
  state(){
    return {
      data:false
    }
}
})





export const formWorkSendHtml = createStore({
  state(){
    return {
      data:false
    }
}
})
