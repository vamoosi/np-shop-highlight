<script>
  import Tab from "../generic/Tab.svelte";
  import BooleanInput from "../generic/BooleanInput.svelte";
  import PaddingBox from "../generic/PaddingBox.svelte";

  export let config;

</script>

<Tab title="General" focused="true">
  <PaddingBox>
    <BooleanInput label="Shop Highlight Extension" bind:checked={config.enabled}/>
  </PaddingBox>
</Tab>
