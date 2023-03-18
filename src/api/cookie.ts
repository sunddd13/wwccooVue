
export const setCookie = (name:string,value:string,day:number) => {
    let date = new Date()
    date.setDate(date.getDate() + day)
    document.cookie = name + '=' + value + ';expires=' + date
 }
  

 export const getCookie = (name:string) => {
    let reg = RegExp(name + '=([^;]+)')
    let arr = document.cookie.match(reg)
    if (arr) {
      return arr[1]
    } else {
      return ''
    }
 }
  

 export const delCookie = (name:string) => {
    let date = new Date()
    date.setDate(date.getDate() + -1)
    document.cookie = name + '=;expires=' + date
 }

