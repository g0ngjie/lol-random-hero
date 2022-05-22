
import { Schedule, randomInt, sleepSync } from "@alrale/common-lib";
import { useLocalStorage } from "@vueuse/core";

function exec(interval, stopTime, cb) {
    return new Promise(resolve => {
        Schedule.autoStopInterval(interval, stopTime, (res) => {
            if (res !== 'done') {
                cb();
            } else {
                resolve()
            }
        })
    })
}

function execTimeOut(time, cb) {
    return new Promise(resolve => {
        setTimeout(() => {
            cb();
            resolve()
        }, time)
    })
}

import Boom from "@/audio/boom4.wav";

function handlePlay() {
    const store = useLocalStorage("closeAudio", false);
    if (store.value) return
    // return
    const audio = document.createElement("audio");
    audio.preload = "auto";
    audio.src = Boom
    audio.volume = 0.01;
    audio.play();
    audio.remove();
};


// 模拟水果机随机时间
// 开始越来越快，结束越来越慢
export async function autoExecTime(cb) {
    const ExecTime =
        [
            1, .5, .3, .2, .1,
            .09, .08, .07, .06, .05, .04,
            .03,
            .04, .05, .06, .07, .08, .09,
            .1, .1, .1, .1, .1, .1, .1, .1, .1, .1, .1, .1, .1, .1, .1,
            .2, .3, .4, .5, .6, .7, .8
        ];
    const randomTime = randomInt(200, 50)
    for (let i = 0; i < ExecTime.length; i++) {
        const time = ExecTime[i]
        if (time === .03) {
            for (let i = 0; i < randomTime; i++) {
                await execTimeOut(randomInt(30, 1), cb)
                handlePlay()
            }
        }
        await execTimeOut(randomInt(time * 1000, time * 1000 / 2), cb)
        handlePlay()
    }
    const randomEndTime = randomInt(70, 10)
    await sleepSync(randomInt(1200, 500))
    const flag = randomInt(1)
    if (flag) {
        for (let i = 0; i < randomEndTime; i++) {
            await execTimeOut(8, cb)
            handlePlay()
        }
    }
}

export function runALl(cb1, cb2) {
    return Promise.all([autoExecTime(cb1), autoExecTime(cb2)])
}