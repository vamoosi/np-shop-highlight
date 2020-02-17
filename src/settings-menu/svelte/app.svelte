<script>
  import TabPane from "./generic/tab-pane.svelte";
  import GeneralSettings from "./tabs/general-settings.svelte";
  import MiniStockSettings from "./tabs/mini-stock-settings.svelte";
  import StyleSettings from "./tabs/style-settings.svelte";

  let settings = $$props;

</script>

<TabPane>
  <GeneralSettings bind:config={$settings.general} />
  <MiniStockSettings bind:config={$settings.miniStock} styles={$settings.styles} />
  <StyleSettings />
</TabPane>