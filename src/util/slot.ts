/**
 * 在抽奖的活动中经常会用到这个算法，不同奖项的获取概率不同，
 * 要按概率去随机生成对应的奖品
 * @param {Array} awards 奖池
 * @param {Array} probabilitys 中奖概率，这个跟
 * @return {Any} 返回 awords 数组中的某一项
 */
const probabilityWeights = [
  20, 12, 4, 1, 20, 45, 10, 25, 100, 100, 20, 110, 20, 12, 130, 20, 45, 105, 10,
  30, 120, 10, 20, 101,
];
function runLottery(): number {
  // 计算总权重
  const totalWeight = probabilityWeights.reduce(
    (sum, weight) => sum + weight,
    0
  );

  // 生成随机数 [1, totalWeight]
  const random = Math.floor(Math.random() * totalWeight) + 1;

  // 遍历确定随机数落在的区间
  let cumulativeWeight = 0;
  for (let i = 0; i < probabilityWeights.length; i++) {
    cumulativeWeight += probabilityWeights[i];
    if (random <= cumulativeWeight) {
      return i; // 返回中奖奖品的索引
    }
  }

  // 理论上不会到达这里
  throw new Error('Lottery error: random number out of range.');
}

export default runLottery;
