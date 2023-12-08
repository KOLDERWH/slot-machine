/**
 * 在抽奖的活动中经常会用到这个算法，不同奖项的获取概率不同，
 * 要按概率去随机生成对应的奖品
 * @param {Array} awards 奖池
 * @param {Array} probabilitys 中奖概率，这个跟
 * @return {Any} 返回 awords 数组中的某一项
 */
function runLottery(awards, probabilitys) {
    // if (!Array.isArray(awards)) {
    //     throw new TypeError('Expected the awards to be an arry.');
    // }

    // if (!Array.isArray(probabilitys)) {
    //     throw new TypeError('Expected the probabilitys to be an arrya');
    // }

    // 随机数是在 0 到 1000 的范围
    const random = Math.random() * 1000;
    // 最终的抽中的奖品
    let aword;

    const probabilitySum = probabilitys.reduce(
        (accumulator, currentValue, currentIndex) => {
            // console.log(accumulator, currentValue);
            const sumAccumulator = accumulator + currentValue;

            if (!aword && random <= sumAccumulator) {
                // aword = awards[currentIndex];
                aword = currentIndex;
            }

            return sumAccumulator;
        },
        0
    );

    // 总概率必须为 1
    if (probabilitySum !== 1000) {
        throw new RangeError('Expected probability sum to equal 1000.');
    }
    return aword;
}

export default runLottery

// test

// // 奖池
// const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
// // 概率
// const b = [
//     20, 12, 4, 1, 20, 45, 10,
//     25, 100, 10, 20, 110,
//     20, 12, 130, 20, 45, 105, 10,
//     30, 120, 10, 20, 101];


// console.log(runLottery(a, b));
// let sum = 0;
// for (item of b) {
//     sum += item
// }
// console.log(sum);

// 0.15=0.06+0.09 苹果 3+2=5(0.02+0.0045)   20+45
// 0.15=0.04+0.11 橘子 2+1=3(0.02+0.11)   20+110
// 0.125=0.02+0.105 芒果 2+1=3(0.01+0.105)   10+105
// 0.125=0.024+0.101 铃铛 2+1=3(0.012+0.101)  12+101
// 0.125=0.025+0.1 西瓜 1+1=2     25+100
// 0.15=0.03+0.12 星星 1+1=2   30+120
// 0.15=0.02+0.13 77 1+1=2    20+130
// 0.005=0.001+0.004 boss 1+1=2  1+4
// 0.02=0.01+0.01 luck 10+10

// 使用多条数据，测试平均概率
// const result = {};
// for (let k = 0; k < 1000; k++) {
//     const rand = runLottery(a, b);
//     // const rand = runLottery(b);
//     if (!result[rand]) {
//         result[rand] = 1;
//     } else {
//         result[rand] += 1;
//     }
// }

// const count = a.reduce((ac, cv) => {
//     if (result[cv]) {
//         ac += result[cv];
//     }
//     // console.log("ac" + ac);
//     return ac;
// }, 0);

// a.forEach(v => {
//     console.log(v, result[v], (result[v] || 0) / count);
//     // console.log(result);
// });