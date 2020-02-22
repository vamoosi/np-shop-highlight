<style>
  button {
    display:             block;
    width:               50px;
    opacity:             0.3;
    cursor:              pointer;
    height:              50px;
    background-size:     100% 100%;
    background-position: center;
    background-repeat:   no-repeat;
    transition:          opacity 300ms ease;
    background-color:    white;
    border:              none;
    margin-bottom:       2em;
    text-indent:         120%;
    white-space:         nowrap;
    overflow:            hidden;
  }

  button:hover {
    opacity: 0.5;
  }
</style>

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
        style="background-image: var({bgImg})">{text}</button>