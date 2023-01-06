<script setup lang="ts">
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ref, onMounted, watch, defineProps, computed} from 'vue'
import { useWindowSize } from '@vueuse/core'
import type { LightType, UserPresentation } from '@/assets/ts/backend/interfaces';
import type { RenderQuality } from '@/assets/ts/interfaces';
import { BACK_URL } from '@/assets/ts/utils/constants';
import type { Material, MeshPhysicalMaterial, MeshStandardMaterial } from 'three';
import { getDeviceImage } from '@/assets/ts/backend/routes';

const CAMERA_FOV = 75;

const props = defineProps<{
  targetAspectRatio: number,
  presentation: UserPresentation
}>();

// Track the size for scene rendering
const rootRef = ref<HTMLCanvasElement>();
const {width, height} = useWindowSize();

// The safe zone where the "actual rendering" will take place
const frameRef = ref<HTMLElement>();
let frameSize = ref({ width: 100, height: 100 })

// Three js render stuff
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(CAMERA_FOV, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer : THREE.WebGLRenderer;

// Watch width and height
watch(width, (newWidth) => {updateSize()});
watch(height, (newHeight) => {updateSize()});
watch(() => props.targetAspectRatio, (newRatio) => {
  updateSize();
});


function updateRenderFrameSize(frameWidth: number=window.innerWidth, frameHeight: number=window.innerHeight) {
  frameSize.value = computeRenderFrame(props.targetAspectRatio, frameWidth, frameHeight);
}

/** Select which side of the screen to constraint given the aspect ratio */
function computeRenderFrame(aspectRatio: number, frameWidth: number=window.innerWidth, frameHeight: number=window.innerHeight): {width: number, height: number}{
  if(aspectRatio > 1){  // Wide screen
    let height = frameWidth / aspectRatio;
    if(height > frameHeight){
      return {width: frameHeight * aspectRatio, height: frameHeight}
    }
    return {width: frameWidth, height: height}
  }
  
  // Tall screen
  let width = frameHeight * aspectRatio;
  if(width > frameWidth){
    return {width: frameWidth, height: frameWidth / aspectRatio}
  }
  return {width: width, height: frameHeight};
}

/** Update rendering settings to keep a consistant rendering aspect */
function updateSize(width: number=window.innerWidth, height: number=window.innerHeight){
  renderer.setSize(width, height);
  renderer.setViewport(0, 0, width, height);
  camera.aspect = width / height;

  const frameSize = computeRenderFrame(props.targetAspectRatio, width, height);
  
  const cameraHeight = Math.tan((CAMERA_FOV / 2) * (Math.PI/180) );
  const aspect = frameSize.width / renderer.domElement.height;
  const ratio = aspect;
  const newCameraHeight = cameraHeight / ratio;
  camera.fov = (Math.atan(newCameraHeight) / (Math.PI/180) ) * 2;
  
  camera.updateProjectionMatrix();
  updateRenderFrameSize(width, height);
}

/** Build the proper light type */
function buildLight(type: LightType): THREE.Light {
  switch(type){
    case 'POINT': return new THREE.PointLight(0xFFFFFF);
    case 'AMBIANT': return new THREE.AmbientLight(0xFFFFFF);
  }
}

/** Save a blob as an image file */
function saveBlob(blob: Blob, filename: string){
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';

  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();

  document.removeChild(a);
  URL.revokeObjectURL(url);
}

/** Export the render to a file to download */
function exportRender(ratio: number, quality: RenderQuality, format: string){
  //FIXME change the resolution on the fly and all
  const frameSize = getExportFrameSize(quality)
  const finalSize = computeRenderFrame(ratio, frameSize, frameSize);

  renderer.domElement.width = finalSize.width;
  renderer.domElement.height = finalSize.height;
  updateSize(finalSize.width, finalSize.height);

  renderer.render(scene, camera);
  renderer.domElement.toBlob((blob) => {
    saveBlob(blob!, `presio-${props.presentation.name}-${new Date().toDateString()}-${quality}`);
  }, `image/${format}`);
  
  // Put back to the original size
  setTimeout(() => {  
    renderer.domElement.width = window.innerWidth;
    renderer.domElement.height = window.innerHeight;
    updateSize();
    renderer.render(scene, camera);
  }, 10);
}

function getExportFrameSize(quality: RenderQuality): number {
  switch(quality){
    case 'LOW': return 860;
    case 'MEDIUM': return 1280;
    case 'HIGH': return 1920;
  }
}

onMounted(async () => {
  renderer = new THREE.WebGLRenderer({
    canvas: rootRef.value as HTMLCanvasElement,
    alpha: true,
    antialias: true
  });


  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.z = 0.3;
  updateSize();

  // Mount the devices
  for(let i=0; i<props.presentation.devices.length; ++i) {
    const gltfLoader = new GLTFLoader();
    const url = `${BACK_URL}${props.presentation.devices[i].device.filePath}`;
    console.log(url);
    gltfLoader.load(url, async (gltf) => {
      
      const mesh = gltf.scene;
      
      
      
      mesh.position .set(0, 0, 0);
      mesh.rotateX(Math.PI/2);
      
      
      const iphoneChildren = mesh.children[0];
      //FIXME This should be stored inside the database to support many devices
      const glassChildren = iphoneChildren.children[13].children[2];
      
      
      try {
        const rawTexture = await getDeviceImage(props.presentation.devices[i].id);

        const texture = await new THREE.TextureLoader().loadAsync(rawTexture);
        texture.encoding = THREE.sRGBEncoding;
        
        // FIXME the UV MAPPING IS BROKEN
        // 3D models should offer a standarised plane in a separate mesh for mapping in a 0..1 space
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 6.5, 4 );
        

        const texturedMaterial = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
        texturedMaterial.needsUpdate = true;
        // @ts-ignore
        glassChildren.material = texturedMaterial;
      } catch (error) {
        console.warn('Couldn\'t get the image');
      }
      
      
      watch(ref(props.presentation.devices[i]), (device) => {
      const magicScale = 5
      mesh.position.set(device.x/magicScale, device.y/magicScale, device.z/magicScale);
      mesh.rotation.set(device.roll/magicScale, device.pitch/magicScale, device.yaw/magicScale);
    }, {deep: true});

    scene.add(mesh);
    });
  }

  // Mount the lights
  for(let i=0; i<props.presentation.lights.length; ++i){
    const light = buildLight(props.presentation.lights[i].lightType);
    
    watch(ref(props.presentation.lights[i]), (newLight) => {
      const magicScale = 5;  // TODO factorise
      light.position.set(newLight.x, newLight.y, newLight.z);
      light.rotation.set(newLight.roll/magicScale, newLight.pitch/magicScale, newLight.yaw/magicScale);
    }, {deep: true});

    scene.add(light);
  }

  // Add a default ambiant light, just for things not to be so dark
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.93);
  ambientLight.position.set(0,0,0)
  scene.add(ambientLight);

  /** Constantly update the render */
  // TODO rerender only when needed
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
});


defineExpose({
  exportRender
})
</script>

<template>
<div  class="canvas-renderer">
  <canvas class="canvas-renderer" ref="rootRef" />
  <div class="container-frame">
    <div
    class="render-frame"
    ref="frameRef"
    :style="{width: frameSize.width + 'px', height: frameSize.height + 'px'}"
    ></div>
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
  border: 2px dashed #F00;
}
</style>