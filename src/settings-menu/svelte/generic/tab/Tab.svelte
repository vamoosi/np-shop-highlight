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