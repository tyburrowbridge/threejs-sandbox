import * as THREE from 'three'

export const getCamera =
    (width: number, height: number): THREE.PerspectiveCamera => {
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

      // position camera
      camera.position.z = 5

      return camera
    }
