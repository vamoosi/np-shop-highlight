<script>
  import NestedTabPane from '../../generic/tab/NestedTabPane.svelte';
  import StyleTab from './StyleTab.svelte';
  import { SvelteStore } from '../../../../lib/store/svelte';
  import StyleControl from './StyleControl.svelte';

  /** @type {Writable<AppConfig> | AppConfig} */
  const config = SvelteStore.writableStore();

  let selection = $config.styles.order[0];

  $: {
    if (!$config.styles.values.hasOwnProperty(selection.toString())) {
      selection = $config.styles.order[0];
    }
  }
</script>

<StyleControl bind:selected={selection}/>

<NestedTabPane>
  {#each $config.styles.order as id}
    <StyleTab bind:style={$config.styles.values[id]}
            bind:selection={selection}/>
  {/each}
</NestedTabPane>
