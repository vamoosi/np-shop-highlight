<style>
  @import url('../../../css/settings.css');

  li {
    margin:       15px 0;
    width:        220px;
    box-sizing:   border-box;
    padding-left: 15px;
  }

  li.selected {
    /*width: 221px;*/
    outline: none;
  }

  div {
    transition:     opacity var(--tab-fade) ease;
    position:       absolute;
    top:            0;
    bottom:         0;
    left:           220px;
    right:          0;
    pointer-events: none;
    opacity:        0;
  }

  li.selected > div {
    display:        block;
    pointer-events: auto;
    opacity:        100%;
  }

  h2 {
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

  li.selected > h2 {
    position:         relative;
    background-color: #fff;
    right:            -1px;
    padding-right:    16px;
    border-color:     rgba(220, 220, 220, 1);
    border-radius:    10px 0 0 10px;
  }
</style>

<script>
  import { onDestroy, onMount } from 'svelte';

  /** @type {string} */
  export let title;

  /** @type {string} */
  export let id;

  /** @type {string} */
  export let selected;

  /** @type {HTMLLIElement} */
  let self;

  /** @type {HTMLHeadingElement} */
  let header;

  /** @type HTMLDivElement */
  let body;

  /**
   * @param {Event} e
   */
  function selectTab(e) {
    if (e.target !== header)
      return;

    selected = id;
  }

  function isSelected() {
    return selected === id;
  }

  function showHide() {
    if (selected !== id)
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

<li class:selected={selected===id} on:click={selectTab} bind:this={self}>
  <h2 bind:this={header}>{title}</h2>
  <div bind:this={body}>
    <slot></slot>
  </div>
</li>