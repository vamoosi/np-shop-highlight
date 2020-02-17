<script>
  import Tab from "../generic/Tab.svelte";
  import SubTabPane from "../generic/SubTabPane.svelte";
  import { defaultHighlightConfig } from "../../../config/types/highlight-config";

  export let styles = defaultHighlightConfig();
</script>

<Tab title="Styles">
  <SubTabPane bind:styles={styles} />
</Tab>
