<template>
<div class="machine">
    <div class="body">
        <table>
            <thead>
                <tr>
                    <th class="top" colspan="3"> WIN: {{config.rewardScore}} </th>
                    <th class="top"></th>
                    <th class="top" colspan="3">CREDIT: {{config.coinScore}}</th>
                </tr>
            </thead>

            <tbody ref="gamebody">
                <td class="fruit fruit1 orange">{{score.orange.icon}}✖10</td>
                <td class="fruit fruit2 bell">{{score.bell.icon}}✖10</td  >
                <td class="fruit fruit3 s-bar small">{{score.bar.icon}}✖25</td>
                <td class="fruit fruit4 bar">{{score.bar.icon}}✖50</td>
                <td class="fruit fruit5 apple">{{score.apple.icon}}✖5</td>
                <td class="fruit fruit6 s-apple small">{{score.apple.icon}}✖2</td>
                <td class="fruit fruit7 lemon">{{score.lemon.icon}}✖10</td>
                <tr>
                    <td class="fruit fruit24  s-bell small">{{score.bell.icon}}✖2</td>
                    <td colspan="5" rowspan="5" class="slot-bg"></td>
                    <td class="fruit fruit8  watermelon">{{score.watermelon.icon}}✖10</td>
                </tr>
                <tr>
                    <td class="fruit fruit23 apple">{{score.apple.icon}}✖5</td>
                    <td class="fruit fruit9  s-watermelon small">{{score.watermelon.icon}}✖2</td>
                </tr>
                <tr>
                    <td class="fruit fruit22 good-luck">good luck</td>
                    <td class="fruit  fruit10 good-luck">good luck</td>
                </tr>
                <tr>
                    <td class="fruit fruit21 s-star small">{{score.star.icon}}✖2</td>
                    <td class="fruit fruit11 apple">{{score.apple.icon}}✖5</td>
                </tr>
                <tr>
                    <td class="fruit fruit20 star ">{{score.star.icon}}✖20</td>
                    <td class="fruit fruit12  s-orange small">{{score.orange.icon}}✖2</td>
                </tr>
                <tr>
                    <td class="fruit fruit19 lemon">{{score.lemon.icon}}✖10</td>
                    <td class="fruit fruit18 s-lemon small">{{score.lemon.icon}}✖2</td>
                    <td class="fruit fruit17 s-apple small">{{score.apple.icon}}✖2</td>
                    <td class="fruit fruit16 seven">77✖20</td>
                    <td class="fruit fruit15 s-seven small ">77✖2</td>
                    <td class="fruit fruit14 bell ">{{score.bell.icon}}✖10</td>
                    <td class="fruit fruit13 orange">{{score.orange.icon}}✖10</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="icon-score">
        <div class="container">
            <template v-for="(item,key,index) in score" :key="index">
                <div class="item">
                    <div class="icon">{{item.coin}}</div>
                    <div class="score">{{item.icon}}</div>
                </div>
            </template>
        </div>

    </div>
    <SlotButtons :fruit="score" 
            @addScore="addScore" 
            @startGame="startGame"
    @resetScore="resetScore"></SlotButtons>
</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import SlotButtons from './cpns/Slot-Buttons.vue';
import runLottery from "../util/slot"

const score=ref({
    bar:{
        value:100,
        coin:0,
        icon:"🎰",
    },
    seven:{
        value:100,
        coin:0,
        icon:"77",
    },
    star:{
        value:100,
        coin:0,
        icon:"⭐",
    },
    watermelon:{
        value:100,
        coin:0,
        icon:"🍉",
    },
    bell:{
        value:100,
        coin:0,
        icon:"🔔",
    },
    lemon:{
        value:100,
        coin:0,
        icon:"🍋",
    },
    orange:{
        value:100,
        coin:0,
        icon:"🍊",
    },
    apple:{
        value:100,
        coin:0,
        icon:"🍎",
    },
})

