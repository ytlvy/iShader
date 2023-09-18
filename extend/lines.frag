#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;


#define S smoothstep

vec4 Line(vec2 uv, float speed, float height, vec3 col) {
    uv.y += S(1., 0., abs(uv.x)) * sin(u_time * speed + uv.x * height) * .2;
    return vec4(S(.06 * S(.2, .9, abs(uv.x)), 0., abs(uv.y) - .004) * col, 1.0) * S(1., .3, abs(uv.x));
}

void mainImage(out vec4 O, in vec2 I) {
    vec2 uv = (I - .5 * u_resolution.xy) / u_resolution.y;
    
    O = vec4(0.1569, 0.0902, 0.0902, 0.0);
    for (float i = 0.; i <= 5.; i += 1.) {
        float t = i / 5.;
        O += Line(uv, 1. + t, 4. + t, vec3(.2 + t * .7, .2 + t * .4, 0.3));
    }
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
