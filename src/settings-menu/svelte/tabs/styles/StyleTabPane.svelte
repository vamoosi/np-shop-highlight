<script>
  import NestedTabPane from '../../generic/tab/NestedTabPane.svelte';
  import StyleTab from './StyleTab.svelte';
  import { SvelteStore } from '../../../../lib/store/svelte';
  import StyleControl from './StyleControl.svelte';

  /** @type {Writable<AppConfig> | AppConfig} */
  const conf = SvelteStore.writableStore();

  let selection = $conf.styles.order[0];

  $: {
    if (!$conf.styles.values.hasOwnProperty(selection.toString())) {
      selection = $conf.styles.order[0];
    }
  }
</script>

<NestedTabPane>
  <div slot="buttons">
    <StyleControl bind:selected={selection}/>
  </div>
  {#each $conf.styles.order as id}
    <StyleTab bind:style={$conf.styles.values[id]} bind:selection={selection}/>
  {/each}
</NestedTabPane>