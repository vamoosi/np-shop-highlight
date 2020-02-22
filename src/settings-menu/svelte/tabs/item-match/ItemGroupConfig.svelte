<style>
  .menu-right {
    width:       20%;
    margin-left: 30px;
  }

  .menu-left {
    margin-right: 20px;
  }
</style>

<script>
  import PaddingBox from '../../generic/PaddingBox.svelte';
  import BooleanInput from '../../generic/form/BooleanInput.svelte';
  import TextInput from '../../generic/form/TextInput.svelte';
  import TextArea from '../../generic/form/TextArea.svelte';
  import StyleSelect from '../../generic/StyleSelect.svelte';
  import { SvelteStore } from '../../../../lib/store/svelte';
  import Lib from '../../../ts/lib/item-match'

  /** @type {Readable<AppConfig> | AppConfig} */
  const read  = SvelteStore.readableStore();

  /** @type {Readable<AppConfig> | AppConfig} */
  const write = SvelteStore.writableStore();

  export let groupId;

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

<PaddingBox>
  <div class="flex">
    <div class="menu-left">
      <BooleanInput bind:checked={$write.itemMatch.groups[groupId].enabled}
                    label="Enabled"
                    toolTip="Enable or disable this highlight group"/>

      <TextInput label="Name"
                 title="Item Group Name"
                 initialValue="{$read.itemMatch.groups[groupId].name}"
                 bind:validValue={$write.itemMatch.groups[groupId].name}/>

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
  </div>
</PaddingBox>
