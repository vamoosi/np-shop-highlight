<style>
  ul {
    list-style:      none;
    padding:         7vh 0;
    margin:          0;
    position:        relative;
    background-size: 220px;
    background:      #e9e9e9;
    background:      linear-gradient(90deg, #e9e9e9 205px, #d9d9d9 219px, #ccc 220px, #fff 221px);
    height:          100vh;
    box-sizing:      border-box;
  }
</style>

<script>
  import SubTab from './sub-tab.svelte';
  import { SvelteStore } from '../../../lib/store/svelte';

  /** @type {Writable<AppConfig> | AppConfig} */
  const config = SvelteStore.writableStore();

  let selected = $config.styles.order[0];

  $: {
    if (!$config.styles.values.hasOwnProperty(selected.toString())) {
      selected = $config.styles.order[0];
    }
  }
</script>

<ul>
  {#each $config.styles.order as id}
    <SubTab bind:style={$config.styles.values[id]}
            bind:selection={selected}/>
  {/each}
</ul>
