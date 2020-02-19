<style>
  textarea {
    height: var(--height);
  }
</style>
<script>
  import InputLabel from './input-label.svelte';
  import { newDebouncer } from "../../../js/lib/debouncer";
  import { onMount } from "svelte";

  /**
   * Input label text
   *
   * @type {string}
   */
  export let label;

  /**
   * Input hover text (html title)
   *
   * @type {string}
   */
  export let title;

  /**
   * Input value
   *
   * @type {string}
   */
  export let value;

  /**
   * Custom css class(es) as a space separated string
   *
   * @type {string}
   */
  export let styleClass;

  export let onType = () => {};

  export let height;

  const debouncer = newDebouncer(() => {onType()});

  /** @type {HTMLTextAreaElement} */
  let textBox;

  onMount(() => {
    textBox.addEventListener('keyup', debouncer);
  });
</script>

<InputLabel label="{label}" title="{title}">
  <textarea bind:this={textBox}
            class="{styleClass}"
            style="--height: {height}"
            bind:value={value}></textarea>
</InputLabel>