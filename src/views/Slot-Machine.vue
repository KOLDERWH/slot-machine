<template>
  <div class="machine">
    <div
      id="blocker"
      :style="{ display: isBlocked ? 'block' : 'none' }"
      @click="startGameAndPlayMusic"
    >
      <div id="instructions">
        <p style="font-size: 48px">Click to play</p>
      </div>
    </div>
    <div class="dashboard">
      <table>
        <thead>
          <tr>
            <th class="top" colspan="3">
              WIN: <span class="score">{{ config.rewardScore }}</span>
            </th>
            <th class="top"></th>
            <th class="top" colspan="3">
              CREDIT:
              <span class="score">
                {{ config.coinScore }}
              </span>
            </th>
          </tr>
        </thead>

        <tbody ref="gamebody">
          <td class="fruit fruit1 orange">{{ score.orange.icon }}✖10</td>
          <td class="fruit fruit2 bell">{{ score.bell.icon }}✖10</td>
          <td class="fruit fruit3 s-bar small">{{ score.bar.icon }}✖25</td>
          <td class="fruit fruit4 bar">{{ score.bar.icon }}✖50</td>
          <td class="fruit fruit5 apple">{{ score.apple.icon }}✖5</td>
          <td class="fruit fruit6 s-apple small">{{ score.apple.icon }}✖2</td>
          <td class="fruit fruit7 lemon">{{ score.lemon.icon }}✖10</td>
          <tr>
            <td class="fruit fruit24 s-bell small">{{ score.bell.icon }}✖2</td>
            <td colspan="5" rowspan="5" class="slot-bg"></td>
            <td class="fruit fruit8 watermelon">
              {{ score.watermelon.icon }}✖10
            </td>
          </tr>
          <tr>
            <td class="fruit fruit23 apple">{{ score.apple.icon }}✖5</td>
            <td class="fruit fruit9 s-watermelon small">
              {{ score.watermelon.icon }}✖2
            </td>
          </tr>
          <tr>
            <td class="fruit fruit22 good-luck">good luck</td>
            <td class="fruit fruit10 good-luck">good luck</td>
          </tr>
          <tr>
            <td class="fruit fruit21 s-star small">{{ score.star.icon }}✖2</td>
            <td class="fruit fruit11 apple">{{ score.apple.icon }}✖5</td>
          </tr>
          <tr>
            <td class="fruit fruit20 star">{{ score.star.icon }}✖20</td>
            <td class="fruit fruit12 s-orange small">
              {{ score.orange.icon }}✖2
            </td>
          </tr>
          <tr>
            <td class="fruit fruit19 lemon">{{ score.lemon.icon }}✖10</td>
            <td class="fruit fruit18 s-lemon small">
              {{ score.lemon.icon }}✖2
            </td>
            <td class="fruit fruit17 s-apple small">
              {{ score.apple.icon }}✖2
            </td>
            <td class="fruit fruit16 seven">77✖20</td>
            <td class="fruit fruit15 s-seven small">77✖2</td>
            <td class="fruit fruit14 bell">{{ score.bell.icon }}✖10</td>
            <td class="fruit fruit13 orange">{{ score.orange.icon }}✖10</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="icon-score">
      <div class="container">
        <template v-for="(item, key, index) in score" :key="index">
          <div class="item">
            <div class="icon">{{ item.coin }}</div>
            <div class="score">{{ item.icon }}</div>
          </div>
        </template>
      </div>
    </div>
    <SlotButtons
      :fruit="score"
      @addScore="addScore"
      @startGame="startGame"
      @resetScore="resetScore"
    ></SlotButtons>
  </div>
</template>

<script setup lang="ts">
import reward2coin_btnAud from '@/assets/audio/reward2coin.wav';
import mainBgm from '@/assets/audio/Pixel-Peeker-Polka-faster(chosic.com).mp3';
import SlotButtons from './cpns/Slot-Buttons.vue';
import runLottery from '../util/slot.ts';
import { onMounted, ref } from 'vue';

