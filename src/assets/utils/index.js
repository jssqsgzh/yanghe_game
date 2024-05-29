import { ElMessage } from 'element-plus'
import confetti from "canvas-confetti";

export const showMessage = (types, msg) => {
    ElMessage({
        message: msg,
        type: types,
    })
}
export const isPcWindow = () => {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone","iPod"];
    var flag = true;
    if(localStorage.getItem('client_room_id')){
        flag = true
    }else{
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {//表示是移动端
                flag = false;
            }else{
                if (window.matchMedia("(max-width: 900px)").matches){//如果pc端的宽度小于750,自动进入移动端
                    flag = false;
                    break;
                }
            }
        }
    }
    return flag;
}
const randomInRange = (min, max) => {
    return Math.random() * (max - min) + min;
};
export const snow = () => {
    var timeLeft = animationEnd - Date.now();
    var ticks = Math.max(200, 500 * (timeLeft / duration));
    skew = Math.max(0.8, skew - 0.001);

    confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: ticks,
        origin: {
            x: Math.random(),
            y: Math.random() * skew - 0.2,
        },
        colors: ["#ffffff", "#E61F19"],
        shapes: ["circle"],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.4, 1),
        drift: randomInRange(-0.4, 0.4),
    });

    if (timeLeft > 0) {
        requestAnimationFrame(snow);
    }
};