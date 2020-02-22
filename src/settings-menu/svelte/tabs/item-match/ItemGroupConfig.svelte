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
  import Lib from '../../../ts/lib/item-match'

  export let group;


  function type(value) {
    group.items = Lib.toItemArray(Lib.cleanItemString(value));
  }

  let value;
  $: value = group.items.join('\n');

</script>

<PaddingBox>
  <div class="flex">
    <div class="menu-left">
      <BooleanInput bind:checked={group.enabled}
                    label="Enabled"
                    toolTip="Enable or disable this highlight group"/>

      <TextInput label="Name"
                 title="Item Group Name"
                 initialValue="{group.name}"
                 bind:validValue={group.name}/>

      <TextArea label="Item List"
                title="List of items to match on the page"
                height="40vh"
                initialValue="{value}"
                onUpdate={type}/>
    </div>
    <div class="menu-right">
      <StyleSelect label="Style"
                   bind:value={group.styles[0]}/>
    </div>
  </div>
</PaddingBox>
