var Event = function(long,lat){
    this.longitude = long;
    this.latitude = lat;
    this.add(new THREE.Mesh(new THREE.SphereGeometry(3, 6, 6),
        new THREE.MeshBasicMaterial({color: 0xffff00})
    ));
};

Event.prototype = new THREE.Object3D();

/**
 * Created by Christer on 15.03.2015.
 */
