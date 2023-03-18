

<template>

<van-config-provider :theme="theme.state.data?'':'dark'"
>

<index />


</van-config-provider>

</template>



<script setup lang="ts">
import 'vant'
import 'vant/lib/index.css'
import index from './components/index.vue';
import { theme } from "./components/store";


</script>

<style>
:root {
  --scrollbar-color:#646D76;
  --bg-color: #303841;
  --text-color: #a6b0cf;
  --text-link-background-color:#36404a;
  --e-color:linear-gradient(to right, rgb(109, 107, 107), #ff0, rgba(255, 255, 255, 0.644), rgba(65, 145, 145, 0.849), #00f, rgb(116, 112, 116));
  --link-color:#a6b0cf;
  --btn-light-background-color:#36404a;
  --btn-light-color:#fff;
  --btn-light-background-color-on:#262d34; 
  --chat1-background-color:#36404A;
  --chat1-background-background-textarea-color:#ffffff;
  --chat1-button-background:#202123;
  --md-text-color: #e7e7e7;
  --ctext-wrap-content-background-color:#444654;
  --ctext-wrap-content-background-color-r: #49506E;
  --container-menu-color:#262E35;
  --chat-list-li-a-color:#abb4d2;
  --chat-list-li-a-background-color:#36404a;

}

/* light主题 */
:root[theme='light'] {
  --scrollbar-color:rgba(100, 109, 118, 0.137);
  --bg-color:#EEF1FA;
  --text-color: #4e4545;
  --text-link-background-color:#e0e5ee;
  --e-color:linear-gradient(to right, rgb(54,55,56), #ff0, rgba(54,55,56, 0.644), rgba(54,55,56, 0.849), #00f, rgb(116, 112, 116));
  --link-color:#585252;
  --btn-light-background-color:#ffffff;
  --btn-light-color:#3a3636;
  --btn-light-background-color-on:#b8b8b8; 
  --chat1-background-color:#ffffff;
  --chat1-background-background-textarea-color:#000000;
  --chat1-button-background:#00000021;
  --md-text-color: #3b3a3a;
  --ctext-wrap-content-background-color:#ffffff;
  --ctext-wrap-content-background-color-r:#3754d456;
  --container-menu-color:#f7f7f7;
  --chat-list-li-a-color:#717172;
  --chat-list-li-a-background-color:#d6d6d6;

}


body {
    margin: 0;
    font-family: "Public Sans",sans-serif;
    font-size: .9375rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--text-color);
    text-align: left;
    background-color: var( --bg-color)
}

::-webkit-scrollbar {
	 width: 6px;
	 height: 0px;
}
::-webkit-scrollbar-thumb {
	border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  background-color: var(--scrollbar-color);
}
::-webkit-scrollbar-track {
	background-color: transparent;
}
.mb-0,.my-0 {
    margin-bottom: 0!important
}

.mb-4,.my-4 {
    margin-bottom: 1.5rem!important
}

</style>

