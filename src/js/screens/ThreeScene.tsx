import { useEffect } from 'react'
import React from 'react'
import * as THREE from 'three'

interface ThreeSceneProps {}

export const ThreeScene: React.FC<ThreeSceneProps> = () => {
  useEffect(() => {
    // scene
    const scene = new THREE.Scene()

    // camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    // renderer
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    // geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1)

    // material
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

    // cube (geometry + material)
    const cube = new THREE.Mesh(geometry, material)

    // add cube to scene
    scene.add(cube)

    // position camera
    camera.position.z = 5

    // animate the cube
    const animate = () => {
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
    }
    animate()
  }, [])

  return <div />
}
