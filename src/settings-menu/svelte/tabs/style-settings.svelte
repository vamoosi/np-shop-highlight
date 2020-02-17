<script>
  import Tab from "../generic/tab/tab.svelte";
  import SubTabPane from "../generic/sub-tab-pane.svelte";

  export let config;
  export let styles;
</script>

<Tab title="Styles">
  <SubTabPane bind:styles={styles} bind:config={config} />
</Tab>
