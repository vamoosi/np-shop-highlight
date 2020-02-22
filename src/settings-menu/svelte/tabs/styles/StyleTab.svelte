<script>
  import SubTab from '../../generic/tab/NestedTab.svelte'
  import StyleConfig from './StyleConfig.svelte';
  import StyleControl from './StyleControl.svelte';

  /**
   * @type {HighlightStyle}
   */
  export let style;

  /**
   * ID of the currently selected style
   */
  export let selection;

</script>

<SubTab tabId="{style.id}" name="{style.name}" bind:selection="{selection}">
  <StyleConfig bind:style={style}/>
  <StyleControl bind:selected={selection}/>
</SubTab>