const rewardList={
    "apple":5,
    "s-apple":2,
    "orange":10,
    "s-orange":2,
    "lemon":10,
    "s-lemon":2,
    "bell":10,
    "s-bell":2,
    "watermelon":10,
    "s-watermelon":2,
    "star":20,
    "s-star":2,
    "seven":20,
    "s-seven":2,
    "bar":50,
    "s-bar":25,
}

const  reward2coin_btn = new Audio("./assets/audio/reward2coin.wav")
// const  bgm = new Audio("./src/assets/audio/bgm.wav")

const gamebody=ref()

onMounted(()=>config.value.count=getRewardIndex())

const config=ref({
    count :1,
    loopCount: 0,
    stopLoop : 3,
    isRuning:false,
    isCoin:false,
    isluck:false,
    luckcount:0,
    speed:30,
    coinScore:20,
    rewardScore:0,
})

// 起始点
let startIndex = config.value.count

const getIndex=(count)=>{
    let result= count 
    if(count<=0){
        result= 24+count
    }
    if(count>24){
        result= count-24
    }
    return result
}
// 加分
const addScore=(item)=>{
    if(!config.value.isRuning && config.value.coinScore &&config.value.rewardScore ==0 ){
        config.value.isCoin =true
        preCast={}
        score.value[item].coin++
        config.value.coinScore--;
    }
}

// 重置分数
const resetScore=()=>{
    if(config.value.isRuning) return
    config.value.isCoin =false
    for(let item in score.value){
        config.value.coinScore+=score.value[item].coin;
        score.value[item].coin=0
    }
}

// 开始旋转
const startwheel=(rewardIndex)=>{
    const fruitnow =  gamebody.value.querySelector(`.fruit${config.value.count}`)
    const fruitnow1 =  gamebody.value.querySelector(`.fruit${getIndex(config.value.count-1)}`)
    const fruitnow2 =  gamebody.value.querySelector(`.fruit${getIndex(config.value.count-2)}`)
    const fruitnow3 =  gamebody.value.querySelector(`.fruit${getIndex(config.value.count-3)}`)
    const fruitnow4 =  gamebody.value.querySelector(`.fruit${getIndex(config.value.count-4)}`)

    if(fruitnow1.classList.contains("active")){
        fruitnow1.classList.toggle("active")
    }
    if(fruitnow2.classList.contains("active1")){
        fruitnow2.classList.toggle("active1")
    }
    if(fruitnow3.classList.contains("active2")){
        fruitnow3.classList.toggle("active2")
    }
    if(fruitnow4.classList.contains("active3")){
        fruitnow4.classList.toggle("active3")
    }
    if(fruitnow4.classList.contains("active")){
        fruitnow4.classList.toggle("active")
    }

    fruitnow.classList.add("active")

    //结束游戏
    if(config.value.loopCount ==config.value.stopLoop && config.value.count==rewardIndex){
        const oriname = fruitnow.classList[2]
        if(oriname == "good-luck"){
            goodLuck()
            return
        }   
        stopwheel()
        const name = fruitnow.classList[2].replace("s-","");
        config.value.rewardScore += score.value[name].coin?rewardList[oriname]*score.value[name].coin:0;
        if(config.value.rewardScore==0) clearScore()
        return
    }

    //清空样式
    fruitnow1.classList.add("active1")
    fruitnow2.classList.add("active2")
    fruitnow3.classList.add("active3")

    config.value.count++;
    //加圈数
    if(config.value.count>24){
        config.value.loopCount++;
        config.value.count=1;
    }
}

const goodLuck = ()=>{

    config.value.luckcount = Math.floor(Math.random()*3+1)
    console.log(config.value.luckcount);
    console.log("stop");
    stopwheel()
    // setTimeout(() => {
    //     console.log("stop");
    //     stopwheel()
    // }, 1500);
}

//结束游戏
const stopwheel=()=>{
    config.value.count =getIndex(config.value.count+3);
        config.value.loopCount=0;
        clearInterval(start)
        start=null
        setTimeout(() => {
            config.value.isRuning = false
            if(config.value.luckcount>0){
                startGame()
                config.value.luckcount--;
            }
        }, 600);
}
// 清空下注
const clearScore=()=>{
    if(config.value.luckcount <= 0){
        config.value.isCoin = false
        for(let item in score.value){
         score.value[item].coin=0
        }
    }
}

