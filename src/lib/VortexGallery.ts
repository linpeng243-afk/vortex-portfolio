import * as THREE from "three";
import gsap from "gsap";

const instancedVertexShader = `
#define PI 3.14159265359

attribute float aAngle;
attribute float aHeight;
attribute float aRadius;
attribute float aAspectRatio;
attribute float aSpeed;
attribute vec4 aTextureCoords;
attribute vec2 aImageRes;

varying vec4 vTextureCoords;
varying vec2 vUv;
varying float vAspectRatio;

uniform float uMaxZ;
uniform float uZrange;
uniform float uScrollY;
uniform float uSpeedY;
uniform float uDirection;

vec4 getQuaternionFromAxisAngle(vec3 axis, float angle) {
  float halfAngle = angle * 0.5;
  return vec4(axis.xyz * sin(halfAngle), cos(halfAngle));
}

void main() {
  vec3 scaledPosition = position;
  scaledPosition.y /= aAspectRatio;

  float zPos = aHeight + uScrollY;
  float zRange = uZrange;
  float minZ = (uMaxZ - uZrange);

  zPos = mod(zPos - minZ, zRange) + minZ;

  float theta = aAngle + uSpeedY * 0.4 * aSpeed;

  vec3 instancePosition = vec3(cos(theta) * aRadius, zPos, sin(theta) * aRadius);

  float angle = atan(instancePosition.x, instancePosition.z);

  vec4 rotation = getQuaternionFromAxisAngle(vec3(0.0, 1.0, 0.0), angle);

  vec3 finalPosition = scaledPosition + 2.0 * cross(rotation.xyz, cross(rotation.xyz, scaledPosition) + rotation.w * scaledPosition);

  vec4 modelPosition = modelMatrix * vec4(instancePosition + finalPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;

  vUv = uv;
  vTextureCoords = aTextureCoords;
  vAspectRatio = aAspectRatio;
}
`;

const instancedFragmentShader = `
varying vec4 vTextureCoords;
varying vec2 vUv;

uniform sampler2D uAtlas;

void main() {
  float xStart = vTextureCoords.x;
  float xEnd = vTextureCoords.y;
  float yStart = vTextureCoords.z;
  float yEnd = vTextureCoords.w;

  vec2 atlasUV;
  atlasUV.x = mix(xStart, xEnd, vUv.x);
  atlasUV.y = mix(yStart, yEnd, 1.0 - vUv.y);

  vec4 color = texture2D(uAtlas, atlasUV);
  gl_FragColor = color;
}
`;

const centeredVertexShader = `
varying vec2 vUv;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;
  vUv = uv;
}
`;

const centeredFragmentShader = `
varying vec2 vUv;

uniform sampler2D uAtlas;
uniform vec4 uTextureCoords;

void main() {
  float xStart = uTextureCoords.x;
  float xEnd = uTextureCoords.y;
  float yStart = uTextureCoords.z;
  float yEnd = uTextureCoords.w;

  vec2 atlasUV;
  atlasUV.x = mix(xStart, xEnd, vUv.x);
  atlasUV.y = mix(yStart, yEnd, 1.0 - vUv.y);

  vec4 color = texture2D(uAtlas, atlasUV);
  gl_FragColor = color;
}
`;

export default class VortexGallery {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  imageInfos: {
    width: number;
    height: number;
    aspectRatio: number;
    uvs: { xStart: number; xEnd: number; yStart: number; yEnd: number };
  }[] = [];
  rawImages: HTMLImageElement[] = [];
  atlasTexture: THREE.Texture | null = null;
  centerTexture: THREE.CanvasTexture | null = null;
  centerCanvas: HTMLCanvasElement | null = null;
  instancedMaterial!: THREE.ShaderMaterial;
  centerMaterial!: THREE.ShaderMaterial;
  centerMesh: THREE.Mesh | null = null;
  scrollY = {
    speedTarget: 0,
    speedCurrent: 0,
    target: 0,
    current: 0,
    direction: 1,
  };
  textureIndex = 0;
  time = 0;
  paused = false;
  centerScrollSlow = 0;
  currentImageIndex = 0;
  instanceData: {
    angles: Float32Array;
    heights: Float32Array;
    radiuses: Float32Array;
    speeds: Float32Array;
    aspectRatios: Float32Array;
    imageIndices: Uint16Array;
  } | null = null;
  instanceCount = 0;

  private stepSize = 6;
  private uMaxZ = 0;
  private uZrange = 0;
  private disposed = false;

  private switching = false;
  private autoPlayTimer: ReturnType<typeof setTimeout> | null = null;
  private autoPlayInterval = 6000;

