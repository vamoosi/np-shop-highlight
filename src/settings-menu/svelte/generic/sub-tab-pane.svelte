<style>
  ul {
    list-style:      none;
    padding:         7vh 0;
    margin:          0;
    position:        relative;
    background-size: 220px;
    background:      linear-gradient(90deg, #404146 219px, #f0f2f5 220px);
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
