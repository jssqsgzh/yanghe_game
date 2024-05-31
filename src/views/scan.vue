<!--  -->
<template>
    <div class="scan-main flex_column_center" :class="isPc ? 'scan-pc' : ''">
        <div class="scan-box">
            <Vue3NextQrcode :text="REDIRECT_URL" :size="isPc ? '200' : '170'" colorDark="#0169B6" :whiteMargin="false" />
        </div>
        <p class="text_18_bold scan-text">{{ browser == 'wechat' ? '微信' : '支付宝'}}扫码参与抽奖</p>
    </div>
</template>

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
import { Vue3NextQrcode } from 'vue3-next-qrcode'
import {isPcWindow} from '@/assets/utils/index'
const isPc = isPcWindow()
const browser = localStorage.getItem('browser')
const REDIRECT_URL = 'https://www.baidu.com/'
const APPID = ''
// 微信
const wx_code_url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}redirect_uri=${REDIRECT_URL}&response_type=code&scope=snsapi_base#wechat_redirect`
// 支付宝
const zfb_code_url = `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=${APPID}&scope=auth_base&redirect_uri=${REDIRECT_URL}`
onMounted(() => {});
</script>
<style lang="scss" scoped>
.scan-main { position: absolute; top: 210px; left: 50%; transform: translateX(-50%);
  .scan-text { color: #fff;margin-top: 10px;}
  .scan-box { border-radius: 8px; padding: 8px; width: 100%;background: #fff;display: inline-block;width: auto;margin-top: 10px;;}
}
.qrcode{color: red;}
.scan-pc{top: 300px!important;
    .scan-text{font-size: 28px;}
}
</style>