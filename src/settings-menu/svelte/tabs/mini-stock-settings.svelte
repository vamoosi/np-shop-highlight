<script>
  import Tab from "../generic/tab/tab.svelte";
  import BooleanInput from "../generic/form/boolean-input.svelte";
  import PaddingBox from "../generic/padding-box.svelte";
  import StyleSelect from "../generic/style-select.svelte";
  import { getConfigStore } from "../../js/app-config";

  const config = getConfigStore();
  $: mini = $config.miniStock;

</script>

<Tab title="Mini Stock" focused="true">
  <PaddingBox>
    <BooleanInput label="Mini Stock Item Highlighting"
      bind:checked={config.enabled}/>

    <StyleSelect label="Fresh Item Style" bind:value={mini.freshStyle} />
    <StyleSelect label="Stale Item Style" bind:value={mini.staleStyle} />
  </PaddingBox>
</Tab>
