import * as THREE from 'three'

export const getCube = (): THREE.Mesh => {
  // geometry
  const geometry = new THREE.BoxGeometry(1, 1, 1)

  // material
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

  // cube (geometry + material)
  const cube = new THREE.Mesh(geometry, material)

  return cube
}
