#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec3 color = vec3(0.6824, 0.1137, 0.1137);

    vec2 left = step(vec2(0.1), st);

    vec2 top = step(vec2(0.1), vec2(1.0) - st);

    color = vec3(left.x * left.y * top.x * top.y);

    gl_FragColor = vec4(color, 1.);
}