<script>
  import InputLabel from './InputLabel.svelte';

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
  <div class="slider">
    <!--suppress HtmlFormInputWithoutLabel -->
    <input type="range" min="{min}" max="{max}" bind:value={value} step="0.01"/>
    <!--suppress HtmlFormInputWithoutLabel -->
    <input type="number" min="{min}" max="{max}" bind:value={value}/>
  </div>
</InputLabel>