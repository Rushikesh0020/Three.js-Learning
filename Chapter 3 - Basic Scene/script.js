//Scene
const scene = new THREE.Scene();


//Red Cube
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color: 0xff0000});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Sizes

const  sizes =  {
    width: 800,
    height: 600
}


//Camera
//Type used:  Perspective Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera)


//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);




















/*
4 Elements to get Started
    1. A scene that will contain objects
    2. Some objects
    3. A camera
    4. A renderer
*/

/*
    SCENE
    
    1. Like a container
    2. We put objects, models, lights, etc, in it. 
    3. At some point we ask Three.js to render that scene
*/

/*
    OBJECTS

    1. Primitive geometries : cubes, spheres
    2. Imported models
    3. Particles
    4. Lights
    5. Etc.

    Start with a simple red cube
*/

/*
    We need to create a Mesh
    :-
        - Combination of a geometry(the Shape)and a material(how it works)
        - Start with a BoxGeometry and MeshBasicMaterial
*/

