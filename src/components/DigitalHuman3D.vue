<template>
  <div class="absolute inset-0">
    <!-- Three.js 渲染容器 -->
    <div ref="canvasContainer" class="absolute inset-0" />

    <!-- 3D模式状态显示 -->
    <div
      v-if="enable3D"
      class="absolute bottom-27 left-1/2 -translate-x-1/2 text-center"
    >
      <div class="text-6xl">
        {{ isSpeaking ? "🗣️" : "" }}
      </div>
    </div>

    <!-- 2D模式占位 -->
    <div
      v-if="!enable3D"
      class="absolute bottom-30 inset-0 flex items-center justify-center"
    >
      <div class="text-center">
        <div class="text-8xl mb-4">
          {{ isSpeaking ? "🗣️" : "🤖" }}
        </div>
        <p class="text-gray-500 text-sm"></p>
      </div>
    </div>

    <!-- 3D/2D切换按钮 -->
    <button
      @click="toggle3D"
      class="absolute bottom-36 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-xs text-gray-400 hover:bg-black/20 transition-all"
    >
      {{ enable3D ? "3D" : "2D" }}
    </button>
  </div>
</template>

<script setup>
import { defineEmits, defineExpose, ref, onMounted, onUnmounted, watch } from "vue";
import * as THREE from "three";

const props = defineProps({
  isSpeaking: {
    type: Boolean,
    default: false,
  },
  currentAnimation: {
    type: String,
    default: "idle",
  },
});

const emit = defineEmits(["play-animation"]);

const canvasContainer = ref(null);
const enable3D = ref(true);
let scene, camera, renderer, avatar, clock;
let frameId = null;

// 当前动作（主要用于手势/待机浮动逻辑）
let activeAnimation = "idle";

// 缓存网格（避免每帧 avatar.getObjectByName）
let headMesh = null;
let bodyMesh = null;
let mouthMesh = null;
let ringMesh = null;
let leftHandGroup = null;
let rightHandGroup = null;

// 待机浮动基准
let baseAvatarY = 0;

// 角色基础姿态（用于切换动作时可恢复）
let baseAvatarRot = null;
let baseHeadRot = null;
let leftHandBasePos = null;
let leftHandBaseRot = null;
let rightHandBasePos = null;
let rightHandBaseRot = null;

let ringBaseOpacity = 0.3;

// 口型随机参数（在说话开始时采样一次）
let mouthAmp = 0;
let mouthSeed = 0;
let mouthBaseScaleY = 0.3;

// 动画控制函数：暴露给父组件调用
const playAnimation = (animationName) => {
  const msg = `播放${animationName}动画`;
  console.log(msg);
  emit("play-animation", msg);
  activeAnimation = animationName;

  // wave 作为示例会短暂显示手势；其他动作目前隐藏手势（留接口位）
  // 动画混合逻辑可在后续扩展：这里先保证可视化与调试回显链路通畅
};

defineExpose({ playAnimation });

// 初始化 Three.js
const initThreeJS = () => {
  // 场景
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a0f);

  // 相机
  camera = new THREE.PerspectiveCamera(
    45,
    canvasContainer.value.clientWidth / canvasContainer.value.clientHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 1, 6);

  // 渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(
    canvasContainer.value.clientWidth,
    canvasContainer.value.clientHeight,
  );
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  canvasContainer.value.appendChild(renderer.domElement);

  // 光源
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  // 点光源系统：增强光影层次（并投射阴影）
  const pointLight = new THREE.PointLight(0xffffff, 1.25, 100);
  pointLight.position.set(4, 6, 5);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 512;
  pointLight.shadow.mapSize.height = 512;
  pointLight.shadow.camera.near = 0.1;
  pointLight.shadow.camera.far = 80;
  scene.add(pointLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 1);
  mainLight.position.set(5, 5, 5);
  scene.add(mainLight);

  const fillLight = new THREE.DirectionalLight(0x4a90e2, 0.3);
  fillLight.position.set(-5, 3, 5);
  scene.add(fillLight);

  // 地面：接收阴影，增强视觉层次
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(24, 24),
    new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 1,
      metalness: 0,
    })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0;
  ground.receiveShadow = true;
  scene.add(ground);

  // 创建数字人
  createAvatar();

  // 时钟
  clock = new THREE.Clock();

  // 开始渲染
  animate();
};

