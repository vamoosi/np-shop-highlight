<style>
  @import url('../../css/global.css');

  li {
    width:      220px;
    box-sizing: border-box;
  }

  li > div {
    transition:       opacity var(--tab-fade) ease;
    position:         absolute;
    top:              0;
    bottom:           0;
    left:             220px;
    right:            0;
    padding:          50px 20px;
    pointer-events:   none;
    opacity:          0;
    background-color: #f0f2f5;
  }

  li.selected > div {
    pointer-events: auto;
    opacity:        100%;
  }

  h3 {
    cursor:          pointer;
    color:           #f0f2f5;
    padding:         20px 15px;
    margin:          0;
    text-align:      right;
    border-width:    0 0 1px 0;
    border-color:    #cdcdcd;
    border-style:    solid;
    border-collapse: collapse;
    box-sizing:      border-box;
    transition:      border-color var(--tab-fade) ease,
                     background-color var(--tab-fade) ease;
    text-overflow:   ellipsis;
    overflow:        hidden;
    white-space:     nowrap;
  }

  li:first-child > h3 {
    border-top-width: 1px;
  }

  li.selected > h3 {
    color:            var(--text-color);
    background-color: #f0f2f5;
  }
</style>

<script>
  import StyleConfig from '../tabs/style-config.svelte';
  import StyleControl from '../style-control.svelte';
  import { onDestroy, onMount } from 'svelte';

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
      body.style.zIndex = '0';
    else
      body.style.zIndex = '10';
  }

  onMount(() => {
    body.addEventListener('transitionend', showHide);
    body.addEventListener('webkitTransitionEnd', showHide);
    showHide();
  });

  onDestroy(() => {
    body.removeEventListener('transitionend', showHide);
    body.removeEventListener('webkitTransitionEnd', showHide);
  });

</script>

<li class:selected={selection===style.id} bind:this={self} on:click={selectTab}>
  <h3 bind:this={header} title="{style.name}">{style.name}</h3>
  <div bind:this={body}>
    <StyleConfig bind:style={style}/>
    <StyleControl bind:selected={selection}/>
  </div>
</li>
