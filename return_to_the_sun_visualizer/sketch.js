// Reference this to interpret HSB color values
// https://codepen.io/HunorMarton/details/eWvewo

var song;
var analyzer;
let particles = [];
let start_time;
let pause = false;

// preload runs before rest of the program and the rest
// of the program will not start until preload finishes
function preload()
{
  // load sound here as it may take a while
  song = loadSound("return_to_the_sun_final_20250719.wav")
}

function setup()
{
  createCanvas(windowWidth, windowHeight);
  
  // black background
  background(0);

  // HSB = hue - saturation - brightness. 
  // hue goes from 0 (red) to 360 (also red). 180 = cyan
  // saturation goes from 0 to 100 (black and white to color)
  // brightness goes from 0 to 100 (black to white)
  colorMode(HSB);

  // loop song for continuous play
  song.loop();

  for(var i = 0; i < width; i += 20)
  {
    for(var j = 0; j < height; j += 20)
    {
      // frameCount = 0 in setup() so all particles will have same color here
      // of HSB color 255, 100, 100
      particles.push(
        {
          x : i,
          y : j,
          clr : color(255 - frameCount, 100, 100)
        }
      )
    }
  }
  // print(particles[0].clr.toString('hsb'));
  analyzer = new p5.Amplitude();
	analyzer.setInput(song);
  // analyzer.toggleNormalize(true);
  frameRate(30);

  // get program start time
  start_time = millis();

}

function draw()
{
  // current time floored to nearest second
  var cur_time = Math.floor((millis() - start_time) / 1000);
  colorMode(HSB);
  // Background set to HSB color that is a deep blueish purple
	background(243, 78, 28, 0.01);
	noStroke();
	let rms = analyzer.getLevel();
  //print(rms);
	for(var i = 0; i < particles.length; i++)
  {
	  let p = particles[i];
	  fill(p.clr);
	  ellipse(p.x + (rms * 30), p.y + (rms * 30), 1);
    //ellipse(p.x + (rms * (frameCount % 77)), p.y + (rms * (frameCount % 66)), 0.5);

    var x_dir = -1;
    var y_dir = 1;

	  p.x += (noise(p.x/100, p.y/200, 30000) - 0.6) * 3;
		p.y += (noise(p.x/100, p.y/200, 300000) + 0.5) * 3;
	}
  // print("frameCount: " + frameCount);
  // print("x: " + particles[0].x);
  // print("y: " + particles[0].y);
  //pause_sketch();
}

function pause_sketch()
{
  noLoop();
  pause = true;
}

// click mouse to pause drawing. song will continue to play
function mousePressed()
{
  if(!pause)
    noLoop();
  else
    loop();
  pause = !pause;
}

// Take a screenshot of current canvas by pressing 's'
function keyPressed()
{
  if(key == 's')
    saveCanvas("sketch", "png");
}

