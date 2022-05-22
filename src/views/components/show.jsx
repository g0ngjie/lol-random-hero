import { defineComponent, watchEffect } from "vue";
import styl from "./show.module.scss";

// import Ornn from "@/assets/Ornn.png"; // 山隐之焰 奥恩 坦克
// import Pantheon from "@/assets/Pantheon.png"; // 不屈之枪 潘森 战士

import { useMagicKeys } from "@vueuse/core";

export default defineComponent({
  props: ["img1", "img2"],
  setup(props, { emit }) {
    // const props = {};
    // props.img1 = {
    //   src: Ornn,
    //   alias: "奥恩",
    // };
    // props.img2 = {
    //   src: Pantheon,
    //   alias: "潘森",
    // };
    const { Escape } = useMagicKeys();
    watchEffect(() => {
      if (Escape.value) {
        emit("close");
      }
    });

    const handleClose = () => emit("close");
    return () => (
      <div className={styl.container}>
        <div className={styl.box}>
          <img className={styl.img} src={props.img1.src} />
          <span>{props.img1.alias}</span>
        </div>
        <span className={styl.vs}>vs</span>
        <div className={styl.box}>
          <img className={styl.img} src={props.img2.src} />
          <span>{props.img2.alias}</span>
        </div>
        <div className={styl.btn} onClick={handleClose}>
          关闭
        </div>
      </div>
    );
  },
});
