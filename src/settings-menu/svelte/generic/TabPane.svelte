<style>
  ul {
    list-style:      none;
    padding:         5vh 0;
    margin:          0;
    position:        relative;
    background-size: 220px;
    background:      #e9e9e9;
    background:      linear-gradient(90deg, #e9e9e9 205px, #d9d9d9 219px, #ccc 220px, #fff 221px);
    height:          100vh;
    box-sizing:      border-box;
  }
</style>

<script>
  /**
   * @param {Event} e
   */
  function noFocus(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  }
</script>

<ul on:={noFocus}>
  <slot></slot>
</ul>
