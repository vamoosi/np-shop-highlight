<script>
  import InputLabel from "./InputLabel.svelte";

  /**
   * @type {string}
   */
  export let name;

  /**
   * @type {string}
   */
  export let label;

  /**
   * @type {string}
   */
  export let styleClass = '';

  /**
   * @type {string}
   */
  export let yesText = 'Enabled';

  /**
   * @type {string}
   */
  export let noText = 'Disabled';

  /**
   * @type {string}
   */
  export let noStyle = 'color: #933030';

  /**
   * @type {string}
   */
  export let yesStyle  = 'color: #428056';

  /**
   * @return {string}
   */
  export const getId = () => `input-${name}`;

  export let checked = false;

  $: check = checked;

  function onCheck() {
    checked = !checked;
  }
</script>

<style>
  input {
    height: 1.4em;
    width: 1.4em;
    margin: 0 0.5em;
    vertical-align: bottom;
  }

  span {
    display: block;
  }

  span span {
    display: inline-block;
    line-height: 1.4em;
    padding: 0;
    margin: 0;
    transition: color 500ms ease;
  }
</style>

<InputLabel target="{getId()}" label="{label}" class="{styleClass}" on:click={onCheck} />
<span>
  <input type="checkbox" checked={check} on:click={onCheck} name="{name}" id="{getId()}" />
  <span on:click={onCheck} style="{check ? yesStyle : noStyle}">{check ? yesText : noText}</span>
</span>