<style>
  @import url('../../css/settings.css');

  li {
    margin:       15px 0;
    width:        220px;
    box-sizing:   border-box;
    padding-left: 15px;
  }

  li.selected {
    width:   221px;
    outline: none;
  }

  li > div {
    transition:     opacity var(--tab-fade) ease;
    position:       absolute;
    top:            0;
    bottom:         0;
    left:           220px;
    right:          0;
    padding:        50px 20px;
    pointer-events: none;
    opacity:        0;
  }

  li.selected > div {
    pointer-events: auto;
    opacity:        100%;
  }

  h3 {
    cursor:        pointer;
    color:         var(--text-color);
    padding:       20px 15px 20px 0;
    margin:        0;
    text-align:    right;
    border-color:  rgba(220, 220, 220, 0);
    border-style:  solid;
    border-width:  1px 0 1px 1px;
    border-radius: 10px 0 0 10px;
    box-sizing:    border-box;
    transition:    border-color var(--tab-fade) ease, background-color var(--tab-fade) ease;
  }

  li.selected > h3 {
    position:         relative;
    background-color: #fff;
    right:            -1px;
    z-index:          10;
    padding-right:    17px;
    border-color:     rgba(220, 220, 220, 1);
    border-radius:    10px 0 0 10px;
  }
</style>

<script>
  import StyleConfig from "../tabs/style-config.svelte";
  import StyleControl from "../style-control.svelte";
  import { onDestroy, onMount } from "svelte";

  /**
   * @type {HighlightStyle}
   */
  export let style;

  /**
   * ID of the currently selected style
   */
  export let selection;

  /**
   * @type {HTMLLIElement}
   */
  let self;

  /**
   * @type {HTMLHeadingElement}
   */
  let header;

  /** @type {HTMLDivElement} */
  let body;

  /**
   * @param {Event} e
   */
  function selectTab(e) {
    if (e.target !== header)
      return;

    selection = style.id;
  }

  function isSelected() {
    return selection === style.id;
  }

  function showHide() {
    if (selection !== style.id)
      body.style.zIndex = "0";
    else
      body.style.zIndex = "10";
  }

  onMount(() => {
    body.addEventListener('transitionend', showHide);
    body.addEventListener('webkitTransitionEnd', showHide);
    showHide();
  });

  onDestroy(() => {
    body.removeEventListener('transitionend', showHide);
    body.removeEventListener('webkitTransitionEnd', showHide);
  })

</script>

<li class:selected={selection===style.id} bind:this={self} on:click={selectTab}>
  <h3 bind:this={header}>{style.name}</h3>
  <div bind:this={body}>
    <StyleConfig bind:style={style} />
    <StyleControl bind:selected={selection} />
  </div>
</li>
