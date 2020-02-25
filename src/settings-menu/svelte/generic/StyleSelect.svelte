<style>
  select {
    font-size:     1.4em;
    margin-bottom: 20px;
    padding:       5px;
  }

  div.flex {
    margin-bottom: 40px;
  }

  div.space {
    margin-left: 60px;
  }
</style>

<script>
  import InputLabel from './form/InputLabel.svelte';
  import ExampleItem from './ExampleItem.svelte';
  import { SvelteStore } from '../../../lib/store/svelte';

  export let label;
  export let title;
  export let value;

  /** @type {Writable<AppConfig> | AppConfig} */
  const config = SvelteStore.writableStore();

  $: selected = $config.styles.values[value];

</script>
<div class="flex">
  <InputLabel label="{label}" title="{title}">
    <div>
      <!--suppress HtmlFormInputWithoutLabel -->
      <select bind:value={value}>
        {#each $config.styles.order as id}
          <option value={id}>{$config.styles.values[id].name}</option>
        {/each}
      </select>
    </div>
  </InputLabel>
  <div class="space">
    <ExampleItem config={selected}/>
  </div>
</div>
