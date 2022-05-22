import { defineComponent, watchEffect, ref, onMounted } from "vue";
import styl from "./slideShow.module.scss";
import VsImg from "./vs.png";

import { useMagicKeys } from "@vueuse/core";
import { sleep } from "@alrale/common-lib";
// import { useTalk } from "./slideShow";

export default defineComponent({
  props: ["img1", "img2"],
  setup(props, { emit }) {
    const leftPic = ref();
    const rightPic = ref();
    const vsRef = ref();

    const leftArea = ref();
    const rightArea = ref();

    const showAlias = ref(false);

    const isClose = ref(false);

    const handleSlide = () => {
      const leftH = leftPic.value.offsetHeight;
      const leftTop = leftPic.value.offsetTop;
      const leftW = leftPic.value.offsetWidth;
      leftPic.value.style.background = `url(${props.img1.src}) no-repeat center`;
      rightPic.value.style.background = `url(${props.img2.src}) no-repeat center`;
      vsRef.value.style.top = `${leftTop + leftH}px`;
      vsRef.value.style.left = `${leftW / 2.5}px`;
      leftPic.value.style.left = `-30px`;
      rightPic.value.style.top = `${leftH + leftTop}px`;
      rightPic.value.style.right = `-30px`;
    };
    onMounted(() => {
      sleep(1000, () => {
        showAlias.value = true;
        // useTalk();
      });
      handleSlide();

      registerEvent();
    });

    const { Escape } = useMagicKeys();
    watchEffect(() => {
      if (Escape.value) {
        emit("close");
      }
    });

    const registerEvent = () => {
      if (!leftArea.value || !rightArea.value) return;
      leftArea.value.addEventListener("mousemove", (e) =>
        handleHover(e, "left")
      );
      rightArea.value.addEventListener("mousemove", (e) =>
        handleHover(e, "right")
      );
      leftArea.value.addEventListener("mouseout", () => {
        if (!leftPic.value) return;
        leftPic.value.style.backgroundPosition = "center";
      });
      rightArea.value.addEventListener("mouseout", () => {
        if (!rightPic.value) return;
        rightPic.value.style.backgroundPosition = "center";
      });
    };

    const handleHover = (e, area) => {
      if (isClose.value || !leftPic.value || !rightPic.value) return;
      const { offsetX, offsetY } = e || {};
      const calcY = Math.floor(leftPic.value.offsetHeight / 3);
      const calcX = Math.floor(leftPic.value.offsetWidth / 3);
      // 横向
      let horizontal = "";
      // 竖向
      let vertical = "";
      if (offsetX <= calcX) {
        horizontal = "45%";
      } else if (offsetX > calcX && offsetX <= calcX * 2) {
        horizontal = "center";
      } else horizontal = "55%";

      if (offsetY <= calcY) {
        vertical = "45%";
      } else if (offsetY > calcY && offsetY <= calcY * 2) {
        vertical = "center";
      } else vertical = "55%";
      if (area === "left") {
        leftPic.value.style.backgroundPosition = `${horizontal} ${vertical}`;
      }
      if (area === "right") {
        rightPic.value.style.backgroundPosition = `${horizontal} ${vertical}`;
      }
    };

    const handleClose = () => {
      isClose.value = true;
      emit("close");
    };
    return () => (
      <div className={styl.container}>
        <div className={`${styl.img} ${styl.pic1}`} ref={leftPic}>
          <div className={styl.lines1} ref={leftArea}></div>
          {showAlias.value && (
            <div className={styl.title}>
              <div>{props.img1.alias}</div>
              <em>{props.img1.balabala}</em>
            </div>
          )}
        </div>
        <img className={styl.vs} src={VsImg} ref={vsRef} />
        <div className={`${styl.img} ${styl.pic2}`} ref={rightPic}>
          <div className={styl.lines2} ref={rightArea}></div>
          {showAlias.value && (
            <div className={styl.title}>
              <div>{props.img2.alias}</div>
              <em>{props.img2.balabala}</em>
            </div>
          )}
        </div>
        <div className={styl.btn} onClick={handleClose}>
          关闭
        </div>
      </div>
    );
  },
});
