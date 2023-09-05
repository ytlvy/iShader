#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec2 u_time;

#define PI 3.14159265359

// Plot a line on Y using a value between 0.0-1.0
// 值域 -1 -> 1
//
float plot(float y, float pct) {
    return smoothstep(pct - 0.01, pct, y) - smoothstep(pct, pct+0.01, y);
}


void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;

    //function
    // float y = st.x;
    float fun = pow(st.x, 4.);

    //画图
    vec3 color = vec3(fun);

    //确定那些点在直线上 y = x^4
    float pct = plot(st.y, fun);//结果 0.0 or 1.0, 直线上为1.0 其余为0

    //给直线加颜色
    color = (1.-pct)*color/*给直线外背景加颜色*/ + pct*vec3(0.0706, 0.7686, 0.302)/*给直线加颜色*/;

    gl_FragColor = vec4(color, 1.0);
}