// 创建数字人（简化版）
const createAvatar = () => {
  const group = new THREE.Group();

  // 头部
  const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const headMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5d0c5,
    roughness: 0.3,
    metalness: 0.1,
  });
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.position.y = 1.6;
  head.castShadow = true;
  head.receiveShadow = true;
  headMesh = head;
  baseHeadRot = head.rotation.clone();
  group.add(head);

  // 身体
  const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.25, 1.2, 32);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a90e2,
    roughness: 0.4,
    metalness: 0.2,
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 0.7;
  body.castShadow = true;
  body.receiveShadow = true;
  bodyMesh = body;
  group.add(body);

  // 眼睛
  const eyeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  leftEye.position.set(-0.12, 1.65, 0.42);
  group.add(leftEye);

  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  rightEye.position.set(0.12, 1.65, 0.42);
  group.add(rightEye);

  // 嘴巴
  const mouthGeometry = new THREE.SphereGeometry(0.08, 16, 16);
  const mouthMaterial = new THREE.MeshBasicMaterial({ color: 0xff6b6b });
  const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
  mouth.position.set(0, 1.52, 0.45);
  mouth.scale.set(1, 0.3, 0.5);
  mouth.name = "mouth";
  mouth.castShadow = true;
  mouth.receiveShadow = true;
  mouthMesh = mouth;
  mouthBaseScaleY = mouth.scale.y;
  group.add(mouth);

  // 装饰光环
  const ringGeometry = new THREE.TorusGeometry(0.8, 0.02, 16, 100);
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0x4a90e2,
    transparent: true,
    opacity: 0.3,
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.3;
  ring.name = "ring";
  ringMesh = ring;
  ringBaseOpacity = ringMaterial.opacity;
  group.add(ring);

  // 挥手用的左右手（以 wave 为例可视化）
  const handMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a90e2,
    roughness: 0.55,
    metalness: 0.15,
  });

  const makeHand = () => {
    const hand = new THREE.Group();

    // 简化的“上臂 + 前臂 + 手掌/手指”
    // 通过分段与层级，让我们能在动作里“弯曲前臂”，视觉会更像真的胳膊与手。
    // 这里把长度/体积整体加大，让“像手”更明显。
    const L1 = 0.26; // 上臂长度（加长）
    const L2 = 0.22; // 前臂长度（加长）

    const upperArmGroup = new THREE.Group();
    const foreArmGroup = new THREE.Group();

    const upperArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.065, 0.06, L1, 12),
      handMaterial
    );
    upperArm.position.y = -L1 / 2; // 让“肩膀(组原点)”到“肘部”
    upperArm.castShadow = true;
    upperArm.receiveShadow = true;
    upperArmGroup.add(upperArm);

    foreArmGroup.position.y = -L1; // 肘部作为前臂旋转枢纽

    const foreArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.053, 0.05, L2, 12),
      handMaterial
    );
    foreArm.position.y = -L2 / 2;
    foreArm.castShadow = true;
    foreArm.receiveShadow = true;
    foreArmGroup.add(foreArm);

    // 手掌（放在前臂末端）
    const palm = new THREE.Mesh(
      // 面积更大，提升“手掌可辨识度”
      new THREE.BoxGeometry(0.19, 0.075, 0.14),
      handMaterial
    );
    palm.position.y = -L2; // 靠近“手指根部”
    palm.castShadow = true;
    palm.receiveShadow = true;
    foreArmGroup.add(palm);

    // 手指：扩展为“5根手指（含拇指）”，长短不一、扇形展开
    // BoxGeometry 的第3个参数是沿 Z 方向的“长度”，用不同 len 表现长短。
    const fingerY = -L2 + 0.013;
    const fingerW = 0.032;
    const fingerH = 0.022;

    // thumb=true 表示拇指，会额外做一个扭转，让它“朝外张开”
    const fingerSpecs = [
      { x: -0.045, z: 0.03, len: 0.102, thumb: false }, // 食指
      { x: -0.02, z: 0.04, len: 0.088, thumb: false }, // 中指
      { x: 0.002, z: 0.045, len: 0.078, thumb: false }, // 无名指
      { x: 0.02, z: 0.028, len: 0.068, thumb: false }, // 小指
      { x: 0.066, z: -0.018, len: 0.058, thumb: true }, // 拇指（更短、朝外）
    ];

    for (const spec of fingerSpecs) {
      const finger = new THREE.Mesh(
        new THREE.BoxGeometry(fingerW, fingerH, spec.len),
        handMaterial
      );
      finger.position.set(spec.x, fingerY, spec.z);
      if (spec.thumb) {
        // 让拇指从手掌侧向外张开
        finger.rotation.y = -0.65;
        finger.rotation.z = 0.12;
      }
      finger.castShadow = true;
      finger.receiveShadow = true;
      foreArmGroup.add(finger);
    }

    // 默认微微弯曲（让手臂更“像”）
    upperArmGroup.rotation.x = 0.25;
    foreArmGroup.rotation.x = -0.25;

    hand.add(upperArmGroup);
    hand.add(foreArmGroup);

    // 缓存子层级引用 + 初始姿态，用于 reset
    hand.userData.upperArmGroup = upperArmGroup;
    hand.userData.foreArmGroup = foreArmGroup;
    hand.userData.palm = palm;

    hand.userData.upperBaseRot = upperArmGroup.rotation.clone();
    hand.userData.foreBaseRot = foreArmGroup.rotation.clone();

    return hand;
  };

  leftHandGroup = makeHand();
  leftHandGroup.position.set(-0.88, 1.28, 0.42);
  leftHandGroup.visible = false;
  leftHandBasePos = leftHandGroup.position.clone();
  leftHandBaseRot = leftHandGroup.rotation.clone();
  group.add(leftHandGroup);

  rightHandGroup = makeHand();
  rightHandGroup.position.set(0.88, 1.28, 0.42);
  rightHandGroup.visible = false;
  rightHandBasePos = rightHandGroup.position.clone();
  rightHandBaseRot = rightHandGroup.rotation.clone();
  group.add(rightHandGroup);

  avatar = group;
  baseAvatarY = avatar.position.y;
  baseAvatarRot = avatar.rotation.clone();
  scene.add(avatar);
};

