function World(){

    this.rotation += 0.005;

    // Theoretical Constants
    //The root is the referance point for world surface and orbiting objects
    this.root = new THREE.Object3D;

    //the sphere is the surface of the planet, after is the following constants to the texture
    this.seg = 300;
    this.texture = 'img/earth3.jpg';
    this.bumpMap = 'img/earth3-bump.jpg';
    this.bumpScale = 2;
    this.specularMap = 'img/earth3_water.png';
    this.specular = 'grey';
    this.root.add(this.sphere);

    this.sphere =  THREE.Mesh(
        new THREE.SphereGeometry(this.rad, this.seg, this.seg),
        new THREE.MeshPhongMaterial({
            map:         THREE.ImageUtils.loadTexture(this.texture),
            bumpMap:     THREE.ImageUtils.loadTexture(this.bumpMap),
            bumpScale:   this.bumpScale,
            specularMap: THREE.ImageUtils.loadTexture(this.specular),
            specular:    new THREE.Color()
        }));

    this.rotate = function(){
        this.root.rotation.y += this.rotation;
    }
}