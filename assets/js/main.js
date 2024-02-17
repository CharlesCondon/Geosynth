let mic;
let micToggle = false;
let song,song2,song3;
let angle = 0;
let test = 0;
let userColor = false;
let colorCheck;
let r,g,b;
let speedSlider,weightSlider,volSlider,redSlider,greenSlider,blueSlider,visSlider,bgSlider;
let outlineCheck,sunCheck,sun2Check,crossCheck,rectCheck,horizCheck,vertCheck,circleCheck,waveCheck,rotateCheck;

document.addEventListener("DOMContentLoaded", (event) => {
    let btns = document.getElementsByClassName("navToggle")
    let hideBtn = document.getElementById("hide");
    let showBtn = document.getElementById("show");
    let setBtn = document.getElementById("settings");
    let setCont = document.getElementById("settingsCont");
    let layerBtn = document.getElementById("layers");
    let layerCont = document.getElementById("layersCont");
    let songBtn = document.getElementById("music");
    let songCont = document.getElementById("songsCont");

    hideBtn.addEventListener("click", (e) => {
        btns.forEach( e => {
            e.classList.toggle('hidden');
            if (e.id !== "mic") {
                e.classList.remove("highlight");
            }
        })
        layerCont.classList.add("hidden");
        setCont.classList.add("hidden");
        songCont.classList.add("hidden");
    })
    showBtn.addEventListener("click", (e) => {
        btns.forEach( e => {
            e.classList.toggle('hidden')
        })
    })
    setBtn.addEventListener("click", (e) => {
        setBtn.classList.toggle("highlight");
        setCont.classList.toggle("hidden");
    })
    layerBtn.addEventListener("click", (e) => {
        layerBtn.classList.toggle("highlight");
        layerCont.classList.toggle("hidden");
    })
    songBtn.addEventListener("click", (e) => {
        setBtn.classList.remove("highlight");
        setCont.classList.add("hidden");
        layerBtn.classList.remove("highlight");
        layerCont.classList.add("hidden");
        songCont.classList.toggle("hidden");
        songBtn.classList.toggle("highlight");
    })

    
});

function preload() {
    song = loadSound("./assets/music/mitski.mp3");
    // song2 = loadSound("./assets/music/getGot.mp3");
    // song3 = loadSound("./assets/music/daftPunk.mp3");
}

function togglePlay() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.loop();
    }
}

function changeSong() {
    if (song.isPlaying()) {
        song.pause();
        //document.getElementById("playImg").src = "assets/images/playBtn.png";
    }
    //console.log(this.id)
    song = loadSound(`./assets/music/${this.id}.mp3`);
}

function setup(){
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.mousePressed(togglePlay);
    pixelDensity(1)
    mic = new p5.AudioIn();
    fft = new p5.FFT(.8, 1024);
    fft.setInput();

    // BROKEN MIC BUTTON
    // let micBtn = document.getElementById("mic");
    // micBtn.addEventListener("click", (e) => {
    //     micToggle = !micToggle;
    //     micBtn.classList.toggle('highlight')
    //     if (micToggle) {
    //         song.pause();
    //         mic.start();
    //         fft.setInput(mic);
    //     } else {
    //         mic.stop();
    //         song.play();
    //         fft.setInput(song);
    //     }
        
    // })

    let songs = document.getElementsByClassName("songSelect");
    songs.forEach((e) => {
        e.addEventListener('click', changeSong);
    })

    // let daft = document.getElementById("daftPunk");
    // let death = document.getElementById("getGot");
    // let mitski = document.getElementById("mitski");
    // daft.addEventListener('click', changeSong);
    // death.addEventListener('click', changeSong);
    // mitski.addEventListener('click', changeSong);
    
    bgSlider = createSlider(1, 255, 1, 1);
    bgSlider.parent("bgCont");
    volSlider = createSlider(0, 1, .5, .01);
    volSlider.parent("volCont");
    speedSlider = createSlider(50, 700, 200, 50);
    speedSlider.parent("speedCont");
    weightSlider = createSlider(1, 10, 2, 1);
    weightSlider.parent("weightCont");

    colorCheck = createCheckbox(" Auto-Color", true);
    colorCheck.parent("colorCont");
    redSlider = createSlider(0, 255, 100, .1);
    redSlider.parent("redCont");
    greenSlider = createSlider(0, 255, 100, 1);
    greenSlider.parent("greenCont");
    blueSlider = createSlider(0, 255, 100, 1);
    blueSlider.parent("blueCont");

    visSlider = createSlider(.1, 1, 1, .1);
    visSlider.parent("visCont");
    circleCheck = createCheckbox(" Spiral",true);
    circleCheck.parent("layersCont");
    sunCheck = createCheckbox(" Sun");
    sunCheck.parent("layersCont");
    sun2Check = createCheckbox(" Sun 2");
    sun2Check.parent("layersCont");
    outlineCheck = createCheckbox(" Outline");
    outlineCheck.parent("layersCont");
    crossCheck = createCheckbox(" Crosshash");
    crossCheck.parent("layersCont");
    rectCheck = createCheckbox(" Rectangle");
    rectCheck.parent("layersCont");
    // rotateCheck = createCheckbox(" Spin Rectangles");
    // rotateCheck.parent("layersCont");
    horizCheck = createCheckbox(" Horizontal");
    horizCheck.parent("layersCont");
    vertCheck = createCheckbox(" Vertical");
    vertCheck.parent("layersCont");
    waveCheck = createCheckbox(" Wavelength");
    waveCheck.parent("layersCont");
}

