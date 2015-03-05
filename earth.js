
var scene, camera, renderer, camposZ, camposX, rotation;;
var sphere, material, light, stars, sphere2;
var bool = true;

init();
animate();

function init() {
    var width = window.innerWidth - 20;
    var height = window.innerHeight - 20;

    var rad = 100,
        seg = 200;

    //bool = true;

    rotation = 0.005;
    camposZ = 600;
    camposX = 0;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.z = camposZ;
    //camera.position.y = 100;
   // camera.rotateX(-0.5);
    //camera.rotateZ(0.3);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);


    //Creation of Earth - Anette is GOD!
    sphere = createSphere(rad, seg, seg);
    scene.add(sphere);


    // Yellow spot
    var gem = new THREE.SphereGeometry(3, 6, 6);
    var mat = new THREE.MeshBasicMaterial({color: 0xffff00});
    sphere2 = new THREE.Mesh(gem, mat);
    sphere2.rotateByAxis(sphere.y, 30);
    sphere2.position.z = 100;
    scene.add(sphere2);
    sphere.add(sphere2);


    //light adding
    scene.add(new THREE.AmbientLight(0xe0e0e0));
    light = new THREE.DirectionalLight(0xffffff, 0.3);
    light.position.set(200,0,500);
    scene.add(light);

    stars = createStars(rad, seg);
    scene.add(stars);

    //sphere.add(camera);

    //window.setInterval(changeParent(), 3000);

    document.body.appendChild(renderer.domElement);
   // document.addEventListener("keydown", keyPressed, true);
}

function changeParent(){
    if(bool == true) {
        sphere.add(camera);
        bool = false;
    } else {
        sphere.remove(camera);
        bool = true;
    }
}

//TODO: Get better textures
function createSphere(rad, seg) {
    return new THREE.Mesh(
        new THREE.SphereGeometry(rad, seg, seg),
        new THREE.MeshPhongMaterial({
            map:         THREE.ImageUtils.loadTexture('img/earth.jpg'),
            bumpMap:     THREE.ImageUtils.loadTexture('img/bump.jpg'),
            bumpScale:   0.05,
            specularMap: THREE.ImageUtils.loadTexture('img/water.jpg'),
            specular:    new THREE.Color('grey')
        })
    );
}

//TODO: Get more realistic stars. Use Parallax pixel stars / SCSS?
function createStars(rad, seg) {
    return new THREE.Mesh(
        new THREE.SphereGeometry(rad + 500, seg, seg),
        new THREE.MeshBasicMaterial({
            map:    THREE.ImageUtils.loadTexture('img/stars.png'),
            side:   THREE.BackSide
        })
    );
}

//Does not work
//TODO: Find out how to use transparent map for this?
function createClouds(rad, seg) {
    return new THREE.Mesh(
        new THREE.SphereGeometry(rad + 0.003, seg, seg),
        new THREE.MeshPhongMaterial({
            map:            THREE.ImageUtils.loadTexture('img/clouds.jpg'),
            transparent:    true
        })
    )
}

//When an event occurres, this function runs
function keyPressed(event) {
    var keycode = event.which;
    //Cursor up, down, left, right
    if(keycode == 38) {
        camposZ -= 5;
    }
    if(keycode == 40) {
        camposZ += 5;
    }
    if(keycode == 37) {
        camposX -= 5;
    }
    if(keycode == 39) {
        camposX += 5;
    }
    camera.position.z = camposZ;

    //Does not work
    //TODO: Get this value to automatically update the value in animate?
    if(keycode == 107){
        rotation += 0.01;
    }
    if(keycode == 109) {
        rotation -= 0.01;

    }
}

//TODO: More action in this function; rotation, light etc.?
function animate() {
    requestAnimationFrame(animate);

    sphere.rotation.y += rotation;
    document.addEventListener("keydown", keyPressed, true);
    renderer.render(scene, camera);
}

/**
 * Created by Anette on 27.02.2015.
 */
