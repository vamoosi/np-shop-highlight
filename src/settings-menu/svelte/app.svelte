<script>
  import TabPane from './generic/tab/TabPane.svelte';
  import GeneralSettings from './tabs/GeneralSettings.svelte';
  import MiniStockSettings from './tabs/MiniStockSettings.svelte';
  import StyleSettings from './tabs/StyleSettings.svelte';
  import ItemMatchSettings from './tabs/ItemMatchSettings.svelte';

  let selection = 'general';

</script>

<TabPane>
  <GeneralSettings bind:selected={selection} id="general"/>
  <MiniStockSettings bind:selected={selection} id="mini-stock"/>
  <ItemMatchSettings bind:selected={selection} id="item-match"/>
  <StyleSettings bind:selected={selection} id="style"/>
</TabPane>