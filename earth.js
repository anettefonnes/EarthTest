
var scene, camera, renderer, camposZ, camposX, rotation;;
var sphere, material, light, stars, sphere2;
var bool = true;

init();
animate();

function init() {
    var width = window.innerWidth - 20;
    var height = window.innerHeight - 20;

    var rad = 100,
        seg = 300;

    //Camera and positions
    rotation = 0.0005;
    camposZ = 600;
    camposX = 0;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.z = camposZ;
    camera.position.y = 100;
    camera.rotateX(-0.5);
    camera.rotateZ(0.3);

    //Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);


    //Creation of Earth - Anette is GOD!
    sphere = createSphere(rad, seg, seg);
    scene.add(sphere);


    //Light adding
    scene.add(new THREE.AmbientLight(0xd0d0d0));
    light = new THREE.DirectionalLight(0xffffff, 0.3);
    light.position.set(200,0,500);
    scene.add(light);

    //Creating stars
    stars = createStars(rad+100, seg);
    scene.add(stars);

    //Create pointer
    var pointer = new THREE.Mesh(
        new THREE.CylinderGeometry(2,0,10),
        new THREE.MeshBasicMaterial({color: 0xff0000}));
    pointer.position.set(103,0,0);
    pointer.quaternion.setFromUnitVectors(
        new THREE.Vector3(0,1,0), new THREE.Vector3(1,0,0));
    var marker = new THREE.Object3D;
    marker.add(pointer);
    scene.add(marker);
    sphere.add(marker);

    //Calculating radians
    var rads = Math.PI / 180;

    //Default marker, without geolocations.
    /*marker.quaternion.setFromEuler(
        new THREE.Euler( 0, 135 * rads, 45 * rads, "YZX")); */

    //Gets your current location and places marker on the geolocation
    navigator.geolocation.watchPosition(function(pos) {
        var lat = pos.coords.latitude, lon = pos.coords.longitude;
        //window.alert("Latitude: " + lat + ". Longitude: " + lon);
        marker.quaternion.setFromEuler(
            new THREE.Euler(0, lon * rads, lat * rads, "YZX"));
    });

    //sphere.add(camera);

    //window.setInterval(changeParent(), 3000);

    document.body.appendChild(renderer.domElement);
   // document.addEventListener("keydown", keyPressed, true);
}

//Don't know if we need this?
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
            map:         THREE.ImageUtils.loadTexture('img/earth3.jpg'),
            bumpMap:     THREE.ImageUtils.loadTexture('img/earth3-bump.jpg'),
            bumpScale:   2,
            specularMap: THREE.ImageUtils.loadTexture('img/earth3_water.png'),
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
    //Cursor up, down
    if(keycode == 38) {
        camposZ -= 5;
    }
    if(keycode == 40) {
        camposZ += 5;
    }
    if(keycode == 37) {
        camposX -= 10;
    }
    if(keycode == 39) {
        camposX += 10;
    }
    camera.position.z = camposZ;
    //camera.position.x = camposX;

    //Does not work
    //TODO: Get this value to automatically update the value in animate? ng-model?
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
    camera.lookAt(sphere.position);
    document.addEventListener("keydown", keyPressed, true);
    renderer.render(scene, camera);
}

/**
 * Created by Anette on 27.02.2015.
 */