// 动画循环
const animate = (time) => {
  frameId = requestAnimationFrame(animate);

  if (avatar) {
    const t = time * 0.001;

    // 默认先恢复基础姿态，动作帧会再覆盖
    avatar.position.y = baseAvatarY;
    if (baseAvatarRot) avatar.rotation.set(baseAvatarRot.x, baseAvatarRot.y, baseAvatarRot.z);
    if (baseHeadRot && headMesh) headMesh.rotation.set(baseHeadRot.x, baseHeadRot.y, baseHeadRot.z);

    // 待机浮动：仅在 idle 且不说话时轻微浮动
    if (activeAnimation === "idle" && !props.isSpeaking) {
      avatar.position.y = baseAvatarY + Math.sin(t * 1.2) * 0.02;
    }

    // 动作：除了 mouth/说话外，分别做手势与身体姿态
    const isWave = activeAnimation === "wave";
    const isDance = activeAnimation === "dance";
    const isLike = activeAnimation === "like";
    const isSit = activeAnimation === "sit";
    const isThink = activeAnimation === "think";
    const isCry = activeAnimation === "cry";

    // sit：下沉一点点
    if (isSit) {
      avatar.position.y = baseAvatarY - 0.18 + Math.sin(t * 4) * 0.01;
      avatar.rotation.x = 0.08;
    }

    // dance：整体旋转 + 轻微抖动
    if (isDance) {
      avatar.rotation.y = Math.sin(t * 2.2) * 0.35;
      avatar.rotation.x = Math.sin(t * 3.1) * 0.04;
    }

    // cry：头部微微左右抖 + 环发更“闪”
    if (isCry && headMesh) {
      headMesh.rotation.y = Math.sin(t * 10) * 0.12;
      if (ringMesh && ringMesh.material && typeof ringMesh.material.opacity === "number") {
        ringMesh.material.opacity = ringBaseOpacity + Math.abs(Math.sin(t * 8)) * 0.12;
      }
    } else if (ringMesh && ringMesh.material) {
      // 非 cry 时恢复环透明度
      if (typeof ringMesh.material.opacity === "number") ringMesh.material.opacity = ringBaseOpacity;
    }

    // 统一先隐藏手势（后续动作再显示对应手）
    if (leftHandGroup) leftHandGroup.visible = false;
    if (rightHandGroup) rightHandGroup.visible = false;

    // 口型同步模拟：说话时嘴部随机缩放（中心区域 mouth）
    if (mouthMesh) {
      const targetBase = mouthBaseScaleY || mouthMesh.scale.y;
      if (props.isSpeaking) {
        const wave1 = Math.sin(t * 18 + mouthSeed);
        const wave2 = Math.sin(t * 33 + mouthSeed * 0.4);
        const factor = 1 + mouthAmp * (0.45 * wave1 + 0.55 * wave2);
        const targetY = targetBase * Math.max(0.35, factor);
        mouthMesh.scale.y = THREE.MathUtils.lerp(mouthMesh.scale.y, targetY, 0.22);
      } else {
        mouthMesh.scale.y = THREE.MathUtils.lerp(mouthMesh.scale.y, targetBase, 0.18);
      }
    }

    // 动作手势可视化：
    // - wave：两侧手挥动
    // - like：右手“点赞”姿态（拇指向上，用手部旋转模拟）
    // - dance：两手一起摆动
    // - sit：手放低一点点（简化为向下摆动）
    // - think：左手托住下巴（头部略倾）
    // - cry：两手抬到脸侧（配合抖动）
    if (leftHandGroup && rightHandGroup) {
      const resetHands = () => {
        if (leftHandBasePos) leftHandGroup.position.copy(leftHandBasePos);
        if (leftHandBaseRot) leftHandGroup.rotation.set(leftHandBaseRot.x, leftHandBaseRot.y, leftHandBaseRot.z);
        if (rightHandBasePos) rightHandGroup.position.copy(rightHandBasePos);
        if (rightHandBaseRot) rightHandGroup.rotation.set(rightHandBaseRot.x, rightHandBaseRot.y, rightHandBaseRot.z);

        // 重置前臂弯曲角度（避免切换动作后“记忆”到上一个姿态）
        const lUpper = leftHandGroup.userData?.upperArmGroup;
        const lFore = leftHandGroup.userData?.foreArmGroup;
        const rUpper = rightHandGroup.userData?.upperArmGroup;
        const rFore = rightHandGroup.userData?.foreArmGroup;
        if (lUpper && leftHandGroup.userData?.upperBaseRot) {
          lUpper.rotation.set(leftHandGroup.userData.upperBaseRot.x, leftHandGroup.userData.upperBaseRot.y, leftHandGroup.userData.upperBaseRot.z);
        }
        if (lFore && leftHandGroup.userData?.foreBaseRot) {
          lFore.rotation.set(leftHandGroup.userData.foreBaseRot.x, leftHandGroup.userData.foreBaseRot.y, leftHandGroup.userData.foreBaseRot.z);
        }
        if (rUpper && rightHandGroup.userData?.upperBaseRot) {
          rUpper.rotation.set(rightHandGroup.userData.upperBaseRot.x, rightHandGroup.userData.upperBaseRot.y, rightHandGroup.userData.upperBaseRot.z);
        }
        if (rFore && rightHandGroup.userData?.foreBaseRot) {
          rFore.rotation.set(rightHandGroup.userData.foreBaseRot.x, rightHandGroup.userData.foreBaseRot.y, rightHandGroup.userData.foreBaseRot.z);
        }
      };

      resetHands();

      if (isWave) {
        leftHandGroup.visible = true;
        rightHandGroup.visible = true;
        const w = Math.sin(t * 6) * 0.75;
        leftHandGroup.rotation.z = w;
        rightHandGroup.rotation.z = -w;
        // 前臂轻微上下摆动，让“胳膊”跟着更自然
        const lFore = leftHandGroup.userData?.foreArmGroup;
        const rFore = rightHandGroup.userData?.foreArmGroup;
        if (lFore) lFore.rotation.x = lFore.rotation.x + Math.sin(t * 6) * 0.35;
        if (rFore) rFore.rotation.x = rFore.rotation.x - Math.sin(t * 6) * 0.35;

        leftHandGroup.position.y = 1.28 + Math.abs(w) * 0.03;
        rightHandGroup.position.y = 1.28 + Math.abs(w) * 0.03;
      } else if (isLike) {
        rightHandGroup.visible = true;
        const w = Math.sin(t * 10) * 0.12;
        rightHandGroup.rotation.x = -0.25;
        rightHandGroup.rotation.z = 0.55 + w;

        const rUpper = rightHandGroup.userData?.upperArmGroup;
        const rFore = rightHandGroup.userData?.foreArmGroup;
        if (rUpper) rUpper.rotation.x = 0.55;
        if (rFore) rFore.rotation.x = -0.9 + Math.sin(t * 4) * 0.08; // 模拟手掌向上

        rightHandGroup.position.y = 1.36 + Math.abs(Math.sin(t * 4)) * 0.02;
      } else if (isDance) {
        leftHandGroup.visible = true;
        rightHandGroup.visible = true;
        const w = Math.sin(t * 8) * 0.55;
        leftHandGroup.rotation.z = w;
        rightHandGroup.rotation.z = -w;
        const lFore = leftHandGroup.userData?.foreArmGroup;
        const rFore = rightHandGroup.userData?.foreArmGroup;
        if (lFore) lFore.rotation.x = -0.55 + Math.sin(t * 8) * 0.22;
        if (rFore) rFore.rotation.x = -0.55 - Math.sin(t * 8) * 0.22;

        leftHandGroup.position.y = 1.33 + Math.abs(w) * 0.04;
        rightHandGroup.position.y = 1.33 + Math.abs(w) * 0.04;
      } else if (isSit) {
        rightHandGroup.visible = true;
        const w = Math.sin(t * 6) * 0.08;
        rightHandGroup.rotation.z = -0.25 + w;

        const rUpper = rightHandGroup.userData?.upperArmGroup;
        const rFore = rightHandGroup.userData?.foreArmGroup;
        if (rUpper) rUpper.rotation.x = 0.1;
        if (rFore) rFore.rotation.x = 0.35 + Math.abs(w) * 1.2; // 手放低一点点

        rightHandGroup.position.y = 1.14 + Math.abs(w) * 0.02;
      } else if (isThink) {
        leftHandGroup.visible = true;
        if (headMesh) {
          headMesh.rotation.z = Math.sin(t * 2.5) * 0.03 - 0.08;
        }
        leftHandGroup.position.y = 1.52;
        leftHandGroup.rotation.x = -0.55;
        leftHandGroup.rotation.z = 0.18 + Math.sin(t * 6) * 0.05;

        const lFore = leftHandGroup.userData?.foreArmGroup;
        const lUpper = leftHandGroup.userData?.upperArmGroup;
        if (lUpper) lUpper.rotation.x = 0.65;
        if (lFore) lFore.rotation.x = -0.35; // 托住下巴附近
      } else if (isCry) {
        leftHandGroup.visible = true;
        rightHandGroup.visible = true;
        const w = Math.sin(t * 10) * 0.15;
        leftHandGroup.position.y = 1.30;
        rightHandGroup.position.y = 1.30;
        leftHandGroup.rotation.z = 0.25 + w;
        rightHandGroup.rotation.z = -0.25 - w;
        leftHandGroup.position.x = -0.78;
        rightHandGroup.position.x = 0.78;

        const lUpper = leftHandGroup.userData?.upperArmGroup;
        const lFore = leftHandGroup.userData?.foreArmGroup;
        const rUpper = rightHandGroup.userData?.upperArmGroup;
        const rFore = rightHandGroup.userData?.foreArmGroup;
        if (lUpper) lUpper.rotation.x = 0.75;
        if (rUpper) rUpper.rotation.x = 0.75;
        if (lFore) lFore.rotation.x = -0.7 + Math.sin(t * 10) * 0.06;
        if (rFore) rFore.rotation.x = -0.7 - Math.sin(t * 10) * 0.06;
      }
    }

    // 旋转光环
    if (ringMesh) {
      ringMesh.rotation.z += 0.005;
    }
  }

  renderer.render(scene, camera);
};

