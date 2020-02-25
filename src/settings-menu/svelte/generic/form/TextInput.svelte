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
   * Input placeholder text
   *
   * @type {string}
   */
  export let placeholder;

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
  export let onUpdate = _ => {};

  /**
   * Custom input validator.
   *
   * @type {function(string): boolean}
   */
  export let validator = _ => true;

  const debouncer = newDebouncer(() => {
    if (validator(input.value)) {
      validValue = input.value;
      onUpdate(validValue);
    }
  });

  /** @type {HTMLInputElement} */
  let input;

  onMount(() => {
    input.addEventListener('keyup', debouncer);
  });
</script>

<InputLabel label="{label}" title="{title}" styleClass="{styleClass}">
  <!--suppress HtmlFormInputWithoutLabel -->
  <input type="text"
         bind:this={input}
         placeholder="{placeholder}"
         value={initialValue}
         class="{styleClass}"/>
</InputLabel>