<style>
  span {
    display:   block;
    font-size: var(--input-font-size);
  }

  input[type=range] {
    width:    350px;
    padding:  0;
    position: relative;
    bottom:   -5px;
  }

  input[type=number] {
    font-size:  1em;
    text-align: right;
    width:      2.5em;
    padding:    0;
  }
</style>

<script>
  import InputLabel from './input-label.svelte';

  /**
   * Form control label text
   *
   * @type {string} label
   */
  export let label = '';

  /**
   * Help text (html title attribute)
   *
   * @type {string} title
   */
  export let title = '';

  /**
   * Minimum allowed slider value
   *
   * @type {number}
   */
  export let min = 0;

  /**
   * Maximum allowed slider value
   *
   * @type {number}
   */
  export let max = 100;

  /**
   * Default/starting slider value
   *
   * @type {number}
   */
  export let value = 50;
</script>

<InputLabel label="{label}" title="{title}">
  <span>
    <input type="range" min="{min}" max="{max}" bind:value={value}/>
    <input type="number" min="{min}" max="{max}" bind:value={value}/>%
  </span>
</InputLabel>