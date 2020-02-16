<script>
  import InputLabel from "./InputLabel.svelte"

  export let name;
  export let label;
  export let styleClass;
  export let value;

  export const getId = () => `input-${name}`
</script>

<style>

  span {
    display:       block;
    margin-bottom: 20px;
  }

  input[type=color] {
    opacity:          0;
    padding:          0px;
    height:           2.2em;
    margin-right:     5px;
    width:            60px;
    position:         relative;
    bottom:           -0.5em;
    border:           0;
    border-radius:    3px;
  }

  input[type=color]:hover {
    cursor: pointer;
  }

  input[type=text] {
    margin:        0;
    line-height:   1.4em;
    color:         #555555;
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
    display: inline-block;
    background-color: var(--value);
    border-radius: 5px;
    margin-right: 5px;
    margin-bottom: 0;
  }
</style>

<InputLabel label="{label}" style="{styleClass}" target="{getId()}"/>
<span style="--value: {value}">
  <span>
    <input type="color"
           name="{name}"
           id="{getId()}"
           class="{styleClass}"
           bind:value="{value}"/>
  </span>
  <input type="text" bind:value={value}/>
</span>
