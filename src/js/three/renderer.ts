import * as THREE from 'three'

export const getRenderer = (width: number, height: number): THREE.Renderer => {
  const renderer = new THREE.WebGLRenderer()

  renderer.setSize(width, height)
  document.body.appendChild(renderer.domElement)

  return renderer
}
