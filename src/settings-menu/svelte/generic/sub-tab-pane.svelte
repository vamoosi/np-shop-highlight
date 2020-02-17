<style>
  ul {
    list-style:      none;
    padding:         7vh 0;
    margin:          0;
    position:        relative;
    background-size: 220px;
    background:      #e9e9e9;
    background:      linear-gradient(90deg, #e9e9e9 205px, #d9d9d9 219px, #ccc 220px, #fff 221px);
    height:          100vh;
    box-sizing:      border-box;
  }

  ul > li:first-child {
    position:         absolute;
    top:              2vh;
    margin-left:      110px;
    left:             -75px;
    height:           50px;
    width:            150px;
    background-color: #008d40;
    font-size:        1.8em;
    line-height:      50px;
    display:          inline-block;
    text-align:       center;
    vertical-align:   middle;
    border-radius:    10px;
    cursor:           pointer;
    color:            #eee;
    font-weight:      bold;
  }

</style>

<script>
  import SubTab from "./sub-tab.svelte";
  import { newHighlightStyle } from "../../../config/types/highlight-style";

  /** @type {HighlightConfig} */
  export let config;
  export let styles;

  let selected = styles.order[0];

  /**
   * @param {Event} e
   */
  function noFocus(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  }

  function newStyle() {
    let max = 1;
    for (const val of styles.order)
      if (val > max)
        max = val;
    max++;

    const thing = newHighlightStyle("New Style", max);
    styles.order.push(max);
    styles.values[max.toString()] = thing;
    selected = max;
  }
</script>

<ul on:={noFocus}>
  <li><span title="Add new style" on:click={newStyle}>+ New</span></li>
    {#each styles.order as id}
      <SubTab bind:style={styles.values[id]}
        bind:config={config}
        focused="{selected===id ? 'true' : 'false'}"/>
    {/each}
</ul>
