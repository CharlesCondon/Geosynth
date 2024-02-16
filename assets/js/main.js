let mic;
let micToggle = false;
let angle = 0;
let test = 0;
let userColor = false;
let colorCheck;
let r,g,b;
let speedSlider,weightSlider,volSlider,redSlider,greenSlider,blueSlider;

document.addEventListener("DOMContentLoaded", (event) => {
    let btns = document.getElementsByClassName("navToggle")
    let hideBtn = document.getElementById("hide");
    let showBtn = document.getElementById("show");
    let setBtn = document.getElementById("settings");

    hideBtn.addEventListener("click", (e) => {
        btns.forEach( e => {
            e.classList.toggle('hidden')
        })
    })
    showBtn.addEventListener("click", (e) => {
        btns.forEach( e => {
            e.classList.toggle('hidden')
        })
    })
    setBtn.addEventListener("click", (e) => {
        
    })

    
});

function preload() {
    song = loadSound("./assets/music/mitski.mp3");
}

function togglePlay() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.loop();
    }
}

function checkInput() {
    if (micToggle === false) {
        console.log("song")
        mic.stop()
        return song;
    }
    else {
        console.log("mic")
        mic.start()
        return mic;
    }
}

function setup(){
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.mousePressed(togglePlay);
    pixelDensity(1)
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT(.8, 1024);
    fft.setInput(checkInput());

    let micBtn = document.getElementById("mic");
    micBtn.addEventListener("click", (e) => {
        micToggle = !micToggle;
        micBtn.classList.toggle('highlight')
        fft.setInput(checkInput());
    })

    speedSlider = createSlider(50, 700, 200, 50);
    speedSlider.parent("settingsCont");
    weightSlider = createSlider(1, 10, 1, 1);
    weightSlider.parent("settingsCont");
    volSlider = createSlider(0, 1, .5, .1);
    volSlider.parent("settingsCont");

    colorCheck = createCheckbox();
    colorCheck.parent("settingsCont");
    redSlider = createSlider(0, 255, 100, .1);
    redSlider.parent("settingsCont");
    greenSlider = createSlider(0, 255, 100, 1);
    greenSlider.parent("settingsCont");
    blueSlider = createSlider(0, 255, 100, 1);
    blueSlider.parent("settingsCont");

}

