<script>
  import TabPane from "./generic/TabPane.svelte";
  import GeneralSettings from "./tabs/GeneralSettings.svelte";
  import MicroStockSettings from "./tabs/MicroStockSettings.svelte";

  let settings = $$props;

</script>

<TabPane>
  <GeneralSettings bind:config={$settings.general} />
  <MicroStockSettings bind:config={$settings.microStock} />
</TabPane>