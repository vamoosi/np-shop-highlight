<script>
  import { applyStyle } from '../../../lib/style';

  export let config;

  let self;

  $: {
    if (self && config)
      applyStyle(config, self);
  }
</script>

<div class="example-item">
  <h4>Example Item</h4>
  <div bind:this={self} class="box">
    <div class="img"></div>
    <b>Some Item Name</b>
    <br>
    9 in stock
    <br>
    Cost: 3000 NP
    <br>
    <br>
  </div>
</div>