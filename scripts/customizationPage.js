import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//#region Scene Initialization
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, (window.innerWidth / 1.5) / (window.innerHeight / 1.5), 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5);
renderer.setClearColor(0xDBDBDB);

const canvas=document.getElementById("canvas-frame");
canvas.appendChild(renderer.domElement);

renderer.setClearColor(0xDBDBDB);
let controls;
let currentButton;
let currentSubButton;
//#endregion

//#region Models Initialization
//#region Colors and textures Initialization
const black_s = {
    name: 'Black',
    iconUrl: '/pictures/colors-mini/black_s3.jpg',
    url: '/pictures/textures/black_s.jpeg',
    hue: 1.00,
    saturation: 1,
    value: 0
};

const red_s = {
    name: 'Red',
    iconUrl: '/pictures/colors-mini/red_s.jpeg',
    url: '/pictures/textures/red_s.jpeg',
    hue: 0.48,
    saturation: 1.1,
    value: 1.2
};

const blue_s = {
    name: 'Blue',
    iconUrl: '/pictures/colors-mini/blue_s.jpeg',
    url: '/pictures/textures/blue_s.jpeg',
    hue: 0.15,
    saturation: 1.6,
    value: 1
};

const lblue_s = {
    name: 'Light Blue',
    iconUrl: '/pictures/colors-mini/lblue_s.jpeg',
    url: '/pictures/textures/lblue_s.jpeg',
    hue: 0.05,
    saturation: 1,
    value: 1.3
};

const brown_s = {
    name: 'Brown',
    iconUrl: '/pictures/colors-mini/brown_s.jpeg',
    url: '/pictures/textures/brown_s.jpeg',
    hue: 0.59,
    saturation: 1.9,
    value: 0.1
};

const brown_s2 = {
    name: 'Brown',
    iconUrl: '/pictures/colors-mini/brown_s2.jpeg',
    url: '/pictures/textures/brown_s2.jpeg',
    hue: 0.60,
    saturation: 1.9,
    value: 0.3
};

const lbrown_s = {
    name: 'Light Brown',
    iconUrl: '/pictures/colors-mini/lbrown_s.jpeg',
    url: '/pictures/textures/lbrown_s.jpeg',
    hue: 0.60,
    saturation: 1.9,
    value: 0.5
};

const orange_s = {
    name: 'Orange',
    iconUrl: '/pictures/colors-mini/orange_s.jpeg',
    url: '/pictures/textures/orange_s.jpeg',
    hue: 0.57,
    saturation: 2,
    value: 2
};

const beige_s = {
    name: 'Beige',
    iconUrl: '/pictures/colors-mini/beige_s.jpeg',
    url: '/pictures/textures/beige_s.jpeg',
    hue: 0.57,
    saturation: 0.9,
    value: 1.2
};

const purple_s = {
    name: 'Purple',
    iconUrl: '/pictures/colors-mini/purple_s.jpeg',
    url: '/pictures/textures/purple_s.jpeg',
    hue: 0.30,
    saturation: 0.8,
    value: 1.3
};

const green_s = {
    name: 'Green',
    iconUrl: '/pictures/colors-mini/green_s.jpeg',
    url: '/pictures/textures/green_s.jpeg',
    hue: 0.89,
    saturation: 1.5,
    value: 0.4
};

const green_s2 = {
    name: 'green_s2',
    iconUrl: '/pictures/colors-mini/green_s2.jpeg',
    url: '/pictures/textures/green.jpg'
};

const green_s3 = {
    name: 'Green v2',
    iconUrl: '/pictures/colors-mini/green_s3.jpeg',
    url: '/pictures/textures/green_s3.jpeg',
    hue: 0.89,
    saturation: 1.5,
    value: 0.1
};

const green_s4 = {
    name: 'Green v3',
    iconUrl: '/pictures/colors-mini/green_s4.jpeg',
    url: '/pictures/textures/green_s4.jpeg',
    hue: 0.85,
    saturation: 1.5,
    value: 0.4
};

const lgreen_s = {
    name: 'Light Green',
    iconUrl: '/pictures/colors-mini/lgreen_s.jpeg',
    url: '/pictures/textures/lgreen_s.jpeg',
    hue: 0.77,
    saturation: 1,
    value: 1
};

const white_s = {
    name: 'White',
    iconUrl: '/pictures/colors-mini/white_s.jpeg',
    url: '/pictures/textures/white_s.jpeg',
    hue: 0.60,
    saturation: 0.6,
    value: 1.3
};

const white_s2 = {
    name: 'White v2',
    iconUrl: '/pictures/colors-mini/white_s2.jpg',
    url: '/pictures/textures/white_s2.jpeg',
    hue: 0.05,
    saturation: 0,
    value: 1.3
};

