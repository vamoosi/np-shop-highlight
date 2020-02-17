<style></style>
<script>
  import TextInput from "../generic/TextInput.svelte";
  import SliderInput from "../generic/SliderInput.svelte";
  import ColorInput from "../generic/ColorInput.svelte";
  import ExampleItem from "../generic/ExampleItem.svelte";

  /** @type {HighlightStyle} */
  export let config;
</script>

<ExampleItem bind:config={config} />
<TextInput label="Style Name" bind:value={config.name} />
<SliderInput label="Opacity" bind:value={config.opacity} />
<ColorInput label="Background Color" bind:value={config.bgColor} />
<ColorInput label="Text Color" bind:value={config.textColor} />