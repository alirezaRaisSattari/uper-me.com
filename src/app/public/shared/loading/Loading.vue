<template>
  <div class="d-flex w-100 h-100 align-items-center justify-content-center">
    <div class="stage">
      <div class="dot-flashing"></div>
    </div>
  </div>
</template>

<style scoped>
.stage {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0.5rem 0.5rem;
  margin: 0;
  overflow: hidden;
  width: 43px;
}

.dot-flashing {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  -webkit-animation: dot-flashing 0.5s infinite linear alternate;
  animation: dot-flashing 0.5s infinite linear alternate;
  -webkit-animation-delay: 0.5s;
  animation-delay: 0.5s;
}

.dot-flashing::before,
.dot-flashing::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
}

.dot-flashing::before {
  left: -15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  -webkit-animation: dot-flashing 0.5s infinite alternate;
  animation: dot-flashing 0.5s infinite alternate;
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}

.dot-flashing::after {
  left: 15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  -webkit-animation: dot-flashing 0.5s infinite alternate;
  animation: dot-flashing 0.5s infinite alternate;
  -webkit-animation-delay: 0.5s;
  animation-delay: 0.5s;
}

@-webkit-keyframes dot-flashing {
  0% {
    background-color: #9880ff;
  }
  50%,
  100% {
    background-color: #ebe6ff;
  }
}

@keyframes dot-flashing {
  0% {
    background-color: #9880ff;
  }
  50%,
  100% {
    background-color: #ebe6ff;
  }
}
</style>