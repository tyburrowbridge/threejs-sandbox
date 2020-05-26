import * as THREE from 'three'

// used to get syntax highlighting working inside
// of string literals (vscode plugin)
const glsl = (x: any) => x.toString()

/**
 *  Uniforms
 */
const uniforms = {
  time: { value: 0 },
  resolution: { value: new THREE.Vector2(1, 1) },
  speed: { value: 10 },
}

/**
 *  Vertex Shader
 */
const vert = glsl`

    // Set the precision for data types
    precision highp float;
    precision highp int;

    // varrying variables
    varying vec2 vUv;

    // uniform variables
    uniform float time;
    uniform float speed;
    uniform vec2 resolution;

    // main
    void main() {
        // typical vertex output
        vUv = uv;
        gl_Position = projectionMatrix *
                    modelViewMatrix *
                    vec4(position,1.0);
    }

`

/**
 * Fragment Shader
 */
const frag = glsl`
    // varying variables
    varying vec2 vUv;

    // uniforms 
    uniform float time;
    uniform float speed;
    uniform vec2 resolution;


    // main
    void main(void) {

    vec2 p = (2.0 * vUv - resolution.xy) / resolution.y;

    float a = atan(p.x, p.y);
    float r = length(p);
    float pi = 3.1415926535;
    float bump = 0.25;

    vec2 uv = vec2(a / (2.0 * pi), r);
    float cols = 2.0;


    // get the colour
    float xCol = (uv.x - (time / 8.0)) * cols;
    xCol = mod(xCol, 2.0);

  float innerBeamWidth = 0.1;
   float glowIntensity = 100.0; 


    vec3 horColour = vec3(innerBeamWidth, innerBeamWidth, innerBeamWidth);

    // set color around the diameter
    if (xCol < 1.0) {
      horColour.b += 1.0 - xCol;
      horColour.r += xCol;
    } else if (xCol < cols) {
      xCol -= 1.0;
      horColour.b += xCol;
      horColour.r += 1.0 - xCol;
    }


    // main beam
    uv = (2.0 * uv) - 1.0;
    float beamWidth = abs(8.0 / (glowIntensity * uv.y - 1.0));

    vec3 horBeam = vec3(beamWidth);

      gl_FragColor = vec4(((horBeam) * horColour), 1.0);
    }
`

/**
 *  Mesh
 */
export const getCorona = (): THREE.Mesh => {
  // geometry
  const geometry = new THREE.PlaneBufferGeometry(8, 8)

  // material
  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vert,
    fragmentShader: frag,
    blending: THREE.AdditiveBlending,
    transparent: true,
    side: THREE.FrontSide,
  })

  // Set mesh geometry + material
  const mesh = new THREE.Mesh(geometry, material)

  return mesh
}
