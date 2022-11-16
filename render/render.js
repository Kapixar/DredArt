if(navigator.maxTouchPoints > 1) document.body.textContent = "Your device is not supported as tool is designed only for PC. If you think this is an error contact developer."

const container = document.querySelector("#content");
const upload = document.querySelector("#upload");
const setup = document.querySelector("#setup");
const download = document.querySelector("#download");
const drop = document.querySelector("#drop-zone");
const error = document.querySelector(".error");
const urlInp = document.querySelector("#url");
const help = document.querySelector("#help");
const version = '1.01 version';
document.getElementById("version").textContent = version;


document.querySelector("#show-help").onclick = () => {
    document.body.classList.toggle("show-help");
}

document.onpaste = function(e) {							                     //paste handler
    if(!upload.classList.contains("active")) return;
    e.preventDefault();
    const items = e.clipboardData.items;
    for (var i = 0; i < items.length; i++) {
        if (items[i].type.includes("image")) {
            var blob = items[i].getAsFile();
        }
    }
    if(blob==undefined)
        return error.textContent = `Error. Pasted data is not an image.`;
    var reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        error.textContent = 'Loading image...';
        img.onload = function () {render(img)}
        img.src = e.target.result.toString();
    };
    reader.readAsDataURL(blob); 
}

document.querySelector("#pngInp").onchange = function(){	                    //file input handler
    if(this.files[0] == null)
        return error.textContent = 'Error. Chose file again.';

    if(this.files.length > 1)
        return error.textContent = 'Error. You can select only one file.';

    const file = this.files[0];
    this.value = null;

    if(file.length === null)
        return error.textContent = 'Error. Propably file is empty';

    const img = new Image();
    img.onload = function() {render(img)}
    img.onerror = function(){
        error.textContent = 'Error. Only image files are allowed.';
    }
    img.src = URL.createObjectURL(file);
}

drop.ondrop = function(ev) {									                //drop handlers
    ev.preventDefault();
    drop.classList.remove("highlight");
    
    if(ev.dataTransfer.files) {
        if(ev.dataTransfer.files.length==0 || !ev.dataTransfer.files[0].type.includes('image'))
            return error.textContent = `You can drop only images.`;
        if(ev.dataTransfer.files.length!=1)
            return error.textContent = `You can drop only one image.`;
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onerror = function() {
                error.textContent = `An error occured during loading image. Try again.`;
            }
            img.onload = function () {render(img)}
            img.src = event.target.result;
        }
        reader.readAsDataURL(ev.dataTransfer.files[0]);
    }
}	   
drop.ondragleave = function(e) {
    e.preventDefault();
    drop.classList.remove("highlight");
}
drop.ondragover = function(e) {
    e.preventDefault();
    drop.classList.add("highlight");
}