function draw(){
    background(0, 0, 0, 255);
    song.setVolume(volSlider.value());
    //text('tap to start', width/2, 20);

    let spectrum = fft.analyze();
    if (!colorCheck.checked()) {
        b = Math.floor(fft.getEnergy("lowMid"));
        g = Math.floor(fft.getEnergy("mid"));
        r = Math.floor(fft.getEnergy("highMid"));
    } else {
        r = redSlider.value();
        g = greenSlider.value();
        b = blueSlider.value();
    }
    

    let cent = Math.floor(fft.getCentroid());
    let centroid = Math.floor(map(cent, 0, 10000, 5, 1))
    // fill(255)
    // text(`${centroid}`, width/2, 20)

    // RECTANGLE
    // noStroke();
    // beginShape();
    // push();
    // translate(width / 2, height / 2);
    // angle += radians(.25);
    // rotate(angle);
    // for (let i = 0; i< spectrum.length-350; i++){
    //     let y = map(i, 0, spectrum.length-350, 0, -height*1.5);
    //     let y2 = map(i, spectrum.length-350, 0, height*1.5, 0);
    //     let x = map(i, 0, spectrum.length-350, 0, -width*1.5);
    //     let x2 = map(i, spectrum.length-350, 0, width*1.5, 0);

    //     let h = -height + map(spectrum[i], 0, 255, height, 0);

    //     fill(`rgba( 0, ${spectrum[i]}, ${spectrum[i]}, .5)`)
    //     rect(-width, y, width*2, 2 )
    //     rect(-width, y2, width*2, 2 )
    //     rect(x, -height*1.5, 2, height*4 )
    //     rect(x2, -height*1.5, 2, height*4 )
    // }
    // pop();
    // endShape();

    // RECTANGLE OPPOSITE DIRECTION
    // noStroke();
    // translate(width / 2, height / 2);
    // angle += radians(.25);
    // rotate(-angle);
    // for (let i = 0; i< spectrum.length-350; i++){
    //     let y = map(i, 0, spectrum.length-350, 0, -height*1.5);
    //     let y2 = map(i, spectrum.length-350, 0, height*1.5, 0);
    //     let x = map(i, 0, spectrum.length-350, 0, -width*1.5);
    //     let x2 = map(i, spectrum.length-350, 0, width*1.5, 0);

    //     let h = -height + map(spectrum[i], 0, 255, height, 0);

    //     fill(`rgba( 0, ${spectrum[i]}, ${spectrum[i]}, .25)`)
    //     rect(-width, y, width*2, 2 )
    //     rect(-width, y2, width*2, 2 )
    //     rect(x, -height*1.5, 2, height*4 )
    //     rect(x2, -height*1.5, 2, height*4 )
    // }
    



    
    // VERTICAL FREQUENCY BARS
    // beginShape();
    // noStroke();
    // push();
    // translate(width / 2, height / 2);
    // // angle += radians(.25);
    // // rotate(angle);
    // for (let i = 0; i< spectrum.length-350; i++){
    //     let x = map(i, 0, spectrum.length-350, 0, -width*1.5);
    //     let x2 = map(i, spectrum.length-350, 0, width*1.5, 0);

    //     let h = -height + map(spectrum[i], 0, 255, height, 0);

    //     fill(`rgba(${spectrum[i]},${spectrum[i]},${spectrum[i]}, .25)`)
    //     rect(x, -height*1.5, 2, height*4 )
    //     rect(x2, -height*1.5, 2, height*4 )
        
    // }
    // endShape();
    // pop();


    // HORIZONTAL FREQUENCY LINES
    // noStroke();
    // push();
    // translate(width / 2, height / 2);
    // // angle += radians(.25);
    // // rotate(-angle);
    // test += 1;
    // for (let i = 0; i< spectrum.length-350; i++){
    //     let y = map(i, 0, spectrum.length-350, 0, -height*1.5);
    //     let y2 = map(i, spectrum.length-350, 0, height*1.5, 0);

    //     let h = -height + map(spectrum[i], 0, 255, height, 0);

    //     fill(`rgba(${spectrum[i]},${spectrum[i]},${spectrum[i]}, .25)`)
    //     rect(-width, y, width*2, 1 )
    //     rect(-width, y2, width*2, 1 )
        
    // }
    // pop();
    
    

    let waveform = fft.waveform();

    // WAVEFORM
    // beginShape();
    // noFill()
    // stroke(255, 255, 255);
    // strokeWeight(5);
    
    // for (let i = 0; i < waveform.length; i++){
    //     let x = map(i, 0, waveform.length/2, 0, width/2);
    //     let y = map( waveform[i], -1, 1, 0, height);
    //     vertex(x,y);
        
    // }
    // endShape();



    // BLACK HOLE VISUAL
    noStroke();
    beginShape();
    push();
    translate(width / 2, height / 2);
    angle += radians(1);
    for (let i = 0; i< spectrum.length-350; i++){
        let y = map(i, 0, spectrum.length-350, height/2, height);
        let y2 = map(i, spectrum.length-350, 0, 0, height/2);
        let x = map(i, 0, spectrum.length-350, width/2, width);
        let x2 = map(i, spectrum.length-350, 0, 0, width/2);

        fill(r, g, b, spectrum[i])
        rect(0, y, width, weightSlider.value() )
        rect(0, y2, width, weightSlider.value() )
        rect(x, 0, weightSlider.value(), height )
        rect(x2, 0, weightSlider.value(), height )
        rotate(angle/speedSlider.value());
    }
    pop();
    endShape();
}
  
