let particles = [];
var mm,analyzer;

function preload()
{
  mm = loadSound('/Users/sam/Documents/p5js_projects/return_to_the_sun_final_20250719.wav')
	
}

function setup()
{
	createCanvas(windowWidth, windowHeight);         
	//colorMode(HSB);
	background(0);
	colorMode(HSB);
 	for(var i = 0; i < width; i += 10)
  {
	  for(var o = 0; o < height; o += 10)
    {
      particles.push({x:i,y:o,clr:color(255-frameCount,100,100)})
	  }
  }

	//mm.play();
	mm.loop();
	analyzer = new p5.Amplitude();
	analyzer.setInput(mm);
}

function draw()
{
	colorMode(HSB);
	background(243,78,28,0.01);
	noStroke();
	let rms = analyzer.getLevel();
	for(var i=0;i<particles.length;i++)
  	{
		let p =particles[i];
		fill(p.clr);
		ellipse(p.x+rms*30 ,p.y+rms*30 ,1);
		p.x += (noise(p.x/200, p.y/200, 3000) - 0.6) * 3;
		p.y += (noise(p.x/200, p.y/200, 30000) - 0.5) * 3;
	}
  
// 	for(var i=0;i<width;i+=10){
// 		for(var o=0;o<height;o+=10){
//     fill(noise(i/100,o/100,frameCount/150)*400,150,70,100);
// 	  rect(i, o, 30, 30);
// }
// }
}