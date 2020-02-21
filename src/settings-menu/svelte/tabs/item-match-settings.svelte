<style>
  .menu-right {
    width: 20%;
  }

  .menu-left {
    margin-right: 20px;
  }
</style>

<script>
  import Tab from '../generic/tab/tab.svelte';
  import PaddingBox from '../generic/padding-box.svelte';
  import TextArea from '../generic/form/text-area.svelte';
  import StyleSelect from '../generic/style-select.svelte';
  import BooleanInput from '../generic/form/boolean-input.svelte';
  import * as Lib from '../../ts/lib/item-match';
  import { writableStore } from '../../../lib/store/svelte-store';
  import { readableStore } from '../../../lib/store/svelte-store';

  export let id;

  export let selected;

  /** @type {Writable<AppConfig>|AppConfig} */
  const write = writableStore();

  /** @type {Readable<AppConfig>|AppConfig} */
  const read = readableStore();

  function type(value) {
    $write.itemMatch
      .groups['1']
      .items = Lib.toItemArray(Lib.cleanItemString(value));
  }

  let value;
  $: value = $read.itemMatch
    .groups['1']
    .items
    .join('\n');
</script>

<Tab title="Item Match" bind:selected={selected} id="{id}">
  <PaddingBox>
    <div class="menu-left">
      <BooleanInput bind:checked={$write.itemMatch.enabled} label="Enabled"/>
      <TextArea label="Item List"
                title="List of items to match on the page"
                height="40vh"
                initialValue="{value}"
                onUpdate={type}/>
    </div>
    <div class="menu-right">
      <StyleSelect label="Style"
                   bind:value={$write.itemMatch.groups["1"].styles[0]}/>
    </div>
  </PaddingBox>
</Tab>