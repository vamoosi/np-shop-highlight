<style>
  div {
    position: absolute;
    right:    30px;
    top:      30px;
    z-index:  10;
  }
</style>

<script>
  import ItemManagementButton from "./generic/item-management-button.svelte"
  import { newHighlightStyle } from "../../config/types/highlight-style";
  import * as HConf from "../../config/types/highlight-config";
  import { writableStore } from "../../lib/store/svelte-store";

  /**
   * Current style id
   *
   * @type {number}
   */
  export let selected;

  /** @type {Writable<AppConfig> | AppConfig} */
  const config = writableStore();

  function newStyle() {
    const max = HConf.nextHighlightId($config.styles);
    $config.styles = HConf.appendHighlight(
      $config.styles,
      newHighlightStyle(max, "New Style")
    );

    selected = max;
  }

  function del() {
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
  <ItemManagementButton bgImg="--plus-svg"
                        title="Adds new style"
                        text="Create Style"
                        click={newStyle}/>
  <ItemManagementButton bgImg="--trash-svg"
                        title="Deletes the current style"
                        text="Delete Style"
                        click={del}/>
</div>