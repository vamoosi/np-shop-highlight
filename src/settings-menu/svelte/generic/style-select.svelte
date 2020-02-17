<style>
  select {
    font-size: 1.4em;
    margin-bottom: 20px;
  }
</style>
<script>
  import InputLabel from "./input-label.svelte";
  import ExampleItem from "./example-item.svelte";

  /** @type {HighlightConfig} */
  export let styles;

  export let label;
  export let title;
  export let value;

  $: selected = styles.values[value];

</script>
<InputLabel label="{label}" title="{title}">
  <div>
    <select bind:value={value}>
      {#each styles.order as id}
        <option value={id}>{styles.values[id].name}</option>
      {/each}
    </select>
  </div>
  <ExampleItem config={selected} />
</InputLabel>