const rgb=[[222,165,164],[214,145,136],[173,111,105],[128,64,64],[77,0,0],[77,25,0],[128,0,0],[144,30,30],[186,1,1],[179,54,54],[179,95,54],[255,0,0],[216,124,99],[255,64,64],[255,128,128],[255,195,192],[195,153,83],[128,85,64],[128,106,64],[77,51,38],[77,51,0],[128,42,0],[155,71,3],[153,101,21],[213,70,0],[218,99,4],[255,85,0],[237,145,33],[255,179,31],[255,128,64],[255,170,128],[255,212,128],[181,179,92],[77,64,38],[77,77,0],[128,85,0],[179,128,7],[183,162,20],[179,137,54],[238,230,0],[255,170,0],[255,204,0],[255,255,0],[255,191,64],[255,255,64],[223,190,111],[255,255,128],[234,218,184],[199,205,144],[128,128,64],[77,77,38],[64,77,38],[128,128,0],[101,114,32],[141,182,0],[165,203,12],[179,179,54],[191,201,33],[206,255,0],[170,255,0],[191,255,64],[213,255,128],[248,249,156],[253,254,184],[135,169,107],[106,128,64],[85,128,64],[51,77,38],[51,77,0],[67,106,13],[85,128,0],[42,128,0],[103,167,18],[132,222,2],[137,179,54],[95,179,54],[85,255,0],[128,255,64],[170,255,128],[210,248,176],[143,188,143],[103,146,103],[64,128,64],[38,77,38],[25,77,0],[0,77,0],[0,128,0],[34,139,34],[3,192,60],[70,203,24],[54,179,54],[54,179,95],[0,255,0],[64,255,64],[119,221,119],[128,255,128],[64,128,85],[64,128,106],[38,77,51],[0,77,26],[0,77,51],[0,128,43],[23,114,69],[0,171,102],[28,172,120],[11,218,81],[0,255,85],[80,200,120],[64,255,128],[128,255,170],[128,255,212],[168,227,189],[110,174,161],[64,128,128],[38,77,64],[38,77,77],[0,77,77],[0,128,85],[0,166,147],[0,204,153],[0,204,204],[54,179,137],[54,179,179],[0,255,170],[0,255,255],[64,255,191],[64,255,255],[128,255,255],[133,196,204],[93,138,168],[64,106,128],[38,64,77],[0,51,77],[0,128,128],[0,85,128],[0,114,187],[8,146,208],[54,137,179],[33,171,205],[0,170,255],[100,204,219],[64,191,255],[128,212,255],[175,238,238],[64,85,128],[38,51,77],[0,26,77],[0,43,128],[0,47,167],[54,95,179],[40,106,205],[0,127,255],[0,85,255],[49,140,231],[73,151,208],[64,128,255],[113,166,210],[100,149,237],[128,170,255],[182,209,234],[146,161,207],[64,64,128],[38,38,77],[0,0,77],[25,0,77],[0,0,128],[42,0,128],[0,0,205],[54,54,179],[95,54,179],[0,0,255],[28,28,240],[106,90,205],[64,64,255],[133,129,217],[128,128,255],[177,156,217],[150,123,182],[120,81,169],[85,64,128],[106,64,128],[51,38,77],[51,0,77],[85,0,128],[137,54,179],[85,0,255],[138,43,226],[167,107,207],[127,64,255],[191,64,255],[148,87,235],[170,128,255],[153,85,187],[140,100,149],[128,64,128],[64,38,77],[77,38,77],[77,0,77],[128,0,128],[159,0,197],[179,54,179],[184,12,227],[170,0,255],[255,0,255],[255,64,255],[213,128,255],[255,128,255],[241,167,254],[128,64,106],[105,45,84],[77,38,64],[77,0,51],[128,0,85],[162,0,109],[179,54,137],[202,31,123],[255,0,170],[255,29,206],[233,54,167],[207,107,169],[255,64,191],[218,112,214],[255,128,213],[230,168,215],[145,95,109],[128,64,85],[77,38,51],[77,0,25],[128,0,42],[215,0,64],[179,54,95],[255,0,127],[255,0,85],[255,0,40],[222,49,99],[208,65,126],[215,59,62],[255,64,127],[249,90,97],[255,128,170],[17,17,17],[34,34,34],[51,51,51],[68,68,68],[85,85,85],[102,102,102],[119,119,119],[136,136,136],[153,153,153],[170,170,170],[187,187,187],[204,204,204],[221,221,221],[238,238,238],[255,255,255]];
const lab= [[72.973,20.879,8.771],[66.769,24.986,15.414],[53.249,23.862,13.577],[35.257,27.519,12.689],[13.098,33.658,20.53],[16.862,23.24,25.362],[25.536,48.045,38.057],[31.701,46.623,30.116],[38.667,63.087,52.626],[41.987,50.289,29.243],[49.541,30.648,38.005],[53.241,80.092,67.203],[61.584,33.22,29.142],[57.37,70.55,44.821],[68.214,48.189,22.696],[84.017,21.005,9.826],[65.757,7.543,42.297],[40.34,15.274,19.489],[45.999,2.855,26.747],[23.953,9.928,12.964],[23.491,7.173,32.806],[30.026,35.52,41.853],[40.383,31.826,49.576],[47.152,14.539,49.295],[50.134,53.984,61.11],[55.93,42.797,63.893],[59.675,62.047,69.959],[68.292,27.316,67.337],[78.23,16.985,76.627],[67.333,44.136,55.352],[77.025,26.789,34.369],[86.952,4.923,46.938],[71.445,-11.476,44.275],[27.804,1.536,17.957],[31.545,-9.058,39.703],[39.727,11.681,48.136],[57.114,10.878,61.593],[66.489,-5.645,66.598],[59.656,7.393,48.975],[89.287,-16.584,88.142],[76.078,21.325,79.7],[84.2,3.68,85.217],[97.139,-21.554,94.478],[81.235,11.702,69.125],[97.289,-20.342,84.107],[78.266,1.874,43.989],[97.769,-16.538,59.982],[87.532,0.174,18.744],[80.638,-11.793,29.765],[52.284,-9.626,34.448],[31.865,-6.519,23.005],[30.73,-12.613,21.357],[51.869,-12.929,56.675],[45.505,-16.772,41.674],[68.837,-34.125,69.782],[76.52,-33.907,75.075],[70.934,-15.048,60.408],[77.852,-21.745,73.375],[93.728,-41.174,90.421],[91.714,-54.462,88.004],[92.999,-45.309,78.575],[94.833,-32.527,55.78],[96.042,-13.648,44.534],[98.125,-10.948,33.473],[65.427,-22.972,28.297],[50.538,-19.094,31.929],[49.178,-27.416,29.955],[29.791,-18.268,19.984],[29.441,-21.673,37.193],[40.459,-28.507,42.797],[48.722,-31.922,52.921],[46.882,-45.936,50.695],[62.138,-41.797,61.045],[80.264,-54.353,78.178],[67.891,-32.5,56.365],[65.7,-47.484,53.42],[88.661,-77.982,84.308],[90.08,-65.859,74.763],[92.408,-47.53,52.283],[93.438,-24.564,30.677],[72.087,-23.82,18.038],[56.506,-23.702,18.215],[48.131,-34.561,28.426],[29.055,-23.191,18.903],[28.152,-31.342,35.617],[27.593,-36.217,34.922],[46.227,-51.698,49.897],[50.593,-49.585,45.016],[68.052,-66.385,52.974],[72.28,-64.289,68.077],[64.394,-57.776,51.651],[64.842,-52.53,33.146],[87.735,-86.183,83.179],[88.436,-79.255,72.6],[80.159,-50.083,40.913],[90.626,-59.893,49.7],[48.49,-30.873,17.19],[48.968,-26.213,5.669],[29.308,-20.645,11.256],[27.796,-33.622,23.945],[28.238,-28.375,9.617],[46.461,-48.703,36.704],[42.224,-37.042,17.76],[61.726,-53.536,25.31],[62.597,-48.39,16.767],[76.56,-71.536,53.648],[88.051,-82.112,64.672],[72.473,-51.25,30.255],[89,-72.452,47.33],[91.238,-53.517,30.042],[92.068,-45.301,9.772],[85.471,-26.35,12.571],[66.641,-23.529,0.187],[49.6,-20.419,-6.327],[29.638,-17.478,3.458],[30.048,-13.765,-4.286],[29.013,-20.208,-5.938],[47.096,-41.089,15.062],[61.112,-40.542,-0.395],[73.208,-54.463,13.655],[74.534,-40.645,-11.944],[65.615,-44.076,11.715],[66.73,-32.963,-9.875],[89.119,-69.23,26.817],[91.113,-48.088,-14.131],[90.029,-60.87,17.459],[91.605,-44.86,-13.344],[93.156,-35.231,-10.868],[75.341,-18.059,-10.41],[55.411,-7.133,-20.656],[42.696,-8.14,-16.743],[25.607,-5.831,-10.975],[19.652,-4.522,-20.323],[48.254,-28.846,-8.477],[34.096,-4.929,-30.264],[46.473,0.824,-45.792],[57.231,-9.78,-40.723],[53.951,-11.222,-29.348],[64.846,-23.05,-27.178],[66.493,-6.232,-52.061],[76.683,-25.96,-16.644],[73.264,-13.886,-41.367],[81.232,-14.166,-28.877],[90.06,-19.638,-6.4],[36.262,4.786,-26.708],[21.265,2.857,-17.678],[11.095,14.187,-34.069],[21.153,24.141,-51.13],[26.221,37.034,-66.847],[41.567,14.328,-48.916],[45.859,15.324,-57.109],[54.444,19.402,-71.357],[43.82,45.821,-88.716],[57.246,4.912,-53.523],[59.98,-6.31,-36.323],[55.832,22.585,-69.058],[66.085,-5.708,-27.829],[61.926,9.333,-49.298],[69.864,8.672,-46.52],[82.639,-3.67,-15.303],[66.6,5.255,-25.207],[30.193,18.569,-36.318],[17.151,12.111,-24.171],[4.838,30.941,-44.392],[6.706,33.908,-41.243],[12.972,47.502,-64.702],[15.749,48.602,-59.997],[24.971,67.177,-91.5],[31.058,40.636,-65.996],[34.652,46.815,-59.97],[32.297,79.188,-107.86],[32.627,69.981,-98.835],[45.336,36.039,-57.772],[41.175,60.511,-93.028],[57.747,22.723,-44.645],[59.201,33.096,-63.458],[68.119,19.886,-28.197],[56.115,22.256,-27.246],[42.373,34.715,-41.451],[32.161,24.249,-33.066],[34.579,30.519,-29.083],[18.478,16.094,-21.98],[10.847,36.927,-34.275],[21.908,52.405,-49.622],[39.935,55.156,-51.156],[36.27,80.714,-101.127],[42.188,69.845,-74.763],[55.315,42.082,-42.63],[46.174,67.18,-84.617],[53.989,77.235,-71.539],[50.816,54.735,-65.764],[62.679,42.735,-57.697],[48.08,45.654,-42.7],[48.083,25.07,-20.496],[37.509,37.329,-24.282],[20.092,20.449,-19.326],[21.945,24.949,-16.296],[16.074,41.282,-25.561],[29.785,58.928,-36.487],[40.252,75.202,-61.06],[46.283,64.413,-40.646],[46.976,82.658,-67.237],[46.667,86.978,-83.605],[60.324,98.234,-60.825],[63.468,89.043,-55.808],[67.131,53.754,-50.355],[72.176,64.936,-42.077],[78.167,41.259,-32.367],[36.551,33.311,-12.053],[28.17,32.014,-11.001],[21.337,22.317,-8.405],[14.497,37.363,-9.708],[27.426,53.056,-12.411],[35.572,63.027,-14.904],[44.277,58.073,-18.679],[45.594,68.875,-7.735],[56.256,88.098,-18.819],[58.603,89.518,-36.008],[54.821,75.275,-19.612],[58.647,47.077,-15.324],[60.511,80.405,-24.471],[62.803,55.282,-34.404],[70.53,58.245,-21.545],[75.907,30.13,-14.787],[46.055,22.444,0.484],[35.816,30.078,0.134],[20.841,20.072,-0.197],[13.522,34.809,8.098],[26.034,49.396,14.749],[45.39,71.816,28.958],[42.84,53.266,5.066],[54.865,84.463,4.641],[53.945,82.006,28.688],[53.407,80.545,53.46],[50.254,67.533,14.169],[50.335,60.711,-2.41],[49.408,60.237,34.958],[58.476,74.112,9.794],[60.178,61.013,29.42],[69.188,52.519,0.476],[5.063,0,0],[13.228,0,0],[21.247,0,0],[28.852,0,0],[36.146,0,0],[43.192,0,0],[50.034,0,0],[56.703,0,0],[63.223,0,0],[69.61,0,0],[75.881,0,0],[82.046,0,0],[88.115,0,0],[94.098,0,0],[100,0,0]];

