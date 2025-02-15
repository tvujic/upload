import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//#region Inicijalizacija scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, (window.innerWidth/1.5) / (window.innerHeight/1.5), 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth/1.5, window.innerHeight/1.5);
renderer.setClearColor(0xDBDBDB);
document.getElementById("canvas-frame").appendChild(renderer.domElement);
renderer.setClearColor(0xDBDBDB);
let controls;
//#endregion


const custom_wallet = {
    name: "wallet",
    customizableParts: [
        {
            name: "pockets",
            price: 500,
            subparts: [{ subPartName: "All Pockets", colors: ['crna-mala','plava-mala'], pickedColor: 'crna-mala' },
            { subPartName: "Left Upper Pocket", colors: ['crna-mala','plava-mala'], pickedColor: 'crna-mala'  },
            { subPartName: "Left Middle Pocket", colors: ['crna-mala'], pickedColor: 'crna-mala'  },
            { subPartName: "Left Lower Pocket", colors: ['crna-mala','plava-mala'], pickedColor: 'crna-mala'  },
            { subPartName: "Right Upper Pocket", colors: ['crna-mala','plava-mala'], pickedColor: 'crna-mala'  },
            { subPartName: "Right Middle Pocket", colors: ['crna-mala','plava-mala'], pickedColor: 'crna-mala'  },
            { subPartName: "Right Lower Pocket", colors: ['crna-mala','plava-mala'], pickedColor: 'crna-mala'  }],
        },
        {
            name: "leather",
            subparts: [
                { subPartName: "Outer", colors: ['crna-mala','plava-mala'], pickedColor: 'crna-mala'  },
                { subPartName: "Middle", colors: ['crna-mala','plava-mala'], pickedColor: 'crna-mala'  },
                { subPartName: "Inside", colors: ['crna-mala','plava-mala'], pickedColor: 'crna-mala'  }
            ]
        },
        {
            name: "stitches",
            subparts: [
                { subPartName: "Front", colors: ['plava-mala'], pickedColor: 'crna-mala'  },
                { subPartName: "zadnji_sav", colors: ['crna-mala','plava-mala'], pickedColor: 'crna-mala'  },
                { subPartName: "Side", colors: ['crna-mala','plava-mala'], pickedColor: 'crna-mala'  }
            ]
        }
    ],
    mtlFile: "/customization/models/wallet/wallet.mtl",
    objFile: "/customization/models/wallet/wallet.obj"
};


const pickWalletButton=document.getElementById('pickWalletButton');
pickWalletButton.addEventListener('click', function() { 
    window.customProduct=custom_wallet;
    loadProductModel(customProduct); });



// Dispatch the custom event when a click event occurs



function clearCanvasAndButtons() {
    // Remove all objects from the scene
    scene.children.forEach(child => {
        scene.remove(child);
    });
    const subButtonsFrame=document.getElementById("subButtonsFrame");
    subButtonsFrame.innerHTML='';
    const colorPalette=document.getElementById("color-pick");
    colorPalette.innerHTML='';
}

