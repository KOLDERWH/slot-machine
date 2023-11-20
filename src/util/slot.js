/**
 * 在抽奖的活动中经常会用到这个算法，不同奖项的获取概率不同，
 * 要按概率去随机生成对应的奖品
 * @param {Array} awards 奖池
 * @param {Array} probabilitys 中奖概率，这个跟
 * @return {Any} 返回 awords 数组中的某一项
 */
export default function runLottery(probabilitys) {
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
            console.log(accumulator, currentValue);
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

// test

// 奖池
// const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
// 概率
// const b = [
//     50, 75, 20, 5, 30, 80, 75,
//     100, 25, 10, 30, 25,
//     50, 75, 70, 20, 30, 25, 50,
//     20, 70, 10, 30, 25];


// console.log(runLottery(a, b));
// let sum = 0;
// for (item of b) {
//     sum += item
// }
// console.log(sum);

// 0.25= 0.09+0.16 苹果 3+2=5(0.03+0.08)   30+80
// 0.15=0.05+0.1 橘子 2+1=3(0.025+0.05)   25+50
// 0.125=0.025+0.1 芒果 2+1=3(0.025+0.1)   25+75
// 0.125=0.025+0.1 铃铛 2+1=3(0.025+0.1)  25+75
// 0.125=0.025+0.1 西瓜 1+1=2     25+100
// 0.09=0.02+0.07 星星 1+1=2   20+70
// 0.09=0.02+0.07 77 1+1=2    220+70
// 0.025=0.005+0.02 boss 1+1=2  5+20
// 0.02=0.01+0.01 luck 10+10

// 使用多条数据，测试平均概率
// const result = {};
// for (let k = 0; k < 10000; k++) {
//     const rand = runLottery(a, b);
//     console.log("rand " + rand);
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
//     console.log("ac" + ac);
//     return ac;
// }, 0);

// a.forEach(v => {
//     console.log(v, (result[v] || 0) / count);
//     // console.log(result);
// });