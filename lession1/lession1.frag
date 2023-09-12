#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec2 u_time;

// Plot a line on Y using a value between 0.0-1.0
//  0.0 <= abs(y - x) <= 0.003 这个范围内从0-1平滑插值
float lineShape(vec2 st) {
    return smoothstep(0.003, 0.0, abs(st.y - st.x));
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;

    //function
    float y = st.x;
    // float y = st.x*6.;

    //画图
    vec3 color = vec3(y);

    //确定那些点在直线上
    float pct = lineShape(st);//结果 0.0 or 1.0, 直线上为1.0 其余为0

    //给直线加颜色
    color = (1.-pct)*color/*给直线外背景加颜色*/ + pct*vec3(0.251, 0.251, 0.0275)/*给直线加颜色*/;

    gl_FragColor = vec4(color, 1.0);
}