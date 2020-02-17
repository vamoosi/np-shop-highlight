<style></style>
<script>
  import TextInput from "../generic/text-input.svelte";
  import SliderInput from "../generic/slider-input.svelte";
  import ColorInput from "../generic/color-input.svelte";
  import ExampleItem from "../generic/example-item.svelte";

  /** @type {HighlightStyle} */
  export let config;
</script>

<ExampleItem bind:config={config} />
<TextInput label="Style Name" bind:value={config.name} />
<SliderInput label="Opacity" bind:value={config.opacity} />
<ColorInput label="Background Color" bind:value={config.bgColor} />
<ColorInput label="Text Color" bind:value={config.textColor} />