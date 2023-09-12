#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

#define t u_time
#define r u_resolution

void mainImage( out vec4 fragColor, in vec2 fragCoord ){
	vec3 c;
	
	float l,z=t;
	for(int i=0;i<3;i++) {
		vec2 uv,p=fragCoord.xy/r;
		uv=p;
		p-=.5;
		p.x*=r.x/r.y;
		z+=.07;
		l=length(p);
		uv+=p/l*(sin(z)+1.)*abs(sin(l*9.-z-z));
		c[i]=.01/length(mod(uv,1.)-.5);
	}

	fragColor=vec4(c/l,t);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}