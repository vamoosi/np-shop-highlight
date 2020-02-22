<script>
  import Tab from '../generic/tab/Tab.svelte';
  import BooleanInput from '../generic/form/BooleanInput.svelte';
  import PaddingBox from '../generic/PaddingBox.svelte';
  import StyleSelect from '../generic/StyleSelect.svelte';
  import { SvelteStore } from '../../../lib/store/svelte';

  export let id;

  export let selected;

  /** @type {Writable<AppConfig> | AppConfig} */
  const config = SvelteStore.writableStore();

</script>

<Tab title="Mini Stock" bind:selected={selected} id="{id}">
  <PaddingBox>
    <div>
      <BooleanInput label="Mini Stock Item Highlighting"
                    bind:checked={$config.miniStock.enabled}/>

      <StyleSelect label="Fresh Item Style"
                   bind:value={$config.miniStock.freshStyle}/>

      <StyleSelect label="Stale Item Style"
                   bind:value={$config.miniStock.staleStyle}/>
    </div>
  </PaddingBox>
</Tab>
