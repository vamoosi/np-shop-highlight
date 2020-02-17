<style>
  div {
    position: absolute;
    right:    30px;
    top:      30px;
    z-index:  10;
  }

  button {
    display:             block;
    width:               50px;
    opacity:             30%;
    cursor:              pointer;
    height:              50px;
    background-size:     100% 100%;
    background-position: center;
    background-repeat:   no-repeat;
    transition:          opacity 300ms ease;
    background-color:    white;
    border:              none;
    margin-bottom:       2em;
    text-indent:         100%;
    white-space:         nowrap;
    overflow:            hidden;
  }

  button.new {
    background-image: url("../../../res/plus.svg");
  }

  button.del {
    background-image: url("../../../res/trash-alt.svg");
  }

  button:hover {
    opacity: 50%;
  }
</style>

<script>
  import { newHighlightStyle } from "../../config/types/highlight-style";
  import * as HConf from "../../config/types/highlight-config";
  import { getConfigStore } from "../js/app-config";

  /**
   * Current style id
   *
   * @type {number}
   */
  export let selected;

  const config = getConfigStore();

  function newStyle() {
    const max = HConf.nextHighlightId($config.styles);
console.log("add");
    $config.styles = HConf.appendHighlight(
      $config.styles,
      newHighlightStyle("New Style", max)
    );

    selected = max;
  }

  function del() {
    const style = $config.styles.values[selected.toString()];
console.log("del");
    if (inUse()) {
      alert("Cannot delete this style, it is currently in use.");
      return;
    }

    $config.styles = HConf.removeHighlight($config.styles, selected);
  }

  function inUse() {
    const style = $config.styles.values[selected.toString()];
    return style.id === $config.miniStock.freshStyle
      || style.id === $config.miniStock.staleStyle;
  }
</script>

<div>
  <button class="new" title="Add new style" on:click={newStyle}>New Style</button>
  <button class="del" title="Delete current style" on:click={del}>Delete Style</button>
</div>