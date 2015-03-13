
var scene, camera, renderer, rotation;
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

    camera.position.z = 600;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);




    // Yellow spot
    var gem = new THREE.SphereGeometry(3, 6, 6);
    var mat = new THREE.MeshBasicMaterial({color: 0xffff00});
    worldEvent = new THREE.Mesh(gem, mat);
    worldEvent.position.z = 100;
    scene.add(worldEvent);
    world.root.add(worldEvent);


    //light adding
    scene.add(new THREE.AmbientLight(0xe0e0e0));
    light = new THREE.DirectionalLight(0xffffff, 0.3);
    light.position.set(200,0,500);
    scene.add(light);

    stars = createStars(100, 200);
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


//TODO: More action in this function; rotation, light etc.?
function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

/**
 * Created by Anette on 27.02.2015.
 */