const yellow_s = {
    name: 'Yellow',
    iconUrl: '/pictures/colors-mini/yellow_s.jpeg',
    url: '/pictures/textures/yellow_s.jpeg',
    hue: 0.64,
    saturation: 2,
    value: 2.3
};

const yellow_s2 = {
    name: 'Yellow v2',
    iconUrl: '/pictures/colors-mini/yellow_s2.jpeg',
    url: '/pictures/textures/yellow_s2.jpeg',
    hue: 0.60,
    saturation: 0.9,
    value: 1.8
};

const white_l = {
    name: 'White',
    iconUrl: '/pictures/colors-mini/white_l.jpg',
    hue: 0.60,
    saturation: 0,
    value: 4.8
};

const blue_l = {
    name: 'Blue',
    iconUrl: '/pictures/colors-mini/blue_l.jpg',
    hue: 0.60,
    saturation: 1,
    value: 0.8
};

const red_l = {
    name: 'Red',
    iconUrl: '/pictures/colors-mini/red_l.jpg',
    hue: 0.95,
    saturation: 1.2,
    value: 0.9
};

const olive_l = {
    name: 'Olive',
    iconUrl: '/pictures/colors-mini/olive_l.jpg',
    hue: 0.05,
    saturation: 0.85,
    value: 1
};

const olive_l2 = {
    name: 'Olive v2',
    iconUrl: '/pictures/colors-mini/olive_l2.jpg',
    hue: 0.1,
    saturation: 0.85,
    value: 0.5
};

const orange_l = {
    name: 'Orange',
    iconUrl: '/pictures/colors-mini/orange_l.jpg',
    hue: 0.95,
    saturation: 2,
    value: 2.5
};

const lorange_l = {
    name: 'Light Orange',
    iconUrl: '/pictures/colors-mini/lorange_l.jpg',
    hue: 0.975,
    saturation: 1.1,
    value: 2.2
};

const orange_l2 = {
    name: 'Orange v2',
    iconUrl: '/pictures/colors-mini/orange_l2.jpg',
    hue: 0.975,
    saturation: 1.05,
    value: 1.9
};

const lbrown_l = {
    name: 'Light Brown',
    iconUrl: '/pictures/colors-mini/lbrown_l.jpg',
    hue: 0,
    saturation: 1,
    value: 1.5
};

const brown_l = {
    name: 'Brown',
    iconUrl: '/pictures/colors-mini/brown_l.jpg',
    hue: 0.925,
    saturation: 1.3,
    value: 0.35
};

const brown_l2 = {
    name: 'Brown v2',
    iconUrl: '/pictures/colors-mini/brown_l2.jpg',
    hue: 1,
    saturation: 1,
    value: 0.7
};

const purple_l = {
    name: 'Purple',
    iconUrl: '/pictures/colors-mini/purple_l.jpg',
    hue: 0.7,
    saturation: 1.8,
    value: 0.189
};

const dpurple_l = {
    name: 'Dark Purple',
    iconUrl: '/pictures/colors-mini/dpurple_l.jpg',
    hue: 0.75,
    saturation: 1.9,
    value: 0.1
};

const yellow_l = {
    name: 'Yellow',
    iconUrl: '/pictures/colors-mini/yellow_l.jpg',
    hue: 0.05,
    saturation: 2,
    value: 1.9
};





//#endregion

//#endregion