//music
const reward2coin_btn = new Audio(reward2coin_btnAud);
const reawrdBgm = new Audio(mainBgm);

const gamebody = ref();

const score = ref({
  bar: {
    value: 100,
    coin: 0,
    icon: '🎰',
  },
  seven: {
    value: 100,
    coin: 0,
    icon: '77',
  },
  star: {
    value: 100,
    coin: 0,
    icon: '⭐',
  },
  watermelon: {
    value: 100,
    coin: 0,
    icon: '🍉',
  },
  bell: {
    value: 100,
    coin: 0,
    icon: '🔔',
  },
  lemon: {
    value: 100,
    coin: 0,
    icon: '🍋',
  },
  orange: {
    value: 100,
    coin: 0,
    icon: '🍊',
  },
  apple: {
    value: 100,
    coin: 0,
    icon: '🍎',
  },
});

const rewardList = {
  apple: 5,
  's-apple': 2,
  orange: 10,
  's-orange': 2,
  lemon: 10,
  's-lemon': 2,
  bell: 10,
  's-bell': 2,
  watermelon: 10,
  's-watermelon': 2,
  star: 20,
  's-star': 2,
  seven: 20,
  's-seven': 2,
  bar: 50,
  's-bar': 25,
};

const config = ref({
  count: 1, //current position
  loopCount: 0,
  stopLoop: 3,
  isRuning: false,
  isCoin: false,
  isluck: false,
  luckcount: 0,
  speed: 30,
  coinScore: 2000,
  rewardScore: 0,
  giftList: [],
});

// 用于控制遮罩显示
const isBlocked = ref(true);

// 用于记录前一次的数据
let preCast = { copyed: false };

// 起始点
let startIndex = config.value.count;

let rewardInterval;
let startAniamtion = null;

onMounted(() => (config.value.count = getRewardIndex()));

// 点击进入开始游戏并播放背景音乐
const startGameAndPlayMusic = () => {
  isBlocked.value = false; // 隐藏遮罩
  //   reawrdBgm.play();
};

const startGame = () => {
  // 游戏在运行或者抽到luck跳过
  if (!config.value.isRuning && config.value.luckcount <= 0) {
    console.log('isRuning', config.value.isRuning);
    console.log('startPosition', config.value.count);
    if (config.value.rewardScore) {
      reward2coin_btn.currentTime = 0;
      reward2coin_btn.play();
      if (rewardInterval) {
        config.value.coinScore += config.value.rewardScore;
        config.value.rewardScore = 0;
        console.log('直接将剩余奖励加到 coinScore');
        return;
      }
      updateReward(config.value.rewardScore);
      return;
    }
    //重复上一次
    clearRwardList();
    if (preCast.copyed) {
      let current_cast = getCoinCount(preCast);
      if (config.value.coinScore >= current_cast) {
        //和上一次一样下注
        console.log('do it again');
        for (let item in score.value) {
          score.value[item].coin = preCast[item];
        }
        // 扣分
        config.value.coinScore -= current_cast;
        config.value.isCoin = true;
      } else {
        // 分数不够
        preCast.copyed = false;
        return;
      }
    }
  }

  //没投币就退出
  if (!config.value.isCoin || startAniamtion) {
    return;
  }
  const rewardIndex = getRewardIndex();

  //记录本次下注
  copyCoinStatus(score.value, preCast);

  config.value.isRuning = true;
  startIndex = config.value.count;

  wheelinterval(rewardIndex, config.value.speed);
};

//结束游戏
const stopwheel = () => {
  config.value.count = getIndex(config.value.count + 3);
  config.value.isRuning = false;
  config.value.loopCount = 0;
  clearInterval(startAniamtion);
  startAniamtion = null;
  setTimeout(() => {
    if (config.value.luckcount > 0) {
      startGame();
      config.value.luckcount--;
    }
  }, 600);
};

