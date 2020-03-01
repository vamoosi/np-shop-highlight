<script>
  import ItemManagementButton from '../../generic/ItemManagementButton.svelte';
  import {
    newGroup, deleteGroup,
    shiftGroup,
  } from '../../../ts/controllers/tabs/ItemGroupControl';

  /**
   * Currently selected style id
   *
   * @type {ItemGroupId}
   */
  export let selection;

  let container;

  const add = _ => {selection = newGroup()};
  const del = _ => {selection = deleteGroup(selection)};
  const up  = _ => {shiftGroup(selection, true)};
  const dn  = _ => {shiftGroup(selection, false)};
</script>

<div class="ntab-control" bind:this={container}>
  <ItemManagementButton bgImg="--plus-svg"
                        title="Adds a new item group"
                        text="Create Item Group"
                        click={add}/>

  <ItemManagementButton bgImg="--trash-svg"
                        title="Deletes the current item group"
                        text="Delete Item Group"
                        click={del}/>

  <ItemManagementButton bgImg="--up-svg"
                        title="Moves the current item group up in the order"
                        text="Move Item Group Up"
                        click={up}/>

  <ItemManagementButton bgImg="--down-svg"
                        title="Moves the current item group down in the order"
                        text="Move Item Group Down"
                        click={dn}/>
</div>