// 切换3D模式
const toggle3D = () => {
  enable3D.value = !enable3D.value;
};

// 响应式调整
const handleResize = () => {
  if (!canvasContainer.value) return;

  camera.aspect =
    canvasContainer.value.clientWidth / canvasContainer.value.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(
    canvasContainer.value.clientWidth,
    canvasContainer.value.clientHeight,
  );
};

// 监听动画变化
watch(
  () => props.currentAnimation,
  (newAnimation) => {
    activeAnimation = newAnimation || "idle";
  },
);

// 说话状态变化：采样口型随机参数，用于更自然的口型波动
watch(
  () => props.isSpeaking,
  (speakingNow) => {
    if (speakingNow) {
      mouthAmp = 0.12 + Math.random() * 0.22;
      mouthSeed = Math.random() * Math.PI * 2;
    } else {
      mouthAmp = 0;
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (enable3D.value) {
    initThreeJS();
  }
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  if (frameId) {
    cancelAnimationFrame(frameId);
  }
  window.removeEventListener("resize", handleResize);

  if (renderer) {
    renderer.dispose();
  }
});
</script>

<style scoped>
canvas {
  display: block;
  width: 100%;
  height: 100%;
}

/* 2D 占位时的球体浮动（用于满足“2D 模式下球体浮动”可视需求） */
</style>
