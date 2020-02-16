<script>
  import Tab from "../generic/Tab.svelte";
  import BooleanInput from "../generic/BooleanInput.svelte";

  export let config;

</script>

<Tab title="Micro Stock">
  <BooleanInput label="Micro Stock Item Highlighting"
    bind:checked={config.enabled}/>
</Tab>
