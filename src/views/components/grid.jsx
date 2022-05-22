import { defineComponent, onMounted, ref } from "vue";
import styl from "./grid.module.scss";
import Logo from "./lolpoint.png";

export default defineComponent({
  props: ["heros", "actives", "done"],
  setup(props) {
    const containerRef = ref(null);
    const boxWidth = ref(0);

    function resizeBoxSize() {
      if (!containerRef.value) return;
      // 获取 containerRef 元素宽度
      const containerWidth = containerRef.value.offsetWidth;
      // 等分宽度
      boxWidth.value = Math.floor(containerWidth / 16) + "px";
    }
    onMounted(() => {
      resizeBoxSize();
      window.addEventListener("resize", () => resizeBoxSize());
    });

    return () => (
      // 主容器
      <div className={styl.container} ref={containerRef}>
        {props.heros.map((rows, i) => {
          return (
            // 16格 row
            <div
              className={`${styl.row} ${(i + 1) % 2 === 0 && styl.rowreverse}`}
            >
              {rows.map((hero, j) => {
                return (
                  <div className={styl.box} style={{ width: boxWidth.value }}>
                    <img
                      className={
                        props.actives.includes(i * 16 + j) && styl.active
                      }
                      src={hero.src}
                      alt={hero.name}
                    />
                    {props.actives.includes(i * 16 + j) && (
                      <img
                        className={`${styl.pointer} ${
                          props.done && styl.shake
                        }`}
                        src={Logo}
                      ></img>
                    )}
                    <div className={styl.title}>{hero.alias}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  },
});
