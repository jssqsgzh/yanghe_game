<!--  -->
<template>
    <div v-show="num != 0">
        <!-- <div class="award-main" @click="show = true">弹出</div>
        <div class="award-main" @click="confetti">撒花</div>
        <div class="award-main" @click="snow">下雪</div> -->
        <van-dialog v-model:show="show" title="标题" :showConfirmButton="false">
            <div class="award-content flex_column_center">
                <h2>恭喜中了洋河礼品</h2>
                <h3 v-if="awardCode == 'game_0603_win1'">抽纸一盒</h3>
                <p class="desc">（奖品数量有限，送完即止）</p>
                <img v-if="awardCode == 'game_0603_win1'" class="paper-img" src="../assets/img/paper.png" alt="" />
                <img v-else-if="awardCode == 'game_0603_win2'" class="award-img" src="../assets/img/award1.png" alt="" />
                <img v-else-if="awardCode == 'game_0603_win3'" class="award-img" src="../assets/img/award2.png" alt="" />
                <p class="line"></p>
                <div class="flex_column_center" v-if="awardCode == 'game_0603_win1'">
                    <p class="tip">凭中奖页面在洋河导购员处领取</p>
                    <p>{{ voucherCode }}sssss</p>
                </div>
                <div v-else class="flex_column_center award-code">
                    <Vue3NextQrcode :text="code_url" size="130" :whiteMargin="false" />
                    <p>微信扫码或长按识别领取</p>
                </div>
            </div>
            <img class="close-img" src="../assets/img/close.png" @click="show = false;commonAudio.pause()" alt="" />
        </van-dialog>
        <div class="egg-main">
            <el-carousel :interval="600" type="card" style="margin-top: 10rem" @change="changeTab" >
                <el-carousel-item v-for="item in eggList" :key="item.id">
                    <div class="flex_column_center egg-box">
                        <div class="break" v-if="item.boom">
                            <img src="@/assets/img/egg-broken1.png" alt="" class="break-top" v-show="item.step == 1" />
                            <img src="@/assets/img/egg-broken2.png" alt="" class="break-top" v-show="item.step == 2" />
                            <img src="@/assets/img/egg-broken3.png" alt="" class="break-top" v-show="item.step == 3" />
                            <img src="@/assets/img/egg-broken4.png" alt="" class="break-top" v-show="item.step == 4" />
                            <img src="@/assets/img/egg-broken5.png" alt="" class="break-top" v-show="item.step == 5" />
                            <img src="@/assets/img/egg-broken6.png" alt="" class="break-top" v-show="item.step == 6" />
                            <img src="@/assets/img/egg-broken7.png" alt="" class="break-top" v-show="item.step == 7" />
                            <img src="@/assets/img/egg-broken8.png" alt="" class="break-top" v-show="step == 8" />
                            <img src="@/assets/img/egg-broken9.png" alt="" class="break-top" v-show="item.step == 9" />
                            <img src="@/assets/img/egg-broken-half2.png" alt="" class="break-bottom" v-show="item.boom" :style="item.step > 9 ? 'transform:translateY(0.4rem)' : ''" id="break-bottom" />
                        </div>
                        <img src="@/assets/img/dan.png" alt="" ref="eggTop" :class="['egg-top',index==1?'':'eddAnmiation']" v-show="!item.boom" @click="boom(item)" />
                        <img v-if="item.hammer" src="../assets/img/hammer.png" alt="" class="hammer" />
                    </div>
                </el-carousel-item>
            </el-carousel>
            <el-carousel :interval="1111500" type="card" style="transform: translateY(-4rem)">
                <el-carousel-item v-for="item in 3" :key="item">
                    <div class="flex_column_center egg-box">
                        <img src="@/assets/img/dizuo_01.png" v-if="item == 1" alt="" class="egg-bottom" />
                        <img src="@/assets/img/dizuo_02.png" v-if="item == 2" alt="" class="egg-bottom" style="transform: translateY(-2.8rem)" />
                        <img src="@/assets/img/dizuo_03.png" v-if="item == 3" alt="" class="egg-bottom" style="transform: translateY(-2.8rem)" />
                    </div>
                </el-carousel-item>
            </el-carousel>
            <div class="wrap tear-egg-box">
                <div class="col1"> </div>
            </div>
        </div>
    </div>
    <div v-show="num == 0" class="no-count-box text_28_bold">
        您次数用完啦！
    </div>
</template>

<script setup>
import { reactive, ref, onBeforeMount, onMounted } from "vue";
import confetti from "canvas-confetti";
import {award, enter} from '@/api/base'
import { Vue3NextQrcode } from 'vue3-next-qrcode'
import { useRouter, useRoute } from 'vue-router'
import { showMessage } from "@/assets/utils";
const router = useRouter()
const route = useRoute()
const show = ref(true);
let step = ref(0);
let index = ref(1);
let awardCode = ref('')
let voucherCode = ref('')
let commonAudio=ref()
let eggList = ref([
    {
        id: 1,
        boom: false,
        step: 0,
        hammer: false,
    },
    {
        id: 2,
        boom: false,
        step: 0,
        hammer: false,
    },
    {
        id: 3,
        boom: false, //是否敲击
        step: 0, //控制碎蛋
        hammer: false, //控制锤子
    },
]);
var duration = 15 * 1000;
var animationEnd = Date.now() + duration;
var skew = 1;
let eggTop = ref();
const code_url = ref('http://www.baidu.com')
var num = ref(null)
const userId = localStorage.getItem('userId')

