
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;   //画布尺寸
uniform vec2    u_mouse;        //鼠标位置
uniform float   u_time;         //系统时间

varying vec2    v_texcoord;     

void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = v_texcoord;

    float b = abs(sin(u_time));
    color.rgb = vec3(st.x,st.y, 0.0);
    
    gl_FragColor = color;
}
