import Heros from "@/config.js";
import Album from "@/album.js";
import empty from "@/assets/empty.png";
// import { ref, watchEffect } from "vue";
import { useSessionStorage } from "@vueuse/core";

export const heroTotal = useSessionStorage('heroTotal', 0)
export const loadTotal = useSessionStorage('loadTotal', 0)

const imgPreloader = item => {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = () => {
            loadTotal.value += 1;
            resolve(item);
        };
        image.onerror = () => {
            reject(new Error(`${JSON.stringify(item)} not found`));
        };
        image.src = item.src;
    });
};
const imgsPreloader = imgs => {
    let promiseArr = [];
    imgs.forEach(element => {
        promiseArr.push(imgPreloader(element));
    });
    return Promise.all(promiseArr);
};

// 图片预加载
export function useLoadImg(cb) {
    // let count = ref(0);
    const list = []
    const pics = []
    Object.keys(Heros).forEach(key => {
        // hero.src = empty;
        const hero = Heros[key];
        pics.push({
            balabala: hero.balabala,
            src: Album[key],
            alias: hero.alias
        })
        list.push(hero)
    })

    heroTotal.value = list.length + pics.length;
    loadTotal.value = 0

    imgsPreloader(pics).then(() => {
        imgsPreloader(list).then((res) => {
            cb({ ok: true, list: res, pics });
        }).catch(err => {
            console.error(err)
            cb({ ok: false })
        })
    }).catch(err => {
        console.error(err)
        cb({ ok: false })
    })

    // for (let i = 0; i < list.length; i++) {
    //     const src = list[i];
    //     const image = new Image();
    //     image.src = src;
    //     image.onload = () => {
    //         count.value++;
    //     };
    // }
    // watchEffect(() => {
    //     if (list.length === count.value) {
    //         cb();
    //     }
    // })
}