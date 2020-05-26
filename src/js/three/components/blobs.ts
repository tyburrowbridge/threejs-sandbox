import * as THREE from 'three' // used to get syntax highlighting working inside
// of string literals
const glsl = (x: any) => x.toString()

/**
 *  Uniforms
 */
const uniforms = {
  time: { value: 0 },
  resolution: { value: new THREE.Vector2(1, 1) },
  speed: { value: 10 },
  fadeAway: { value: 1 },
  uniformity: { value: 5 },
}

/**
 *  Vertex Shader
 */
const vert = glsl`

// Set the precision for data types used in this shader
precision highp float;
precision highp int;

// Examples of variables passed from vertex to fragment shader
varying vec2 vUv;

uniform float time;
uniform float speed;
uniform float fadeAway;
uniform vec2 resolution;
uniform float uniformity;


   // To pass variables to the fragment shader, you assign them here in the
    // main function. Traditionally you name the varying with vAttributeName
 /*   vNormal = normal;
    vUv = uv;
    vUv2 = uv2;
    vPosition = position;
*/

  void main() {

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

  varying vec2 vUv;
  uniform float time;
  uniform float speed;
  uniform float fadeAway;
  uniform vec2 resolution;
  uniform float uniformity;



  float INTENSITY = 4.0;
  float GLOW = 2.0;
  float BLOB_AMPLITUDE = abs(sin(time));



  vec3 blob(vec2 uv, float bSize, vec3 color, vec2 speed, vec2 size, float time) {

    float xMove = sin(speed.x * time) * size.x;
    xMove = xMove * 0.5;

    float yMove = cos(speed.y * time) * size.y;
    xMove = xMove * 0.5;

    vec2 point = vec2(xMove, yMove);

    float d = bSize / distance(uv, point);
    d = pow(d / INTENSITY, GLOW) * bSize;
	
    return vec3(color.r * d, color.g * d, color.b * d);
} 

  void main(void) {
    // variables
    // red
    float freqRed = 0.0;
    float blobRed = 0.0;

    // green
    float freqGreen = 0.1;
    float blobGreen = 0.28;

    // blue
    float freqBlue = 0.2;
    float blobBlue = 0.1;


    vec2 uv = -1.0 + 2.0 * (vUv.xy / resolution.xy);

    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);

    vec3 bColor = vec3(freqRed * blobRed, freqGreen * blobGreen, freqBlue * blobBlue); 

    vec2 ySwing = vec2(1.2, 0.2);  
    vec2 xSwing = vec2(0.2, 0.2);  


      // blobs
      color.rgb += blob(uv, 3.0, bColor, ySwing, xSwing, time);
      color.rgb += blob(uv, 1.8, vec3(0.1,0.0,0.1), ySwing+0.2, xSwing+0.43, time+0.2);


    gl_FragColor = color;
  }
`

/**
 *  Cube
 */
export const getBlobs = (): THREE.Mesh => {
  // geometry
  const geometry = new THREE.PlaneBufferGeometry(5, 3)

  // material
  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vert,
    fragmentShader: frag,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    transparent: true,
  })

  // cube (geometry + material)
  const cube = new THREE.Mesh(geometry, material)
  cube.position.z = 3

  const animate = () => {
    uniforms.time.value += 0.01
    requestAnimationFrame(animate)
  }

  animate()
  return cube
}
