<script>
  import ItemControl from '../../generic/ItemControl.svelte';
  import C from '../../../ts/controllers/tabs/item-match/IGControl';

  /**
   * Currently selected style id
   *
   * @type {ItemGroupId}
   */
  export let selection;

  let container;

  const add = _ => {selection = C.newGroup()};
  const del = _ => {selection = C.deleteGroup(selection)};
  const up  = _ => {C.shiftGroup(selection, true)};
  const dn  = _ => {C.shiftGroup(selection, false)};
</script>

<div class="ntab-control" bind:this={container}>
  <ItemControl title="Create a new group" text="&#xf067;" click={add}/>
  <ItemControl title="Delete the current group" text="&#xf2ed;" click={del}/>
  <ItemControl title="Move the current group up" text="&#xf102;" click={up}/>
  <ItemControl title="Move the current group down" text="&#xf103;" click={dn}/>
</div>