  constructor(canvas: HTMLCanvasElement, imagePaths: string[]) {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0a0a);

    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: false,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

    this.setupEvents();
    this.init(imagePaths);
  }

  async init(imagePaths: string[]) {
    await this.loadTextureAtlas(imagePaths);
    this.buildInstancedMesh();
    this.buildCenterMesh();
    this.render();
    this.startAutoPlay();
  }

  private startAutoPlay() {
    if (this.autoPlayTimer) clearTimeout(this.autoPlayTimer);
    this.autoPlayTimer = setTimeout(() => {
      if (this.paused || this.switching) {
        this.startAutoPlay();
        return;
      }
      const len = this.imageInfos.length;
      if (len === 0) return;

      this.switching = true;
      this.currentImageIndex = (this.currentImageIndex + 1) % len;
      this.scrollY.direction = 1;
      this.scrollY.target += this.stepSize;
      this.scrollY.speedTarget += this.stepSize;

      setTimeout(() => {
        this.switching = false;
        this.startAutoPlay();
      }, 500);
    }, this.autoPlayInterval);
  }

  async loadTextureAtlas(paths: string[]) {
    const images = await Promise.all(
      paths.map(
        (path) =>
          new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load: ${path}`));
            img.src = path;
          })
      )
    );

    // Resize each image to fit within the atlas grid while preserving aspect ratio.
    // Target cell: 1024x1280 (4:5 portrait). Higher res for sharp center image.
    const CELL_W = 1024;
    const CELL_H = 1280;
    const cols = Math.ceil(Math.sqrt(images.length));
    const rows = Math.ceil(images.length / cols);

    const atlasWidth = cols * CELL_W;
    const atlasHeight = rows * CELL_H;

    const cvs = document.createElement("canvas");
    cvs.width = atlasWidth;
    cvs.height = atlasHeight;

    const ctx = cvs.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, atlasWidth, atlasHeight);

    this.rawImages = images;
    this.imageInfos = images.map((img, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const destX = col * CELL_W;
      const destY = row * CELL_H;

      // Scale to fit inside CELL_W x CELL_H preserving aspect ratio
      const imgAspect = img.width / img.height;
      const cellAspect = CELL_W / CELL_H;
      let drawW: number, drawH: number, offsetX: number, offsetY: number;

      if (imgAspect > cellAspect) {
        // Image is wider relative to cell — fit to width
        drawW = CELL_W;
        drawH = CELL_W / imgAspect;
        offsetX = 0;
        offsetY = (CELL_H - drawH) / 2;
      } else {
        // Image is taller relative to cell — fit to height
        drawH = CELL_H;
        drawW = CELL_H * imgAspect;
        offsetX = (CELL_W - drawW) / 2;
        offsetY = 0;
      }

      ctx.drawImage(img, destX + offsetX, destY + offsetY, drawW, drawH);

      const aspectRatio = img.width / img.height;

      // Tight UVs covering only the actual drawn image area (no cell padding)
      const xStart = (destX + offsetX) / atlasWidth;
      const xEnd = (destX + offsetX + drawW) / atlasWidth;
      const yStart = 1 - (destY + offsetY) / atlasHeight;
      const yEnd = 1 - (destY + offsetY + drawH) / atlasHeight;

      return {
        width: img.width,
        height: img.height,
        aspectRatio,
        uvs: { xStart, xEnd, yStart, yEnd },
      };
    });

    this.atlasTexture = new THREE.CanvasTexture(cvs);
    this.atlasTexture.needsUpdate = true;
    this.atlasTexture.generateMipmaps = true;
    this.atlasTexture.minFilter = THREE.LinearMipmapLinearFilter;
    this.atlasTexture.magFilter = THREE.LinearFilter;
    this.atlasTexture.anisotropy = 16;
    this.atlasTexture.colorSpace = THREE.SRGBColorSpace;
  }

  buildInstancedMesh() {
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 0.075);

    const RADIUS = 6;
    const HEIGHT = 120;
    const COUNT = 600;
    const CIRCLE_COUNT = HEIGHT / 3;
    const CIRCLE_HEIGHT = HEIGHT / CIRCLE_COUNT;

    this.uMaxZ = HEIGHT * 0.5;
    this.uZrange = HEIGHT;
    this.instanceCount = COUNT;

    this.instancedMaterial = new THREE.ShaderMaterial({
      vertexShader: instancedVertexShader,
      fragmentShader: instancedFragmentShader,
      transparent: true,
      uniforms: {
        uAtlas: { value: this.atlasTexture },
        uScrollY: { value: 0 },
        uZrange: { value: HEIGHT },
        uMaxZ: { value: HEIGHT * 0.5 },
        uSpeedY: { value: 0 },
        uDirection: { value: 1 },
      },
    });

    const instancedMesh = new THREE.InstancedMesh(
      geometry,
      this.instancedMaterial,
      COUNT
    );

    const aAngles = new Float32Array(COUNT);
    const aHeights = new Float32Array(COUNT);
    const aRadiuses = new Float32Array(COUNT);
    const aAspectRatios = new Float32Array(COUNT);
    const aSpeeds = new Float32Array(COUNT);
    const aTextureCoords = new Float32Array(COUNT * 4);
    const imageIndices = new Uint16Array(COUNT);

    const speeds = new Float32Array(CIRCLE_COUNT).map(
      () => Math.random() * 0.2 + 0.8
    );

    for (let i = 0; i < COUNT; i++) {
      const angle = (i / COUNT) * Math.PI * 2;
      const imgIdx = Math.floor(Math.random() * this.imageInfos.length);
      const { xStart, xEnd, yStart, yEnd } = this.imageInfos[imgIdx].uvs;

      aTextureCoords.set([xStart, xEnd, yStart, yEnd], i * 4);
      aAngles[i] = angle;
      aHeights[i] = (i % CIRCLE_COUNT) * CIRCLE_HEIGHT - HEIGHT / 2;
      aRadiuses[i] = RADIUS;
      aAspectRatios[i] = this.imageInfos[imgIdx].aspectRatio;
      aSpeeds[i] = speeds[i % CIRCLE_COUNT];
      imageIndices[i] = imgIdx;
    }

    this.instanceData = {
      angles: aAngles,
      heights: aHeights,
      radiuses: aRadiuses,
      speeds: aSpeeds,
      aspectRatios: aAspectRatios,
      imageIndices,
    };

    geometry.setAttribute(
      "aAngle",
      new THREE.InstancedBufferAttribute(aAngles, 1)
    );
    geometry.setAttribute(
      "aHeight",
      new THREE.InstancedBufferAttribute(aHeights, 1)
    );
    geometry.setAttribute(
      "aRadius",
      new THREE.InstancedBufferAttribute(aRadiuses, 1)
    );
    geometry.setAttribute(
      "aAspectRatio",
      new THREE.InstancedBufferAttribute(aAspectRatios, 1)
    );
    geometry.setAttribute(
      "aSpeed",
      new THREE.InstancedBufferAttribute(aSpeeds, 1)
    );
    geometry.setAttribute(
      "aTextureCoords",
      new THREE.InstancedBufferAttribute(aTextureCoords, 4)
    );

    this.scene.add(instancedMesh);
  }

  buildCenterMesh() {
    const geometry = new THREE.PlaneGeometry(2.2, 3.0);

    const img = this.rawImages[this.currentImageIndex];
    this.centerCanvas = document.createElement("canvas");
    this.centerCanvas.width = img.naturalWidth || img.width;
    this.centerCanvas.height = img.naturalHeight || img.height;
    const ctx = this.centerCanvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);

    this.centerTexture = new THREE.CanvasTexture(this.centerCanvas);
    this.centerTexture.generateMipmaps = false;
    this.centerTexture.minFilter = THREE.LinearFilter;
    this.centerTexture.magFilter = THREE.LinearFilter;
    this.centerTexture.colorSpace = THREE.SRGBColorSpace;

    this.centerMaterial = new THREE.ShaderMaterial({
      vertexShader: centeredVertexShader,
      fragmentShader: centeredFragmentShader,
      uniforms: {
        uAtlas: { value: this.centerTexture },
        uTextureCoords: {
          value: new THREE.Vector4(0, 1, 1, 0),
        },
      },
      transparent: true,
    });

    this.centerMesh = new THREE.Mesh(geometry, this.centerMaterial);
    this.scene.add(this.centerMesh);
  }

  setupEvents() {
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener("wheel", () => {
      if (this.paused) return;
    });
  }

  addScrollDelta(delta: number) {
    this.scrollY.speedTarget += delta;
    this.scrollY.target += delta;
  }

  render = () => {
    if (this.disposed) return;

    requestAnimationFrame(this.render);

    if (!this.paused) {
      this.scrollY.target += 0.002 * this.scrollY.direction;
      this.scrollY.speedTarget += 0.002 * this.scrollY.direction;

      this.scrollY.current = gsap.utils.interpolate(
        this.scrollY.current,
        this.scrollY.target,
        0.1
      );
      this.scrollY.speedCurrent = gsap.utils.interpolate(
        this.scrollY.speedCurrent,
        this.scrollY.speedTarget,
        0.1
      );
    }

    if (this.instancedMaterial) {
      this.instancedMaterial.uniforms.uScrollY.value = this.scrollY.current;
      this.instancedMaterial.uniforms.uSpeedY.value = this.scrollY.speedCurrent;
      this.instancedMaterial.uniforms.uDirection.value =
        this.scrollY.direction;
    }

    if (this.centerMaterial && this.imageInfos.length > 0) {
      if (this.textureIndex !== this.currentImageIndex) {
        this.textureIndex = this.currentImageIndex;
        this.updateCenterTexture(this.textureIndex);
      }
    }

    this.renderer.render(this.scene, this.camera);
  };

  setPaused(paused: boolean) {
    this.paused = paused;
  }

  /**
   * Hit-test a canvas-local click. Returns the index into `imageInfos` of the
   * image the user clicked on, or null if nothing was hit. Checks the center
   * mesh first (largest, always in front), then projects every instance's
   * current world position to screen space and picks the nearest within a
   * small pixel radius.
   */
  pickAtScreen(clientX: number, clientY: number, canvasRect: DOMRect): number | null {
    const ndcX = ((clientX - canvasRect.left) / canvasRect.width) * 2 - 1;
    const ndcY = -(((clientY - canvasRect.top) / canvasRect.height) * 2 - 1);

    // 1) Center mesh — raycast
    if (this.centerMesh) {
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), this.camera);
      const hit = raycaster.intersectObject(this.centerMesh);
      if (hit.length > 0) {
        return this.textureIndex;
      }
    }

    // 2) Instanced images — CPU-side position replay
    if (!this.instanceData) return null;

    const w = canvasRect.width;
    const h = canvasRect.height;
    const clickX = clientX - canvasRect.left;
    const clickY = clientY - canvasRect.top;

    const minZ = this.uMaxZ - this.uZrange;
    const zRange = this.uZrange;
    const scrollY = this.scrollY.current;
    const speedY = this.scrollY.speedCurrent;

    const PIXEL_RADIUS = 72;
    let bestIdx: number | null = null;
    let bestNdcZ = Infinity;

    const pos = new THREE.Vector3();
    const { angles, heights, radiuses, speeds, imageIndices } = this.instanceData;

    for (let i = 0; i < this.instanceCount; i++) {
      let zPos = heights[i] + scrollY;
      // match shader: mod((zPos - minZ), zRange) + minZ; ensure positive
      const shifted = zPos - minZ;
      zPos = ((shifted % zRange) + zRange) % zRange + minZ;
      const theta = angles[i] + speedY * 0.4 * speeds[i];

      pos.set(Math.cos(theta) * radiuses[i], zPos, Math.sin(theta) * radiuses[i]);
      pos.project(this.camera);

      if (pos.z < -1 || pos.z > 1) continue;
      if (pos.x < -1.2 || pos.x > 1.2 || pos.y < -1.2 || pos.y > 1.2) continue;

      const sx = (pos.x + 1) * 0.5 * w;
      const sy = (1 - pos.y) * 0.5 * h;
      const dx = sx - clickX;
      const dy = sy - clickY;
      const dist2 = dx * dx + dy * dy;

      if (dist2 < PIXEL_RADIUS * PIXEL_RADIUS && pos.z < bestNdcZ) {
        bestNdcZ = pos.z;
        bestIdx = imageIndices[i];
      }
    }

    return bestIdx;
  }

  switchTo(dir: number) {
    const len = this.imageInfos.length;
    if (len === 0) return;
    if (this.switching) return;

    this.switching = true;
    this.currentImageIndex = ((this.currentImageIndex + dir) % len + len) % len;
    this.scrollY.direction = dir;
    this.scrollY.target += this.stepSize * dir;
    this.scrollY.speedTarget += this.stepSize * dir;

    setTimeout(() => {
      this.switching = false;
    }, 500);
  }

  private updateCenterTexture(index: number) {
    if (!this.centerCanvas || !this.centerTexture) return;
    const img = this.rawImages[index];
    if (!img) return;
    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;
    if (this.centerCanvas.width !== w || this.centerCanvas.height !== h) {
      this.centerCanvas.width = w;
      this.centerCanvas.height = h;
    }
    const ctx = this.centerCanvas.getContext("2d")!;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0);
    this.centerTexture.needsUpdate = true;
  }

  destroy() {
    this.disposed = true;
    if (this.autoPlayTimer) clearTimeout(this.autoPlayTimer);
    this.renderer.dispose();
    if (this.atlasTexture) this.atlasTexture.dispose();
    if (this.centerTexture) this.centerTexture.dispose();
    if (this.instancedMaterial) this.instancedMaterial.dispose();
    if (this.centerMaterial) this.centerMaterial.dispose();
  }
}