const getIndex = (count) => {
  let result = count;
  if (count <= 0) {
    result = 24 + count;
  }
  if (count > 24) {
    result = count - 24;
  }
  return result;
};

// 加分
const addScore = (item) => {
  if (
    !config.value.isRuning &&
    config.value.coinScore &&
    config.value.rewardScore === 0
  ) {
    config.value.isCoin = true;
    preCast.copyed = false;
    score.value[item].coin++;
    config.value.coinScore--;
  }
};

// 重置分数
const resetScore = () => {
  if (config.value.isRuning) return;
  config.value.isCoin = false;
  for (let item in score.value) {
    config.value.coinScore += score.value[item].coin;
    score.value[item].coin = 0;
  }
};

const goodLuck = () => {
  config.value.luckcount = Math.floor(Math.random() * 3 + 1);
  console.log('luckCount', config.value.luckcount);
  console.log('stop');
  stopwheel();
  // setTimeout(() => {
  //     console.log("stop");
  //     stopwheel()
  // }, 1500);
};

// 清空下注
const clearScore = () => {
  if (config.value.luckcount <= 0) {
    config.value.isCoin = false;
    for (let item in score.value) {
      score.value[item].coin = 0;
    }
  }
};

const getRewardIndex = () => {
  let rewardNum = runLottery() + 1;
  if (config.value.luckcount > 0 && (rewardNum == 10 || rewardNum == 22)) {
    rewardNum = getIndex(rewardNum + Math.floor(Math.random() * 11));
  }

  return rewardNum;
};

//计算金币总数
const getCoinCount = (coinpool) => {
  let count = 0;
  for (let item in coinpool) {
    count += coinpool[item];
  }
  return count;
};

const copyCoinStatus = (coinScore, backup) => {
  backup.copyed = true;
  for (let item in coinScore) {
    backup[item] = coinScore[item].coin;
  }
};

const clearRwardList = () => {
  config.value.giftList.map((item) => {
    if (item.classList.contains('rewardList')) {
      item.classList.toggle('rewardList');
    }
  });
  config.value.giftList = [];
};

const updateReward = () => {
  if (rewardInterval) {
    clearInterval(rewardInterval);
  }

  let currentReward = 0;
  rewardInterval = setInterval(() => {
    // 每次增加一点奖励
    config.value.rewardScore--;
    config.value.coinScore += 1;
    // 如果奖励达到了最终值，清除定时器
    if (config.value.rewardScore <= 0) {
      clearInterval(rewardInterval);
      config.value.rewardScore = 0;
      rewardInterval = null;
    }
  }, 40); // 每30毫秒更新一次
};

// interval函数执行旋转
const wheelinterval = (rewardIndex, speed = 30) => {
  startAniamtion = setInterval(() => {
    startwheel(rewardIndex);
  }, speed);
};

// 开始旋转
const startwheel = (rewardIndex) => {
  const startIdx = config.value.count;
  const fruitCurrent = gamebody.value.querySelector(`.fruit${startIdx}`);
  const fruitCurrent1 = gamebody.value.querySelector(
    `.fruit${getIndex(startIdx - 1)}`
  );
  const fruitCurrent2 = gamebody.value.querySelector(
    `.fruit${getIndex(startIdx - 2)}`
  );
  const fruitCurrent3 = gamebody.value.querySelector(
    `.fruit${getIndex(startIdx - 3)}`
  );
  const fruitCurrent4 = gamebody.value.querySelector(
    `.fruit${getIndex(startIdx - 4)}`
  );

  if (fruitCurrent1.classList.contains('active')) {
    fruitCurrent1.classList.toggle('active');
  }
  if (fruitCurrent2.classList.contains('active1')) {
    fruitCurrent2.classList.toggle('active1');
  }
  if (fruitCurrent3.classList.contains('active2')) {
    fruitCurrent3.classList.toggle('active2');
  }
  if (fruitCurrent4.classList.contains('active3')) {
    fruitCurrent4.classList.toggle('active3');
  }

  //结束游戏
  if (
    config.value.loopCount >= config.value.stopLoop &&
    startIdx === rewardIndex
  ) {
    fruitCurrent.classList.add('rewardList');
    const rewardName = fruitCurrent.classList[2];
    config.value.giftList.push(fruitCurrent);

    if (rewardName === 'good-luck') {
      goodLuck();
      return;
    }
    stopwheel();

    //calc reward
    const name = fruitCurrent.classList[2].replace('s-', '');
    config.value.rewardScore += score.value[name].coin
      ? rewardList[rewardName] * score.value[name].coin
      : 0;
    if (config.value.rewardScore == 0) clearScore();
    return;
  }

  //添加样式
  fruitCurrent.classList.add('active');
  fruitCurrent1.classList.add('active1');
  fruitCurrent2.classList.add('active2');
  fruitCurrent3.classList.add('active3');

  config.value.count++;
  //加圈数
  if (config.value.count > 24) {
    config.value.loopCount++;
    config.value.count = 1;
  }
};
</script>

