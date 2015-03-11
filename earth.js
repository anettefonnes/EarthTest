
var scene, camera, renderer, camPosZ, camposX, rotation;
var world, material, light, stars, worldEvent;


init();
animate();

function init() {
    var width = window.innerWidth - 20;
    var height = window.innerHeight - 20;


    scene = new THREE.Scene();

    world = new World();
    scene.add(world.root);

    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camPosZ = 600;
    camposX = 0;
    camera.position.z = camPosZ;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);




    // Yellow spot
    var gem = new THREE.SphereGeometry(3, 6, 6);
    var mat = new THREE.MeshBasicMaterial({color: 0xffff00});
    worldEvent = new THREE.Mesh(gem, mat);
    worldEvent.rotateByAxis(sphere.y, 30);
    worldEvent.position.z = 100;
    scene.add(worldEvent);
    sphere.add(worldEvent);


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

//When an event occurres, this function runs
function keyPressed(event) {
    var keycode = event.which;
    //Cursor up, down, left, right
    if(keycode == 38) {
        camPosZ -= 5;
    }
    if(keycode == 40) {
        camPosZ += 5;
    }
    if(keycode == 37) {
        camposX -= 5;
    }
    if(keycode == 39) {
        camposX += 5;
    }
    camera.position.z = camPosZ;

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

    world.rotate();
    document.addEventListener("keydown", keyPressed, true);
    renderer.render(scene, camera);
}

/**
 * Created by Anette on 27.02.2015.
 */
