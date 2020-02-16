<style>
  li {
    margin: 15px 0;
    width: 220px;
    box-sizing: border-box;
    padding-left: 15px;
  }

  li.selected {
    width: 221px;
    outline: none;
  }

  div {
    transition: opacity 750ms ease;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 220px;
    right: 0;
    padding: 50px 20px;
    pointer-events: none;
    opacity: 0;
  }

  li.selected div {
    pointer-events: auto;
    opacity: 100%;
  }

  h2 {
    cursor: pointer;
    color: #555;
    padding: 20px 15px 20px 0;
    margin: 0;
    text-align: right;
    border-color: rgba(220,220,220,0);
    border-style: solid;
    border-width: 1px 0 1px 1px;
    border-radius: 10px 0 0 10px;
    box-sizing: border-box;
    transition: border-color 750ms ease, background-color 750ms ease;
  }

  li.selected h2 {
    position: relative;
    background-color: #fff;
    right: -1px;
    z-index: 10;
    padding-right: 17px;
    border-color: rgba(220,220,220,1);
    border-radius: 10px 0 0 10px;
  }
</style>

<script>
  import { onMount } from "svelte";

  export let title;
  export let focused="false";

  /**
   * @type {HTMLLIElement}
   */
  let self;

  /**
   * @type {HTMLHeadingElement}
   */
  let header;

  onMount(() => {
    if (focused !== "true")
      self.classList.remove("selected");
  });

  /**
   * @param {Event} e
   */
  function selectTab(e) {
    if (e.target !== header)
      return;

    const siblings = self.parentElement.children;

    for (let i = 0; i < siblings.length; i++) {
      siblings[i].classList.remove("selected");
    }
    self.classList.add("selected")
  }
</script>

<li class="selected" on:click={selectTab} bind:this={self}>
  <h2 bind:this={header}>{title}</h2>
  <div><slot></slot></div>
</li>