import { useEffect } from 'react'
import React from 'react'
import * as THREE from 'three'

import { getCamera } from '../three/camera'
import { getRenderer } from '../three/renderer'
import { getCorona } from '../three/components/corona'

import { getScreenWidth, getScreenHeight } from '../three/utils'

interface ThreeSceneProps {}

export const ThreeScene: React.FC<ThreeSceneProps> = () => {
  useEffect(() => {
    const width = getScreenWidth()
    const height = getScreenHeight()

    // scene
    const scene = new THREE.Scene()

    // camera
    const camera = getCamera(width, height)

    // get elements
    const corona = getCorona()

    // add objects to scene
    const sceneObjects = [corona]
    sceneObjects.map((o: any) => {
      return scene.add(o)
    })

    // renderer
    const renderer = getRenderer(width, height)

    const renderScene = () => {
      renderer.render(scene, camera)
    }

    const handleResize = () => {
      const curWidth = getScreenWidth()
      const curHeight = getScreenHeight()

      renderer.setSize(curWidth, curHeight)
      camera.aspect = curWidth / curHeight
      camera.updateProjectionMatrix()
      renderScene()
    }

    // animate
    const animate = (time: number) => {
      // @ts-ignore
      // animate corona based on time
      corona.material.uniforms.time.value = time / 1000

      renderScene()

      // loops frame
      requestAnimationFrame(animate)
    }

    // listener for screen resize
    window.addEventListener('resize', handleResize)

    // startup frame
    animate(0)

    return () => {
      // cleanup for effect hook

      window.addEventListener('resize', handleResize)

      sceneObjects.map((obj: any) => {
        return scene.remove(obj)
      })
    }
  }, []) // component did mount

  return <div />
}
