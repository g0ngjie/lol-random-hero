import { defineComponent } from "vue";
import styl from "./button.module.scss";

export default defineComponent({
  props: ["text", "disabled"],
  setup(props) {
    return () =>
      !props.disabled && (
        <div className={`${styl.container} ${styl.shrink}`}>{props.text}</div>
      );
  },
});
