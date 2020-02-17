<script>
  import TabPane from "./generic/tab/tab-pane.svelte";
  import GeneralSettings from "./tabs/general-settings.svelte";
  import MiniStockSettings from "./tabs/mini-stock-settings.svelte";
  import StyleSettings from "./tabs/style-settings.svelte";

  let settings = $$props;

</script>

<TabPane>
  <GeneralSettings />
  <MiniStockSettings />
  <StyleSettings bind:config={$settings} bind:styles={$settings.styles} />
</TabPane>