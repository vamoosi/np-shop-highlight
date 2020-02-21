<script>
  import Tab from '../generic/tab/tab.svelte';
  import BooleanInput from '../generic/form/boolean-input.svelte';
  import PaddingBox from '../generic/padding-box.svelte';
  import StyleSelect from '../generic/style-select.svelte';
  import { writableStore } from '../../../lib/store/svelte-store';

  export let id;

  export let selected;

  /** @type {Writable<AppConfig> | AppConfig} */
  const config = writableStore();

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
