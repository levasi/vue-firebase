<template>
  <transition name="fade">
    <div @click.self="closeModal" v-if="open" class="hm-modal__backdrop">
      <div class="hm-modal" ref="hmModal" :style="modalStyle">
        <div @click="closeModal" class="hm-modal-close">x</div>
        <div class="hm-modal__header" @mousedown="startDrag">header</div>
        <div class="hm-modal-content hm-scrollbar">
          <slot name="content"></slot>
        </div>
        <div class="hm-modal__footer">footer</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      modal: false,
      modalStyle: {},
      initialStyle: {}
    };
  },
  props: {
    open: {
      type: Boolean
    }
  },
  methods: {
    startDrag(event) {
      document.body.style.pointerEvents = null;
      document.addEventListener("mousemove", this.dragModal);
      document.addEventListener("mouseup", this.stopDrag);
      const {
        width,
        height,
        left,
        top
      } = this.$refs.hmModal.getBoundingClientRect();

      const mouseToModalX = event.clientX - left;
      const mouseToModalY = event.clientY - top;

      this.initialStyle = {
        width,
        height,
        left,
        top,
        mouseToModalY,
        mouseToModalX
      };
    },
    dragModal(event) {
      const eventX = event.clientX;
      const eventY = event.clientY;
      const pxLeft = eventX - this.initialStyle.mouseToModalX;
      const pxTop = eventY - this.initialStyle.mouseToModalY;
      const percentageLeft = (pxLeft / window.innerWidth) * 100 + "%";
      const percentageRight = (pxTop / window.innerHeight) * 100 + "%";
      this.modalStyle = {
        left: percentageLeft,
        top: percentageRight
      };
    },
    stopDrag() {
      document.body.style.pointerEvents = "initial";
      document.removeEventListener("mousemove", this.dragModal);
    },
    closeModal() {
      this.$emit("close-modal");
    },
    openModal() {
      this.modal = true;
    }
  },
  beforeDestroy() {
    document.removeEventListener("mouseup", this.stopDrag);
  }
};
</script>

<style lang="scss">
.hm-modal-content {
  overflow-y: scroll;
  height: 70vh;
  width: 100%;
  background-color: #fbfbfb;
}
.hm-modal {
  flex-direction: column;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  box-sizing: border-box;
  width: 96%;
  position: absolute;
  left: 2%;
  top: 10vh;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hm-modal-close {
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
}
.hm-modal__content {
  position: relative;
}
.hm-modal__header,
.hm-modal__footer {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  background-color: #ddd;
  width: 100%;
}
.hm-modal__header {
  cursor: pointer;
}
.hm-modal__backdrop {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
}

.hm-scrollbar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
  border-radius: 10px;
}

.hm-scrollbar::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

.hm-scrollbar::-webkit-scrollbar-thumb {
  background-color: #aaa;
  border-radius: 10px;
  background-image: -webkit-linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0.2) 75%,
    transparent 75%,
    transparent
  );
}
</style>
