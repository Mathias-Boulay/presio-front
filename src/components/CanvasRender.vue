<script setup lang="ts">
import * as THREE from 'three';
import { ref, onMounted, watch, defineProps, computed} from 'vue'
import { useWindowSize } from '@vueuse/core'
import type { Camera, PerspectiveCamera } from 'three';

const props = defineProps<{
  targetAspectRatio: number
}>();

// Track the size for scene rendering
const rootRef = ref<HTMLCanvasElement>();
const {width, height} = useWindowSize();

// The safe zone where the "actual rendering" will take place
const frameRef = ref<HTMLElement>();
let frameSize = ref({ width: 100, height: 100 })

// Three js render stuff
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer : THREE.WebGLRenderer;

// Watch width and height
watch(width, (newWidth) => {updateSize()});
watch(height, (newHeight) => {updateSize()});

watch(() => props.targetAspectRatio, (newRatio) => {
  setDistanceToScene();
  updateRenderFrameSize();
});

function updateRenderFrameSize() {
  frameSize.value = computeRenderFrame(props.targetAspectRatio);
}

/** Select which side of the screen to constraint given the aspect ratio */
function computeRenderFrame(aspectRatio: number): {width: number, height: number}{
  if(aspectRatio > 1){  // Wide screen
    let height = window.innerWidth / aspectRatio;
    if(height > window.innerHeight){
      return {width: window.innerHeight * aspectRatio, height: window.innerHeight}
    }
    return {width: window.innerWidth, height: height}
  }
  
  // Tall screen
  let width = window.innerHeight * aspectRatio;
  if(width > window.innerWidth){
    return {width: window.innerWidth, height: window.innerWidth / aspectRatio}
  }
  return {width: width, height: window.innerHeight};
}

/** Update rendering settings to keep a consistant rendering aspect */
function updateSize(){
  renderer.setSize(width.value, height.value);
  renderer.setViewport(0, 0, width.value, height.value);
  camera.aspect = width.value / height.value;
  setDistanceToScene();
  camera.updateProjectionMatrix();
  
  updateRenderFrameSize();
}


function setDistanceToScene(){
  // Simple function, with coefficient arbitrary choosen
  //TODO handle custom screen resolutions
  let size = computeRenderFrame(props.targetAspectRatio);
  camera.position.setZ(50000 / Math.min(size.height, size.width));

  console.log(camera.position.z);
}


onMounted(() => {
  renderer = new THREE.WebGLRenderer({
    canvas: rootRef.value as HTMLCanvasElement
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  setDistanceToScene();
  updateRenderFrameSize();

  renderer.render(scene, camera);

  // Torus

  const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
  const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
  const torus = new THREE.Mesh(geometry, material);

  scene.add(torus);

  // Lights

  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(5, 5, 5);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(pointLight, ambientLight);

  function animate() {
    requestAnimationFrame(animate);
    //console.log(props.targetAspectRatio)

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    // controls.update();

    renderer.render(scene, camera);
  }

  animate();

});
</script>

<template>
<div  class="canvas-renderer">
  <canvas class="canvas-renderer" ref="rootRef" />
  <div class="container-frame">
    <div
    class="render-frame"
    ref="frameRef"
    :style="{width: frameSize.width + 'px', height: frameSize.height + 'px'}"
    >dqz</div>
  </div>
</div>

</template>
  
<style scoped>
.canvas-renderer {
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow-y: hidden;
}

.container-frame {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
}

.render-frame {
  box-sizing: border-box;
  border: 10px dashed #F00;

}
</style>