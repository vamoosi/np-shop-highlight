<script>
  import InputLabel from './input-label.svelte';

  export let label;
  export let styleClass;
  export let value;

  export const getId = () => `input-${name}`;
</script>

<style>
  @import '../../../css/global.sass';

  span {
    display:       block;
    margin-bottom: 20px;
  }

  input[type=color] {
    opacity:       0;
    padding:       0;
    height:        2em;
    margin-right:  5px;
    width:         60px;
    border-radius: 3px;
  }

  input[type=color]:hover {
    cursor: pointer;
  }

  input[type=text] {
    margin:        0;
    line-height:   1.6em;
    color:         var(--text-color);
    border-radius: 5px;
    font-size:     1.1em;
    position:      relative;
    bottom:        -.3em;
  }

  span span {
    display:          inline-block;
    background-color: var(--value);
    border:           var(--input-border-off);
    border-radius:    5px;
    margin-right:     5px;
    margin-bottom:    0;
  }
</style>

<InputLabel label="{label}" style="{styleClass}">
  <span style="--value: {value}">
    <span>
      <input type="color"
             class="{styleClass}"
             bind:value="{value}"/>
    </span>
    <input type="text" bind:value={value}/>
  </span>
</InputLabel>