const custom_wallet = {
    img1_url: "/pictures/product-images/cardholder1.png",
    img2_url: "/pictures/product-images/cardholder2.png",
    name: "Custom wallet",
    price: 500,
    customizableParts: [
        {
            name: "pockets",
            subparts: [
                { subPartName: "All", colors: [orange_l2, white_l, red_l, blue_l, olive_l, olive_l2, orange_l,lorange_l, lbrown_l, brown_l, brown_l2, yellow_l, purple_l, dpurple_l], pickedColor: null, meshNames: ['pocket1_left', 'pocket2_left', 'pocket3_left', 'pocket4_left', 'pocket1_right','pocket2_right','pocket3_right','pocket4_right'] },
                { subPartName: "Top", colors: [orange_l2, white_l, red_l, blue_l, olive_l, olive_l2, orange_l,lorange_l, lbrown_l, brown_l, brown_l2, yellow_l, purple_l, dpurple_l], pickedColor: lbrown_l, meshNames: ['pocket1_left', 'pocket1_right'] },
                { subPartName: "Upper", colors:[orange_l2, white_l, red_l, blue_l, olive_l, olive_l2, orange_l,lorange_l, lbrown_l, brown_l, brown_l2, yellow_l, purple_l, dpurple_l], pickedColor: lbrown_l, meshNames: ['pocket2_left', 'pocket2_right'] },
                { subPartName: "Middle", colors: [orange_l2, white_l, red_l, blue_l, olive_l, olive_l2, orange_l,lorange_l, lbrown_l, brown_l, brown_l2, yellow_l, purple_l, dpurple_l], pickedColor: lbrown_l , meshNames: ['pocket3_left', 'pocket3_right']},
                { subPartName: "Bottom", colors: [orange_l2, white_l, red_l, blue_l, olive_l, olive_l2, orange_l,lorange_l, lbrown_l, brown_l, brown_l2, yellow_l, purple_l, dpurple_l], pickedColor: lbrown_l, meshNames: ['pocket4_left', 'pocket4_right'] },
                
    ]},
        {
            name: "leather",
            subparts: [
                { subPartName: "Outer", colors: [orange_l2, white_l, red_l, blue_l, olive_l, olive_l2, orange_l,lorange_l, lbrown_l, brown_l, brown_l2, yellow_l, purple_l, dpurple_l], pickedColor: lbrown_l , meshNames: ["backside"]},
                { subPartName: "Middle", colors: [orange_l2, white_l, red_l, blue_l, olive_l, olive_l2, orange_l,lorange_l, lbrown_l, brown_l, brown_l2, yellow_l, purple_l, dpurple_l], pickedColor: lbrown_l , meshNames: ["middle", "inside_strip"] },
            ]
        },
        {
            name: "stitches",
            subparts: [
                { subPartName: "Complete", colors: [white_s,white_s2,beige_s,blue_s,lblue_s,black_s, brown_s,brown_s2,lbrown_s, green_s,green_s3,green_s4,lgreen_s,red_s, orange_s, yellow_s2, yellow_s, purple_s], pickedColor: lblue_s, meshNames: ['stitches1', 'stitches2','stitches3', 'stitches4', 'stitches5','stitches6','stitches7', 'stitches8','stitches9','stitches10', 'stitches11','stitches12','stitches13', 'stitches14'] },
            ]
        }
    ],
    //gltfFile: "/customization/models/wallet/wallet_6.gltf"
    gltfFile: "/customization/models/wallet/wallet_test_cutova4.gltf"
};

const pickWalletButton = document.getElementById('pickWalletButton');
pickWalletButton.addEventListener('click', function () {
    pickWalletButton.classList.add('pressedProduct');
    window.customProduct = custom_wallet;
    loadProductModel(customProduct);
    addPriceAndATCButton(customProduct);
});



function addPriceAndATCButton(customProduct){


    const priceDiv = document.querySelector('.price');
    const parentDiv = document.querySelector('.price-and-add-to-cart-button');

    priceDiv.innerHTML='Total: $'+ customProduct.price;
    parentDiv.style.display = 'grid';
}

function clearCanvasAndButtons() {
    // Remove all objects from the scene
    scene.children.forEach(child => {
        scene.remove(child);
    });
    const subButtonsFrame = document.getElementById("subButtonsFrame");
    subButtonsFrame.innerHTML = '';
    const colorPalette = document.getElementById("color-pick");
    colorPalette.innerHTML = '';
}

