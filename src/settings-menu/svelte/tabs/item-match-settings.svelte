<style>
  .menu-right {
    width: 20%;
  }
  .menu-left {
    margin-right: 20px
  }
</style>

<script>
  import Tab from '../generic/tab/tab.svelte';
  import PaddingBox from '../generic/padding-box.svelte'
  import TextArea from '../generic/form/text-area.svelte';
  import StyleSelect from '../generic/style-select.svelte';
  import BooleanInput from '../generic/form/boolean-input.svelte';
  import * as Lib from '../../js/lib/item-match';
  import { getConfigStore } from "../../js/app-config";
  import { newDebouncer } from '../../js/lib/debouncer';

  export let id;

  export let selected;

  /**
   * @type {Writable<AppConfig>|AppConfig}
   */
  const config = getConfigStore();
  const imConf = $config.itemMatch;

  function type() {
    $config.itemMatch.groups["1"].items = Lib.toItemArray(Lib.cleanItemString(value));
  }

  $: value = imConf.groups["1"].items.join('\n');

  const debouncer = newDebouncer(type);
</script>

<Tab title="Item Match" bind:selected={selected} id="{id}">
  <PaddingBox>
    <div class="menu-left">
      <BooleanInput bind:checked={$config.itemMatch.enabled} label="Enabled" />
      <TextArea label="Item List"
                title="List of items to match on the page"
                height="40vh"
                bind:value={value}
                onType={debouncer} />
    </div>
    <div class="menu-right">
      <StyleSelect label="Style" bind:value={$config.itemMatch.groups["1"].styles[0]} />
    </div>
  </PaddingBox>
</Tab>