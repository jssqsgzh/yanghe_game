<template>
    <div v-show="num != 0">
        <van-dialog v-model:show="show" title="标题" :showConfirmButton="false">
            <div class="award-content flex_column_center">
                <h2>恭喜中了洋河礼品</h2>
                <h3 v-if="awardCode == 'game_0603_win1'">抽纸一盒</h3>
                <p class="desc">（奖品数量有限，送完即止）</p>
                <img v-if="awardCode == 'game_0603_win1'" class="paper-img" :src="basic_static + 'image/paper.png'" alt="" />
                <img v-else-if="awardCode == 'game_0603_win2'" class="award-img" :src="basic_static + 'image/award1.png'" alt="" />
                <img v-else-if="awardCode == 'game_0603_win3'" class="award-img" :src="basic_static + 'image/award2.png'" alt="" />
                <p class="line"></p>
                <div class="flex_column_center tip-box" v-if="awardCode == 'game_0603_win1'">
                    <p class="tip">凭中奖页面在洋河导购员处领取</p>
                    <p>{{ voucherCode }}</p>
                </div>
                <div v-else class="flex_column_center award-code">
                    <!-- <Vue3NextQrcode :text="code_url" size="130" :whiteMargin="false" /> -->
                    <img v-if="awardCode == 'game_0603_win2' && browser == 'wechat'" class="qrcode-img" :src="basic_static + 'image/yanghe_wechat_12.8.png'" alt="" />
                    <img v-else-if="awardCode == 'game_0603_win2' && browser == 'alipay'" class="qrcode-img" :src="basic_static + 'image/yanghe_alipay_12.8.png'" alt="" />
                    <img v-else-if="awardCode == 'game_0603_win3' && browser == 'wechat'" class="qrcode-img" :src="basic_static + 'image/yanghe_wechat_18.8.png'" alt="" />
                    <img v-else-if="awardCode == 'game_0603_win3' && browser == 'alipay'" class="qrcode-img" :src="basic_static + 'image/yanghe_alipay_18.8.png'" alt="" />
                    <p>{{ browser == "wechat" ? "微信" : "支付宝" }}扫码或长按识别领取</p>
                </div>
            </div>
            <img class="close-img" :src="basic_static + 'image/close.png'" @click="cancel" alt="" />
        </van-dialog>
        <div class="egg-main">
            <div class="num-box">
            <p style="color: #fff; opacity: 1; z-index: 111"> 抽奖机会：{{ num ? num : 0 }}次 </p>
            </div>
            <el-carousel :interval="2000" type="card" style="margin-top: 30px" @change="changeTab" >
                <el-carousel-item v-for="(item, indexs) in eggList" :key="item.id">
                    <div class="flex_column_center egg-box">
                    <div class="break" v-if="item.boom">
                        <img :src="basic_static + 'image/egg-broken1.png'" alt="" class="break-top" v-show="item.step == 1" />
                        <img :src="basic_static + 'image/egg-broken2.png'" alt="" class="break-top" v-show="item.step == 2" />
                        <img :src="basic_static + 'image/egg-broken3.png'" alt="" class="break-top" v-show="item.step == 3" />
                        <img :src="basic_static + 'image/egg-broken4.png'" alt="" class="break-top" v-show="item.step == 4" />
                        <img :src="basic_static + 'image/egg-broken5.png'" alt="" class="break-top" v-show="item.step == 5" />
                        <img :src="basic_static + 'image/egg-broken6.png'" alt="" class="break-top" v-show="item.step == 6" />
                        <img :src="basic_static + 'image/egg-broken7.png'" alt="" class="break-top" v-show="item.step == 7" />
                        <img :src="basic_static + 'image/egg-broken8.png'" alt="" class="break-top" v-show="item.step == 8" />
                        <!-- :style="item.step > 8 ? `transform:translateY(${indexs == 0 ? '-0.5rem' : '-0.5rem'})` : ``" -->
                        <!-- <img :src="basic_static + 'image/egg-broken-half2.png'" alt="" class="break-bottom" v-show="item.boom" id="break-bottom" :class="item.step > 8 ? 'broken-egg1' : 'broken-egg2'" /> -->
                        <img :src="basic_static + 'image/egg-broken-half2.png'" alt="" class="break-bottom" v-show="item.boom"
                            :style="
                                item.step > 8 && tab != indexs
                                ? `transform:translateY(-0.6rem)`
                                : item.step <= 8 && tab != indexs
                                ? 'transform:translateY(-23.4rem)'
                                : item.step>8 && tab == indexs?'transform:translateY(3.2rem)':item.step<=8 && tab == indexs?'transform:translateY(-19.6rem)':''
                            " id="break-bottom" />
                    </div>
                    <img :src="basic_static + 'image/dan.png'" alt="" ref="eggTop" :class="['egg-top', index == 1 ? '' : 'eddAnmiation']" v-show="!item.boom" @click.stop="boom(item)" />
                    <img v-if="item.hammer" :src="basic_static + 'image/hammer.png'" alt="" class="hammer" />
                    </div>
                </el-carousel-item>
            </el-carousel>
            <el-carousel :interval="111111500" type="card" style="transform: translateY(-6.6rem)" >
                <el-carousel-item v-for="item in 3" :key="item">
                    <div class="flex_column_center egg-box">
                        <img :src="basic_static + 'image/dizuo_01.png'" v-if="item == 1" alt="" class="egg-bottom" />
                        <img :src="basic_static + 'image/dizuo_02.png'" v-if="item == 2" alt="" class="egg-bottom" style="transform: translateY(-4.3rem)" />
                        <img :src="basic_static + 'image/dizuo_03.png'" v-if="item == 3" alt="" class="egg-bottom" style="transform: translateY(-6.1rem); width: 240px" />
                    </div>
                </el-carousel-item>
            </el-carousel>
            <div class="wrap tear-egg-box">
                <div class="col1"></div>
            </div>
        </div>
    </div>
    <div v-show="num == 0" class="no-count-box text_28_bold">您次数用完啦！</div>
