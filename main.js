import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window. innerHeight, .1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial({color: 0xbc13fe});
const torus = new THREE.Mesh(geometry,material);

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const controls = new OrbitControls(camera, renderer.domElement);


function addStar(){
  const geometry = new THREE.SphereGeometry(.25,24,24);
  const material1 = new THREE.MeshStandardMaterial()
  const star = new THREE.Mesh( geometry, material1);
  var color = new THREE.Color(Math.random(), Math.random(), Math.random());

  material1.color=color

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)


const spaceTexture = new THREE.TextureLoader().load('/public/space.jpg');
scene.background = spaceTexture; 


function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += .05;
  moon.rotation.y += .075;
  moon.rotation.z += .05;

  me.rotation.z += .03;
  me.rotation.y += .03;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera

function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += .01;
  torus.rotation.y += .005;
  torus.rotation.z += .01;


  renderer.render(scene,camera);
}

animate()

const meTexture = new THREE.TextureLoader().load('/public/me.jpeg');

const me = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:meTexture})
);

scene.add(me);

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshBasicMaterial({color: 0xcfff04})
);

scene.add(moon);
moon.position.z=30;
moon.position.x=-10;