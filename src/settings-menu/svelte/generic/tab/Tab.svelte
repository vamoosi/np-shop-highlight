<style>
  li.selected > div {
    display:        block;
    pointer-events: auto;
    opacity:        1.0;
  }

  h2 {
    cursor:        pointer;
    color:         #999;
    padding:       20px 15px;
    margin:        0;
    text-align:    center;
    border-color:  rgba(220, 220, 220, 0);
    border-style:  solid;
    border-width:  1px 0 1px 1px;
    border-radius: 10px;
    box-sizing:    border-box;
    font-weight:   normal;
    transition:    border-color var(--tab-fade) ease, background-color var(--tab-fade) ease, box-shadow var(--tab-fade) ease, color var(--tab-fade) ease;
  }

  h2:hover, h2:focus {
    color:        #666;
    border-color: #ddd;
    box-shadow:   inset 0 5px 10px -10px #878787;
  }

  li.selected > h2 {
    color: #555;
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

  function showHide(e) {
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

<li class="tab" class:selected={selected===id} on:click={selectTab} bind:this={self}>
  <h2 bind:this={header} title="{title}">{title}</h2>
  <div bind:this={body}>
    <!--suppress CheckTagEmptyBody -->
    <slot></slot>
  </div>
</li>