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



function renderTool(){
    const rgb=[[222,165,164],[214,145,136],[173,111,105],[128,64,64],[77,0,0],[77,25,0],[128,0,0],[144,30,30],[186,1,1],[179,54,54],[179,95,54],[255,0,0],[216,124,99],[255,64,64],[255,128,128],[255,195,192],[195,153,83],[128,85,64],[128,106,64],[77,51,38],[77,51,0],[128,42,0],[155,71,3],[153,101,21],[213,70,0],[218,99,4],[255,85,0],[237,145,33],[255,179,31],[255,128,64],[255,170,128],[255,212,128],[181,179,92],[77,64,38],[77,77,0],[128,85,0],[179,128,7],[183,162,20],[179,137,54],[238,230,0],[255,170,0],[255,204,0],[255,255,0],[255,191,64],[255,255,64],[223,190,111],[255,255,128],[234,218,184],[199,205,144],[128,128,64],[77,77,38],[64,77,38],[128,128,0],[101,114,32],[141,182,0],[165,203,12],[179,179,54],[191,201,33],[206,255,0],[170,255,0],[191,255,64],[213,255,128],[248,249,156],[253,254,184],[135,169,107],[106,128,64],[85,128,64],[51,77,38],[51,77,0],[67,106,13],[85,128,0],[42,128,0],[103,167,18],[132,222,2],[137,179,54],[95,179,54],[85,255,0],[128,255,64],[170,255,128],[210,248,176],[143,188,143],[103,146,103],[64,128,64],[38,77,38],[25,77,0],[0,77,0],[0,128,0],[34,139,34],[3,192,60],[70,203,24],[54,179,54],[54,179,95],[0,255,0],[64,255,64],[119,221,119],[128,255,128],[64,128,85],[64,128,106],[38,77,51],[0,77,26],[0,77,51],[0,128,43],[23,114,69],[0,171,102],[28,172,120],[11,218,81],[0,255,85],[80,200,120],[64,255,128],[128,255,170],[128,255,212],[168,227,189],[110,174,161],[64,128,128],[38,77,64],[38,77,77],[0,77,77],[0,128,85],[0,166,147],[0,204,153],[0,204,204],[54,179,137],[54,179,179],[0,255,170],[0,255,255],[64,255,191],[64,255,255],[128,255,255],[133,196,204],[93,138,168],[64,106,128],[38,64,77],[0,51,77],[0,128,128],[0,85,128],[0,114,187],[8,146,208],[54,137,179],[33,171,205],[0,170,255],[100,204,219],[64,191,255],[128,212,255],[175,238,238],[64,85,128],[38,51,77],[0,26,77],[0,43,128],[0,47,167],[54,95,179],[40,106,205],[0,127,255],[0,85,255],[49,140,231],[73,151,208],[64,128,255],[113,166,210],[100,149,237],[128,170,255],[182,209,234],[146,161,207],[64,64,128],[38,38,77],[0,0,77],[25,0,77],[0,0,128],[42,0,128],[0,0,205],[54,54,179],[95,54,179],[0,0,255],[28,28,240],[106,90,205],[64,64,255],[133,129,217],[128,128,255],[177,156,217],[150,123,182],[120,81,169],[85,64,128],[106,64,128],[51,38,77],[51,0,77],[85,0,128],[137,54,179],[85,0,255],[138,43,226],[167,107,207],[127,64,255],[191,64,255],[148,87,235],[170,128,255],[153,85,187],[140,100,149],[128,64,128],[64,38,77],[77,38,77],[77,0,77],[128,0,128],[159,0,197],[179,54,179],[184,12,227],[170,0,255],[255,0,255],[255,64,255],[213,128,255],[255,128,255],[241,167,254],[128,64,106],[105,45,84],[77,38,64],[77,0,51],[128,0,85],[162,0,109],[179,54,137],[202,31,123],[255,0,170],[255,29,206],[233,54,167],[207,107,169],[255,64,191],[218,112,214],[255,128,213],[230,168,215],[145,95,109],[128,64,85],[77,38,51],[77,0,25],[128,0,42],[215,0,64],[179,54,95],[255,0,127],[255,0,85],[255,0,40],[222,49,99],[208,65,126],[215,59,62],[255,64,127],[249,90,97],[255,128,170],[17,17,17],[34,34,34],[51,51,51],[68,68,68],[85,85,85],[102,102,102],[119,119,119],[136,136,136],[153,153,153],[170,170,170],[187,187,187],[204,204,204],[221,221,221],[238,238,238],[255,255,255]];
    const game=['00','01','02','03','04','05','06','07','08','09','0A','0B','0C','0D','0E','0F','10','11','12','13','14','15','16','17','18','19','1A','1B','1C','1D','1E','1F','20','21','22','23','24','25','26','27','28','29','2A','2B','2C','2D','2E','2F','30','31','32','33','34','35','36','37','38','39','3A','3B','3C','3D','3E','3F','40','41','42','43','44','45','46','47','48','49','4A','4B','4C','4D','4E','4F','50','51','52','53','54','55','56','57','58','59','5A','5B','5C','5D','5E','5F','60','61','62','63','64','65','66','67','68','69','6A','6B','6C','6D','6E','6F','70','71','72','73','74','75','76','77','78','79','7A','7B','7C','7D','7E','7F','80','81','82','83','84','85','86','87','88','89','8A','8B','8C','8D','8E','8F','90','91','92','93','94','95','96','97','98','99','9A','9B','9C','9D','9E','9F','A0','A1','A2','A3','A4','A5','A6','A7','A8','A9','AA','AB','AC','AD','AE','AF','B0','B1','B2','B3','B4','B5','B6','B7','B8','B9','BA','BB','BC','BD','BE','BF','C0','C1','C2','C3','C4','C5','C6','C7','C8','C9','CA','CB','CC','CD','CE','CF','D0','D1','D2','D3','D4','D5','D6','D7','D8','D9','DA','DB','DC','DD','DE','DF','E0','E1','E2','E3','E4','E5','E6','E7','E8','E9','EA','EB','EC','ED','EE','EF','F0','F1','F2','F3','F4','F5','F6','F7','F8','F9','FA','FB','FC','FD','FE'];
    const tool = document.createElement("div");
    tool.id = "paint-tool";
    tool.innerHTML = `<div id='tool-nav'>
    <button>Menu</button><button style='display:none'>Map</button><button style='display:none'>Holo</button><button>Help</button>
    </div><div id='tool-content'>
    <div id='tool-menu'>
    <div><h3>DredArt for Deep Space Airships</h3></div>
    <input type='file' accept='.png' id='pImg'><label for='pImg'>Select pixelart image</label><div><span>Select pixelated PNG image to paint it into the game.</span></div>
    <input type='file' accept='.png' id='nImg'><label for='nImg'>Select PNG image</label><div><span>Select normal PNG image. Crop, scale and convernt image so it can be painted in game.</span></div>
    <label>Use prepared MTS images</label><div><span>Top secret</span></div>

    <div><p>DredArt v1.0 by I am Shrek</p></div>
    </div><div id='tool-map'></div><div id='tool-holo'></div>
    <div id='tool-help'>
    <p>Extension is work in progress (Updates soon). In current version, only map and holo features are available. In plans: rendering pixelart from PNG, tool guide...</p>
    </div></div>`;

    document.getElementById("motd").appendChild(tool);
    
    const navChildren = document.getElementById("tool-nav").children;
    const content = document.getElementById("tool-content");
    const menu = document.getElementById("tool-menu");
    const map = document.getElementById("tool-map");
    const holo = document.getElementById("tool-holo");
    const help = document.getElementById("tool-help");
    const pixelInput = document.getElementById("pImg");
    const normalInput = document.getElementById("nImg");

    showSection(0);
    navChildren[0].onclick = function() {showSection(0);}
    navChildren[1].onclick = function() {showSection(1);}
    navChildren[2].onclick = function() {showSection(2);}
    navChildren[3].onclick = function() {showSection(3);} 

    //Normal PNG
    normalInput.onchange = function(){
        renderSettings();
        document.querySelector('div h2').textContent = 'Adjust colors';
        const settContent = document.getElementById("tool-sett");

        const parag = document.createElement('p');
        parag.classList.add("error");
    
        if(this.files[0] == null){
            parag.textContent = 'Error. Chose file again.';
            return settContent.appendChild(parag);;
        }
    
        const file = this.files[0];
        this.value = null;
    
        if(file.length === null) {
            parag.textContent = 'Error. Propably file is empty';
            return settContent.appendChild(parag);
        }
        if(file.type!="image/png"){
            parag.textContent = 'Error. File is not PNG.';
            return settContent.appendChild(parag);
        }
    
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = function() {
            // if(this.width<5 || this.height<5){
            //     parag.textContent = "Minimum size is 5x5 pixels";
            //     return settContent.appendChild(parag);
            // }

            const can = document.createElement('canvas');
            can.width = this.width;
            can.height = this.height;
            const ctx=can.getContext('2d');
            ctx.drawImage(this, 0, 0);
            const sD = ctx.getImageData(0,0,can.width,can.height).data;
            for (var i = 0; i < sD.length; i += 4) {
                if(sD[i+3]!=255){
                    var transparency=true;
                    break;
                }
            }

            parag.textContent = `Image: ${file.name}, ${this.width} width x ${this.height} height. Choose color settings. If you need advanced coloring, visit help page.`;
            parag.classList.remove("error");
            settContent.appendChild(parag);

            const imgBox1 = document.createElement('figure');
            const caption1 = document.createElement('figcaption');
            const thumbnail = document.createElement('img');
            thumbnail.src = URL.createObjectURL(file);
            thumbnail.setAttribute("class", "crop-image");
            imgBox1.appendChild(thumbnail);
            caption1.textContent="Original image";
            imgBox1.appendChild(caption1);
            settContent.appendChild(imgBox1);

            const imgBox2 = document.createElement('figure');
            const caption2 = document.createElement('figcaption');
            can.setAttribute("class", "crop-image");
            imgBox2.appendChild(can);
            caption2.textContent="Colored image";
            imgBox2.appendChild(caption2);
            settContent.appendChild(imgBox2);


            const p1 = document.createElement('p');
                const bAw = document.createElement('input'); //black and white checkbox
                bAw.id='bAw';
                bAw.type='checkbox';
                bAw.onchange = function() {applyColors();}
                p1.appendChild(bAw);
                const bAwLabel = document.createElement('label');
                bAwLabel.textContent = `Make image Black and White (pixelart will have more detail)`;
                bAwLabel.setAttribute("for",'bAw');
                p1.appendChild(bAwLabel);
            settContent.appendChild(p1);

            if(transparency){
                ctx.fillStyle = 'rgb(187,187,187)';
                ctx.fillRect(0,0,can.width,can.height);
                ctx.drawImage(img,0,0);
                const p2 = document.createElement('p');
                    const tranLabel = document.createElement('label');
                    tranLabel.textContent = `Detected transparency. Choose backgound color from the list: `;
                    tranLabel.setAttribute("for",'bgList');
                    p2.appendChild(tranLabel);
                    const tranSelect = document.createElement('select');
                    tranSelect.type='list';
                    tranSelect.id='bgList'
                    tranSelect.style['background']='rgb(187,187,187)';
                    for(let i=0; i<255; i++){
                        const o = document.createElement('option');
                        o.textContent=game[i];
                        let c=rgb[i];
                        o.style['background']="rgb("+c[0]+','+c[1]+','+c[2]+")";
                        tranSelect.appendChild(o);
                    }
                    tranSelect.onchange = function() {
                        this.style['background'] = this.options[this.selectedIndex].style['background'];
                        applyColors();
                    }
                    p2.appendChild(tranSelect);
                settContent.appendChild(p2);
                document.querySelector("#tool-sett select option:nth-of-type(251)").selected = true;
            }

            function applyColors(){
                if(transparency){
                    let select = document.querySelector("#tool-sett select");
                    let c=rgb[parseInt(select.options[select.selectedIndex].textContent, 16)];
                    ctx.fillStyle = "rgb("+c[0]+','+c[1]+','+c[2]+")";
                    ctx.fillRect(0,0,can.width,can.height);
                    ctx.drawImage(img,0,0);
                } else ctx.drawImage(img,0,0);

                if(bAw.checked){
                    const iD = ctx.getImageData(0, 0, can.width, can.height);
                    const d = iD.data;
                    for (let i = 0; i < d.length; i += 4) {
                        let avg = (d[i] + d[i + 1] + d[i + 2]) / 3;
                        d[i]=avg;
                        d[i+1]=avg;
                        d[i+2]=avg;
                }
                ctx.putImageData(iD, 0, 0);
                }
            }

            const goScale = document.createElement("button");
            goScale.textContent = "Continue";
            goScale.onclick = function(){
                renderCropper(can);
            }
            settContent.appendChild(goScale);



            function renderCropper(can) {
                const ctx=can.getContext("2d");
                while(settContent.firstChild) {
                    settContent.removeChild(settContent.lastChild);
                }
                document.querySelector('div h2').textContent = 'Crop image';

                const info =document.createElement("p");
                info.innerHTML = '<p>Define size of art you want. Drag image to position you want. Later you will be able to move and crop</p>'
                info.classList.add("shipshape");

                const shipShape =document.createElement("div");
                shipShape.classList.add("shipshape");

                const sizeInput =document.createElement("div");
                sizeInput.setAttribute('placeholder', '78x78');
                sizeInput.setAttribute('maxlength', 5);
                sizeInput.onchange = function() {
                    if(this.value.length>2 || /^\d{1,2}x\d{1,2}$/g.test(this.value)){
                        let coord=cornerInp.value.split('x');
                        shipShape.style['width'] = coord[0];
                        shipShape.style['height'] = coord[1];
                        resetCrop();
                    }
                }
                settContent.appendChild(sizeInput);

                const cropBox =document.createElement("div");
                cropBox.classList.add("cropbox");



                cropBox.appendChild(shipShape);
                settContent.appendChild(cropBox);


                function resetCrop(){
        
                }
            }
        }
    }

    //Pixelated PNG
    pixelInput.onchange = function(){
        renderSettings();
        localStorage.removeItem("tool-holo");
        const settContent = document.getElementById("tool-sett");

        const parag = document.createElement('p');
        parag.classList.add("error");
    
        if(this.files[0] == null){
            parag.textContent = 'Error. Chose file again.';
            return settContent.appendChild(parag);;
        }
    
        const file = this.files[0];
        this.value = null;
    
        if(file.length === null) {
            parag.textContent = 'Error. Propably file is empty';
            return settContent.appendChild(parag);
        }
        if(file.type!="image/png"){
            parag.textContent = 'Error. File is not PNG.';
            return settContent.appendChild(parag);
        }
    
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = function() {
            if(this.width>80 || this.height>80){
                parag.textContent = 'Images bigger than 80x80px will propably crash your broswer/eat your memory.';
                return settContent.appendChild(parag);
            }
            // if(this.width<5 || this.height<5){
            //     parag.textContent = "C'mon, paint it without toot :/";
            //     return settContent.appendChild(parag);
            // }
            const scanner = document.createElement('canvas');
            scanner.width = this.width;
            scanner.height = this.height;
            const scanCtx=scanner.getContext('2d');
            scanCtx.drawImage(this, 0, 0);
            const sD = scanCtx.getImageData(0,0,scanner.width,scanner.height).data;
            for (var i = 0; i < sD.length; i += 4) {
                if(findIndex([sD[i],sD[i+1],sD[i+2]])==256) {
                    parag.textContent = "Error. Image contains color that don't exist in Dredark color pallete.(Check help for more details)";
                    return settContent.appendChild(parag);
                }
                if(sD[i+3]!=0&&sD[i+3]!=255){
                    parag.textContent = "Error. Image contains partial transparency. Only full transparency is allowed.";
                    return settContent.appendChild(parag);
                }
            }
            //drawing main canvas
            const can = document.createElement('canvas');
            can.width = this.width;
            can.height = this.height;
            const ctx=can.getContext('2d');
            ctx.fillStyle = "rgb(187,187,187)";
            ctx.drawImage(scanner, 0, 0);

            parag.textContent = `Image: ${file.name}, ${this.width} width x ${this.height} height`;
            parag.classList.remove("error");
            const thumbnail = document.createElement('img');
            thumbnail.src = URL.createObjectURL(file);
            thumbnail.setAttribute("class", "pixelart");
            settContent.appendChild(parag);
            settContent.appendChild(thumbnail);

            const settingD = document.createElement("div");
            settingD.innerHTML = `<p><label for='cornerInp'>Coordinates for bottom-left corner where you want to start painting</label><input maxlenght=5 placeholder='1,1' id='cornerInp'></p>
                                <p><input type='checkbox' id='shipBorder'><label for='shipBorder'>Make ship border transparent</label></p>`
            settContent.appendChild(settingD);

            const rPix = document.createElement("button");
            rPix.textContent = "Generate!";
            rPix.onclick = function(){renderPixelart(can)}
            settContent.appendChild(rPix);
        }

        function renderPixelart(can){
            const ctx=can.getContext("2d");
            for(let i=0; i<navChildren.length; i++){
                navChildren[i].style = "";
            }
            showSection(1);
            let corner, cornerInp=document.querySelector('#cornerInp'), border=document.querySelector('#shipBorder').checked;

            if(cornerInp.value.length>2 || /^\d{1,2},\d{1,2}$/g.test(cornerInp.value)){
                corner=cornerInp.value.split(',');
                corner[0] = parseInt(corner[0]);
                corner[1] = parseInt(corner[1])-1;
            } else corner=[1,0];
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
                    let gc=game[findIndex([c[0],c[1],c[2]])];
                    td.textContent = gc;
                    if(!imgColors.includes(gc)) imgColors.push(gc);
                    td.ondblclick = function(){showOnly(gc)}
                    row.appendChild(td);
                }
                table.appendChild(row);
            }
            tbox.appendChild(table);
            map.appendChild(tbox);

            if(img.width<7 || img.height<7){
                const parag = document.createElement("p");
                parag.textContent = "Holo available only for images bigger than 7x7";
                return holo.appendChild(parag);
            }

            //white canvas for bg ship
            const wcan = document.createElement("canvas");
            wcan.width = 64;
            wcan.height = 64;
            wcan.getContext('2d').fillStyle = "white";
            wcan.getContext('2d').fillRect(0, 0, 64, 64);

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
            coords.innerHTML = `<div>anchor ${x1},${y1}</div><div>sign[hover] ${x2},${y1}</div><div>sign[always] ${x1},${y2}</div><div>sign[near] ${x2},${y2}</div>`;
            holo.appendChild(coords);

            //check holo
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
            const check = document.createElement("div");
            check.textContent = 'Check';
            check.setAttribute("title", "Show where a mistake has been made. Correctly placed paint will create grey color.")
            check.onclick = function() {
                renderHolo(checkCan, "sign.png", false, true);
                renderHolo(checkCan, "anchor.png", false, false);
                renderHolo(checkCan, "sign_hover.png", true, false);
                renderHolo(checkCan, "sign_near.png",true,true);
                document.querySelectorAll("#tool-holo>div").forEach(e => {
                    e.style["pointer-events"] = "";
                    e.style["border-color"] = "";
                });
                this.style["pointer-events"] = "none";
                this.style["border-color"] = "green";
                uploadHolo(wcan, "bg_ship.png");
            }
            check.style['background-color'] = "rgb(0,180,20)";
            holo.appendChild(check);

            const searchBox = document.createElement("div");
            searchBox.classList.add('search');
            const searchR = document.createElement("div");
            const search = document.createElement("input");
            search.type = 'number';
            search.setAttribute("maxlength", 5);
            search.setAttribute("step", '0.01');
            search.setAttribute("placeholder","1,1");
            search.onkeyup = function() {
                if(this.value.length>5){
                    this.value=this.value.slice(0,5); 
                }
                if(this.value.length<3 || !/^\d{1,2}(,|\.)\d{1,2}$/g.test(this.value)) {
                    searchBox.style['background']=``;
                    return searchR.textContent="--";
                }
                let c=document.querySelector(`#tbox td[data-xy='${this.value.replace('.',',')}']`);
                if(c==null) return searchR.textContent="--";
                c=c.textContent;
                searchR.textContent=c;
                c=rgb[parseInt(c, 16)];
                return searchBox.style['background']=`rgb(${c[0]},${c[1]},${c[2]})`;
            }
            searchR.textContent = 'Get color from coords';
            searchBox.appendChild(search);
            searchBox.appendChild(searchR);
            holo.appendChild(searchBox);


            
            //each color holo
            var numba=0;
            imgColors.sort();
            imgColors.forEach(c => {
                const col = document.createElement("div");
                col.textContent = c;
                c=rgb[parseInt(c, 16)];
                col.onclick = function() {
                    renderShadow(c); 
                    document.querySelectorAll("#tool-holo>div").forEach(e => {
                        e.style["pointer-events"] = "";
                        e.style["border-color"] = "";
                    });
                    this.style["pointer-events"] = "none";
                    this.style["border-color"] = "green";
                    numba++;
                    console.log(numba);
                }
                col.style['background-color'] = "rgb("+c[0]+','+c[1]+','+c[2]+")";
                holo.appendChild(col);
            });



            function renderShadow(c) {
                if(localStorage.getItem("tool-holo")!='t') {
                    uploadHolo(wcan, "bg_ship.png");
                    if(border) {
                        const ecan = document.createElement("canvas");
                        ecan.width=640;
                        ecan.height=640;
                        uploadHolo(ecan, "tiles_subworld.png");
                    }
                    localStorage.setItem("tool-holo", 't');
                }
                const shadowcan = document.createElement("canvas");
                shadowcan.width = can.width;
                shadowcan.height = can.height;
                const shadowCtx = shadowcan.getContext("2d", { alpha: false });
                shadowCtx.fillStyle = 'rgba(0,0,0,0.9)';
                shadowCtx.fillRect(0,0,shadowcan.width,shadowcan.height);
                const holoData = shadowCtx.getImageData(0,0,shadowcan.width,shadowcan.height);
                const hData = holoData.data;
                const data = ctx.getImageData(0, 0, can.width, can.height).data;
                for (var i = 0; i < data.length; i += 4) {
                    if(data[i]==c[0] && data[i+1]==c[1] && data[i+2]==c[2]){
                        hData[i+3]=0;
                    }
                }
                shadowCtx.putImageData(holoData,0,0);
                renderHolo(shadowcan, "sign.png", false, true);
                renderHolo(shadowcan, "anchor.png", false, false);
                renderHolo(shadowcan, "sign_hover.png", true, false);
                renderHolo(shadowcan, "sign_near.png",true,true);
            }
            function blend(a) {
                return Math.floor(255 - a*2/3);
            }
            function renderHolo(shadow, name, x=false, y=false) {
                const sizecan = document.createElement("canvas");
                const sizeCtx = sizecan.getContext("2d");
                sizecan.width = Math.floor((x ? width2 : width1)/2)*80+40;
                sizecan.height = Math.floor((y ? height2 : height1)/2)*80+40;
                sizeCtx.imageSmoothingEnabled = false;
                sizeCtx.scale(40,40);
                sizeCtx.drawImage(shadow, x*width1, y*height1, x ? width2 : width1, y ? height2 : height1, 0, 0, x ? width2 : width1, y ? height2 : height1);
                uploadHolo(sizecan, name);
            }
            function uploadHolo(canvas, name) {
                canvas.toBlob(function(blob) {
                    document.evaluate('//button[text()=" Settings"]', document.getElementById("team_menu"), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
                    document.evaluate('//button[text()="Modify Assets"]', document.getElementById("team_menu"), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
                    let dataTransfer = new DataTransfer();
                    dataTransfer.items.add(new File([blob], name));
                    document.querySelector(".file-pane").dispatchEvent(new DragEvent('drop', {dataTransfer}));
                    document.querySelector("#new-ui-left button").click();
                });
            }
            let showedColor='';
            function showOnly(color) {
                let tds = document.querySelectorAll("td");
                if(color==showedColor) {
                    tds.forEach(t => {
                        t.classList.remove("transparent");
                    });
                    showedColor='';
                } else{
                    tds.forEach(t => {
                        t.classList.add("transparent");
                    });
                    tds.forEach(t => {
                        if(t.textContent==color) t.classList.remove("transparent");
                    });
                    showedColor=color;
                }
            }
        }
        function findIndex(a) {
            for(let s=0; s<255; s++)
                if(a[0]==rgb[s][0]&&a[1]==rgb[s][1]&&a[2]==rgb[s][2]) return s;
            if(a[0]==0&&a[1]==0&&a[0]==0) return 251;
            return 256;
        }
    }
 
    function renderSettings() {
        if(document.querySelector("div").id == ''){
            var mod = document.querySelector("div");
            mod.classList.add("modal-container");
            mod.style = "";
            mod.innerHTML = "<div class='modal-window window darker'><div class='close'><button class='btn-red'>Close</button></div><h2>PixelMaker settings</h2><div id='tool-sett'></div></div>"
            mod.querySelector("button").onclick = function() {mod.firstChild.remove(); mod.style['display'] ='none';}
        } else {
            var mod = document.createElement("div");
            mod.classList.add("modal-container");
            mod.innerHTML = "<div class='modal-window window darker'><div class='close'><button class='btn-red'>Close</button></div><h2>PixelMaker settings</h2><div id='tool-sett'></div></div>"
            mod.querySelector("button").onclick = function() {mod.firstChild.remove(); mod.style['display'] ='none';}
            document.body.prepend(mod);
        }
    }
    function showSection(s){
        for(let i=0; i<content.children.length; i++){
            content.children[i].style = "display:none";
        }
        content.children[s].style = "";
    }
}

function removeHolo() {
    document.evaluate('//button[text()=" Settings"]', document.getElementById("team_menu"), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
    document.evaluate('//button[text()="Modify Assets"]', document.getElementById("team_menu"), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
        if(document.querySelector("#tool-holo div")) {document.querySelectorAll("#tool-holo div").forEach(e => {e.style["border-color"] = ""})}
        ['sign','sign_hover','sign_near','anchor','bg_ship', 'tiles_subworld'].forEach(n =>{
            if(document.evaluate('//td[text()="'+n+'.png"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue!=null) document.evaluate('//td[text()="'+n+'.png"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentElement.querySelector("td:nth-of-type(3) button").click();
        })
    localStorage.removeItem("tool-holo");
    document.querySelector("#new-ui-left button").click();
}

//url = URL.createObjectURL(file);
//document.getElementById("dl").href = url.replace(/^data:image\/[^;]*/, `data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=thruster_starter.png`);