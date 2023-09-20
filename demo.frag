#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; //画布尺寸


void main(){
    // vec2 uv = gl_FragCoord.xy / u_resolution;//单位化[0 - 1]
    // uv = uv * 2.0 - 1.0; //坐标移动到中心 [-1, 1];
    // uv.x *= u_resolution.x/u_resolution.y;   //保持比例[-1, 1]

    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / u_resolution.y;//[-1,1]

    vec3 color = vec3(0); //0黑色, 1为白色
    
    gl_FragColor =  vec4(color, 1.0);
}