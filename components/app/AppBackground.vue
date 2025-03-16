<template>
  <canvas ref="scene" id="scene"></canvas>
</template>
<style>
canvas{
  position: fixed;
  top:0;
  left:0;
}
</style>
<script setup>
setTimeout(() => {


var renderer, scene, camera, light, circles;

var ww      = window.innerWidth,
    wh          = window.innerHeight,
    speed       = .05,
    mouseX       = 0,
    colors      = [
      0x05060B, 0x0C0E15, 0x13151D, 0x1B1D24, 0x22252C, 0x292D33, 0x05060B, 0x0C0E15, 0x13151D, 0x1B1D24, 0x22252C, 0x292D33


    ],
    closest     = {position:{z:0}},
    farest      = {position:{z:0}},
    radius      = 5,
    segments    = 24;
function init(){
  const sceneEl = ref(null)
  const el = document.getElementById('scene')
  renderer = new THREE.WebGLRenderer({canvas : document.getElementById('scene'), antialias: true});
  renderer.setSize(ww,wh);
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog( 0x000000, 300, 700 );
  camera = new THREE.PerspectiveCamera(50,ww/wh, 0.1, 10000 );
  camera.position.set(0,0,-200);
  scene.add(camera);
  window.addEventListener("resize", resize);
  createCircles();
}

var resize = function(){
  ww = window.innerWidth;
  wh = window.innerHeight;
  camera.aspect = ww / wh;
  camera.updateProjectionMatrix();

  renderer.setSize( ww, wh );
};


var createCircles = function(){

  circles = new THREE.Object3D();
  scene.add(circles);

  for(var i=0;i<100;i++){
    addCircle();
  }
  render();

};

var removeLine = function(isFarest){
  if(isFarest){
    for(var i=0,j=circles.children.length;i<j;i++){
      if(circles.children[i] === farest){
        circles.remove(circles.children[i]);
      }
    }
  }
  else{
    for(var i=0,j=circles.children.length;i<j;i++){
      if(circles.children[i] === closest){
        circles.remove(circles.children[i]);
      }
    }
  }
};


var addCircle = function(top){
  var row = new THREE.Object3D();
  if(top){
    row.degreesRotation = (closest.degreesRotation-1) || 0;
  }
  else{
    row.degreesRotation = (farest.degreesRotation+1) || 0;
  }
  for(var j=0;j<12;j++){
    var material = new THREE.MeshBasicMaterial({
      color: colors[j]
    });
    var circleGeometry = new THREE.CircleGeometry( radius, segments );
    var circle = new THREE.Mesh( circleGeometry, material );
    var translate = new THREE.Matrix4().makeTranslation(80,0,0);
    var rotation =  new THREE.Matrix4().makeRotationZ(Math.PI*2/12*j+row.degreesRotation*.3);
    circle.applyMatrix( new THREE.Matrix4().multiplyMatrices(rotation, translate) );
    row.add(circle);
  }
  if(top){
    row.position.z = (closest.position.z/35+1)*35;
  }
  else{
    row.position.z = (farest.position.z/35-1)*35;
  }
  circles.add(row);
  closest = circles.children[0];
  farest = circles.children[0];
  for(var i=0,j=circles.children.length;i<j;i++){
    if(circles.children[i].position.z>closest.position.z){
      closest = circles.children[i];
    }
    if(circles.children[i].position.z<farest.position.z){
      farest = circles.children[i];
    }
  }
};


var render = function () {
  requestAnimationFrame(render);

  camera.position.z -= speed;
  camera.position.x += (mouseX-camera.position.x)*.08;
  // If closest element is behind camera
  if(camera.position.z<(closest.position.z-35) && speed>0){
    removeLine(false);
    addCircle();
  }
  else if(camera.position.z>(farest.position.z+665) && speed<0){
    removeLine(true);
    addCircle(true);
  }

  renderer.render(scene, camera);

};

init();
}, 500)
</script>