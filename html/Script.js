var renderer, scene, camera, banana;

var ww = window.innerWidth,
	wh = window.innerHeight;

function init() {

	renderer = new THREE.WebGLRenderer({canvas : document.getElementById('scene')});
	renderer.setSize(ww,wh);

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(90, ww/wh, 10, 100000);
	camera.position.set(500, 200, 500);
	scene.add(camera);

    // For Rotating Object
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;

    // Background Color
    scene.background = new THREE.Color(0x000000);

    //Setup lighting
    var keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
    keyLight.position.set(-50, 0, 50).normalize();

    var fillLight = new THREE.DirectionalLight(0xffffff, 1.0);
    fillLight.position.set(50, 0, 50).normalize();

    var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(50, 0, -50).normalize();

    var topLight = new THREE.DirectionalLight(0xffffff, 0.7);
    topLight.position.set(0, 50, 0).normalize();

    scene.add(keyLight);
    scene.add(fillLight);
    scene.add(backLight);
    scene.add(topLight);

	loadOBJ();
}

var loadOBJ = function(){

    var mtlLoader = new THREE.MTLLoader();

    var objUrl = new URL(window.location.href).searchParams.get("obj_url")

    var mtlBaseUrl = new URL(window.location.href).searchParams.get("mtl_base_url")

    var mtlFileName = new URL(window.location.href).searchParams.get("mtl_file_name")

    mtlLoader.setBaseUrl(mtlBaseUrl);

    mtlLoader.setPath(mtlBaseUrl);

    mtlLoader.load(mtlFileName, function( materials ) {

        materials.preload();

        var manager = new THREE.LoadingManager();

        var loader = new THREE.OBJLoader( manager );

        loader.setMaterials( materials );

        loader.load(objUrl, addBananaInScene);

    });

};

var addBananaInScene = function(object){

	banana = object;

	object.traverse( function ( child ) {

		if(child instanceof THREE.Mesh){

            //child.material.color = new THREE.Color(0Xffff0000);

			child.geometry.computeVertexNormals();

		}

	});

	scene.add(object);

	render();

};


var render = function () {

	requestAnimationFrame(render);

	banana.rotation.y += .01;

	renderer.render(scene, camera);

};