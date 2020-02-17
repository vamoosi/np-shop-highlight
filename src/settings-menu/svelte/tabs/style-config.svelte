<style>
  span {
    display:             block;
    width:               50px;
    opacity:             30%;
    position:            absolute;
    right:               20px;
    top:                 20px;
    cursor:              pointer;
    height:              50px;
    background-position: center;
    background-repeat:   no-repeat;
    background-image:    url("../../../../res/trash-alt.svg");
    transition: opacity 300ms ease;
  }
  span:hover {
    opacity: 50%;
  }
</style>
<script>
  import TextInput from "../generic/form/text-input.svelte";
  import SliderInput from "../generic/form/slider-input.svelte";
  import ColorInput from "../generic/form/color-input.svelte";
  import ExampleItem from "../generic/example-item.svelte";

  /** @type {HighlightStyle} */
  export let style;

  /** @type {AppConfig} */
  export let config;

  function del() {
    if (inUse()) {
      alert("Cannot delete this style, it is currently in use.");
      return;
    }

    /** @type {number[]} */
    const no = [];

    for (let i = 0; i < config.styles.order.length; i++)
      if (config.styles.order[i] !== style.id)
        no.push(config.styles.order[i]);

    config.styles.order = no;
    delete config.styles.values[style.id];
  }

  function inUse() {
    return style.id === config.miniStock.freshStyle
      || style.id === config.miniStock.staleStyle;
  }
</script>

<span on:click={del}></span>
<ExampleItem bind:config={style}/>
<TextInput label="Style Name" bind:value={style.name}/>
<SliderInput label="Opacity" bind:value={style.opacity}/>
<ColorInput label="Background Color" bind:value={style.bgColor}/>
<ColorInput label="Text Color" bind:value={style.textColor}/>