#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float rectShape(vec2 position, vec2 scale) {
     scale = vec2(0.5) - scale * 0.5;

     vec2 shaper = vec2(step(scale.x, position.x), step(scale.y, position.y));
     shaper *= vec2(step(scale.x, 1.0-position.x), step(scale.y, 1.0-position.y));

     return shaper.x * shaper.y;
}


void main() {
    vec2 position = gl_FragCoord.xy / u_resolution;

    vec3 color = vec3(0.0);

    float circle_bin_color = rectShape(position, vec2(1.0, 0.3)); //确定园内为黑色, 圆外为白色

    color = vec3(circle_bin_color); //根据圆内外颜色不同生成vec3

    gl_FragColor = vec4(color, 1.0);
}