<style>
  ul {
    list-style:      none;
    padding:         5vh 0;
    margin:          0;
    position:        relative;
    background-size: 220px;
    background:      #fafafa;
    background:      linear-gradient(90deg, rgba(250,250,250,1) 205px, rgba(240,240,240,1) 220px, #ddd 221px, #fff 222px);
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
