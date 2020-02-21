<script>
  import Tab from '../generic/tab/tab.svelte';
  import BooleanInput from '../generic/form/boolean-input.svelte';
  import PaddingBox from '../generic/padding-box.svelte';
  import { SvelteStore } from '../../../lib/store/svelte';

  /** @type {*} */
  export let id;

  /** @type {*} */
  export let selected;

  const config = SvelteStore.writableStore();

</script>

<Tab title="General" bind:selected={selected} id="{id}">
  <PaddingBox>
    <BooleanInput label="Shop Highlight Extension"
                  bind:checked={$config.general.enabled}/>
    <BooleanInput label="Debug Output"
                  bind:checked={$config.general.debug}/>
  </PaddingBox>
</Tab>
