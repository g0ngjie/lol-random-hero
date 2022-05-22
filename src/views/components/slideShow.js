import { useSpeechSynthesis, useLocalStorage } from "@vueuse/core";
import { ref } from "vue";

export function useTalk(text = '你娃来') {

    if (!text) return
    const store = useLocalStorage("closeAudio", false);
    if (store.value) return

    const lang = ref('zh-CN')
    const _text = ref(text)

    const {
        isSupported,
        isPlaying,
        status,

        speak,
    } = useSpeechSynthesis(_text, {
        lang,
        pitch: 1,
        rate: 1,
        volume: 1,
    })

    if (!isSupported || isPlaying.value) return

    if (status.value === 'pause') {
        window.speechSynthesis.resume()
    }
    else speak()
}