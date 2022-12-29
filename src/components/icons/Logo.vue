<template>
<header>
  <router-link class="logo-box" to="/">
    <img
      class="logo-image"
      alt="Website logo"
      src="@/assets/img/ic_logo.png"
    />
    <h1 class="logo-text">Presio<br/>Your best slide</h1>
  </router-link>
</header>
</template>

<style scoped>
.logo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem; 

  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.logo-image {
  height: 3rem;
  height: 3rem;
}

.logo-text {
  font-size: medium;
  vertical-align: middle;
}
</style>