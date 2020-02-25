<style>
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
    transition:      border-color var(--tab-fade) ease, background-color var(--tab-fade) ease;
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
  import { onDestroy, onMount } from 'svelte';

  export let tabId;
  export let selection;
  export let name;

  let header;
  let body;

  /**
   * @param {Event} e
   */
  function selectTab(e) {
    if (e.target !== header)
      return;

    selection = tabId;
  }

  function showHide() {
    if (selection !== tabId)
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

<li class="nested-tab" class:selected={selection === tabId} on:click={selectTab}>
  <h3 bind:this={header} title="{name}">{name}</h3>
  <div bind:this={body}>
    <!--suppress CheckTagEmptyBody -->
    <slot></slot>
  </div>
</li>
