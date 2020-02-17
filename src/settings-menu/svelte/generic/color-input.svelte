<script>
  import InputLabel from "./input-label.svelte"

  export let label;
  export let styleClass;
  export let value;

  export const getId = () => `input-${name}`
</script>

<style>
  @import '../../css/settings.css';

  span {
    display:       block;
    margin-bottom: 20px;
  }

  input[type=color] {
    opacity:       0;
    padding:       0;
    height:        2.2em;
    margin-right:  5px;
    width:         60px;
    position:      relative;
    bottom:        -0.5em;
    border:        0;
    border-radius: 3px;
  }

  input[type=color]:hover {
    cursor: pointer;
  }

  input[type=text] {
    margin:        0;
    line-height:   1.4em;
    color:         var(--text-color);
    border-radius: 5px;
    font-size:     1.1em;
    border-width:  0 0 1px 0;
  }

  input[type=text]:focus {
    border-width: 0 0 1px 0;
    outline:      none;
    border-color: #6db5ff;
  }

  span span {
    display:          inline-block;
    background-color: var(--value);
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
