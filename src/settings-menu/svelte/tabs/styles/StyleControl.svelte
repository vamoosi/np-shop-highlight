<script>
  import ItemControl from '../../generic/ItemControl.svelte';
  import { SvelteStore } from '../../../../lib/store/svelte';
  import C from '../../../ts/controllers/tabs/styles/StyleControl'

  /**
   * Current style id
   *
   * @type {StyleId}
   */
  export let selected;

  /** @type {Writable<AppConfig> | AppConfig} */
  const config = SvelteStore.writableStore();

  /** @type{HTMLDivElement} */
  let container;

  const add = _ => {selected = C.addStyle()};
  const del = _ => {selected = C.deleteStyle(selected)};

</script>

<div class="ntab-control" bind:this={container}>
  <ItemControl title="Create a new style" text="&#xf067;" click={add}/>
  <ItemControl title="Delete the current style" text="&#xf2ed;" click={del}/>
</div>