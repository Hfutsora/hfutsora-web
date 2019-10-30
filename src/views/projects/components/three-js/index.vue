<template>
  <dashboard>
    <template v-slot:message>
      <project>
        <template v-slot:project-title>ThreeJS</template>
          <template v-slot:project-content>

          <div class="three-container">
            <transition name="fade">
              <progress-bar
                v-if="percentComplete < 100"
                :percent-complete="percentComplete"
                class="load-progress"></progress-bar>
            </transition>
            <div
              ref="WebGL-output"
              class="WebGL-output"></div>

            <div
              v-show="percentComplete >= 100"
              ref="my-gui-container"
              class="my-gui-container"></div>
          </div>

        </template>
      </project>
    </template>
  </dashboard>
</template>

<script>
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader';
import OrbitControls from 'three-orbitcontrols';
import Project from '../project';
import Dashboard from '@/views/dashboard';

import ProgressBar from './components/Progress';

export default {
  name: 'ThreeJsView',
  components: {
    Dashboard,
    Project,
    ProgressBar,
  },
  data() {
    return {
      url: 'http://static.compass.dataee.net/tower',
      renderer: '',
      scene: '',
      camera: '',
      text: '',
      plant: '',
      controls: '',
      id: '',
      percentComplete: 0,
      isRender: false,
    };
  },
  created() {
    this.$nextTick(() => {
      this.draw();
    });
  },
  methods: {
    initRender() {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });

      this.renderer.setSize(1059, 720);

      this.$refs['WebGL-output'].appendChild(this.renderer.domElement);
    },
    render() {
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
    },
    initScene() {
      this.scene = new THREE.Scene();

      const cubeLoader = new THREE.CubeTextureLoader();
      cubeLoader.setPath(`${this.url}/skybox/`);

      const textureCube = cubeLoader.load([
        'px.jpg', 'nx.jpg',
        'py.jpg', 'ny.jpg',
        'pz.jpg', 'nz.jpg',
      ]);

      this.scene.background = textureCube;
    },
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(45, 1059 / 720, 0.1, 10000);
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);

      this.controls.maxPolarAngle = Math.PI * 0.5;
      this.camera.lookAt(new THREE.Vector3(0, 12, 8));
      this.controls.update();
    },
    initLight() {
      const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
      hemiLight.color.setHSL(0.6, 1, 0.6);
      hemiLight.groundColor.setHSL(0.095, 1, 0.75);
      hemiLight.position.set(0, 50, 0);
      this.scene.add(hemiLight);
      const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
      this.scene.add(hemiLightHelper);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.color.setHSL(0.1, 1, 0.95);
      dirLight.position.set(-1, 1.75, 1);
      dirLight.position.multiplyScalar(30);
      this.scene.add(dirLight);
      dirLight.castShadow = true;
      dirLight.shadow.mapSize.width = 2048;
      dirLight.shadow.mapSize.height = 2048;
      const d = 50;
      dirLight.shadow.camera.left = -d;
      dirLight.shadow.camera.right = d;
      dirLight.shadow.camera.top = d;
      dirLight.shadow.camera.bottom = -d;
      dirLight.shadow.camera.far = 3500;
      dirLight.shadow.bias = -0.0001;

      // const dirLightHeper = new THREE.DirectionalLightHelper(dirLight, 10);
      // this.scene.add(dirLightHeper);
    },
    plantOnload(object) {
      this.plant = object;
      this.plant.scale.set(1, 1, 1);

      // this.plant.traverse((child) => {
      //   // 设置模型生成阴影并接收阴影
      //   child.castShadow = true;
      //   child.receiveShadow = true;
      // });

      this.scene.add(this.plant);
    },
    initModel() {
      const onProgress = (xhr) => {
        if (xhr.lengthComputable) {
          this.percentComplete = xhr.loaded / xhr.total * 100;
          if (this.percentComplete >= 100 && !this.isRender) {
            this.isRender = true;
            this.renderScene();
          }
        }
      };

      const onError = () => {
        //
      };

      new MTLLoader().setPath(`${this.url}/model/`).load('dianta.mtl', (materials) => {
        materials.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(`${this.url}/model/`).load('dianta.obj', (object) => {
          this.plantOnload(object);
        }, onProgress, onError);
      });
    },
    initControls() {
      // eslint-disable-next-line func-names
      const Control = function () {
        this.message = 'dat.gui';
        this.x_rotate = 0;
        this.y_rotate = 0;
        this.z_rotate = 0;
        this.scale = 1;

        this.position_x = 12;
        this.position_y = 5;
        this.position_z = 20;

        // this.lookAt = 5;
      };
      this.text = new Control();
      const gui = new dat.GUI({ autoPlace: false, width: 350 });

      this.$refs['my-gui-container'].appendChild(gui.domElement);

      gui.remember(this.text);

      const f1 = gui.addFolder('plant');
      f1.add(this.text, 'scale', 0.5, 5);
      f1.add(this.text, 'x_rotate', -90, 90);
      f1.add(this.text, 'y_rotate', -180, 180);
      f1.add(this.text, 'z_rotate', -90, 90);

      const f2 = gui.addFolder('camera');
      f2.add(this.text, 'position_x', -50, 50);
      f2.add(this.text, 'position_y', 0, 20);
      f2.add(this.text, 'position_z', 0, 50);
      // f2.add(this.text, 'lookAt', 0, 10);

      f1.open();
      f2.open();
    },
    renderScene() {
      if (this.camera) {
        this.camera.position.set(this.text.position_x, this.text.position_y, this.text.position_z);
        // this.camera.lookAt(new THREE.Vector3(0, this.text.lookAt, 0));
        this.camera.lookAt(new THREE.Vector3(0, 20, 0));
      }
      if (this.plant) {
        this.plant.scale.set(this.text.scale, this.text.scale, this.text.scale);
        this.plant.rotation.x = this.text.x_rotate * Math.PI / 180;
        this.plant.rotation.y = this.text.y_rotate * Math.PI / 180;
        this.plant.rotation.z = this.text.z_rotate * Math.PI / 180;
      }
      requestAnimationFrame(this.renderScene);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    },
    draw() {
      if (!this.scene) {
        this.initRender();

        this.initScene();

        this.initCamera();

        this.initLight();

        this.initModel();

        this.initControls();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.WebGL-output {
  width: 960px;
  height: 720px;
  z-index: 0;
}
.my-gui-container {
  opacity: 0.9;
  transition: all .5s;
  position: absolute;
  right: 8px;
  top: 72px;

  &:hover {
    opacity: 1;
  }
}
.load-progress {
  background: black;
  z-index: 999;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
