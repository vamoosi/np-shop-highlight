<script>
  import TabPane from "./generic/tab/tab-pane.svelte";
  import GeneralSettings from "./tabs/general-settings.svelte";
  import MiniStockSettings from "./tabs/mini-stock-settings.svelte";
  import StyleSettings from "./tabs/style-settings.svelte";
  import ItemMatchSettings from "./tabs/item-match-settings.svelte";

  let settings = $$props;

  let selection = "item-match";

</script>

<TabPane>
  <GeneralSettings bind:selected={selection} id="general" />
  <MiniStockSettings bind:selected={selection} id="mini-stock"/>
  <ItemMatchSettings bind:selected={selection} id="item-match"/>
  <StyleSettings id="style"
                 bind:selected={selection}
                 bind:config={$settings}
                 bind:styles={$settings.styles} />
</TabPane>