function render(OGimg) { 
    const img = new Image();
    img.src = OGimg.src;

    if(this.width<5 || this.height<5){
        error.textContent = "Sorry, minimum picture size is 5x5 pixels";
        return settContent.appendChild(error);
    }
    const   canResult= document.querySelector('#shipShape canvas'),
            ctxResult=canResult.getContext('2d', {willReadFrequently: true});
            ctxResult.imageSmoothingEnabled = false;
    const   canTemp=document.createElement("canvas"),
            ctxTemp=canTemp.getContext('2d', {willReadFrequently: true});
    const   canSave=document.createElement("canvas"),
            ctxSave=canSave.getContext('2d');
            canSave.width=78;
            canSave.height=78;
    
    var transparency = false;
    img.onload = function(){
        getColors();
        renderScale();
    }

    function getColors() {
        canResult.width = img.width;
        canResult.height = img.height;
        ctxResult.drawImage(img, 0, 0);
        const sD = ctxResult.getImageData(0,0,img.width,img.height).data;
        var avg = {r:0,g:0,b:0}, amount=0;
        for(let i = 0; i < sD.length; i += 4) {
            if(sD[i+3]!=255){
                transparency=true;
            }
            if(i%20 == 0 && sD[i+3] == 255){
                amount++;
                avg.r += sD[i];
                avg.g += sD[i+1];
                avg.b += sD[i+2];
            }
        }
        avg.r = Math.floor(avg.r/amount);
        avg.g = Math.floor(avg.g/amount);
        avg.b = Math.floor(avg.b/amount);

        document.body.style.setProperty('--accent', `rgb(${avg.r},${avg.g},${avg.b})`);
        let perceivedLightness = (avg.r*0.2126 + avg.g*0.7152 + avg.b*0.0722) / 255;
        document.body.style.setProperty('--bg-accent', perceivedLightness < 0.5 ? `rgb(255,255,255)` : `rgb(17,22,28)`);
    }

    function renderScale() {
        var scale = 1;
        error.textContent='';
        for(let item of container.children)
            item.classList.remove('active')
        setup.classList.add('active');
        
        canResult.width = Math.min(img.width, 78);
        canResult.height = Math.min(img.height, 78);

        const canvasBox = document.querySelector('#canvasBox')                   // left panel of settings
        const shipShape = document.querySelector("#shipShape");

        const shipBg = document.querySelector("#shipbg");
        const ctxShip = shipBg.getContext("2d");

        const bgPng = new Image();
        bgPng.src = "img/bg_ship.png";

        const canMain = document.querySelector("#canMain");
        const ctxMain = canMain.getContext("2d");
        ctxMain.imageSmoothingEnabled = false;

        const cropBox = document.querySelector("#cropBox");
        const canCrop = document.querySelector("#canCrop");
        const ctxCrop = canCrop.getContext("2d");

        const scaleRange = document.querySelector("#scalerange");                   // zoom range
        scaleRange.value='0';

        let minzoom, maxzoom;
        let maxWidth=canResult.width, maxHeight=canResult.height, defaultWidth, defaultHeight;
        if(img.width>img.height){
            defaultWidth=maxWidth;
            defaultHeight=Math.round(img.height*maxWidth/img.width);
        } else {
            defaultHeight=maxHeight;
            defaultWidth=Math.round(img.width*maxHeight/img.height);
        }

        // right panel of settings

        
        const sizeWidth = document.querySelector("#sizeBox input:first-of-type");        //size inputs
        sizeWidth.setAttribute("placeholder",defaultWidth.toString());
        const sizeHeight = document.querySelector("#sizeBox input:nth-of-type(2)");
        sizeHeight.setAttribute("placeholder",defaultHeight.toString());


        const ratioCheck = document.querySelector("#sizeBox label input");
        ratioCheck.onchange = function() {
            if(this.checked){
                sizeWidth.value='';
                sizeHeight.value='';
                sizeWidth.setAttribute("placeholder",defaultWidth);
                sizeHeight.setAttribute("placeholder",defaultHeight);
            } else {
                sizeWidth.setAttribute("placeholder",maxWidth.toString());
                sizeHeight.setAttribute("placeholder",maxHeight.toString());
            }
        }


        sizeWidth.oldValue='';
        sizeHeight.oldValue='';
        new Array(sizeWidth,sizeHeight).forEach(function(tbox) {                       //input handler
            tbox.addEventListener("input", function() {
                if(/^(?!0)\d{0,2}$/.test(this.value) && !(ratioCheck.checked && !((this==sizeWidth&&this.value<=defaultWidth)||(this==sizeHeight&&this.value<=defaultHeight))) && ((this==sizeWidth&&this.value<=maxWidth)||(this==sizeHeight&&this.value<=maxHeight))) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                    if(ratioCheck.checked) {
                        if(this.value!=''){                                  //aspect ratio
                            if(this==sizeWidth) {
                                let h=img.height*this.value/img.width;
                                sizeHeight.value = h<maxHeight? Math.round(h) : '';
                                sizeHeight.oldValue = sizeHeight.value;
                                sizeHeight.classList.add('flash');
                                setTimeout(()=>sizeHeight.classList.remove('flash'), 500);
                            }else{
                                let w=img.width*this.value/img.height;
                                sizeWidth.value = w<maxWidth? Math.round(w) : '';
                                sizeWidth.oldValue = sizeWidth.value;
                                sizeWidth.classList.add('flash');
                                setTimeout(()=>sizeWidth.classList.remove('flash'), 500);
                            }
                        }else{
                            if(this==sizeWidth) sizeHeight.value = '';
                            else sizeWidth.value = ''; 
                        }
                    }
                    if(this.value.length>=2 && this==sizeWidth) sizeHeight.focus();
                    else if(this.value.length==0 && this==sizeHeight) sizeWidth.focus();
                } else {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                }
            });
        });

        const sizeButton = document.querySelector("#sizeBox button");
        sizeButton.onclick = function() {
            sizeApply();
        }

        const hideCheck = document.querySelector("#settings > label:nth-of-type(2) input")         //hide canvas
        hideCheck.onchange = function() {
            if(!this.checked) scaleAndDither()
            else {
                shipShape.classList.add("hidden")
                goDither.classList.add("disabled");
            }
        }

        const shipBgCheck = document.querySelector("#settings > label:nth-of-type(3) input")     //ship background tiles
        shipBg.classList.add("hidden");
        shipBgCheck.onchange = function() {
            if(this.checked) shipBg.classList.remove("hidden");
            else shipBg.classList.add("hidden");
        }

        const ditherCheck = document.querySelector("#settings > label:nth-of-type(4) input")    //dither switch
        ditherCheck.onchange = function() {dither();}


        const alghCheck = document.querySelector("#settings > label:nth-of-type(5) input")      //cie76 or cie94 switch
        alghCheck.onchange = function() {dither();}
        
    


        const hueValue = document.querySelector("#settings > label:nth-of-type(6) :last-child")        //hue rotate
        const hueRange = document.querySelector("#settings > label:nth-of-type(6) input")
        hueRange.oninput = function() {
            hueValue.textContent = `${this.value} degrees`;
            filterImg();
        } 
        hueRange.value="0";



        const saturationValue = document.querySelector("#settings > label:nth-of-type(7) :last-child") //saturation
        const saturationRange = document.querySelector("#settings > label:nth-of-type(7) input")
        saturationRange.oninput = function() {
            saturationValue.textContent = `${this.value}%`;
            filterImg();
        } 
        saturationRange.value="100";


        const brightnessValue = document.querySelector("#settings > label:nth-of-type(8) :last-child") //brightness
        const brightnessRange = document.querySelector("#settings > label:nth-of-type(8) input") 
        brightnessRange.oninput = function() {
            brightnessValue.textContent = `${this.value}%`;
            filterImg();
        } 
        brightnessRange.value="100";


        const contrastValue = document.querySelector("#settings > label:nth-of-type(9) :last-child") //contrast
        const contrastRange = document.querySelector("#settings > label:nth-of-type(9) input")
        contrastRange.oninput = function() {
            contrastValue.textContent = `${this.value}%`;
            filterImg();
        } 
        contrastRange.value="100";

        const buttonBox = document.querySelector("#settings > :last-child")

        if(transparency){                                           //background color
            const bgLabel = document.createElement('label');
            bgLabel.textContent = `Found transparency. Choose backgound color:`;
            bgLabel.setAttribute('data-help', 'Set bg color. Independent of the above color modifications.')
            bgLabel.setAttribute("for", 'bgList');

            const bgSelect = document.createElement('select');
            bgSelect.id='bgList'
            bgSelect.style['background']='rgb(187,187,187)';
            for(let i=0; i<255; i++){
                const o = document.createElement('option');
                o.textContent = i.toString(16).toUpperCase();
                let c = rgb[i];
                o.style['background'] = `rgb(${c[0]},${c[1]},${c[2]})`;
                bgSelect.appendChild(o);
            }
            bgSelect.onchange = function() {
                this.style['background'] = this.options[this.selectedIndex].style['background'];
                let c=rgb[bgSelect.selectedIndex];
                c = `rgb(${c[0]},${c[1]},${c[2]})`;
                ctxTemp.fillStyle = c;
                canvasBox.style['backgroundColor'] = c;
                redraw();
                scaleAndDither();
            }
            bgLabel.appendChild(bgSelect);
            buttonBox.before(bgLabel)

            canvasBox.style['background'] = "#bbbbbb";
            bgSelect.selectedIndex=250;
        }

        const colorReset = document.querySelector("#settings > :last-child button")   //color reset button
        colorReset.onclick = function() {
            hueRange.value=0;
            saturationRange.value=100;
            brightnessRange.value=100;
            contrastRange.value=100;
            hueValue.textContent = '0 degrees';
            saturationValue.textContent = '100%';
            brightnessValue.textContent = '100%';
            contrastValue.textContent = '100%';
            filterImg();
        }

        const wholeReset = document.querySelector("#settings > :last-child button:nth-of-type(2)")  //reset everything button
        wholeReset.onclick = function() {
            sizeWidth.value='';
            sizeHeight.value='';
            ratioCheck.checked = true;
            ratioCheck.dispatchEvent(new Event("change"));
            sizeApply(true);
            hideCheck.checked = false;
            shipBgCheck.checked = false;
            shipBgCheck.dispatchEvent(new Event("change"));
            ditherCheck.checked = false;
            alghCheck.checked = false;
            hueRange.value = 0;
            saturationRange.value = 100;
            brightnessRange.value = 100;
            contrastRange.value = 100;
            hueValue.textContent = '0 degrees';
            saturationValue.textContent = '100%';
            brightnessValue.textContent = '100%';
            contrastValue.textContent = '100%';
            if(transparency) {
                document.querySelector("select").selectedIndex=250;
                document.querySelector("select").dispatchEvent(new Event("change"));
            }
            filterImg();
        }

        const goBack = document.querySelector("#settings > :last-child button:nth-of-type(3)")      //go back (refresh)
        goBack.onclick = function(){
            document.location.reload();
        }

        const goDither = document.querySelector("#settings > :last-child button:nth-of-type(4)")    //continue
        goDither.onclick = function(){
            if(goDither.classList.contains("disabled")) return;
            hideCheck.checked = false;
            scaleAndDither();
            renderDownload();
        }

        function sizeApply(qzoom=false) {
            if(sizeWidth.value!="")
                 canResult.width = parseInt(sizeWidth.value);
            else canResult.width=parseInt(sizeWidth.getAttribute("placeholder"));
            if(sizeHeight.value!="")
                 canResult.height = parseInt(sizeHeight.value);
            else canResult.height=parseInt(sizeHeight.getAttribute("placeholder"));

            if(canResult.height>=canResult.width){
                shipShape.height=400;
                shipShape.style.height="400px";
                shipShape.width=Math.round(canResult.width*400/canResult.height);
                shipShape.style.width=`${shipShape.width}px`;
            }else{
                shipShape.width=400;
                shipShape.style.width="400px";
                shipShape.height=Math.round(canResult.height*400/canResult.width);
                shipShape.style.height=`${shipShape.height}px`;
            }

            canTemp.width = shipShape.width;
            canTemp.height = shipShape.height;
            canSave.width = canResult.width;
            canSave.height = canResult.height;

            if(canResult.width/img.width>canResult.height/img.height) {
                minzoom = shipShape.width/img.width;
                maxzoom = shipShape.width/canResult.width;
            }
            else {
                minzoom = shipShape.height/img.height; 
                maxzoom = shipShape.width/canResult.width;
            }

            if(transparency){
                let c=rgb[document.querySelector("select").selectedIndex];
                ctxTemp.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
            }
            renderShipBg();
            if(!ratioCheck.checked || qzoom) zoomCanvas(minzoom);
            scaleAndDither();
        }

        //cropping Panel

        const cropButton = document.querySelector("#settings label");
        let dist;
        cropButton.onclick = function() {
            canCrop.width = OGimg.width;
            canCrop.height = OGimg.height;
            ctxCrop.drawImage(OGimg, 0, 0);
            cropBox.classList.add('cropping');

            const cropBox2 = document.querySelector("#cropBox div");
            const cropCont = document.querySelector("#cropBox div div");
            var ar = OGimg.width / OGimg.height;
            if(cropBox2.clientWidth/cropBox2.clientHeight > OGimg.width/OGimg.height){
                var h = cropBox2.clientHeight;
                var w = h*ar;
            } else {
                var w = cropBox2.clientWidth;
                var h = w/ar;
            }
            cropCont.style.width = w+'px';
            cropCont.style.height = h+'px';
            dist = canCrop.clientWidth * 5 / OGimg.width
        }

        const cropAccept = document.querySelector("#cropBox button");
        cropAccept.onclick = function() {

            const canCroped = document.createElement("canvas");
            const ctxCropped = canCroped.getContext("2d");

            const distorstion = OGimg.width / canCrop.clientWidth;
            canCroped.width = selector.clientWidth * distorstion;
            canCroped.height = selector.clientHeight * distorstion;

            ctxCropped.drawImage(canCrop, l*distorstion, t* distorstion, selector.clientWidth*distorstion, selector.clientHeight*distorstion, 0, 0, canCroped.width, canCroped.height);
            img.src = canCroped.toDataURL();
            img.onload = function() {
                canResult.width = Math.min(img.width, 78);
                canResult.height = Math.min(img.height, 78);

                
                maxHeight = canResult.height;
                maxWidth = canResult.width;
                if(img.width>img.height){
                    defaultWidth=maxWidth;
                    defaultHeight=Math.round(img.height*maxWidth/img.width);
                } else {
                    defaultHeight=maxHeight;
                    defaultWidth=Math.round(img.width*maxHeight/img.height);
                }
                sizeWidth.setAttribute("placeholder", defaultWidth.toString());
                sizeHeight.setAttribute("placeholder", defaultHeight.toString());
                sizeWidth.value = '';
                sizeHeight.value = '';
                getColors(); 
                sizeApply(true);
                checkBoundaries();
                redraw();
                scaleAndDither();
            }
            cropBox.classList.remove("cropping");
        }

        let t=0, r=0, b=0, l=0;                     //top right bottom left
        console.log(dist);

        const selector = document.querySelector("#cropBox div div div");
        const tEl = document.querySelector("#cropBox div div div div:nth-of-type(1)");
        const rEl = document.querySelector("#cropBox div div div div:nth-of-type(2)");
        const bEl = document.querySelector("#cropBox div div div div:nth-of-type(3)");
        const lEl = document.querySelector("#cropBox div div div div:nth-of-type(4)");

        var isDown = [false, false, false, false], offset=[0,0,0,0];
        tEl.addEventListener('mousedown', function(e) {
            isDown[0] = true;
            offset[0] = t - e.clientY;
        });
        rEl.addEventListener('mousedown', function(e) {
            isDown[1] = true;
            offset[1] = r + e.clientX;
        });
        bEl.addEventListener('mousedown', function(e) {
            isDown[2] = true;
            offset[2] = b + e.clientY;
        });
        lEl.addEventListener('mousedown', function(e) {
            isDown[3] = true;
            offset[3] = l - e.clientX;
        });

        cropBox.addEventListener('mousemove', function(e) {
            e.preventDefault();
            if(isDown[0]){
                if(canCrop.clientHeight - offset[0] - e.clientY - b <= dist) t = canCrop.clientHeight - dist - b;
                else if(e.clientY + offset[0] <= 0) t = 0;
                else t = e.clientY + offset[0];
                selector.style.top  = t + 'px';
            }
            if(isDown[1]){
                if(canCrop.clientWidth - offset[1] + e.clientX - l <= dist) r = canCrop.clientWidth - dist - l;
                else if(offset[1] - e.clientX <= 0) r = 0;
                else r = offset[1] - e.clientX;
                selector.style.right = r + 'px';
            }
            if(isDown[2]){
                if(canCrop.clientHeight - offset[2] + e.clientY - t <= dist) b = canCrop.clientHeight - dist - t;
                else if(offset[2] - e.clientY <= 0) b = 0;
                else b = offset[2] - e.clientY;
                selector.style.bottom  = b + 'px';
            }
            if(isDown[3]){
                if(canCrop.clientWidth - offset[3] - e.clientX - r <= dist) l = canCrop.clientWidth - dist - r;
                else if(e.clientX + offset[3] <=0 ) l = 0;
                else l = offset[3] + e.clientX;
                selector.style.left  = l + 'px';
            }
        });


        cropBox.addEventListener('mouseup', function() {isDown = isDown.fill(false);});
        cropBox.addEventListener('mouseleave', function() {isDown = isDown.fill(false);});
        


        //end of the settings









        // canvas handler



        trackTransforms(ctxMain);
        redraw();
		function redraw(){
			var p1 = ctxMain.transformedPoint(0,0);
			var p2 = ctxMain.transformedPoint(canMain.width,canMain.height);
			ctxMain.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
			ctxMain.drawImage(img,0,0);
		}
		
		var lastX=canMain.width/2, lastY=canMain.height/2, dragStart, dragged;
		canMain.addEventListener('mousedown',(evt)=>{
			lastX = evt.offsetX;
			lastY = evt.offsetY;
			dragStart = ctxMain.transformedPoint(lastX,lastY);
            dragged=false;
		});
		canMain.addEventListener('mousemove',(evt)=>{
			lastX = evt.offsetX;
			lastY = evt.offsetY;
            dragged=true;
			if (dragStart){
                shipShape.classList.add("hidden");
				let pt = ctxMain.transformedPoint(lastX,lastY);
				ctxMain.translate(pt.x-dragStart.x,pt.y-dragStart.y);
                checkBoundaries();
                redraw();
			}
		});
		canMain.addEventListener('mouseup',()=>{
			dragStart = null;
            if(dragged) scaleAndDither();
		});
        canMain.addEventListener('mouseleave',()=>{
            if(dragStart && dragged) scaleAndDither();
			dragStart = null;
		});

		var scaleFactor = 1.06, scale=1;
		canMain.addEventListener('wheel', evt => wheelZoom(evt));
        
        function wheelZoom(evt){
            evt.preventDefault();
            shipShape.classList.add("hidden");
            var factor = Math.pow(scaleFactor,-evt.deltaY/40), fixed=false;
            if(scale*factor<minzoom)
                factor=minzoom/scale;
            else if(scale*factor>maxzoom)
                factor=maxzoom/scale;
            
            var pt = ctxMain.transformedPoint(lastX,lastY);
            ctxMain.translate(pt.x,pt.y);
            ctxMain.scale(factor,factor);
            scale *= factor;
            ctxMain.translate(-pt.x,-pt.y);

            checkBoundaries();
            redraw();
            scaleAndDither();
            
			return false;
        }
       
        function checkBoundaries() {
            if(scale < minzoom || scale > maxzoom){
                var factor = scale < minzoom ? minzoom/scale : maxzoom/scale;
                ctxMain.scale(factor,factor);
                scale *= factor;
                // redraw();
            }
            var tr=ctxMain.getTransform(), top=250-shipShape.height/2, side=250-shipShape.width/2;
            if(tr['e']>side)
                ctxMain.translate((side-tr['e'])/scale, null);
            if(tr['f']>top)
                ctxMain.translate(null, (top-tr['f'])/scale);
                
            tr=ctxMain.getTransform();
            if(tr['e']+img.width*scale<500-side) 
                ctxMain.translate((500-side-tr['e']-img.width*scale)/scale, null);
            if(tr['f']+img.height*scale<500-top) 
                ctxMain.translate(null, (500-top-tr['f']-img.height*scale)/scale);
        }
        
        var rangeZoomGlobalID;

        scaleRange.addEventListener('mousedown', ()=>{
            hold=true;
            cancelAnimationFrame(rangeZoomGlobalID);
            rangeZoomGlobalID = requestAnimationFrame(rangeZoom);
            shipShape.classList.add("hidden");
        });

        function rangeZoom() {
            var factor = Math.pow(scaleFactor,scaleRange.value);
            if(scale*factor<minzoom)
                factor=minzoom/scale;
            else if(scale*factor>maxzoom)   
                factor=maxzoom/scale;               
            scale *= factor;
            var pt = ctxMain.transformedPoint(250,250);

            ctxMain.translate(pt.x,pt.y);
            ctxMain.scale(factor,factor);
            ctxMain.translate(-pt.x,-pt.y);
            checkBoundaries();
            redraw();
            rangeZoomGlobalID = requestAnimationFrame(rangeZoom);
        }

        scaleRange.addEventListener('mouseup', ()=>{
            cancelAnimationFrame(rangeZoomGlobalID);
            requestAnimationFrame(smoothRange);
            scaleAndDither();
        });

        function smoothRange(){
            if(Math.abs(scaleRange.value)>0.05){
                scaleRange.value -= scaleRange.value/Math.abs(scaleRange.value) * 0.02;
                requestAnimationFrame(smoothRange);
            } else scaleRange.value=0;
        }

        function trackTransforms(ctx){
            var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
            var xform = svg.createSVGMatrix();
            ctx.getTransform = function(){ return xform; };

            var scale = ctx.scale;
            ctx.scale = function(sx,sy){
                xform = xform.scale(sx,sy);
                return scale.call(ctx,sx,sy);
            };
            var translate = ctx.translate;
            ctx.translate = function(dx,dy){
                xform = xform.translate(dx,dy);
                return translate.call(ctx,dx,dy);
            };
            var pt  = svg.createSVGPoint();
            ctx.transformedPoint = function(x,y){
                pt.x=x; pt.y=y;
                return pt.matrixTransform(xform.inverse());
            }
            var setTransform = ctx.setTransform;
            ctx.setTransform = function(a,b,c,d,e,f){
                xform.a = a;
                xform.b = b;
                xform.c = c;
                xform.d = d;
                xform.e = e;
                xform.f = f;
                return setTransform.call(ctx,a,b,c,d,e,f);
            };
        }






















        

        function zoomCanvas(newScale) {
            if(newScale>=minzoom){
                var pt = ctxMain.transformedPoint(250,250);
                ctxMain.translate(pt.x,pt.y);
                ctxMain.scale(newScale/scale,newScale/scale);
                scale=newScale;
                ctxMain.translate(-pt.x,-pt.y);
                checkBoundaries();
                redraw();
            }
        }

        function filterImg() {
            ctxMain.filter = `hue-rotate(${hueRange.value}deg) saturate(${saturationRange.value}%) contrast(${contrastRange.value}%) brightness(${brightnessRange.value}%)`;
            redraw();
            scaleAndDither();
        }

        sizeApply(true);


        function renderShipBg() {
            if(bgPng.naturalWidth===0){
                bgPng.onload=function(){renderShipBg()} 
            }
            let factor = 500 / Math.max(canResult.width, canResult.height);
            if(factor>64) factor=64;
            shipBg.width=factor*canResult.width;
            shipBg.height=factor*canResult.height;
            for(let x=0; x<shipBg.width; x+=factor){
                for(let y=0; y<shipBg.height; y+=factor){
                    ctxShip.drawImage(bgPng,x,y);
                }
            }
        }

        var lastRun=0, timeoutStart=false;
        async function scaleAndDither(){
            goDither.classList.add("disabled");
            if(hideCheck.checked) return;
            if(Date.now() - lastRun < 600) {
                if(!timeoutStart){
                    timeoutStart=true;
                    setTimeout(() => {
                        timeoutStart=false;
                        scaleAndDither();
                    }, Date.now() - lastRun);
                }
                return;
            }
            lastRun=Date.now();
            ctxTemp.fillRect(0, 0, canTemp.width, canTemp.height);
            ctxTemp.drawImage(canMain, 250-shipShape.width/2, 250-shipShape.height/2, shipShape.width, shipShape.height, 0,0, canTemp.width, canTemp.height);

            downscale(canTemp.toDataURL(), canResult.width, canResult.height, {returnCanvas: true})
                .then(output => {
                    ctxSave.drawImage(output, 0, 0);
                    dither();
                })
        };

        scaleAndDither();

        function dither(){
            if(hideCheck.checked) return;
            ctxResult.drawImage(canSave,0,0);
            shipShape.classList.remove("hidden");  
            goDither.classList.remove("disabled");
            var closest = alghCheck.checked ? closestCIE94 : closestCIE76;
            if(!ditherCheck.checked){                                                       //no dithering
                const scaleD = ctxResult.getImageData(0,0,canResult.width,canResult.height);
                let sD=scaleD.data;
                for (var i = 0; i < sD.length; i += 4) {
                    let c=closest(sD[i],sD[i+1],sD[i+2]);
                    sD[i]=rgb[c][0];
                    sD[i+1]=rgb[c][1];
                    sD[i+2]=rgb[c][2];
                }
                ctxResult.putImageData(scaleD,0,0);
            }else{                                                                          //floyd-steinberg
                const scaleD = ctxResult.getImageData(0,0,canResult.width,canResult.height);
                let sD=scaleD.data;
                for(var y=0; y<canResult.height; y++){
                    for(var x=0; x<canResult.width; x++){
                        let i=pxIndex(x,y);
                        const c=closest(sD[i],sD[i+1],sD[i+2]);
                        const r_er=sD[i]-rgb[c][0];
                        const g_er=sD[i+1]-rgb[c][1];
                        const b_er=sD[i+2]-rgb[c][2];

                        sD[i]=rgb[c][0];
                        sD[i+1]=rgb[c][1];
                        sD[i+2]=rgb[c][2];

                        i=pxIndex(x+1,y);
                        sD[i] += r_er*7/16;
                        sD[i+1] += g_er*7/16;
                        sD[i+2] += b_er*7/16;
                        
                        i=pxIndex(x-1,y+1);
                        sD[i] += r_er*3/16;
                        sD[i+1] += g_er*3/16;
                        sD[i+2] += b_er*3/16;

                        i=pxIndex(x,y+1);
                        sD[i] += r_er*5/16;
                        sD[i+1] += g_er*5/16;
                        sD[i+2] += b_er*5/16;

                        i=pxIndex(x+1,y+1);
                        sD[i] += r_er/16;
                        sD[i+1] += g_er/16;
                        sD[i+2] += b_er/16;
                    }
                }
                ctxResult.putImageData(scaleD,0,0);
            }
        }

        function pxIndex(x,y) {
            return (x+y*canResult.width)*4;
        }

        function closestCIE76(r,g,b) {
            let mD=999999, id;
            let c=rgbToLab(r,g,b);
            for(let i=0;i<255;i++){
                let d=Math.sqrt((c[0]-lab[i][0])**2 + (c[1]-lab[i][1])**2 + (c[2]-lab[i][2])**2);
                if(d<mD){
                    mD=d;
                    id=i;
                }
            }
            return id;
        }

        function closestCIE94(r,g,b) {
            let mD=999999, id;
            let color1=rgbToLab(r,g,b);
            for(let i=0;i<255;i++){
                let deltaL = color1[0] - lab[i][0];
                let deltaA = color1[1] - lab[i][1];
                let deltaB = color1[2] - lab[i][2];
                
                let c1 = Math.sqrt(color1[0]**2 + color1[1]**2);
                let c2 = Math.sqrt(lab[i][0]**2 + lab[i][1]**2);
                let deltaC = c1 - c2;
                
                let deltaH = Math.pow(deltaA,2) + Math.pow(deltaB,2) - Math.pow(deltaC,2);
                deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
                
                let sc = 1 + .045*c1;
                let sh = 1 + .015*c1;
                
                let o = Math.pow(deltaL, 2) +
                        Math.pow(deltaC/sc, 2) +
                        Math.pow(deltaH/sh, 2);

                let d = o < 0 ? 0 : Math.sqrt(o);
                
                if(d<mD){
                    mD=d;
                    id=i;
                }
            }
            return id;
        }

        //sources for math equations are in math_sources.txt file
        function rgbToLab(r,g,b){
            //getting xyz
            r/=255;
            g/=255;
            b/=255;
            r=(r<=0.04045? r/12.92 : Math.pow((r+0.055)/1.055, 2.4));
            g=(g<=0.04045? g/12.92 : Math.pow((g+0.055)/1.055, 2.4));
            b=(b<=0.04045? b/12.92 : Math.pow((b+0.055)/1.055, 2.4));
        
            const x=0.4124564*r+0.3575761*g+0.1804375*b;      //D65
            const y=0.2126729*r+0.7151522*g+0.0721750*b;
            const z=0.0193339*r+0.1191920*g+0.9503041*b;
        
            // let x=0.4360747*r+0.3850649*g+0.1430804*b;   //D50
            // let y=0.2225045*r+0.7168786*g+0.0606169*b;
            // let z=0.0139322*r+0.0971045*g+0.7141733*b;
        
            //gettting lab
            const k=24389/27;
            const e=216/24389;
        
            // let Xr = 0.964221;           //D50 2*
            // let Yr = 1;
            // let Zr = 0.825211;
            // let Xr = 0.94811;               //D65 10*
            // let Yr = 1;
            // let Zr = 1.07304;
            const Xr = 0.95047;               //D65 2*
            const Yr = 1;
            const Zr = 1.08883;
        
            const xr = x/Xr;
            const yr = y/Yr;
            const zr = z/Zr;
        
            let fx,fy,fz,lc,ac,bc;
        
            fx=xr>e? Math.cbrt(xr) : (k*xr+16)/116;
            fy=yr>e? Math.cbrt(yr) : (k*yr+16)/116 ;
            fz=zr>e? Math.cbrt(zr) : (k*zr+16)/116 ;
        
            lc=Math.round((116*fy-16)*1000)/1000;
            ac=Math.round(500*(fx-fy)*1000)/1000;
            bc=Math.round(200*(fy-fz)*1000)/1000;
            return [lc,ac,bc];
        }
    }





    function renderDownload(){
        document.querySelector("#setup").classList.remove("active")
        document.querySelector("#download").classList.add("active")

        const names = ['never', 'somebody', 'gonna' ,'once', 'give', 'told', 'you', 'me', 'up']

        const back = document.querySelector("#download button")
        back.onclick = function(){
            document.querySelector("#setup").classList.add("active")
            document.querySelector("#download").classList.remove("active")
        }

        const thumbnail = document.querySelector("#download img")
        thumbnail.src = canResult.toDataURL()
        
        const nameBox = document.querySelector("#download input")

        // const downloadRaw = document.querySelector("#download a")
        // downloadRaw.onclick = function(){
        //     this.href= canResult.toDataURL()
        //     this.download = `${nameBox.value ? nameBox.value : names[Math.floor(Math.random()*9)]}.png`
        // } 

        const downloaMap = document.querySelector("#download a")
        downloaMap.classList.add("disabled")

        renderMap().then((c) => {
            downloaMap.href = c.toDataURL()
            downloaMap.classList.remove("disabled")
        });


        downloaMap.onclick = function(){
            this.download = `${nameBox.value ? nameBox.value : names[Math.floor(Math.random()*9)]}.png`
        }
    }

    function renderMap(){
        return new Promise(resolve =>{
            const canMap = document.createElement("canvas")
            const ctxMap = canMap.getContext("2d", {alpha: false, willReadFrequently: true});
            let scale=20
            canMap.width=canResult.width*scale
            canMap.height=canResult.height*scale+25
            ctxMap.imageSmoothingEnabled = false
            ctxMap.fillStyle = `white`
            ctxMap.font = '13px Courier'
            ctxMap.shadowColor = 'black'
            ctxMap.shadowBlur = 3

            ctxMap.scale(scale,scale)
            ctxMap.drawImage(canResult,0,0)
            ctxMap.scale(1/scale,1/scale)
            let data = ctxResult.getImageData(0, 0, canResult.width, canResult.height).data
            for(let i=0; i<canResult.height; i++){
                for(let o=0; o<canResult.width; o++){
                    let id = (o+i*canResult.width)*4
                    let t = getHexColor([data[id],data[id+1],data[id+2]])
                    if(t==undefined) return error.textContent = "(un)There was a problem genering color map. Try again in a diffrent broswer. PS. pls use chrome"
                    ctxMap.fillText(t, (o+0.1)*scale, (i+0.7)*scale)
                }
            }
            ctxMap.fillRect(0, canMap.height-25, canMap.width, 25)
            ctxMap.shadowBlur = 5
            ctxMap.fillStyle = `black`
            ctxMap.fillText(`DredArt ${version} by I am Shrek`, 10, canMap.height-10, canMap.width-20)
            resolve(canMap)
        })
    }

    function getHexColor(a) {
        for(var i=0; i<255; i++){
            c = rgb[i]
            if(a[0]==c[0] && a[1]==c[1] && a[2]==c[2])
                return i.toString(16).padStart(2, '0').toUpperCase()
        }
    }
}