// import Heros from "@/config.js";
import { reactive } from "vue";
import { deepOClone, randomInt } from "@alrale/common-lib";

function arr1to2(arr, number) {
    var arr2 = [];
    let len = arr.length;
    for (let i = 0, j = 0; i < len; i += number, j++) {
        arr2[j] = arr.splice(0, number);
    }
    return arr2;
}

// 获取英雄列表
export function useHeros(list = []) {
    // const list = []
    // Object.values(Heros).forEach(hero => {
    //     hero.src = empty;
    //     list.push(hero)
    // })
    // 将Heros 一维数组 转为 16长度 的二维数组的数据
    const cloneArr = deepOClone(list)
    const heros = arr1to2(cloneArr, 16)
    return { heros: reactive(heros), size: list.length }
}

export function useActiveIndex(size) {
    let index1 = randomInt(size)
    let index2 = randomInt(size)
    if (index1 === index2) {
        if (index1 === 0) index2 += 1
        if (index1 === size) index2 = 0
        else index2 += 1
    }
    return [index1, index2]
}

function getHero(list, index) {
    if (index <= 16) {
        return list[0][index]
    }
    const firstIndex = Math.floor(index / 16)
    const secondIndex = index % 16
    return list[firstIndex][secondIndex]
}

// 展示图片
// export function useShowImgs(list, index1, index2) {
//     let ind1 = index1
//     let ind2 = index2
//     if (index1 === index2) {
//         if (index1 === 0) ind2 += 1
//         if (index1 === list.size) ind2 = 0
//         else ind2 += 1
//     }
//     return [getHero(list, ind1), getHero(list, ind2)]
// }
export function useShowImgs(list, index1, index2) {
    let ind1 = index1
    let ind2 = index2
    if (index1 === index2) {
        if (index1 === 0) ind2 += 1
        if (index1 === list.size) ind2 = 0
        else ind2 += 1
    }
    return [list[ind1], list[ind2]]
}