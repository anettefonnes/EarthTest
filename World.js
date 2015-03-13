function World(){
    this.root = new THREE.Object3D();

    this.rotation += 0.005;
    //this.rad = 100;
    //this.seg = 300;

    // Theoretical Constants
    //The root is the referance point for world surface and orbiting objects


    //the sphere is the surface of the planet, after is the following constants to the texture
    /*
    this.texture = 'img/earth3.jpg';
    this.bumpMap = 'img/earth3-bump.jpg';
    this.bumpScale = 2;
    this.specularMap = 'img/earth3_water.png';
    this.specular = 'grey';
    this.root.add(new THREE.Mesh(
                    new THREE.SphereGeometry(this.rad, this.seg),
                    new THREE.MeshPhongMaterial({
                        map:         THREE.ImageUtils.loadTexture(this.texture),
                        bumpMap:     THREE.ImageUtils.loadTexture(this.bumpMap),
                        bumpScale:   this.bumpScale,
                        specularMap: THREE.ImageUtils.loadTexture(this.specularMap),
                        specular:    new THREE.Color(this.specular)
                      })));
    */
    this.root.add(new THREE.Mesh(
        new THREE.SphereGeometry(100, 300),
        new THREE.MeshPhongMaterial({
            map:         THREE.ImageUtils.loadTexture( 'img/earth3.jpg'),
            bumpMap:     THREE.ImageUtils.loadTexture('img/earth3-bump.jpg'),
            bumpScale:   2,
            specularMap: THREE.ImageUtils.loadTexture('img/earth3_water.png'),
            specular:    new THREE.Color( 'grey')
        })));
}