<script>
  /**
   * Title attribute text
   *
   * @type {string}
   */
  export let title;

  /**
   * Button text (will not be displayed)
   *
   * @type {string}
   */
  export let text;

  /**
   * Background image path.
   *
   * Will be injected directly into an inline style.
   *
   * @type {string}
   */
  export let bgImg;

  /**
   * Click handler
   *
   * @type {function(Event):boolean}
   */
  export let click;
</script>

<button title="{title}"
        on:click={click}
        style="background-image: var({bgImg})"
        class="item-mgmt">{text}</button>