#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

// Plot a line on Y using a value between 0.0-1.0
// 值域 -1 -> 1
//
float plot(float y, float pct) {
    return smoothstep(pct - 0.01, pct, y) - smoothstep(pct, pct+0.01, y);
}


void main() {    

    vec2 st = gl_FragCoord.xy / u_resolution;
    //移动到中心
    // vec2 st = gl_FragCoord.xy / u_resolution * 2.0 - 1.0;

    float x = st.x;
    x = x * PI + u_time;
    float fun = sin(x);
    // fun = abs(fun);
    // fun = fract(fun);
    // fun = floor(fun) + 0.3;

    // fun = mod(x,0.5); // return x modulo of 0.5
    // fun = fract(x); // return onlfun the fraction part of a number
    // fun = ceil(x);  // nearest integer that is greater than or equal to x
    //fun = floor(x); // nearest integer less than or equal to x
    // fun = sign(x);  // extract the sign of x
    // fun = abs(x);   // return the absolute value of x
    //fun = clamp(x,0.0,1.0); // constrain x to lie between 0.0 and 1.0
    //fun = min(0.0,x);   // return the lesser of x and 0.0
    //fun = max(0.0,x);   // return the greater of x and 0.0 

    //画图
    vec3 color = vec3(fun);

    //确定那些点在直线上 y = x^4
    float pct = plot(st.y, fun);//结果 0.0 or 1.0, 直线上为1.0 其余为0

    //给直线加颜色
    color = (1.-pct)*color/*给直线外背景加颜色*/ + pct*vec3(0.0706, 0.7686, 0.302)/*给直线加颜色*/;

    gl_FragColor = vec4(color, 1.0);
}