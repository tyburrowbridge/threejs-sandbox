import { useEffect } from 'react'
import React from 'react'
import * as THREE from 'three'

import { getCamera } from '../three/camera'
import { getRenderer } from '../three/renderer'
import { getCube } from '../three/cube'

interface ThreeSceneProps {}

export const ThreeScene: React.FC<ThreeSceneProps> = () => {
  useEffect(() => {
    // scene
    const scene = new THREE.Scene()

    // camera
    const camera = getCamera()

    // renderer
    const renderer = getRenderer()

    // scene objects
    const cube = getCube()

    // add objects to scene
    const sceneObjects = [cube]
    sceneObjects.map((o: any) => {
      return scene.add(o)
    })

    // animate the cube
    const tick = () => {
      requestAnimationFrame(tick)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      cube.rotation.z += 0.01
      renderer.render(scene, camera)
    }
    tick()
  }, [])

  return <div />
}