const enterGame = async() => {
    let res = await enter({userId:userId})
    if(res){
        num.value = res.data
        if(res.data == 0){
            // num.value = 0
            showMessage('error','您次数用完啦！')
        }else{
            // commonAudio.value=new Audio(require('../assets/audio/knock.mp3'));
            // commonAudio.value.play()
        }
    }
}

const boom = (item) => {
    if (index.value == 1) {
        index.value = 2;
    } else {
        index.value = 1;
        let audio = new Audio(require('../assets/audio/win.mp3'));
        setTimeout(() => {
            item.hammer = true;
            setTimeout(() => {
                item.boom = true;
            }, 500);
            setTimeout(() => {
                audio.play();
            }, 300);
            let interval = setInterval(() => {
                item.step = item.step + 1;
                if (item.step > 9) {
                    // eggTop.style.
                    //  console.log( document.getElementById('break-bottom')) 表示结束需要弹出
                    clearInterval(interval);
                }
                if (item.step > 8) {
                    confetti();
                  
                }
                if(item.step==9){
                   audio.pause()
                    getAwardState()
                }
                if (item.step > 3) {
                    item.hammer = false;
                }
            }, 300);
        }, 1000);
    }
};
const changeTab = (val) => {
    console.log(val + 1);
};

const getAwardState = async() => {
    let res = await award({userId:userId})
    if(res){
        console.log(res,'resresres')
        if(res.data.awardCode){
            awardCode.value = res.data.awardCode
            voucherCode.value = res.data.voucherCode
            show.value = true
             commonAudio.value=new Audio(require('../assets/audio/knock.mp3'));
            commonAudio.value.play()
        }else{
            showMessage('error','次数已用完')
        }
    }
}

onMounted(() => {
    enterGame()
});
</script>
<style lang='scss' scoped>
.egg-main{position: absolute; top: 120px; left: 50%; transform: translateX(-50%);width: 100%;}
.break-bottom { width: 240px; height: auto; transform: translateY(-15rem); }
.break-top { width: 240px; height: auto; transform: translateY(-1.2rem) scale(1.5); }
::v-deep .van-popup { background: url($basic_static + "award-bg.png"); background-size: 100% 90%; background-repeat: no-repeat; width: 100%; min-height: 450px; }
.close-img { position: absolute; width: 24px; height: 24px; bottom: 0; z-index: 2003; left: 50%; transform: translateX(-50%); }
::v-deep .van-dialog__header { display: none; }

.container { perspective: 400px; perspective-origin: center top; width: 200px; height: 200px; background-color: pink; margin: 50px auto; }
.scene { position: relative; width: 200px; height: 200px; border: 3px solid blue; border-radius: 50%; margin: 50px auto; transform-style: preserve-3d; backface-visibility: visible; animation: spin 6s infinite linear; transform: rotateX(90deg); }
.egg-wrapper { position: absolute; top: 50%; left: 50%; width: 50px; height: 70px; margin: -35px 0 0 -25px; transform-style: preserve-3d; backface-visibility: visible; }
.egg { width: 100%; height: 100%; background-color: gold; border-radius: 50%; display: flex; align-items: center; justify-content: center; animation: spin-reverse 6s infinite linear; }
.egg-wrapper:nth-child(1) { transform: rotateZ(90deg) translateX(100px) rotateZ(-90deg) rotateX(-90deg); }
.egg-wrapper:nth-child(2) { transform: rotateZ(210deg) translateX(100px) rotateZ(-210deg) rotateX(-90deg); }
.egg-wrapper:nth-child(3) { transform: rotateZ(330deg) translateX(100px) rotateZ(-330deg) rotateX(-90deg); }

.tear-egg-box { position: absolute; top: 0; left: 0; }
.wrap { position: fixed; top: 10px; bottom: 10px; left: 10px; right: 10px; padding: 10px; margin: 10px; }
.col1 { height: 100%; position: relative; }
.col1 img { display: block; height: 100%; margin: 0 auto; }
@media screen and (max-width: 640px) {
  .col1 { border-radius: 50%; overflow: hidden; }
  .col1 img { width: 50%; height: auto; }
}
.egg-top { width: 240px; height: auto; }
.egg-bottom { width: 160px; height: auto; transform: translateY(-1.6rem); z-index: -1; }
:deep(.el-carousel__mask) { display: none; }
:deep(.el-carousel__arrow) { display: none; }
:deep(.el-carousel__indicators) { display: none; }
:deep(.el-carousel__item) { height: 140px; }
:deep(.el-carousel__container) { height: 140px; }
.egg-box { position: relative; }
.hammer { width: 3rem; height: 3rem; position: absolute; top: 0rem; right: 1.2rem; animation: hit 300ms 1; }

.eddAnmiation{ animation:shake 700ms 2; }

.award-content{color: #E61F19;padding:20px;
    h2{font-size: 28px;font-weight: bold;margin-top:20px;}
    h3{font-size: 24px;font-weight: bold;margin-top: 10px;}
    .desc{font-size: 18px;margin-top: 10px;}
    .tip{font-size: 20px;margin-top:20px;}
    .paper-img{width:50%;margin: 20px 0;}
    .award-img{width:80%;margin: 20px 0;}
    .line{width: 80%;border-top: 1px solid #E61F19;}
}
.award-code{font-size: 14px;margin-top: 0;color: #1E1C1C;padding-bottom: 120px;}
.no-count-box{position: absolute; top: 280px; left: 50%; transform: translateX(-50%);color: #fff;text-align: center;}
</style>