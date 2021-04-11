<template>
  <div v-b-tooltip.hover="pawnTag" ref="draggableContainer" id="draggable-container">
    <div id="draggable-header" @mousedown="dragMouseDown">
      <slot name="token">
        <!-- <h2>{{resolveImage(pawnName)}}</h2> -->
        <img style="height:30px" :src="resolveImage(pawnName)">
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DraggableDiv',
  props: {
    imgPath: {default: "", type: String},
    pawnName: {default: "George", type: String},
  },
  data: function () {
    return {
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
      }
    }
  },
  computed: {
    pawnTag() {
      let tag = this.pawnName.substring(0, this.pawnName.length-9);
      if (tag == "shortStack") {
        return "Short Stack"
      }
      return tag
    }
  },
  methods: {
    dragMouseDown: function (event) {
      event.preventDefault()
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      document.onmousemove = this.elementDrag
      document.onmouseup = this.closeDragElement
    },
    elementDrag: function (event) {
      event.preventDefault()
      this.positions.movementX = this.positions.clientX - event.clientX
      this.positions.movementY = this.positions.clientY - event.clientY
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      // set the element's new position:
      this.$refs.draggableContainer.style.top = (this.$refs.draggableContainer.offsetTop - this.positions.movementY) + 'px'
      this.$refs.draggableContainer.style.left = (this.$refs.draggableContainer.offsetLeft - this.positions.movementX) + 'px'
    },
    closeDragElement () {
      document.onmouseup = null
      document.onmousemove = null
    },
    resolveImage: function (path) {
      let images = require.context('../assets/', false, /\.png$|\.jpg$/)
      return images("./"+path)
    }
  }
}
</script>

<style>
#draggable-container {
  position: absolute;
  z-index: 0;
}
#draggable-header {
  z-index: 0;
}
</style>