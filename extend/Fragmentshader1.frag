#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265359

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    //坐标调整到中心 [-1, +1]
    vec2 uv = (fragCoord.xy*2.0-u_resolution.xy)/u_resolution.y;

    //初始化背景色, 黑色
    vec4 o = vec4(0.);
    vec2 p ,c;
    float a;
    float r;
    float r_;  //决定了球的大小
    r_ = 2.1;  //变大 球变小
    //画400个小球
    for(float i = 0.0;i<200.0;i++){
        a =  i/100. - 1.;  //[-1, 1]

        //X=a+rcosθ，y=b+rsinθ 因为是vec2 耦合在了一起
        {
        r = sqrt(1.0-a*a);
        p.x = cos(i*2.4 + u_time) * r;
        p.y = cos(i*2.4 + u_time + PI/2.) * r;

        //这个和上面的等效
        //p = cos(i*2.4 + u_time + vec2(0, PI/2.0))* sqrt(1.0-a*a) /*R*/;
        }

        //3纬点映射到二维 平行投影到y = -1这个平面上。a是这个三维顶点的z坐标
        //决定了小球的位置
        c = uv + vec2(p.x, a)/(p.y+ r_);

        //cos(i+vec4(0,2,4,0)) 颜色偏移
        //(1.0-p.y)颜色翻转
        //1.0/dot(c,c)画小球
        //60000限定了小球的辐射范围
        o += (cos(i+vec4(0,2,4,0))/*随机混合色*/ + 1.0)/dot(c,c)*(1.0-p.y)/60000.;
    }
   
    fragColor = o;
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}