function draw(){
    background(0, 0, 0, -(bgSlider.value()-254));
    song.setVolume(volSlider.value());
    //text('tap to start', width/2, 20);

    let spectrum = fft.analyze();
    let waveform = fft.waveform();

    if (colorCheck.checked()) {
        b = Math.floor(fft.getEnergy("lowMid"));
        g = Math.floor(fft.getEnergy("mid"));
        r = Math.floor(fft.getEnergy("highMid"));
    } else {
        r = redSlider.value();
        g = greenSlider.value();
        b = blueSlider.value();
    }

    // RECTANGLE OUTLINE
    if (outlineCheck.checked()) {
        noStroke();
        beginShape();
        push();
        //translate(width / 2, height / 2);
        // if (rotateCheck.checked()) {
        //     angle += radians(.25);
        //     rotate(angle);
        // }
        for (let i = 0; i< spectrum.length-350; i++){
            let y = map(i, 0, spectrum.length-350, 0, height/2);
            let y2 = map(i, spectrum.length-350, 0, height/2, height);
            let x = map(i, 0, spectrum.length-350, 0, width/2);
            let x2 = map(i, spectrum.length-350, 0, width/2, width);
    
            fill(r, g, b, (spectrum[i]*visSlider.value()))
            rect(0, y, width*2, weightSlider.value() )
            rect(0, y2, width*2, weightSlider.value() )
            rect(x, 0, weightSlider.value(), height*4 )
            rect(x2, 0, weightSlider.value(), height*4 )
        }
        pop();
        endShape();
    }


    // CROSSHASH
    if (crossCheck.checked()) {
        noStroke();
        beginShape();
        push();
        //translate(width / 2, height / 2);
        // if (rotateCheck.checked()) {
        //     angle += radians(.25);
        //     rotate(angle);
        // }
        for (let i = 0; i< spectrum.length-350; i++){
            let y = map(i, 0, spectrum.length-350, height/2, 0);
            let y2 = map(i, spectrum.length-350, 0, height, height/2);
            let x = map(i, 0, spectrum.length-350, width/2, 0);
            let x2 = map(i, spectrum.length-350, 0, width, width/2);
    
            fill(r, g, b, (spectrum[i]*visSlider.value()))
            rect(0, y, width*2, weightSlider.value() )
            rect(0, y2, width*2, weightSlider.value() )
            rect(x, 0, weightSlider.value(), height*4 )
            rect(x2, 0, weightSlider.value(), height*4 )
        }
        pop();
        endShape();
    }


    // RECTANGLE OPPOSITE DIRECTION
    if (rectCheck.checked()) {
        noStroke();
        beginShape();
        push();
        translate(width / 2, height / 2);
        // if (rotateCheck.checked()) {
        //     angle += radians(.25);
        //     rotate(-angle);
        // }
        for (let i = 0; i< spectrum.length-350; i++){
            let y = map(i, 0, spectrum.length-350, 0, -height*1.5);
            let y2 = map(i, spectrum.length-350, 0, height*1.5, 0);
            let x = map(i, 0, spectrum.length-350, 0, -width*1.5);
            let x2 = map(i, spectrum.length-350, 0, width*1.5, 0);
    
            fill(r, g, b, (spectrum[i]*visSlider.value()))
            rect(-width, y, width*2, weightSlider.value() )
            rect(-width, y2, width*2, weightSlider.value() )
            rect(x, -height*1.5, weightSlider.value(), height*4 )
            rect(x2, -height*1.5, weightSlider.value(), height*4 )
        }
        pop();
        endShape();
    }


    // VERTICAL FREQUENCY BARS
    if (vertCheck.checked()) {
        beginShape();
        noStroke();
        push();
        translate(width / 2, height / 2);
        // angle += radians(.25);
        // rotate(angle);
        for (let i = 0; i< spectrum.length-350; i++){
            let x = map(i, 0, spectrum.length-350, 0, -width*1.5);
            let x2 = map(i, spectrum.length-350, 0, width*1.5, 0);
    
            let h = -height + map(spectrum[i], 0, 255, height, 0);
    
            fill(r, g, b, (spectrum[i]*visSlider.value()))
            rect(x, -height*1.5, weightSlider.value(), height*4 )
            rect(x2, -height*1.5, weightSlider.value(), height*4 )
            
        }
        endShape();
        pop();
    }


    // HORIZONTAL FREQUENCY LINES
    if (horizCheck.checked()) {
        noStroke();
        push();
        translate(width / 2, height / 2);
        // angle += radians(1);
        // rotate(-angle);
        for (let i = 0; i< spectrum.length-350; i++){
            let y = map(i, 0, spectrum.length-350, 0, -height*1.5);
            let y2 = map(i, spectrum.length-350, 0, height*1.5, 0);
    
            fill(r, g, b, (spectrum[i]*visSlider.value()))
            rect(-width, y, width*2, weightSlider.value() )
            rect(-width, y2, width*2, weightSlider.value() )
        }
        pop();
    }


    // SUN VISUAL
    if (sunCheck.checked()) {
        noFill();
        push();
        translate(width / 2, height / 2);
        angle += radians(1);
        strokeWeight(weightSlider.value())
        for (let i = 0; i< spectrum.length/2-350; i++){
            let y = map(i, 0, spectrum.length-350, 0, -height*1.5);
            let y2 = map(i, spectrum.length-350, 0, height*1.5, 0);
    
            stroke(r, g, b, (spectrum[i]*visSlider.value()))
            triangle(-width, 0, 0, y*2, width, 0)
            triangle(-width, 0, 0, y2*2, width, 0)
            rotate(-angle/(speedSlider.value()-750));
        }
        pop();
    }

    // SUN 2 VISUAL (previously corner triangles)
    if (sun2Check.checked()) {
        noFill();
        push();
        translate(width / 2, height / 2);
        angle += radians(1);
        
        strokeWeight(weightSlider.value())
        for (let i = 0; i< spectrum.length-350; i++){
            let y = map(i, 0, spectrum.length-350, 0, -height*1.5);
            let y2 = map(i, spectrum.length-350, 0, height*1.5, 0);
    
            stroke(r, g, b, (spectrum[i]*(visSlider.value()*2)))
            triangle(0, -y, -width/2, -height/2, -y, 0)
            triangle(0, y, width/2, height/2, y, 0)
            triangle(0, -y, width/2, -height/2, y, 0)
            triangle(0, y, -width/2, height/2, -y, 0)
            rotate(angle/(speedSlider.value()-750));
        }
        pop();
    }

    // SPIRAL HORIZONTAL TRIANGLE FREQUENCY LINES
    // if (horizCheck.checked()) {
    //     let fps = frameRate();
    //     // fill(255);
    //     // stroke(0);
    //     // text("FPS: " + fps.toFixed(2), 10, height - 10);
    //     noFill();
    //     push();
    //     translate(width / 2, height / 2);
    //     angle += radians(1);
    //     strokeWeight(weightSlider.value())
    //     for (let i = 0; i< spectrum.length/2-450; i++){
    //         let y = map(i, 0, spectrum.length-450, 0, -height*1.5);
    //         let y2 = map(i, spectrum.length-450, 0, height*1.5, 0);
    
    //         stroke(r, g, b, (spectrum[i]*visSlider.value()))
    //         triangle(-width/2, -width, -width, y*2, width/2, 0)
    //         triangle(-width/2, -width, width, y2*2, width/2, 0)
    //         //rotate(-angle/(speedSlider.value()-750));
    //     }
    //     pop();
    // }


    // BLACK HOLE VISUAL
    if (circleCheck.checked()) {
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
    
            fill(r, g, b, (spectrum[i]*visSlider.value()))
            rect(0, y, width, weightSlider.value() )
            rect(0, y2, width, weightSlider.value() )
            rect(x, 0, weightSlider.value(), height )
            rect(x2, 0, weightSlider.value(), height )
            rotate(angle/-(speedSlider.value()-750));
        }
        pop();
        endShape();
    }


    // WAVEFORM
    if (waveCheck.checked()) {
        beginShape();
        noFill()
        stroke(255, 255, 255);
        strokeWeight(5);
        
        for (let i = 0; i < waveform.length; i++){
            let x = map(i, 0, waveform.length/2, 0, width/2);
            let y = map( waveform[i], -1, 1, 0, height);
            vertex(x,y);
        }
        endShape();
    }
}
  
