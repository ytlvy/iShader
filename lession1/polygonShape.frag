#ifdef GL_ES
precision mediump float;
#endif

const float PI = 3.1415926535;

uniform vec2 u_resolution;

float polygonShape(vec2 position, float radius, float sides) {
    position = position * 2.0 - 1.0; //居中

    float angle = atan(position.x, position.y); //当前点的角度
    float slice = PI * 2.0 / sides;             //平均每面的夹角
    
    //当前向量和radius夹角 角度值
    float alpha_angle = floor(0.5 + angle / slice) *slice - angle; 

    float a = PI / 2.0 + angle - ((sides - 2.0) / sides) * PI / 2.0; 
    float a1 = min(slice - a , a);
    float inner = cos(a1) * length(position)/*R*/;

    return step(radius, inner);
}

void main() {
    vec2 position = gl_FragCoord.xy / u_resolution;

    vec3 color = vec3(0.0);

    float polygon_color = polygonShape(position, 0.4, 6.0); //确定园内为黑色, 圆外为白色

    color = vec3(polygon_color); //根据圆内外颜色不同生成vec3

    gl_FragColor = vec4(color, 1.0);
}