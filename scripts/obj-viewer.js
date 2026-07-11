import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("about_viewer");
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 1, 4);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 5;
  container.appendChild(renderer.domElement);

  renderer.domElement.addEventListener("wheel", (e) => e.preventDefault(), { passive: false });
  container.addEventListener("mouseenter", () => window.lenis?.stop());
  container.addEventListener("mouseleave", () => window.lenis?.start());

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enablePan = false;
  controls.minDistance = 2;
  controls.maxDistance = 8;

  scene.add(new THREE.AmbientLight(0xffffff, 1));

  const directions = [
    [1, 0, 0], [-1, 0, 0],
    [0, 1, 0], [0, -1, 0],
    [0, 0, 1], [0, 0, -1],
  ];
  for (const [x, y, z] of directions) {
    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(x, y, z);
    scene.add(light);
  }

  const mtlLoader = new MTLLoader();
  mtlLoader.setResourcePath("/static/models/");
  mtlLoader.load(
    "/static/models/quertikinganubhav.mtl",
    (materials) => {
      materials.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(
        "/static/models/quertikinganubhav.obj",
        (obj) => {
          obj.traverse((child) => {
            if (child.isMesh) {
              child.material.transparent = false;
              child.material.opacity = 1;
              child.material.alphaTest = 0;
              child.material.alphaMap = null;
              child.material.depthWrite = true;
              child.material.needsUpdate = true;
            }
          });

          const box = new THREE.Box3().setFromObject(obj);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 2.5 / maxDim;
          obj.scale.setScalar(scale);
          obj.position.sub(center.multiplyScalar(scale));

          scene.add(obj);
        },
        undefined,
        (err) => console.error("Failed to load OBJ:", err)
      );
    },
    undefined,
    (err) => console.error("Failed to load MTL:", err)
  );

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  const ro = new ResizeObserver(() => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
  ro.observe(container);
});