function loadProductModel(product1){
    clearCanvasAndButtons();
    
    if (controls !== undefined) {
        controls.dispose();
    }
    const mtlLoader = new MTLLoader();
    mtlLoader.load(
        product1.mtlFile,
        function(materials) {
            materials.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(
                product1.objFile,
                function(object) {
                    object.traverse((child) => {
                        if (child.isMesh) {
                            console.log('Processing mesh:', child);
            
                            // Check if geometry is defined
                            if (child.geometry) {
                                // Recompute normals and enable double-sided rendering
                                child.geometry.computeVertexNormals();
                                child.material.side = THREE.DoubleSide;
                            } else {
                                console.warn('Mesh has no geometry:', child);
                            }
                        }
                    });
                    scene.add(object);
                    const boundingBox = new THREE.Box3().setFromObject(object); 
                    const center = new THREE.Vector3();
                    boundingBox.getCenter(center);
                     //#region Definiranje tipki za promjenu boje dijelova
                    const mainButtonFrame=document.getElementById("buttonsFrame");
                    mainButtonFrame.innerHTML='';
                   
                    product1.customizableParts.forEach((part1) => {
                        const partDiv=document.createElement("div");
                        const partName=document.createElement("p");
                        partDiv.classList.add("partPick");
                        partName.innerText=part1.name;
                        partDiv.appendChild(partName);
                        part1.subPartButtons=[];
                        part1.subparts.forEach((subpart1) => {
                            const subPartButton=document.createElement("div");
                            const subPartButtonText= document.createElement("p");
                            subPartButtonText.innerText=subpart1.subPartName;
                            subPartButton.appendChild(subPartButtonText);
                            part1.subPartButtons.push(subPartButton);
                            subPartButton.addEventListener('click', function() { prikaziBoje(subpart1,object); });
                            
                        });
                        mainButtonFrame.appendChild(partDiv);
                        partDiv.addEventListener('click', function() { openSubPartsMenu(part1.subPartButtons); });
                    });
                    //#endregion
                    
    
                    object.traverse(function(child) {
                        if (child.isMesh) {
                            console.log('Mesh name:', child.name);
                        }
                    }

                    );
                    
                    controls = new OrbitControls(camera, renderer.domElement);
                    controls.enableDamping = true;
                    controls.dampingFactor = 0.25;
                    controls.rotateSpeed = 0.35;
                    controls.zoomSpeed = 0.8;
                    controls.minDistance = 2;
                    controls.enablePan = false;
                    camera.position.copy(center);
                    camera.position.z += boundingBox.getSize(new THREE.Vector3()).length() * 1; 
                    controls.target.copy(center);
    
                    function animate() {
                        requestAnimationFrame(animate);
                        renderer.render(scene, camera);
                    }
                    animate();

                    window.addEventListener('wheel', function(event) {
                        if (event.deltaY) {
                            const delta = event.deltaY > 0 ? -0.1 : 0.1;
                            zoom(delta);
                        }
                    });
    
                },
                function(xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                    
                },
                function(error) {
                    console.error('Error loading the OBJ model', error);
                }
            );
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function(error) {
            console.error('Error loading the MTL file', error);
        }
    );
    //#endregion
    
    //#region Postavljanje osvjetljenja 
    const light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1).normalize();
    scene.add(directionalLight);
    // Set camera position
    camera.position.z = 5;
    function zoom(delta) {
        camera.position.z += delta;
    }
    
    //#endregion
}



function prikaziBoje(subPart, object) {
    const mesh = object.getObjectByName(subPart.subPartName);

        const colorPalette=document.getElementById("color-pick");
        colorPalette.innerHTML='';

        subPart.colors.forEach((color) => {
            const colorButton = document.createElement('img');
            const colorUrl='/pictures/colors-mini/'+color+'.jpg';
            colorButton.src=colorUrl;

            colorButton.classList.add('colors');
            colorButton.addEventListener('click', function() {
                promjenaBoje(mesh,colorUrl);
                subPart.pickedColor=color;
                console.log(subPart);
            });
            colorPalette.appendChild(colorButton); 
            
        });
        
    
}

function openSubPartsMenu(subPartsButtonsArray){
    const subButtonsFrame=document.getElementById("subButtonsFrame");
    

    if(subButtonsFrame.contains(subPartsButtonsArray[0])){
        
        subPartsButtonsArray.forEach((subPartButton) => subButtonsFrame.removeChild(subPartButton));
        document.getElementById("color-pick").innerHTML='';
        
    }
    else{
        subButtonsFrame.innerHTML='';
        subPartsButtonsArray.forEach((subPartButton) => {
            subButtonsFrame.appendChild(subPartButton);
            subPartButton.classList.add("subPartButton");
        });
    }
    
}

function promjenaBoje(mesh,urlBoje){
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
    	urlBoje,
    function(texture) {
        const material = new THREE.MeshBasicMaterial({ map: texture });
        mesh.material = material;
    },
    undefined,
    function(error) {
        console.error('Error loading image texture:', error);
    }
);
}