</template>
  
<script setup>
    import { reactive, ref, onBeforeMount, onMounted } from "vue";
    import confetti from "canvas-confetti";
    import { award, enter } from "@/api/base";
    // import { Vue3NextQrcode } from "vue3-next-qrcode";
    import { useRouter, useRoute } from "vue-router";
    import { showMessage } from "@/assets/utils";
    import { storeToRefs } from "pinia";
    import useBaseStore from "@/store/base";
    const store = useBaseStore();
    const { domain_static, basic_static } = storeToRefs(store);
    const router = useRouter();
    const route = useRoute();
    const show = ref(false);
    let step = ref(0);
    let index = ref(1);
    let awardCode = ref("");
    let voucherCode = ref("");
    let commonAudio = ref();
    let boomList = ref([]);
    let tab = ref(0);
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
    var num = ref(null);
    const userId = localStorage.getItem("userId");
    
    const browser = localStorage.getItem("browser");
    var flag = ref(0)
  
    const init = () => {
        eggList.value = [
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
        ];
    };
  
    const enterGame = async () => {
        let res = await enter({ userId: userId });
        if (res) {
            num.value = res.data;
            localStorage.setItem("game_num", res.data);
            if (res.data == 0) {
                num.value = 0;
                localStorage.setItem("game_num", res.data);
                showMessage("error", "您次数用完啦！");
            } else {
                // commonAudio.value=new Audio(require('../assets/audio/knock.mp3'));
                // commonAudio.value.play()
            }
        }
    };
  
    const boom = (item) => {
        if(flag.value == 1){
            return
        }
        flag.value = 1
        let audio = new Audio( "https://s3.cn-northwest-1.amazonaws.com.cn/walmart-files/cny_game/yh_h5_game/win.mp3" );
        audio.onload = () => {
            audio.play();
            audio.pause();
        };
        commonAudio.value = new Audio( "https://s3.cn-northwest-1.amazonaws.com.cn/walmart-files/cny_game/yh_h5_game/knock.mp3" );
        commonAudio.value.onload = () => {
            commonAudio.value.play();
            commonAudio.value.pause();
        };
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
                if (item.step == 9) {
                    audio.pause();
                    getAwardState();
                }
                if (item.step > 3) {
                    item.hammer = false;
                }
            }, 250);
        }, 500);
        // }
    };
    const changeTab = (val) => {
        console.log(val);
        tab.value = val;
    };
    const cancel = () => {
        show.value = false;
        commonAudio.value.pause();
        init();
        num.value--;
        localStorage.setItem("game_num", num.value);
        // enterGame();
    };
    const getAwardState = async () => {
        let res = await award({ userId: userId, deviceId: browser});
        if (res) {
            if (res.data.awardCode) {
                awardCode.value = res.data.awardCode;
                voucherCode.value = res.data.voucherCode;
                show.value = true;
                index.value = 1;
                init();
            } else {
                showMessage("error", "次数已用完");
                num.value = 0;
                localStorage.setItem("game_num", 0);
            }
        }
        flag.value = 0
    };
  
    onMounted(() => {
        enterGame()
        // if (!localStorage.getItem("game_num")) {
        //     enterGame();
        // } else {
        //     num.value = localStorage.getItem("game_num");
        // }
    });
