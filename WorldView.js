
var scene, camera, renderer, rotation;
var material, earth, light, stars, worldEvent;


init();
animate();

function init(){
    var width = window.innerWidth - 20;
    var height = window.innerHeight - 20;


    earth = new World();
    scene = new THREE.Scene();
    scene.add(earth);

    worldEvent = new Event(19, -99);
    earth.addEvent(worldEvent);

    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.z = 600;
    earth.add(camera);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    //light adding
    scene.add(new THREE.AmbientLight(0xe0e0e0));
    light = new THREE.DirectionalLight(0xffffff, 0.3);
    light.position.set(200,0,500);
    scene.add(light);

    stars = createStars(100, 200);
    scene.add(stars);


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
    earth.rotate();

    camera.position.x += 0.5;
    camera.position.z -= 0.5;
    camera.lookAt(earth.position);
    renderer.render(scene, camera);
}

/**
 * Created by Anette on 27.02.2015.
 */
