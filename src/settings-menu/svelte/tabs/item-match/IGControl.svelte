<script>
  import ItemManagementButton from '../../generic/ItemManagementButton.svelte';
  import { SvelteStore } from '../../../../lib/store/svelte';
  import {
    appendGroup,
    removeGroup, shiftGroup,
  } from '../../../ts/controllers/tabs/ItemGroupControl';

  /**
   * Current style id
   *
   * @type {number}
   */
  export let selection;

  /** @type {Writable<AppConfig> | AppConfig} */
  const write = SvelteStore.writableStore();

  function newGroup() {
    $write.itemMatch = appendGroup($write);
    selection = $write.itemMatch.order[$write.itemMatch.order.length - 1];
  }

  function del() {
    if ($write.itemMatch.order.length === 1) {
      alert("There must be at least one item group.");
      return;
    }

    // Current selection (since we are gonna change it)
    const prev = selection;

    if ($write.itemMatch.order[0] === selection)
      selection = $write.itemMatch.order[1];
    else
      selection = $write.itemMatch
        .order[$write.itemMatch.order.indexOf(selection) - 1];

    $write.itemMatch = removeGroup($write.itemMatch, prev);
  }

  function up() {
    $write.itemMatch = shiftGroup($write.itemMatch, selection, true);
  }

  function dn() {
    $write.itemMatch = shiftGroup($write.itemMatch, selection, false);
  }
</script>

<div class="ntab-control">
  <ItemManagementButton bgImg="--plus-svg"
                        title="Adds a new item group"
                        text="Create Item Group"
                        click={newGroup}/>

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