<style lang="less" scoped>
@font-face {
  font-family: 'Pacifico'; /* 给字体起一个名字 */
  src: url('../assets/font/Pacifico.ttf') format('truetype'); /* 指定字体文件路径和格式 */
  font-weight: normal; /* 指定字体的粗细 */
  font-style: normal; /* 指定字体的样式 */
}
@font-face {
  font-family: 'digital7'; /* 给字体起一个名字 */
  //   src: url('../assets/font/digital_7/digital-7.ttf') format('truetype'); /* 指定字体文件路径和格式 */
  src: url('../assets/font/digital_7/digital-7(mono).ttf') format('truetype'); /* 指定字体文件路径和格式 */
  font-weight: normal; /* 指定字体的粗细 */
  font-style: normal; /* 指定字体的样式 */
}

#blocker {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-weight: bold;
}

#instructions {
  font-family: 'Pacifico', 'Caveat', cursive; /* 优先使用流行手写字体 */
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  font-size: 14px;
  cursor: pointer;
}
.machine {
  user-select: none;
  .dashboard {
    margin: 0 10px;
    table {
      border-collapse: collapse;
      margin: 0 auto;
      text-align: center;
      font-size: 20px;
      th,
      td {
        margin: 0;
        padding: 0;
        border: 1px solid #333;
        width: 70px;
        height: 70px;
      }
      .top {
        font-size: 24px;
        border: none;
        .score {
          font-size: 32px;
          font-weight: bold;
          font-family: 'digital7', 'Caveat', cursive;
          // color: #a00;
          color: #b10c21;
        }
      }
      .small {
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
      //   .active {
      //     background: rgba(230, 0, 0, 0.7);
      //     box-shadow: 0 0 10px rgba(230, 0, 0, 0.8), 0 0 20px rgba(230, 0, 0, 0.6);
      //   }
      //   .active1 {
      //     background: rgba(0, 230, 0, 0.65);
      //     box-shadow: 0 0 10px rgba(0, 230, 0, 0.8), 0 0 20px rgba(0, 230, 0, 0.6);
      //   }
      //   .active2 {
      //     // background: rgba(0, 0, 220, 0.6);
      //     // box-shadow: 0 0 10px rgba(0, 0, 220, 0.8), 0 0 20px rgba(0, 0, 220, 0.6);
      //     background: rgba(230, 0, 0, 0.7);
      //     box-shadow: 0 0 10px rgba(230, 0, 0, 0.8), 0 0 20px rgba(230, 0, 0, 0.6);
      //   }
      //   .active3 {
      //     // background: rgba(220, 0, 0, 0.5);
      //     // box-shadow: 0 0 10px rgba(220, 0, 0, 0.8), 0 0 20px rgba(220, 0, 0, 0.6);

      //     background: rgba(0, 230, 0, 0.65);
      //     box-shadow: 0 0 10px rgba(0, 230, 0, 0.8), 0 0 20px rgba(0, 230, 0, 0.6);
      //   }

      .active {
        background: linear-gradient(
          45deg,
          rgba(255, 0, 0, 0.8),
          rgba(255, 128, 0, 0.8)
        );
        box-shadow: 0 0 15px rgba(255, 0, 0, 0.8),
          /* 内层红光 */ 0 0 30px rgba(255, 128, 0, 0.6),
          /* 橙色外圈 */ 0 0 50px rgba(255, 69, 0, 0.5),
          /* 更扩散的光晕 */ inset 0 0 10px rgba(255, 255, 0, 0.4); /* 内部泛光效果 */
        animation: flash 1s infinite alternate; /* 添加闪烁动画 */
      }

      .active1 {
        background: linear-gradient(
          45deg,
          rgba(0, 230, 0, 0.8),
          rgba(144, 238, 144, 0.7)
        );
        box-shadow: 0 0 15px rgba(0, 230, 0, 0.8),
          /* 内层绿光 */ 0 0 30px rgba(50, 205, 50, 0.6),
          /* 浅绿色外圈 */ 0 0 50px rgba(34, 139, 34, 0.5),
          /* 扩散的光晕 */ inset 0 0 10px rgba(144, 238, 144, 0.4); /* 内部泛光 */
        animation: flash 1.2s infinite alternate; /* 闪烁动画 */
      }

      .active2 {
        background: linear-gradient(
          45deg,
          rgba(0, 0, 220, 0.8),
          rgba(65, 105, 225, 0.7)
        );
        box-shadow: 0 0 15px rgba(0, 0, 220, 0.8),
          /* 内层蓝光 */ 0 0 30px rgba(65, 105, 225, 0.6),
          /* 浅蓝色外圈 */ 0 0 50px rgba(25, 25, 112, 0.5),
          /* 扩散的光晕 */ inset 0 0 10px rgba(173, 216, 230, 0.4); /* 内部泛光 */
        animation: flash 1.4s infinite alternate; /* 闪烁动画 */
      }

      .active3 {
        background: linear-gradient(
          45deg,
          rgba(220, 0, 0, 0.8),
          rgba(255, 69, 0, 0.7)
        );
        box-shadow: 0 0 15px rgba(220, 0, 0, 0.8),
          /* 内层深红光 */ 0 0 30px rgba(255, 69, 0, 0.6),
          /* 浅红色外圈 */ 0 0 50px rgba(178, 34, 34, 0.5),
          /* 扩散的光晕 */ inset 0 0 10px rgba(255, 160, 122, 0.4); /* 内部泛光 */
        animation: flash 1.6s infinite alternate; /* 闪烁动画 */
      }

      .rewardList {
        background: linear-gradient(
          45deg,
          rgba(255, 0, 0, 0.8),
          rgba(255, 128, 0, 0.8)
        );
        box-shadow: 0 0 15px rgba(255, 0, 0, 0.8),
          /* 内层红光 */ 0 0 30px rgba(255, 128, 0, 0.6),
          /* 橙色外圈 */ 0 0 50px rgba(255, 69, 0, 0.5),
          /* 更扩散的光晕 */ inset 0 0 10px rgba(255, 255, 0, 0.4); /* 内部泛光效果 */
        animation: flash 1s infinite alternate; /* 添加闪烁动画 */
      }
    }
  }

  .slot-bg {
    background: url('../assets/img/bg.png') center;
  }
  .icon-score {
    justify-content: center;
    text-align: center;
    margin: 10px;
    // color: #a00;
    font-size: 24px;
    font-weight: 800;
    .container {
      display: flex;
      justify-content: center;
      .item {
        .icon {
          font-weight: bold;
          color: #b10c21;
          font-family: 'digital7', 'Caveat', cursive;
        }
        width: 65px;
        height: 65px;
      }
    }
  }
}
</style>
