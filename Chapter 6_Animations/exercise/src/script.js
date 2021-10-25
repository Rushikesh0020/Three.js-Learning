import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera     
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


gsap.to(mesh.position, { duration:1, delay:1, x:2 })
gsap.to(mesh.position, { duration:1, delay:2, x:0 })


// // Time
// let time = Date.now()

// //Animations
// const tick = () => {
//     // console.log('tick')
//     // mesh.position.x += 0.01
//     // mesh.position.y -= 0.01
//     mesh.position.z += 0.01

//     mesh.rotation.y += 0.02
//     // Time Based Animation
   
//     // const currTime = Date.now()
//     // const deltaTime = currTime - time
//     // time = currTime
    
//     // mesh.rotation.y += 0.001 * deltaTime 

//     renderer.render(scene, camera)

//     window.requestAnimationFrame(tick)
// }

// // Time
// let clock = new THREE.Clock()
// //Animations
// const tick = () => {
   
//     const elapsedTime = clock.getElapsedTime()

//     //Update Objects
//     mesh.rotation.y = elapsedTime 
//     // mesh.rotation.y = elapsedTime * Math.PI * 2

//     renderer.render(scene, camera)

//     window.requestAnimationFrame(tick)
// }

// Time
// let clock = new THREE.Clock()
//Animations
const tick = () => {
   
    // const elapsedTime = clock.getElapsedTime()

    // //Update Objects
    // mesh.position.x = Math.sin(elapsedTime)
    // mesh.position.y = Math.cos(elapsedTime)
    

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}


tick()