#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    //3维函数
    vec3 pct = vec3(st.x);

    pct.r = smoothstep(0.0,1.0, st.x);//第1维函数
    pct.g = sin(st.x*PI);             //第2维函数
    pct.b = pow(st.x, .5);            //第3维函数

    //染色部分
    //给背景染色
    color = mix(colorA, colorB, pct);

    //前景
    //第1维函数染色
    color = mix(color,vec3(1.0, 0.0, 0.0),plot(st,pct.r));
    //第2维函数染色
    color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
    //第3维函数染色
    color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));

    gl_FragColor = vec4(color,1.0);
}
