<script>
  import TextInput from "../generic/form/text-input.svelte";
  import SliderInput from "../generic/form/slider-input.svelte";
  import ColorInput from "../generic/form/color-input.svelte";
  import ExampleItem from "../generic/example-item.svelte";

  /** @type {HighlightStyle} */
  export let style;
</script>

<ExampleItem bind:config={style}/>
<TextInput label="Style Name" bind:value={style.name}/>
<SliderInput label="Opacity" bind:value={style.opacity}/>
<ColorInput label="Background Color" bind:value={style.bgColor}/>
<ColorInput label="Text Color" bind:value={style.textColor}/>