import { useEffect } from 'react'
import React from 'react'
import * as THREE from 'three'

import { getCamera } from '../three/camera'
import { getRenderer } from '../three/renderer'
import { getBlobs } from '../three/blobs'
import { getGlobe } from '../three/globe'

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
    const blobs = getBlobs()
    const globe = getGlobe()

    // add objects to scene
    const sceneObjects = [blobs]
    sceneObjects.map((o: any) => {
      return scene.add(o)
    })

    // animation
    const animate = () => {
      requestAnimationFrame(animate)
      render()
    }

    const render = () => {
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      scene.remove(blobs)
    }
  }, [])

  return <div />
}
