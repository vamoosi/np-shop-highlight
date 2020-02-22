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
  </PaddingBox>
</Tab>
