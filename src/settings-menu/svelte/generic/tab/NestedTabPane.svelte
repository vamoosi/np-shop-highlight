<script>/** @type {HTMLUListElement} */
import { onMount } from 'svelte';

let pane;

  function mounted(e) {
    const p = pane.parentElement;
    p.scrollTo({top: p.scrollHeight, behavior: 'smooth'})
  }

  onMount(() => {
    pane.addEventListener('tab-mount', mounted);
  });
</script>

<!--suppress CheckTagEmptyBody -->
<slot name="buttons"></slot>

<ul class="nested-tab-pane" bind:this={pane}>
  <!--suppress CheckTagEmptyBody -->
  <slot></slot>
</ul>

<div class="nested-tab-bottom"></div>