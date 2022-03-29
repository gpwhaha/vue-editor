<!--
 * @Date: 2022-03-25 09:35:44
 * @LastEditors: gepanwen
 * @LastEditTime: 2022-03-29 17:32:59
-->
<template>
    <viewFile v-bind:wpsUrl="jwpsUrl" v-bind:token="jtoken"/>
</template>
<script>
    import viewFile from '../components/view'
    export default {
        data(){
            return{
                jwpsUrl:'',
                jtoken:''
          }
        },
        created() {
            this.jwpsUrl = sessionStorage.wpsUrl;
            this.jtoken = sessionStorage.token;
        },
        // 通过组件渲染wps的 iframe 框架
        components: {
            viewFile
        }
    }
</script>
