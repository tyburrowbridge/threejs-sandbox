import * as THREE from 'three'

export const getLight = () => {
  const light = new THREE.DirectionalLight(0xffffff, 1.2)
  light.position.set(10, -10, 1)
  light.castShadow = true
  light.shadow.bias = 3.0
  light.shadow.camera.right = 5
  light.shadow.camera.left = -5
  light.shadow.camera.top = 5
  light.shadow.camera.bottom = -5

  return light
}
