<script>
  import Tab from '../generic/tab/Tab.svelte';
  import BooleanInput from '../generic/form/BooleanInput.svelte';
  import PaddingBox from '../generic/PaddingBox.svelte';
  import { SvelteStore } from '../../../lib/store/svelte';

  /** @type {*} */
  export let id;

  /** @type {*} */
  export let selected;

  /** @type {Writable<AppConfig> | AppConfig} */
  const config = SvelteStore.writableStore();

</script>

<Tab title="General" bind:selected={selected} id="{id}">
  <PaddingBox>
    <BooleanInput label="Shop Highlight Extension"
                  toolTip="Toggles the functionality of this browser extension"
                  bind:checked={$config.general.enabled}/>
    <BooleanInput label="Mini Stock Highlighting"
                  toolTip="Toggles the mini stock highlighting feature"
                  bind:checked={$config.general.features.miniStock}/>
    <BooleanInput label="Item Group Highlighting"
                  toolTip="Toggles the item group highlighting feature"
                  bind:checked={$config.general.features.itemMatch}/>
  </PaddingBox>
</Tab>
