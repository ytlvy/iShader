#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265359

//选择矩阵
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))

//颜色
const vec3 c = vec3(0.9,0.45,0.45);

//矩形
float sdbox(vec2 uv,float r ){
    return max(abs(uv.x),abs(uv.y))-r;
}


float box(vec2 uv,float side,float r,float thickness,float blur){

    uv -=vec2(r,0.0)*1.414*side;
    vec2 uv2 = rot(step(side,0.0)*PI)*uv;
    float angle = (atan(uv2.y,uv2.x)/PI)*0.5+0.5;
    uv =rot(1.57/2.0)*uv;  
    float b1 = sdbox(uv,r);
    float t = u_time*1.2;
    if(mod(t,4.0)<1.0){
         return smoothstep(thickness,0.00+blur,abs(b1))*step(angle,smoothstep(0.0,1.0,fract(t)));
    }else if(mod(t,4.0)>=1.0&&mod(t,4.0)<=2.0){
         return smoothstep(thickness,0.00+blur,abs(b1))*step(smoothstep(0.0,1.0,fract(t)),angle);
    }
    
}


void mainImage1( out vec4 fragColor, in vec2 fragCoord )
{

    //坐标调整到中心 [-1, +1]
    vec2 uv = (fragCoord*2.-u_resolution.xy)/u_resolution.y;

    //默认色
    vec3 col = vec3(0);
    
    //备份
    vec2 uv1=uv;

    //圆环
    float angle = atan(uv1.x,uv1.y)-u_time;   //角度a
    float d = length(uv1);       //半径r[] 越大 圆半径越小[-1, 1]
    //小圆极坐标原点
    vec2 uv2= vec2(fract(angle*3.5), d); //fract(angle*3.5) 重复切分多个象限
    //画小圆
    d = length(uv2-vec2(0.2,0.5));       //移动圆点坐标上移vec2(0.1,0.4)
    col=mix(col,c,smoothstep(0.06,0.0,d));//画圆
    

    float t = u_time*1.2;
    vec2 uv3 = uv* rot(step(mod(t*1.2,2.0),1.0)/*奇数秒1，偶数秒0*/
                * PI*0.5 /*每次旋转的角度*/
                * smoothstep(0.0,1.0,fract(t*1.2))/*旋转插值*/ );    
    float b1 = sdbox(rot(PI*0.25)/*旋转45度*/*uv3, 0.2/*半径*/);
    col=mix(col,c,smoothstep(0.012,0.008,abs(b1)));
   
   
    // col=mix(col,c,box(uv,-1.0,0.20,0.003,0.0));
    // col=mix(col,c,box(uv,1.0,0.20,0.003,0.0));
    // col=mix(col,c,box(uv,-1.0,0.1,0.015,0.005));
    // col=mix(col,c,box(uv,1.0,0.1,0.015,0.005));
    
    fragColor = vec4(col,1.0);
}



void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    
    vec2 uv = (fragCoord-u_resolution.xy*.5)/u_resolution.y;
    vec3 col = vec3(0);
    
    vec2 uv1=uv;
    float angle = atan(uv1.x,uv1.y)-u_time;
    float d = length(uv1*10.0)-2.0;
    vec2 uv2= vec2(1.5*fract(angle*3.5),d);
    d = length(uv2-vec2(0.5,0.5));
    col=mix(col,c,smoothstep(0.25,0.0,d));    
    

    float t = u_time*1.2;
    vec2 uv3=uv* rot(step(mod(t*1.5,2.0),1.0)*0.5*3.1415926*smoothstep(0.0,1.0,fract(t*1.5)));    
    float b1 = sdbox(rot(1.57/2.0)*uv3,0.14);
    col=mix(col,c,smoothstep(0.012,0.008,abs(b1)));
   
   
    // col=mix(col,c,box(uv,-1.0,0.20,0.003,0.0));
    // col=mix(col,c,box(uv,1.0,0.20,0.003,0.0));
    // col=mix(col,c,box(uv,-1.0,0.1,0.015,0.005));
    // col=mix(col,c,box(uv,1.0,0.1,0.015,0.005));
    
    fragColor = vec4(col,1.0);
}

void main() {
    mainImage1(gl_FragColor, gl_FragCoord.xy);
}