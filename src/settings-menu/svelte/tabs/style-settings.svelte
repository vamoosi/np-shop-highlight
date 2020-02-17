<script>
  import Tab from "../generic/tab.svelte";
  import SubTabPane from "../generic/sub-tab-pane.svelte";
  import { defaultHighlightConfig } from "../../../config/types/highlight-config";

  export let styles = defaultHighlightConfig();
</script>

<Tab title="Styles">
  <SubTabPane bind:styles={styles} />
</Tab>
