<style>
  select {
    font-size: 1.4em;
    margin-bottom: 20px;
    padding: 5px;
  }
</style>
<script>
  import InputLabel from "./form/input-label.svelte";
  import ExampleItem from "./example-item.svelte";
  import { getConfigStore } from "../../js/app-config";

  export let label;
  export let title;
  export let value;

  const config = getConfigStore();

  $: selected = $config.styles.values[value];

</script>
<InputLabel label="{label}" title="{title}">
  <div>
    <select bind:value={value}>
      {#each $config.styles.order as id}
        <option value={id}>{$config.styles.values[id].name}</option>
      {/each}
    </select>
  </div>
  <ExampleItem config={selected} />
</InputLabel>