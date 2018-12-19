<template>
  <div class="spinner-wrap">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.spinner-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
.spinner {
  margin: auto;
  width: 75px;
  height: 75px;
  background: transparent;
  border-top: 4px solid #52bcd3;
  border-right: 4px solid transparent;
  border-radius: 50%;
  -webkit-animation: 1s spin linear infinite;
  animation: 1s spin linear infinite;
}

@keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