const getRewardIndex=()=>{
    const probabilitys = [
    50, 75, 20, 5, 30, 80, 75,
    100, 25, 10, 30, 25,
    50, 75, 70, 20, 30, 25, 50,
    20, 70, 10, 30, 25];
    


    let rewardNum =  runLottery(probabilitys)
    // let rewardNum = Math.floor( Math.random()*24+1)
    if(config.value.luckcount > 0 &&(rewardNum == 10 || rewardNum == 22)){
        rewardNum =getIndex(rewardNum+Math.floor( Math.random()*11)) 
    }

    // if(config.value.luckcount > 0 &&(rewardNum == 10 || rewardNum == 22)){
    //     rewardNum =getIndex(Math.floor( Math.random()*11)) 
    // }
    return  rewardNum
}

// 用于记录前一次的数据
let preCast={}

//计算金币总数
const getCoinCount=(coinpool)=>{
    let count = 0
    for(let item in coinpool){
        count+=coinpool[item]
    }
    return count
}

const copyCoinStatus = (coinScore,backup)=>{
    for(let item in coinScore){
        backup[item]=coinScore[item].coin;
    }

}

const startGame=()=>{

    // 游戏在运行或者抽到luck跳过
    if(!config.value.isRuning && config.value.luckcount <= 0){
        if(config.value.rewardScore){
            reward2coin_btn.currentTime = 0;
            reward2coin_btn.play();
            config.value.coinScore+=config.value.rewardScore
            config.value.rewardScore=0;
            clearScore()
            return
        }
        //重复上一次
        if( preCast.apple){
            let current_cast = getCoinCount(preCast)
            if(config.value.coinScore>=current_cast){
                //和上一次一样下注
                console.log("do it again");
                for(let item in score.value){
                    score.value[item].coin = preCast[item];
                }
                // 扣分
                config.value.coinScore-=current_cast
                config.value.isCoin = true
            }else{
                // 分数不够
                preCast={}
                return
            }
        }
    }
    
    //没投币就退出
    if(!config.value.isCoin||start){
        return
    } 
    const rewardIndex = getRewardIndex()

    //记录本次下注
    copyCoinStatus(score.value,preCast)

    config.value.isRuning = true
    startIndex = config.value.count
 
    wheelinterval(rewardIndex,config.value.speed)
}

// interval函数执行旋转
// 初始化计数器
let start=null;
const wheelinterval = (rewardIndex,speed=30)=>{
        start=setInterval(() => {
            startwheel(rewardIndex)
    }, speed);
}


</script>

<style lang="less" scoped>
.machine{
    user-select:none;
    .body{
       
        table {
            border-collapse: collapse;
            margin: 0 auto;
            text-align: center;
            font-size: 20px;
            th, td {
                margin: 0;
                padding: 0;
                border: 1px solid #333;
                width: 70px;
                height: 70px;
            }
            .top{
                color: #a00;
                font-size: 24px;
                font-weight: 700;
                border: none;

            }
            .small{
                font-size: 18px;
            }
            .fruit {
                background-size: 390%;
            }
            .apple {
                background-position: 10px 6px;
            }
            .bar {
                background-position: 300px 100px;
            }
            .bell {
                background-position: 200px 100px;
            }
            .active{
                background: rgba(255,0,0,.8);
            }
            .active1{
                background: rgba(0,230,0,.7);
            }
            .active2{
                background: rgba(0,0,220,.6);
            }
            .active3{
                background: rgba(220,0,0,.5);
            }
            
        }
    }
 

    .slot-bg {
        background: url("./src/assets/img/bg.png") center;
    }
    .icon-score {   
        justify-content: center;
        text-align: center;
        margin: 10px;
        color: #a00;
        font-size: 24px;
        font-weight: 700;
        .container{
            display: flex;
            justify-content: center;
            .item{
                width: 65px;
                height: 65px;
            }
        }
    }
    
}

</style>