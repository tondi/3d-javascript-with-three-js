import * as THREE from 'three';

const canvasElement = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({
	antialias: true,
	canvas: canvasElement // tell renderer where to render
});
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
	70, // sets a field of view to 70 degrees
	window.innerWidth / window.innerHeight, // makes camera see in right proportions
	0.01, // how close camera will see objects
	20 // how far camera will see objects 
);
camera.position.z = 7;
camera.position.y = -3;

const geometry = new THREE.ConeGeometry(
	1, // radius
	2, // height
	6 // number of angles in base
);

const material = new THREE.MeshLambertMaterial({color: 0x063e1d});

function generateTree({levels}) {
	function getScaledCone(cone) {
		const newCone = cone.clone();
		newCone.scale.x += 0.2;
		newCone.scale.y += 0.2;
		newCone.scale.z += 0.2;
		newCone.position.y -= 0.6;
		return newCone;
	}

	const pineTree = new THREE.Group();
	let cone = new THREE.Mesh(geometry, material);

	while(levels) {
		cone = getScaledCone(cone); // clone previous cone, scale it
		pineTree.add(cone); // and add it to container
		levels -= 1;
	}

	return pineTree;
}

const tree = generateTree({levels: 6});
scene.add(tree);

var light = new THREE.DirectionalLight(
	0x404040, // color of the light 
	10 // intensity
);
light.position.x = 2;
light.position.y = 5;
scene.add(light);

(function update() {
	// assuming browser FPS is 60, the cone rotates 0.6rad ≈ 34° per second
	tree.rotation.y += 0.01;
	// after each change new frame is rendered
	renderer.render(scene, camera);
	// what in corelation with requestAnimationFrame creates fluid movement
	window.requestAnimationFrame(update);
}());