function loadProductModel(product1) {
    clearCanvasAndButtons();
    console.log(product1);
    canvas.classList.add('canvas-border');

    if (controls !== undefined) {
        controls.dispose();
    }

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
        product1.gltfFile,
        function (gltf) {
            
            const object = gltf.scene;
            
            object.rotation.y -= Math.PI / 2; // Rotates the object 45 degrees around the y-axis

            scene.add(object);
            const boundingBox = new THREE.Box3().setFromObject(object);
            const center = new THREE.Vector3();
            boundingBox.getCenter(center);

            //#region Define buttons for changing part colors
            const mainButtonFrame = document.getElementById("buttonsFrame");
            mainButtonFrame.innerHTML = '';

            

            product1.customizableParts.forEach((part1) => {
                const partDiv = document.createElement("div");
                const partName = document.createElement("p");
                partDiv.classList.add("partPick");
                partName.innerText = part1.name;
                partDiv.appendChild(partName);
                part1.subPartButtons = [];
                part1.subparts.forEach((subpart1) => {
                    const subPartButton = document.createElement("div");
                    const subPartButtonText = document.createElement("p");
                    subPartButtonText.innerText = subpart1.subPartName;
                    subPartButton.appendChild(subPartButtonText);
                    part1.subPartButtons.push(subPartButton);
                    subPartButton.addEventListener('click', function () { prikaziBoje(subPartButton, subpart1, object); });

                });
                mainButtonFrame.appendChild(partDiv);
                partDiv.addEventListener('click', function () { openSubPartsMenu(partDiv, part1.subPartButtons); });
            });
            //#endregion


            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.25;
            controls.rotateSpeed = 0.35;
            controls.zoomSpeed = 0.8;
            controls.minDistance = 1;
            controls.enablePan = false;
            camera.position.copy(center);
            camera.position.z += boundingBox.getSize(new THREE.Vector3()).length() * 1;
            controls.target.copy(center);

            

            function animate() {
                requestAnimationFrame(animate);
                controls.update(); // Update controls here
                renderer.render(scene, camera);
            }
            animate();

            window.addEventListener('wheel', function (event) {
                if (event.deltaY) {
                    const delta = event.deltaY > 0 ? -0.1 : 0.1;
                    zoom(delta);
                }
            });

        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('Error loading the GLTF model', error);
        }
    );

    //#region Set Lighting
    const light = new THREE.AmbientLight(0xffffff,4);
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 1).normalize();
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight2.position.set(-1, 1, -1).normalize();
    scene.add(directionalLight2);
    //#endregion

    // Set camera position
    camera.position.z = 5;

    function zoom(delta) {
        camera.position.z += delta;
    }

    var frameDiv = document.getElementById('main-frame');
    frameDiv.style.marginLeft = '0';
}

function prikaziBoje(subPartButton, subPart, object) {

    const colorPalette = document.getElementById("color-pick");
    colorPalette.innerHTML = '';

    if (currentSubButton!=null && currentSubButton!=subPartButton){
        currentSubButton.classList.remove('pressedSubButton');
        currentSubButton=subPartButton;
        currentSubButton.classList.add('pressedSubButton');
        subPart.colors.forEach((color) => {
        //console.log(color);
        const colorButton = document.createElement('img');
        
        colorButton.src = color.iconUrl;

        colorButton.classList.add('colors');
        colorButton.addEventListener('click', function () {
            
            
            adjustMeshHSV(subPart, color, object);
            if (subPart.subPartName=='All Pockets'){
                
                window.customProduct.customizableParts[0].subarts[1].pickedColor=color;
                window.customProduct.customizableParts[0].subarts[2].pickedColor=color;
                window.customProduct.customizableParts[0].subarts[3].pickedColor=color;
                window.customProduct.customizableParts[0].subarts[4].pickedColor=color;
            }
            else{
                subPart.pickedColor = color;
            }
            
            //console.log(window.customProduct);
        });
        colorPalette.appendChild(colorButton);
        });
    }
    else if(currentSubButton==subPartButton){
        currentSubButton.classList.remove('pressedSubButton');
        currentSubButton=null;
    }

    else{
        currentSubButton=subPartButton;
        currentSubButton.classList.add('pressedSubButton');
        subPart.colors.forEach((color) => {
        const colorButton = document.createElement('img');
        colorButton.src = color.iconUrl;

        colorButton.classList.add('colors');
        colorButton.addEventListener('click', function () {
            //promjenaBoje(subPart, color.url, object);
            adjustMeshHSV(subPart, color, object);
            if (subPart.subPartName=='All Pockets'){
                
                window.customProduct.customizableParts[0].subparts[1].pickedColor=color;
                window.customProduct.customizableParts[0].subparts[2].pickedColor=color;
                window.customProduct.customizableParts[0].subparts[3].pickedColor=color;
                window.customProduct.customizableParts[0].subparts[4].pickedColor=color;
            }
            else{
                subPart.pickedColor = color;
            }
            
            console.log(window.customProduct);
        });
        colorPalette.appendChild(colorButton);
    });
}
        
}

function openSubPartsMenu(partDiv, subPartsButtonsArray) {


    if (currentSubButton!=null){
        currentSubButton.classList.remove('pressedSubButton');
        currentSubButton=null;
    }

    const subButtonsFrame = document.getElementById("subButtonsFrame");


    if (currentButton==partDiv){
        partDiv.classList.remove('pressedButton');
        currentButton=null;
        subPartsButtonsArray.forEach((subPartButton) => subButtonsFrame.removeChild(subPartButton));
    }
    else {

        if (currentButton!=null){
            currentButton.classList.remove('pressedButton');
        }
        currentButton=partDiv
        currentButton.classList.add('pressedButton');
        subButtonsFrame.innerHTML = '';
        const colorsFrame=document.getElementById('color-pick');
        if (colorsFrame.innerHTML.trim() !== ''){
            colorsFrame.innerHTML=='';
        }
        subPartsButtonsArray.forEach((subPartButton) => {
            subButtonsFrame.appendChild(subPartButton);
            subPartButton.classList.add("subPartButton");
        });
    }

    document.getElementById("color-pick").innerHTML = '';


    if (subButtonsFrame.contains(subPartsButtonsArray[0])) {

       
        

        

    } else {
        
    }

}

