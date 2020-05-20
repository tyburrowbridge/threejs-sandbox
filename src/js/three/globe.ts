import * as THREE from 'three'

// used to get syntax highlighting working inside
// of string literals
const glsl = (x: any) => x.toString()

/**
 *  Uniforms
 */
const uniforms = {
  time: { value: 0 },
  rotation: { value: new THREE.Vector4() },
  resolution: { value: new THREE.Vector2(1, 1) },
  speed: { value: 10 },
  fadeAway: { value: 3 },
  uniformity: { value: 10 },
}

/*******************************************
 *  Vertex Shader
 ******************************************/

const vert = glsl`
// set precision 
    precision highp float;
    precision highp int;

// vertex: variables
    varying vec2 vUv;
    uniform float time;
    uniform float speed;
    uniform float fadeAway;
    uniform vec2 resolution;
    uniform float uniformity;

// main
    void main() {

      vUv = uv;

      gl_Position = projectionMatrix *
                    modelViewMatrix *
                    vec4(position,1.0);
}
`

/*******************************************
 *  Fragment Shader
 ******************************************/

const frag = glsl`

  // fragment variables
  varying vec2 vUv;
  uniform float time;
  uniform float speed;
  uniform float fadeAway;
  uniform vec2 resolution;
  uniform float uniformity;
  float INTENSITY = 4.5;
  float GLOW = 3.0;

  

  // draw & move blob
  vec3 blob(vec2 uv, 
            vec3 color, 
            vec2 speed, 
            vec2 size, 
            float time) {

    // movement
    float xMove = sin(speed.x * time) * size.x;
    float yMove = cos(speed.y * time) * size.y;
    vec2 point = vec2(xMove, yMove);


    float d = 1.0 / distance(uv, point);

    d = pow(d / INTENSITY, GLOW);
	
    return vec3(color.r * d, color.g * d, color.b * d);
} 


  void main(void) {
    vec2 uv = -1.0 + 2.0 * (vUv.xy / resolution.xy);
  	float freqBlue = 0.0;
    float freqGreen = 0.0;
  
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
  
    float blobColorRed = 0.0;
    float blobColorGreen = 1.0;
    float blobColorBlue = 1.0;
  
    vec3 blobColor = vec3(blobColorRed, blobColorBlue, blobColorGreen); 
  
    vec2 xSwing = vec2(2.0, 1.0);  
    vec2 ySwing = vec2(0.1, 0.4);  
  
    color.rgb += blob(uv, blobColor, xSwing, ySwing, time);
    color.rgb += blob(uv, blobColor+0.8, xSwing, ySwing, time);
  
    gl_FragColor = color;
}
`

/**
 *  Cube
 */
export const getGlobe = (): THREE.Mesh => {
  // geometry
  const geometry = new THREE.SphereBufferGeometry(3, 30, 30)

  // material
  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vert,
    fragmentShader: frag,
  })

  // cube (geometry + material)
  const cube = new THREE.Mesh(geometry, material)
  const animate = () => {
    uniforms.time.value += 0.01
    requestAnimationFrame(animate)
  }

  animate()
  return cube
}
