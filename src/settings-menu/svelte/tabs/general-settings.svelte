<script>
  import Tab from "../generic/tab/tab.svelte";
  import BooleanInput from "../generic/form/boolean-input.svelte";
  import PaddingBox from "../generic/padding-box.svelte";
  import { getConfigStore } from "../../js/app-config";

  const config = getConfigStore();

</script>

<Tab title="General">
  <PaddingBox>
    <BooleanInput label="Shop Highlight Extension" bind:checked={$config.general.enabled}/>
  </PaddingBox>
</Tab>
