<script>
  import Tab from "../generic/tab/tab.svelte";
  import BooleanInput from "../generic/form/boolean-input.svelte";
  import PaddingBox from "../generic/padding-box.svelte";

  export let config;

</script>

<Tab title="General" focused="true">
  <PaddingBox>
    <BooleanInput label="Shop Highlight Extension" bind:checked={config.enabled}/>
  </PaddingBox>
</Tab>
