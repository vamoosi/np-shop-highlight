<script>
  import ItemManagementButton from '../../generic/ItemManagementButton.svelte';
  import { newHighlightStyle } from '../../../../config/types/highlight-style';
  import * as HConf from '../../../../config/types/highlight-config';
  import { SvelteStore } from '../../../../lib/store/svelte';

  /**
   * Current style id
   *
   * @type {number}
   */
  export let selected;

  /** @type {Writable<AppConfig> | AppConfig} */
  const config = SvelteStore.writableStore();

  /** @type{HTMLDivElement} */
  let container;

  function newStyle() {
    const max = HConf.nextHighlightId($config.styles);

    // TODO: Look at the IGControl... why all this?
    $config.styles = HConf.appendHighlight(
      $config.styles,
      newHighlightStyle(max, 'New Style'),
    );
    selected = max;
  }

  function del() {
    if (inUse()) {
      alert('Cannot delete this style, it is currently in use.');
      return;
    }

    // Store current selection since we are gonna change it.
    const prev = selected;

    if ($config.styles.order[0] === selected)
      selected = $config.styles.order[1];
    else
      selected = $config.styles
        .order[$config.styles.order.indexOf(selected) - 1];


    $config.styles = HConf.removeHighlight($config.styles, prev);
  }

  function inUse() {
    const style = $config.styles.values[selected.toString()];
    if (
      style.id === $config.miniStock.freshStyle
      || style.id === $config.miniStock.staleStyle
    ) { return true; }

    for (const k in $config.itemMatch.groups) {
      if (!$config.itemMatch.groups.hasOwnProperty(k))
        continue;
      for (const s of $config.itemMatch.groups[k].styles)
        if (style.id === s)
          return true;
    }
  }
</script>

<div class="ntab-control" bind:this={container}>
  <ItemManagementButton bgImg="--plus-svg"
                        title="Adds new style"
                        text="Create Style"
                        click={newStyle}/>
  <ItemManagementButton bgImg="--trash-svg"
                        title="Deletes the current style"
                        text="Delete Style"
                        click={del}/>
</div>