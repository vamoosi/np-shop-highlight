<script>
  import InputLabel from './InputLabel.svelte';
  import { newDebouncer } from '../../../ts/lib/debouncer';
  import { onMount } from 'svelte';

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
   * Initial Input value.
   *
   * This field is not written to by this component.
   *
   * @type {string}
   */
  export let initialValue;

  /**
   * Post validation input value for binding.
   *
   * @type {string}
   */
  export let validValue;

  /**
   * Custom css class(es) as a space separated string
   *
   * @type {string}
   */
  export let styleClass;

  /**
   * Callback that will be called when the validValue prop
   * is updated.
   *
   * @type {function(string)}
   */
  export let onUpdate = _ => {
  };

  /**
   * Custom input validator.
   *
   * @type {function(string): boolean}
   */
  export let validator = _ => true;

  export let height;

  const debouncer = newDebouncer(() => {
    if (validator(textBox.value)) {
      validValue = textBox.value;
      onUpdate(validValue);
    }
  });

  /** @type {HTMLTextAreaElement} */
  let textBox;

  onMount(() => {
    textBox.addEventListener('input', debouncer);
  });
</script>

<InputLabel label="{label}" title="{title}" styleClass="{styleClass}">
  <!--suppress HtmlFormInputWithoutLabel -->
  <textarea bind:this={textBox}
            class="{styleClass}"
            style="height: {height}">{initialValue || ""}</textarea>
</InputLabel>