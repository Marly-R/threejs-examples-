import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, controls, scene, renderer;

init();
//render(); // remove when using animation loop

function init() {
    //Instancia del objeto scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbab4d9);
    // fog es el que crea la neblina 
    scene.fog = new THREE.FogExp2(0x754585, 0.001);
    console.log(scene);


    //Intancia un objeto renderizando una esena *antiarias(pone mas calidad al dibujo 3D) 
    renderer = new THREE.WebGLRenderer({ antialias: true });
    //Los pixeles de la pantalla: el mismo tamaño del pincel de la pantalla , es el mismo del dibujo 
    renderer.setPixelRatio(window.devicePixelRatio);
    //Mismo tamaño de la pantalla tanto alto como ancho 
    renderer.setSize(window.innerWidth, window.innerHeight);


    renderer.setAnimationLoop(animate);
    //Colca un elemento en el HTML del tipo renderer
    document.body.appendChild(renderer.domElement);

    //Colocar una camara con un angulo de vision, tamaño de captacion, minimo y maximo acercamiento
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    //Parametros en X, Y, Z
    camera.position.set(500, 150, 0);

    // controls

    //El objeto orbitControl nos permite horvitar la imagen con el mouse 
    controls = new OrbitControls(camera, renderer.domElement);
    //Y este es oara moverlo pero ahora con las teclas 
    controls.listenToKeyEvents(window); // optional

    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

    //Amortigua el movimiento 
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    //La intenciadad de deplazamiento en el que termina de moverce 
    controls.dampingFactor = 1.05;


    //Es la forma en como se va a desplzar, si es true solo se deplza por donde va la camara
    //pero si es false es global
    controls.screenSpacePanning = false;

    //Son los controles
    controls.minDistance = 200;
    controls.maxDistance = 500;
 
    controls.maxPolarAngle = Math.PI / 2;

    // world

    //Este dibuja las geometrias del cono o buneo la forma que tendra 
    const geometry = new THREE.ConeGeometry(10, 30, 8, 1);
    //Pone el color del material original 
    const material = new THREE.MeshPhongMaterial({ color: 0xeb5bda, flatShading: true });

    //Este dibuja el numero de las piramides
    for (let i = 0; i < 500; i++) {

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 1600 - 800;
        mesh.position.y = 0;
        mesh.position.z = Math.random() * 1600 - 800;
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        scene.add(mesh);

    }

    // lights

    //Pone la luz de alguna parte 
    const dirLight1 = new THREE.DirectionalLight(0xb2dcf7, 7);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);

    //Esta es otra fuente de luz por el otro lado 			
    const dirLight2 = new THREE.DirectionalLight(0x112663, 3);
    dirLight2.position.set(- 1, - 1, - 1);
    scene.add(dirLight2);

    const ambientLight = new THREE.AmbientLight(0x51026e);
    scene.add(ambientLight);

    //

    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

    render();

}

function render() {

    renderer.render(scene, camera);

}