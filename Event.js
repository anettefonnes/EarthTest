"use strict";
var Event = function(latitude, longitude)
{
    this.__proto__ = Object.create(new THREE.Object3D());
    this.position.copy(GeoLocToVec3D(longitude,latitude));

    this.addMesh = function(mesh){
        this.add(mesh);

    }

        /**new THREE.Mesh(
        new THREE.SphereGeometry(5, 10, 10),
        new THREE.MeshBasicMaterial({color: 0xff0000})
    ));**/

};

//TODO GeoLocToVec3D to Input Manager
function GeoLocToVec3D(lo, la) {

    lo = Number(lo).toRadians();
    la = Number(la).toRadians();

    var vec = new THREE.Vector3(
        Math.cos(la) * Math.cos(lo),
        Math.cos(la) * Math.sin(lo),
        Math.sin(la)
    );
    return vec;
}




if (Number.prototype.toRadians === undefined) {
    Number.prototype.toRadians = function() { return this * Math.PI / 180; };
}

/**
 * Created by Christer on 15.03.2015.
 */