/*function promjenaBoje(selectedPart, colorUrl, object) {
    console.log(selectedPart);
    console.log(colorUrl);
    const textureLoader = new THREE.TextureLoader();
    
    selectedPart.meshNames.forEach((meshName) =>{
        const part = object.getObjectByName(meshName);
        textureLoader.load(
            colorUrl,
            function (texture) {
                const material = new THREE.MeshStandardMaterial({ map: texture,
                    roughness: 0.7,
                    metalness:0
                 });
                part.material = material;
            },
            undefined,
            function (error) {
                console.error('Error loading image texture:', error);
            }
        );   

    });
}*/

function adjustMeshHSV(selectedPart, color, object) {
    selectedPart.meshNames.forEach((meshName) =>{
        const mesh = object.getObjectByName(meshName);
        if (!mesh.material || !mesh.material.map) {
            console.error("The mesh does not have a material with a texture map.");
            return;
        }


        if (meshName.includes("pocket")) {
            //("The string contains the word 'pocket'.");
            adjustOutlineHSV(object, color);
        }
    
        // Clone the existing material to avoid modifying the original
        const originalMaterial = mesh.material;
        const newMaterial = originalMaterial.clone();
    
        // Create shader material with HSV adjustment
        newMaterial.onBeforeCompile = function (shader) {
            shader.uniforms.hue = { value: color.hue };
            shader.uniforms.saturation = { value: color.saturation };
            shader.uniforms.value = { value: color.value };
    
            shader.fragmentShader = `
                uniform float hue;
                uniform float saturation;
                uniform float value;
    
                vec3 rgb2hsv(vec3 c) {
                    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
                    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
                    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
                    float d = q.x - min(q.w, q.y);
                    float e = 1.0e-10;
                    return vec3(abs((q.z + (q.w - q.y) / (6.0 * d + e))), d / (q.x + e), q.x);
                }
    
                vec3 hsv2rgb(vec3 c) {
                    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
                    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
                    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
                }
    
                ${shader.fragmentShader}
            `.replace(
                `#include <map_fragment>`,
                `
                #include <map_fragment>
                vec3 hsv = rgb2hsv(vec3(diffuseColor.r, diffuseColor.g, diffuseColor.b));
                hsv.x += hue;
                hsv.y *= saturation;
                hsv.z *= value;
                vec3 rgb = hsv2rgb(hsv);
                diffuseColor.rgb = rgb;
                `
            );
        };
    
        mesh.material = newMaterial;
    })
}

function adjustOutlineHSV(object, color){
    const meshNames=['outline1','outline2','outline3','outline4','outline5','outline6','outline7','outline8','outline9','outline10']

    meshNames.forEach((meshName) =>{
        const mesh = object.getObjectByName(meshName);
        if (!mesh.material || !mesh.material.map) {
            console.error("The mesh does not have a material with a texture map.");
            return;
        }
    
        // Clone the existing material to avoid modifying the original
        const originalMaterial = mesh.material;
        const newMaterial = originalMaterial.clone();
    
        // Create shader material with HSV adjustment
        newMaterial.onBeforeCompile = function (shader) {
            shader.uniforms.hue = { value: color.hue-0.1 };
            shader.uniforms.saturation = { value: 2 };
            shader.uniforms.value = { value: 2 };
    
            shader.fragmentShader = `
                uniform float hue;
                uniform float saturation;
                uniform float value;
    
                vec3 rgb2hsv(vec3 c) {
                    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
                    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
                    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
                    float d = q.x - min(q.w, q.y);
                    float e = 1.0e-10;
                    return vec3(abs((q.z + (q.w - q.y) / (6.0 * d + e))), d / (q.x + e), q.x);
                }
    
                vec3 hsv2rgb(vec3 c) {
                    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
                    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
                    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
                }
    
                ${shader.fragmentShader}
            `.replace(
                `#include <map_fragment>`,
                `
                #include <map_fragment>
                vec3 hsv = rgb2hsv(vec3(diffuseColor.r, diffuseColor.g, diffuseColor.b));
                hsv.x += hue;
                hsv.y *= saturation;
                hsv.z *= value;
                vec3 rgb = hsv2rgb(hsv);
                diffuseColor.rgb = rgb;
                `
            );
        };
    
        mesh.material = newMaterial;
    })

}
    
