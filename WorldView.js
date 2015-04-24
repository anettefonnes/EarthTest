
var scene, camera, renderer, rotation;
var material, earth, light, stars, worldEvent;


init();
animate();

function init(){
    var width = window.innerWidth - 20;
    var height = window.innerHeight - 20;

    scene = new THREE.Scene();

    earth = new World();
    scene.add(earth);

    //TODO - make Event list and/or controller
    var worldEvent1 = new Event(5, 30);
    earth.addEvent(worldEvent1);
    worldEvent1.addMesh(
        new THREE.Mesh(
            new THREE.SphereGeometry(2, 4, 4),
            new THREE.MeshBasicMaterial({color: 0xf0ff00})
    ));
    var worldEvent2 = new Event(45, 30);
    worldEvent2.addMesh(
        new THREE.Mesh(
            new THREE.SphereGeometry(2, 4, 4),
            new THREE.MeshBasicMaterial({color: 0xff0000})
        ));
    earth.addEvent(worldEvent2);
    var worldEvent3 = new Event(30, 45);
    worldEvent3.addMesh(
        new THREE.Mesh(
            new THREE.SphereGeometry(2, 4, 4),
            new THREE.MeshBasicMaterial({color: 0xff00ff})
        ));
    earth.addEvent(worldEvent3);




    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.z = 250;
    camera.position.y = 300;
 //   earth.add(camera);
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
        new THREE.SphereGeometry(rad*10 , seg, seg),
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
    camera.lookAt(earth.position);

    renderer.render(scene, camera);
}

/**
 * Created by Anette on 27.02.2015.
 */

function GeoloactionToVector3(lo, la){
    var obj = new THREE.Object3D();
    var cent = new THREE.Object3D();
    obj.position.set(1,0,0);
    cent.add( obj );
    cent.quaternion.setFromEuler(
        new THREE.Euler(
            0,
            lo * (Math.PI/180),
            la * (Math.PI/180),
            "YZX"));
    return cent.matrixWorld;

}

