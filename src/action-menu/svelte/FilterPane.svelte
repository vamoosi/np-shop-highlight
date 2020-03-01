<script>
  import Stores from '../../lib/neo/shop-list'
  import { onMount } from 'svelte';

  const href = "http://neopets.com/objects.phtml?type=shop&obj_type=";

  let filter = "";
  let results;

  /**
   * @type {HTMLInputElement}
   */
  let input;

  $: {
    results = filter === ""
      ? Stores.list()
      : Stores.filterName(filter);
  }

  onMount(() => {
    input.focus();
  });

  /**
   * @param {HTMLAnchorElement} a
   */
  function doTheThing(a) {
    chrome.tabs.create({
      url: href + a.attributes.getNamedItem("data-id").value
    });
  }

  function openTheSettings() {
    chrome.tabs.create({
      url: './settings-menu.html'
    })
  }

  document.addEventListener('keyup', e => {
    if (e.key === "Enter") {
      if (e.srcElement instanceof HTMLAnchorElement) {
        doTheThing(e.srcElement);
      } else if (e.srcElement instanceof HTMLInputElement) {
        doTheThing(input.nextElementSibling.firstElementChild.firstElementChild)
      }
    }
  });

  document.addEventListener('click', e => {
    if (e.srcElement instanceof HTMLAnchorElement)
     doTheThing(e.srcElement);
    if (e.srcElement instanceof HTMLButtonElement)
      openTheSettings();
  })

</script>

<div class="action-menu">
  <div class="top-nav">
    <button title="Open settings">&#xf013;</button>
  </div>
  <!--suppress HtmlFormInputWithoutLabel -->
  <input tabindex="1"
         type="text"
         bind:this={input}
         bind:value={filter}
         placeholder="Search Shops">
  <ul>
    {#each results as res, i}
      {#if res !== undefined}
        <li>
          <a tabindex="{i + 2}" data-id="{res.id}">{res.name}</a>
        </li>
      {/if}
    {/each}
  </ul>
 </div>