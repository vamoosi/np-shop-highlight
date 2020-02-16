<script>
  import Tab from "../generic/Tab.svelte";
  import BooleanInput from "../generic/BooleanInput.svelte";

  export let config;

</script>

<Tab title="General" focused="true">
  <BooleanInput label="Shop Highlight Extension" bind:checked={config.enabled} />
</Tab>