</script>
<style lang='scss' scoped>
    .egg-main { position: absolute; top: 186px; left: 50%; transform: translateX(-50%); width: 100%; }
    .break-bottom { width: 360px; height: auto; transform: translateY((-20.7rem)); }
    .break-top { width: 360px; height: auto; transform: translateY(-1.2rem) scale(1.5); }
    .break-top9 { transform: translateY(-9.2rem) scale(1.5); }
    ::v-deep .van-popup { background: url($basic_static + "image/award-bg.png"); background-size: 100% 90%; background-repeat: no-repeat; width: 70%; min-height: 200px; }
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
    .egg-top { width: 350px; height: auto; object-fit: contain; transform: translateY(-0.2rem); }
    .egg-bottom { width: 180px; height: auto; transform: translateY(-1rem); z-index: -1; }
    :deep(.el-carousel__mask) { display: none; }
    :deep(.el-carousel__arrow) { display: none; }
    :deep(.el-carousel__indicators) { display: none; }
    :deep(.el-carousel__item) { height: 240px; }
    :deep(.el-carousel__container) { height: 240px; }
    .egg-box { position: relative; }
    .hammer { width: 3rem; height: 3rem; position: absolute; top: 0rem; right: 1.2rem; animation: hit 300ms 1; }
    .eddAnmiation { animation: shake 700ms 2; }
    .award-content { color: #e61f19;
        h2 { font-size: 20px; font-weight: bold; margin-top: 20px; }
        h3 { font-size: 16px; font-weight: bold; margin-top: 10px; }
        .desc { font-size: 14px; margin-top: 10px; }
        .tip-box{padding: 0px 0 130px;
            .tip { font-size: 14px; margin-top: 20px;}
        }
        .paper-img { width: 60%; margin: 10px 0; }
        .award-img { width: 50%; margin: 10px 0; }
        .line { width: 60%; border-top: 1px solid #e61f19; }
    }
    .award-code { font-size: 14px; margin-top: 0; color: #1e1c1c; padding-bottom: 100px; }
    .no-count-box { position: absolute; top: 280px; left: 50%; transform: translateX(-50%); color: #fff; text-align: center; }
    .num-box { background: rgba(255, 255, 255, 0.36); border-radius: 36px; font-size: 16px; padding: 4px 6px; display: inline-block; color: #fff; font-weight: 600; position: absolute; left: 50%; transform: translateX(-50%); }
    // :deep(el-carousel__item.is-active) .egg-top{width:420px!important;}
    .qrcode-img{width: 60%; margin: 4px 0;max-width: 150px;height: auto;min-width: 80px;}
    :deep(.van-dialog){top: 55%;}
</style>
<style>
    .el-carousel__item.is-active .egg-top { width: 430px !important; transform: translateY(1.2rem) !important; }
    .el-carousel__item.is-active .egg-bottom { width: 210px; height: auto; transform: translateY(0.3rem); z-index: -1; }
    .broken-egg2 { transform: translateY(-2.5rem) !important; }
</style>