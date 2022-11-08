//Top bar buttons
const a=document.createElement("a");
const topBar=document.querySelector("#top-bar span") 
a.onclick = function(){
    if(!document.querySelector("#paint-tool")) return renderTool();
    document.querySelector("#paint-tool").classList.toggle("hidden");
    if(document.querySelector("div div h2").textContent == 'PixelMaker settings') document.querySelector("div div button").click();
} 
a.innerHTML = "<i class='fas big-icon fa-palette'></i><div class='tooltip tooltip-low dark'>DredArt</div>";
topBar.appendChild(a);

const holoOff = document.createElement("a");
holoOff.onclick = function(){
    removeHolo();
    document.querySelectorAll("#tool-holo div").forEach(e => {e.style["pointer-events"] = "";e.style["border-color"] = "";});
}
holoOff.innerHTML = "<i class='fas big-icon fa-times-circle'></i><div class='tooltip tooltip-low dark'>Disable Holo</div>";
topBar.appendChild(holoOff);

const refresh = document.createElement("a");
refresh.onclick = function(){refreshTXT()}
refresh.innerHTML = "<i class='fas big-icon fa-redo'></i><div class='tooltip tooltip-low dark'>Refresh</div>";
topBar.appendChild(refresh);



function renderTool(){
    const rgb=[[222,165,164],[214,145,136],[173,111,105],[128,64,64],[77,0,0],[77,25,0],[128,0,0],[144,30,30],[186,1,1],[179,54,54],[179,95,54],[255,0,0],[216,124,99],[255,64,64],[255,128,128],[255,195,192],[195,153,83],[128,85,64],[128,106,64],[77,51,38],[77,51,0],[128,42,0],[155,71,3],[153,101,21],[213,70,0],[218,99,4],[255,85,0],[237,145,33],[255,179,31],[255,128,64],[255,170,128],[255,212,128],[181,179,92],[77,64,38],[77,77,0],[128,85,0],[179,128,7],[183,162,20],[179,137,54],[238,230,0],[255,170,0],[255,204,0],[255,255,0],[255,191,64],[255,255,64],[223,190,111],[255,255,128],[234,218,184],[199,205,144],[128,128,64],[77,77,38],[64,77,38],[128,128,0],[101,114,32],[141,182,0],[165,203,12],[179,179,54],[191,201,33],[206,255,0],[170,255,0],[191,255,64],[213,255,128],[248,249,156],[253,254,184],[135,169,107],[106,128,64],[85,128,64],[51,77,38],[51,77,0],[67,106,13],[85,128,0],[42,128,0],[103,167,18],[132,222,2],[137,179,54],[95,179,54],[85,255,0],[128,255,64],[170,255,128],[210,248,176],[143,188,143],[103,146,103],[64,128,64],[38,77,38],[25,77,0],[0,77,0],[0,128,0],[34,139,34],[3,192,60],[70,203,24],[54,179,54],[54,179,95],[0,255,0],[64,255,64],[119,221,119],[128,255,128],[64,128,85],[64,128,106],[38,77,51],[0,77,26],[0,77,51],[0,128,43],[23,114,69],[0,171,102],[28,172,120],[11,218,81],[0,255,85],[80,200,120],[64,255,128],[128,255,170],[128,255,212],[168,227,189],[110,174,161],[64,128,128],[38,77,64],[38,77,77],[0,77,77],[0,128,85],[0,166,147],[0,204,153],[0,204,204],[54,179,137],[54,179,179],[0,255,170],[0,255,255],[64,255,191],[64,255,255],[128,255,255],[133,196,204],[93,138,168],[64,106,128],[38,64,77],[0,51,77],[0,128,128],[0,85,128],[0,114,187],[8,146,208],[54,137,179],[33,171,205],[0,170,255],[100,204,219],[64,191,255],[128,212,255],[175,238,238],[64,85,128],[38,51,77],[0,26,77],[0,43,128],[0,47,167],[54,95,179],[40,106,205],[0,127,255],[0,85,255],[49,140,231],[73,151,208],[64,128,255],[113,166,210],[100,149,237],[128,170,255],[182,209,234],[146,161,207],[64,64,128],[38,38,77],[0,0,77],[25,0,77],[0,0,128],[42,0,128],[0,0,205],[54,54,179],[95,54,179],[0,0,255],[28,28,240],[106,90,205],[64,64,255],[133,129,217],[128,128,255],[177,156,217],[150,123,182],[120,81,169],[85,64,128],[106,64,128],[51,38,77],[51,0,77],[85,0,128],[137,54,179],[85,0,255],[138,43,226],[167,107,207],[127,64,255],[191,64,255],[148,87,235],[170,128,255],[153,85,187],[140,100,149],[128,64,128],[64,38,77],[77,38,77],[77,0,77],[128,0,128],[159,0,197],[179,54,179],[184,12,227],[170,0,255],[255,0,255],[255,64,255],[213,128,255],[255,128,255],[241,167,254],[128,64,106],[105,45,84],[77,38,64],[77,0,51],[128,0,85],[162,0,109],[179,54,137],[202,31,123],[255,0,170],[255,29,206],[233,54,167],[207,107,169],[255,64,191],[218,112,214],[255,128,213],[230,168,215],[145,95,109],[128,64,85],[77,38,51],[77,0,25],[128,0,42],[215,0,64],[179,54,95],[255,0,127],[255,0,85],[255,0,40],[222,49,99],[208,65,126],[215,59,62],[255,64,127],[249,90,97],[255,128,170],[17,17,17],[34,34,34],[51,51,51],[68,68,68],[85,85,85],[102,102,102],[119,119,119],[136,136,136],[153,153,153],[170,170,170],[187,187,187],[204,204,204],[221,221,221],[238,238,238],[255,255,255]];
    const tool = document.createElement("div");
    tool.id = "paint-tool";
    tool.innerHTML = `<div id='tool-nav'>
    <button>Menu</button><button style='display:none'>Map</button><button style='display:none'>Holo</button><button>About</button>
    </div><div id='tool-content'>

    <div id='tool-menu'>
        <div><h3>DredArt - your personal art creator</h3></div>
        <input type='file' accept='.png' id='pImg'><label for='pImg'>Use pixelart</label><div><span>Drop here or select pixelated PNG image to paint it into the game.</span></div>
        <label id='nImg'>Create pixelart</label><div><span>Open DredArt Render. Crop, scale and convernt pictures to game color pallete.</span></div>
        <label id='iMOSAIC'><a target='_blank' href='https://discord.gg/uNgD6vv67c'>Join MOSAIC server</a></label><div><span>Join the coolest Dredark event!</span></div>
        <div><p>DredArt v1.0 by I am Shrek</p></div>
    </div><div id='tool-map'></div>
    <div id='tool-holo'></div>
    <div id='tool-about'>
        <p>Extension is work in progress (Updates soon). In current version, only map and holo features are available. In plans: rendering pixelart from PNG, tool guide...</p>
    </div></div>
    <div id='tool-message' style='display:none'>
        <button>Close</button><div></div>
    </div>`;

    document.getElementById("motd").appendChild(tool);
    
    const nav = document.getElementById("tool-nav");
    const navChildren = nav.children;
    const content = document.getElementById("tool-content");
    const message = document.querySelector("#tool-message div");
    const menu = document.getElementById("tool-menu");
    const map = document.getElementById("tool-map");
    const holo = document.getElementById("tool-holo");
    const about = document.getElementById("tool-about");

    showSection(0);
    for(let i=0; i<navChildren.length; i++){
        navChildren[i].onclick = function() {showSection(i);}
    }

    //Create pixelart
    document.getElementById("nImg").onclick = function() {window.open(chrome.runtime.getURL('render.html'));}

    //Pixelated PNG
    document.getElementById("pImg").onchange = function(){
        localStorage.removeItem("tool-holo");
        //image validation
        if(this.files[0] == null){
            return info('Error. Chose file again.');
        }
    
        const file = this.files[0];
        this.value = null;
    
        if(file.length === null) { 
            return info('Error. Propably file is empty.');
        }
        if(file.type!="image/png"){
            return info('Error. File is not PNG. (Use DredArt-render for making pixelarts)');
        }
    
        const img = new Image();
        let imgurl=URL.createObjectURL(file);
        img.src = imgurl;
        img.onload = function() {
            URL.revokeObjectURL(imgurl);
            if(this.width>80 || this.height>80){
                return info('Images bigger than 80x80 pixels are not allowed! (Use DredArt-render for making pixelarts)');
            }
            const scanner = document.createElement('canvas');
            scanner.width = this.width;
            scanner.height = this.height;
            const scanCtx=scanner.getContext('2d');
            scanCtx.drawImage(this, 0, 0);
            const sD = scanCtx.getImageData(0,0,scanner.width,scanner.height).data;
            for (var i = 0; i < sD.length; i += 4) {
                if(findIndex([sD[i],sD[i+1],sD[i+2]])==256) {
                    return info("Image contains color that dont exist in Dredark color pallete. (Use DredArt-render for making pixelarts)");
                }
                if(sD[i+3]!=0&&sD[i+3]!=255){
                    return info('Image contains partial transparency. Only full transparency is allowed. (Use DredArt-render for making pixelarts)');
                }
            }

            //displaying info 
            info();
            const desc = document.createElement("p");
            desc.classList.add("desc");
            desc.innerHTML =`Image: <span>${file.name}</span>, ${img.width} width x ${img.height} height`;
            message.appendChild(desc);

            const thumbnail = document.createElement('img');
            let thurl=URL.createObjectURL(file);
            thumbnail.src = thurl;
            thumbnail.onload = function() {URL.revokeObjectURL(thurl);}
            thumbnail.setAttribute("class", "pixelart");
            message.appendChild(thumbnail);

            const settingD = document.createElement("div");
            settingD.innerHTML = `<p>Coordinates for bottom-left corner of painting<input type='text' placeholder='1' id='corner1'> x <input type='text' placeholder='1' id='corner2'></p>`;
            message.appendChild(settingD);
            const corner1=document.getElementById("corner1");
            const corner2=document.getElementById("corner2");

            setInputFilter(corner1,corner2);

            const rPix = document.createElement("button");
            rPix.textContent = "Generate!";
            rPix.onclick = function(){renderPixelart(scanner)}
            message.appendChild(rPix);
        }

        function renderPixelart(scanner){
            nav.style["display"]='';
            content.style["display"]='';
            message.parentElement.style["display"]='none';
            for(let i=0; i<navChildren.length; i++)
                navChildren[i].style = "";

            const can = document.createElement('canvas');
            can.width = img.width;
            can.height = img.height;
            const ctx=can.getContext('2d');
            ctx.fillStyle = "rgb(187,187,187)";
            ctx.drawImage(scanner, 0, 0);

            showSection(1);
            let corner=[1,0], corner1=document.querySelector('#corner1'),corner2=document.querySelector('#corner2');

            if(corner1.value!="")
                corner[0] = parseInt(corner1.value);
            if(corner2.value!="")
                corner[1] = parseInt(corner2.value)-1;
            document.querySelector("div button").click();
            
            map.textContent = '';
            holo.textContent = '';
    
            const table = document.createElement('table');
            const tbox = document.createElement('div');
            tbox.id="tbox";

            let imgColors = [];

            for(let i=0; i<can.height; i++){
                let row = document.createElement('tr');
                for(let o=0; o<can.width; o++){
                    let c=ctx.getImageData(o, i, 1, 1).data;
                    let td = document.createElement('td');
                    td.style["background-color"] = "rgb("+c[0]+','+c[1]+','+c[2]+")";
                    td.setAttribute("data-xy", (corner[0]+o)+","+(can.height-i+corner[1]));
                    let gc = findIndex([c[0],c[1],c[2]]).toString(16).padEnd(2, '0').toUpperCase();
                    td.textContent = gc;
                    if(!imgColors.includes(gc)) imgColors.push(gc);
                    td.ondblclick = function(){showOnly(gc)}
                    row.appendChild(td);
                }
                table.appendChild(row);
            }
            tbox.appendChild(table);
            map.appendChild(tbox);


            //creating holo

            if(img.width<7 || img.height<7){
                return info("Holo available only for images bigger than 7x7");
            }


            if(localStorage.getItem("holoInfo")!='true'){
                info();
                const warnheader = document.createElement("h3");
                warnheader.textContent =`Warning!`;
                warnheader.style["background-color"]="red";
                message.appendChild(warnheader);
                const parag1 = document.createElement("h3");
                parag1.textContent ="Hologram overwrites these textures: signs, anchor, bg_ship, tiles_subworld, tiles_overworld, bg_gradient. If you have any textures installed make sure you saved them.";
                message.appendChild(parag1);
                const parag2 = document.createElement("h3");
                parag2.textContent ="To remove Hologram click X in top bar.";
                parag2.style["color"]="red";
                message.appendChild(parag2);
                const parag3 = document.createElement("h3");
                parag3.style["background-color"]="red";
                parag3.textContent ="Note that after rendering colors around 80 times screen will become grey. This is due to broswers limitations. Refreshing page solves problem.";
                message.appendChild(parag3);
                const dontShow = document.createElement("input");
                dontShow.type = 'checkbox';
                dontShow.id = 'dontShow'
                dontShow.onclick = function() {
                    localStorage.setItem("holoInfo", this.checked);
                }
                message.appendChild(dontShow);
                const dontShowL = document.createElement("label");
                dontShowL.setAttribute('for', 'dontShow');
                dontShowL.textContent ="Don't show again";
                message.appendChild(dontShowL);
            }


            //white and empty canvas for bg ship and not used items
            const wcan = document.createElement("canvas");
            wcan.width = 64;
            wcan.height = 64;
            wcan.getContext('2d').fillStyle = "white";
            wcan.getContext('2d').fillRect(0, 0, 64, 64);
            const ecan = document.createElement("canvas");
            ecan.width=10;
            ecan.height=10;

            //dividing ship, specyfying coords
            corner[0]--;
            var width1 = Math.ceil(can.width/2);
            var height1 = Math.ceil(can.height/2); 
            var width2 = can.width-width1;
            var height2 = can.height-height1;
            let x1 = Math.ceil(Math.floor(width1/2)+0.5)+corner[0];
            let y1 = can.height-Math.ceil(Math.floor(height1/2)+0.5)+corner[1]+1;
            let y2 = can.height-height1-Math.ceil(Math.floor(height2/2)+0.5)+corner[1]+1;
            let x2 = width1+Math.ceil(Math.floor(width2/2)+0.5)+corner[0];
            const holoHelp = document.createElement("div");
            holoHelp.classList.add('long');
            holoHelp.textContent = `Use coordinates below to place blocks required to create hologram. Use panel below to display it.`;
            holo.appendChild(holoHelp);
            const coords = document.createElement("div");
            coords.classList.add('long', 'coords');
            coords.innerHTML = `<div><img src='./img/anchor.png'> ${x1},${y1}</div><div><img src='./img/sign_hover.png'> ${x2},${y1}</div><div><img src='./img/sign.png'> ${x1},${y2}</div><div><img src='./img/sign_near.png'> ${x2},${y2}</div>`;
            holo.appendChild(coords);


            //rendering Check holo
            const checkCan = document.createElement("canvas");
            const chtx = checkCan.getContext('2d');
            checkCan.width = can.width;
            checkCan.height = can.height;
            chtx.drawImage(can, 0, 0);
            const checkData = chtx.getImageData(0,0,checkCan.width,checkCan.height);
            const cData = checkData.data;
            for (var i = 0; i < cData.length; i += 4) {
                cData[i]=blend(cData[i]);
                cData[i+1]=blend(cData[i+1]);
                cData[i+2]=blend(cData[i+2]);
                cData[i+3]=153;
            }
            chtx.putImageData(checkData,0,0);

            //sticky box
            const stickyBox = document.createElement("div");
            stickyBox.classList.add("sticky","long");


            //check button
            const check = document.createElement("div");
            check.textContent = 'Check';
            check.id = 'checkButton';
            check.setAttribute("title", "Show where a mistake has been made. Correctly placed paint will create grey color.")
            check.onclick = function() {
                choosePart(checkCan);
                document.querySelectorAll("#tool-holo>div").forEach(e => {
                    e.classList.remove('selected');
                });
                this.classList.add('selected');
                uploadHolo(wcan, "bg_ship.png");
            }
            stickyBox.appendChild(check);

            //color search
            const searchBox = document.createElement("div");
            searchBox.classList.add('search');
            const searchR = document.createElement("div");
            const search1 = document.createElement("input");
            search1.setAttribute("placeholder","1");
            search1.onkeyup = function(){searchForColor();}
            const serachComma = document.createElement("span");
            serachComma.textContent = ",";
            const search2 = document.createElement("input");
            search2.setAttribute("placeholder","1");
            search2.onkeyup = function(){searchForColor();}
            
            function searchForColor() {
                if(search1.value.length<1 || search2.value.length<1) {
                    searchBox.style['background']=``;
                    return searchR.textContent="--";
                }
                let c=document.querySelector(`#tbox td[data-xy='${search1.value},${search2.value}']`);
                if(c==null) {
                    searchBox.style['background']=``;
                    return searchR.textContent="--";
                }
                c=c.textContent;
                searchR.textContent=c;
                c=rgb[parseInt(c, 16)];
                return searchBox.style['background']=`rgb(${c[0]},${c[1]},${c[2]})`;
            }
            searchR.textContent = 'Color from coords';
            searchBox.appendChild(search1);
            searchBox.appendChild(serachComma);
            searchBox.appendChild(search2);
            searchBox.appendChild(searchR);
            stickyBox.appendChild(searchBox);

            setInputFilter(search1,search2);

            //corner selector
            const cornerBox = document.createElement("div");
            cornerBox.classList.add('cornerBox');

            const LTlabel = document.createElement("label");
            LTlabel.setAttribute('for', 'LTcorner');
            const LTcorner = document.createElement("input");
            LTcorner.onchange = function() {
                if(lastColor) renderShadow(lastColor);
            }
            LTcorner.type = 'radio';
            LTcorner.name = 'corners';
            LTcorner.id = 'LTcorner';
            LTcorner.value = '0';
            LTcorner.checked = true;
            cornerBox.appendChild(LTcorner);
            cornerBox.appendChild(LTlabel);

            const RTlabel = document.createElement("label");
            RTlabel.setAttribute('for', 'RTcorner');
            const RTcorner = document.createElement("input");
            RTcorner.onchange = function() {
                if(lastColor) renderShadow(lastColor);
            }
            RTcorner.type = 'radio';
            RTcorner.name = 'corners';
            RTcorner.id = 'RTcorner';
            RTcorner.value = '1';
            cornerBox.appendChild(RTcorner);
            cornerBox.appendChild(RTlabel);

            const LDlabel = document.createElement("label");
            LDlabel.setAttribute('for', 'LDcorner');
            const LDcorner = document.createElement("input");
            LDcorner.onchange = function() {
                if(lastColor) renderShadow(lastColor);
            }
            LDcorner.type = 'radio';
            LDcorner.name = 'corners';
            LDcorner.id = 'LDcorner';
            LDcorner.value = '2';
            cornerBox.appendChild(LDcorner);
            cornerBox.appendChild(LDlabel);

            const RDlabel = document.createElement("label");
            RDlabel.setAttribute('for', 'RDcorner');
            const RDcorner = document.createElement("input");
            RDcorner.onchange = function() {
                if(lastColor) renderShadow(lastColor);
            }
            RDcorner.type = 'radio';
            RDcorner.name = 'corners';
            RDcorner.id = 'RDcorner';
            RDcorner.value = '3';
            cornerBox.appendChild(RDcorner);
            cornerBox.appendChild(RDlabel);

            stickyBox.appendChild(cornerBox);
            holo.appendChild(stickyBox);
            
            const stickyObserver = new IntersectionObserver(
                ([e]) => e.target.classList.toggle('pinned', e.intersectionRatio < 1)
            , {threshold: [1]});
            stickyObserver.observe(stickyBox);
            
            //rendering button for each color
            imgColors.sort();
            imgColors.forEach(c => {
                const col = document.createElement("div");
                col.textContent = c;
                c=rgb[parseInt(c, 16)];
                col.onclick = function(){
                    renderShadow(c); 
                    check.classList.remove('selected');
                    document.querySelectorAll("#tool-holo>div").forEach(e => {
                        e.classList.remove('selected');
                    });
                    this.classList.add('selected');
                }
                col.ondblclick = function(){
                    col.classList.toggle('done');
                }
                col.style['background-color'] = "rgb("+c[0]+','+c[1]+','+c[2]+")";
                holo.appendChild(col);
            });

            var lastColor;
            //rendering holo for each color (dynamically)
            function renderShadow(c) {
                lastColor=c;
                if(localStorage.getItem("tool-holo")!='t') {
                    uploadHolo(wcan, "bg_ship.png");
                    uploadHolo(ecan, "tiles_subworld.png");
                    uploadHolo(ecan, "tiles_overworld.png");
                    uploadHolo(ecan, "bg_gradient.png");
                    localStorage.setItem("tool-holo", 't');
                }
                const shadowCan = document.createElement("canvas");
                shadowCan.width = can.width;
                shadowCan.height = can.height;
                const shadowCtx = shadowCan.getContext("2d", { alpha: false });
                shadowCtx.fillStyle = 'rgb(0,0,0)';
                shadowCtx.fillRect(0,0,shadowCan.width,shadowCan.height);
                const holoData = shadowCtx.getImageData(0,0,shadowCan.width,shadowCan.height);
                const hData = holoData.data;
                const data = ctx.getImageData(0, 0, can.width, can.height).data;
                for (var i = 0; i < data.length; i += 4) {
                    if(data[i]==c[0] && data[i+1]==c[1] && data[i+2]==c[2]){
                        hData[i+3]=0;
                    }
                }
                shadowCtx.putImageData(holoData,0,0);
                choosePart(shadowCan);
                return shadowCan;
            }
            function blend(c) {
                return Math.floor(255 - c*2/3);
            }

            var oldPart='4';
            function choosePart(canvas) {
                let part=document.querySelector('input[type=radio][name=corners]:checked').value
                if(part!=oldPart){
                    oldPart=part;
                    uploadHolo(wcan, "anchor.png");
                    uploadHolo(wcan, "sign_hover.png");
                    uploadHolo(wcan, "sign.png");
                    uploadHolo(wcan, "sign_near.png");
                }

                switch(document.querySelector('input[type=radio][name=corners]:checked').value) {
                    case '0':
                        uploadHolo(renderHolo(canvas, false, false), "anchor.png");
                    break;
                    case '1':
                        uploadHolo(renderHolo(canvas, true, false), "sign_hover.png");
                    break;
                    case '2': 
                        uploadHolo(renderHolo(canvas, false, true), "sign.png");
                    break;
                    case '3': 
                        uploadHolo(renderHolo(canvas, true, true), "sign_near.png");
                    break;
                }
            }

            //render texture for one specific part of ship (for 1 block)
            function renderHolo(shadow, x=false, y=false) {
                const sizeCan = document.createElement("canvas");
                const sizeCtx = sizeCan.getContext("2d");
                sizeCan.width = Math.floor((x ? width2 : width1)/2)*80+40;
                sizeCan.height = Math.floor((y ? height2 : height1)/2)*80+40;
                sizeCtx.imageSmoothingEnabled = false;
                sizeCtx.scale(40,40);
                sizeCtx.drawImage(shadow, x*width1, y*height1, x ? width2 : width1, y ? height2 : height1, 0, 0, x ? width2 : width1, y ? height2 : height1);
                return sizeCan;
            }
            //upload one texture
            function uploadHolo(canvas, name) {
                canvas.toBlob(function(blob) {
                    document.evaluate('//button[text()=" Settings"]', document.getElementById("team_menu"), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
                    document.evaluate('//button[text()="Modify Assets"]', document.getElementById("team_menu"), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
                    let dataTransfer = new DataTransfer();
                    dataTransfer.items.add(new File([blob], name));
                    document.querySelector(".file-pane").dispatchEvent(new DragEvent('drop', {dataTransfer}));
                    dataTransfer = null;
                    document.querySelector("#new-ui-left button").click();
                    return canvas;
                });
            }

            let showedColor='';
            function showOnly(color) {
                let tds=document.querySelectorAll("td");
                if(color==showedColor) {
                    tds.forEach(t => {
                        t.classList.remove("transparent");
                    });
                    return showedColor='';
                }
                tds.forEach(t => {
                    if(t.textContent==color) t.classList.remove("transparent");
                    else t.classList.add("transparent");
                });
                return showedColor=color; 
            }
        }
        function findIndex(a) {
            for(let s=0; s<255; s++)
                if(a[0]==rgb[s][0]&&a[1]==rgb[s][1]&&a[2]==rgb[s][2]) return s;
            if(a[0]==0&&a[1]==0&&a[0]==0) return 251;
            return 256;
        }

        function setInputFilter(i1,i2) {
            i1.oldValue='';
            i2.oldValue='';
            [i1,i2].forEach(function(tbox) {
                tbox.addEventListener("input", function() {
                    if(/^(?!0)\d{0,2}$/.test(this.value)) {
                        this.oldValue = this.value;
                        this.oldSelectionStart = this.selectionStart;
                        this.oldSelectionEnd = this.selectionEnd;
                        if(this.value.length>=2 && this==i1) i2.focus();
                        else if(this.value.length==0 && this==i2) i1.focus();
                    } else {
                        this.value = this.oldValue;
                        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                    }
                });
            });
        }
    }

    //MOSAIC img base
    document.getElementById("iMOSAIC").onclick = function() {
        info("This part is work in progres");
    }

    document.querySelector("#tool-message button").onclick = function() {
        nav.style["display"]='';
        content.style["display"]='';
        message.parentElement.style["display"]='none';
    }
    function info(info=null) {
        nav.style["display"]='none';
        content.style["display"]='none';
        message.parentElement.style["display"]='';
        while(message.firstChild) message.firstChild.remove();
        if(info){
            const p=document.createElement("p");
            p.textContent=info;
            p.classList.add("error");
            message.appendChild(p);
        }
    }

    function showSection(s){
        for(let i=0; i<content.children.length; i++){
            content.children[i].style = "display:none";
        }
        content.children[s].style = "";
    }
}

function refreshTXT() {
    document.evaluate('//button[text()=" Settings"]', document.getElementById("team_menu"), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
    document.evaluate('//button[text()="Modify Assets"]', document.getElementById("team_menu"), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
    document.evaluate('//button[text()="Refresh ↻"]', document.getElementById("team_menu"), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
    document.querySelector("#new-ui-left button").click();
}

function removeHolo() {
    document.evaluate('//button[text()=" Settings"]', document.getElementById("team_menu"), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
    document.evaluate('//button[text()="Modify Assets"]', document.getElementById("team_menu"), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
        if(document.querySelector("#tool-holo div")) {document.querySelectorAll("#tool-holo div").forEach(e => {e.style["border-color"] = ""})}
        ['sign','sign_hover','sign_near','anchor','bg_ship', 'tiles_subworld', 'tiles_overworld', 'bg_gradient'].forEach(n =>{
            if(document.evaluate('//td[text()="'+n+'.png"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue!=null) document.evaluate('//td[text()="'+n+'.png"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentElement.querySelector("td:nth-of-type(3) button").click();
        })
    localStorage.removeItem("tool-holo");
    document.querySelector("#new-ui-left button").click();
}