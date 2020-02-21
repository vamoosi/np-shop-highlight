<style>
  div.box {
    width:          120px;
    vertical-align: middle;
    text-align:     center;
    font-family:    Verdana, Arial, Helvetica, sans-serif;
    font-size:      9pt;
    padding:        4px;
    box-sizing:     border-box;
  }

  div.img {
    background-image: url("../../../../res/x.svg");
    background-color: white;
    position:         relative;
    margin-left:      56px;
    left:             -40px;
    width:            80px;
    height:           80px;
    border:           1px solid blue;
  }

</style>

<script>
  import { applyStyle } from '../../../lib/style';

  export let config;

  let self;

  $: {
    if (self && config)
      applyStyle(config, self);
  }
</script>

<div>
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