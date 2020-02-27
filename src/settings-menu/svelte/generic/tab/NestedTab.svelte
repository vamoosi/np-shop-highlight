<script>
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';

  export let tabId;
  export let selection;
  export let name;

  const dispatch = createEventDispatcher();

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
    body.dispatchEvent(new Event('tab-mount', {bubbles: true}));
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
