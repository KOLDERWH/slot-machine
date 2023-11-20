<template>
<div class="buttons">
    <div class="container">
        <template v-for="(item,key,index) in fruit" :key="index">
            <div class="btn" @click="addScroe(key)">
                <div class="icon">
                    <div class="name">{{item.icon}}</div>
                </div>
             </div>
        </template>
        <div class="btn" @click="resetScore">
            <div class="icon">
                <div class="name">重置</div>
            </div>
        </div>
        <div class="btn" @click="startGame">
            <div class="icon">
                <div class="name">开始</div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref } from "vue";

const prop = defineProps({
    fruit:{
        typeof:Object,
        default:()=>({})
    }
})

const  audio_btn = new Audio("./assets/audio/button.mp3")
const  start_btn = new Audio("./assets/audio/start-btn.wav")
const  reset_btn = new Audio("./assets/audio/reset.wav")
const emit = defineEmits()

const click_btn=ref("")

const addScroe=(item)=>{
    click_btn.value = item
    click_sound(start_btn)
    emit("addScore",item)
}
const resetScore=()=>{
    click_sound(reset_btn)
    emit("resetScore")
}
const startGame=()=>{
    click_sound(audio_btn)
    emit("startGame")
}

const click_sound =(item)=>{
    item.currentTime = 0;
    item.play();
}

</script>

<style scoped lang="less">
.buttons {
    user-select:none;
    margin: 0 auto;
    align-items: center;
    margin-top: 18px;
    margin: 0 auto;
    .container{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        .btn {
            cursor: pointer;
            .icon {
                height: 65px;
                width: 65px;
                display: inline-block;
                flex: 1;
                background: #ffaa00;
                border-radius: 50%;
            
                text-align: center;
    
                -webkit-box-shadow: 11px 9px 3px -6px rgba(0,0,0,0.36); 
                box-shadow: 11px 9px 3px -6px rgba(0,0,0,0.36);
                    .name {
                    margin-top: 20px;
                    /* position: absolute; */
                    /* left: 0;
                    right: 0; */
                }
            }
        }
        .click_effec{
            background: #ddaa33;
            color: #fff;
            -webkit-box-shadow: 6px 8px 12px -6px #000000;
            box-shadow: 6px 8px 12px -6px #000000;
        }
    }
    }
</style>