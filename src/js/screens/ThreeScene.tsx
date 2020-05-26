import { useEffect } from 'react'
import React from 'react'
import * as THREE from 'three'

import { getCamera } from '../three/camera'
import { getRenderer } from '../three/renderer'
import { getCorona } from '../three/components/corona'

interface ThreeSceneProps {}

export const ThreeScene: React.FC<ThreeSceneProps> = () => {
  useEffect(() => {
    // scene
    const scene = new THREE.Scene()

    // camera
    const camera = getCamera()

    // renderer
    const renderer = getRenderer()

    // const blobs = getBlobs()
    // const globe = getGlobe()
    const corona = getCorona()

    // add objects to scene
    const sceneObjects = [corona]
    sceneObjects.map((o: any) => {
      return scene.add(o)
    })

    // animation
    const animate = (time: number) => {
      // @ts-ignore
      corona.material.uniforms.time.value = time / 1000

      requestAnimationFrame(animate)
      render()
    }

    const render = () => {
      renderer.render(scene, camera)
    }

    animate(0)

    return () => {
      scene.remove(corona)
    }
  }, [])

  return <div />
}
