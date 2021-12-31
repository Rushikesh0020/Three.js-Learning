import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui' 

/**
 * Topics Covered
 */

// 1. Three.js Material Properties: 
        // a) opacity, b) color,
        // c) wireframe, d) alphaMap,
        // e) transparent f) map
        // g) side h) flatShading i) matcap j) shininess k) specular
        // l) gradientMap m) metalness n) roughness  o) aoMap p) aoMapIntensity
        // q) displacementMap r) displacementScale s) normalMap t) envMap 
// 2. Material types:  
        // a) MeshBasicMaterial b) MeshNormalMaterial c) MeshMatcapMaterial
        // d) MeshDepthMaterial e) MeshLambertMaterial f) MeshPhongMaterial 
        // g) MeshToonMaterial  h) MeshStandardMaterial
// 3. Added dat.gui to the scene
// 4. Added three geometries : sphere, plane, torus
// 5. added PointLight, AmbientLight
// 6. aoMap - > Ambient Occlusion Map
// 7. cubeTextureLoader, material.envMap = environmentMapTexture
// 8. Site for HDRIs High Dynamic Range Imaging: HDRIHaven[https://polyhaven.com/]
// 9. To convert HDRIs to cube maps, use this online tool
//      https://matheowis.github.io/HDRI-to-CubeMap/




/**
 * Debug
 */

const gui = new dat.GUI();


/**
 * Textures
 */


const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorheightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg',
])

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// Objects 
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
//  material.color.set('#ff00ff')
// or
// material.color = new THREE.Color('#ff00ff')
// or 
// material.color = new THREE.Color(0x00ff00)
// material.wireframe = true 
// material.transparent = true
// material.opacity = 0.5

// material.alphaMap = doorAlphaTexture 
// material.side = THREE.FrontSide
// material.side = THREE.BackSide
// material.side = THREE.DoubleSide

/**
 * New Material 1
 */
// const material = new THREE.MeshNormalMaterial()
// // material.wireframe = true 
// // material.transparent = true
// material.flatShading = true

/**
 * New Material 2
 */

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture


/**
 * New Material 3
 */

// const material = new THREE.MeshDepthMaterial()

/**
 * New Material 4
 */

// const material = new THREE.MeshLambertMaterial()

/**
 * New Material 5
 */

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)


/**
 * New Material 6
 */

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

/**
 * New Material 7
 */

// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0.45
// material.roughness = 0.45
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorheightTexture
// material.displacementScale = 0.05
// material.normalMap = doorNormalTexture

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.envMap = environmentMapTexture

//Debug Part
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001)
gui.add(material, 'displacementScale').min(0).max(1).step(0.0001)






// Meshes
const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 64, 64), 
    material
)
sphere.position.x = -1.5
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1, 100, 100),
    material
)
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))



const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3,0.2, 64, 128),
    material
)
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))

torus.position.x = 1.5
scene.add(sphere, plane, torus)




const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update Objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    plane.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()