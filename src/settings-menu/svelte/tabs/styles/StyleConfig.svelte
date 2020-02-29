<style>
  div.space {
    margin-left: 50px;
  }
</style>

<script>
  import TextInput from '../../generic/form/TextInput.svelte';
  import SliderInput from '../../generic/form/SliderInput.svelte';
  import ColorInput from '../../generic/form/ColorInput.svelte';
  import ExampleItem from '../../generic/ExampleItem.svelte';

  /** @type {HighlightStyle} */
  export let style;
</script>

<div class="flex">
  <div>
    <TextInput label="Style Name" initialValue="{style.name}" bind:validValue={style.name}/>
    <SliderInput label="Opacity" bind:value={style.opacity} max="1"/>
    <ColorInput label="Background Color" bind:value={style.bgColor}/>
    <ColorInput label="Text Color" bind:value={style.textColor}/>
  </div>
  <div class="space">
    <ExampleItem bind:config={style}/>
  </div>
</div>
