//============================
// IMPORT DATA
import { attributes } from "./data/attributes.js";
import { sets } from "./data/sets.js"; //mltpc because sets noun verb confusion
let mltpc = sets;
import { equipment } from "./data/equipment.js";

// ARRAYS
let colors = [
  '--car',
  '--cag',
  '--cab',
  '--cay',
  '--cac',
  '--cam',
];

let icons = [
  "5.11_Tactical",
  "Aces_&_Eights",
  "Airaldi_Holdings",
  "Alps_Summit_Armaments",
  "backpack",
  "Badger_Tuff",
  "Belstone_Armory",
  "Brazos_de_Arcabuz",
  "Ceska_Vyroba_s.r.o.",
  "chest",
  "China_Light_Industries_Corporation",
  "coreBlue",
  "minorBlue",
  "modBlue2",
  "modBlue",
  "Douglas_&_Harding",
  "Eclipse_Protocol",
  "Empress_International",
  "Exotic",
  "Fenris_Group_AB",
  "Foundry_Bulwark",
  "Future_Initiative",
  "Gila_Guard",
  "gloves",
  "Golan_Gear_Ltd",
  "Grupo_Sombra_S.A.",
  "Hana-U_Corporation,",
  "Hard_Wired",
  "Heartbreaker",
  "holster",
  "Hunters_Fury",
  "Improvised",
  "kneepads",
  "main-weapon",
  "mask",
  "Murakami_Industries",
  "named",
  "Negotiators_Dilemma",
  "coreRed",
  "minorRed",
  "modRed2",
  "modRed",
  "Ongoing_Directive",
  "Overlord_Armaments",
  "Petrov_Defense_Group",
  "Providence_Defense",
  "Richter_&_Kaiser_GmbH",
  "Rigger",
  "shd_big",
  "sidearm",
  "Sokolov_Concern",
  "Strikers_Battlegear",
  "System_Corruption",
  "coreYellow",
  "minorYellow",
  "modYellow2",
  "modYellow",
  "Tip_of_the_Spear",
  "True_Patriot",
  "Umbra_Initiative",
  "Uzina_Getica",
  "Walker_Harris_&_Co",
  "Wyvern_Wear",
  "Yaahl_Gear",
];

// document.addEventListener('DOMContentLoaded', () => {

//============================
// DEBUG
//alert( 'Res: (W)' + screen.width + 'x(H)' + screen.height + '  ratio: ' + window.devicePixelRatio); // LapHD: 1920x1080 Lap: 1280x720; Mob: 432x896

//============================
// COLORIZE PANELS
let panels = document.getElementsByClassName("panel");
let ccnt = 0;

// iterate over all panels
for (let i = 0; i < panels.length; i++) {
  panels[i].style.borderColor = `var(${colors[ccnt]})`;
  ccnt++;
  if (ccnt >= colors.length) {
    ccnt = 0;
  }
}

//============================
// CONSISTANT PIXEL VARIABLE
document.documentElement.style.setProperty('--tpx', `calc(1px * ${window.devicePixelRatio})`);

// CONSISTANT PIXEL VARIABLE
//============================

//============================
// SET BACKGROUND ICONS
// iterate over icons-array
for (let i = 0; i < icons.length; i++) {
  var img = new Image();
  img.src = `./icons/${icons[i]}.png`;
  let value = `linear-gradient(var(--cbgr75), var(--cbgr75)), url(${img.src})`;
  let element = document.querySelectorAll(`[id *= "${icons[i]}"]`);
  if (element.length) {
    // iterate over all IDs with an icon name
    for (let j = 0; j < element.length; j++) {
      element[j].style.background = value;

      element[j].style.backgroundOrigin = 'content-box';
      element[j].style.backgroundSize = 'contain';
      element[j].style.backgroundPosition = 'center';
      element[j].style.backgroundRepeat = 'no-repeat';
    }
  }
};

// SET BACKGROUND ICONS
//============================

//============================
// CLONE EQUIPMENT SELECTION POPUPS
const tplPopupParent = document.getElementById('popup--frame-main');

// iterate over equipmentTypes
for (let equipmentTypeName in equipment) {
  let equipmentType = equipment[equipmentTypeName];

  const tplPopupSelectEquipmentTypeBase = document.getElementById(`template--popup--select-${equipmentTypeName}`);

  // iterate over gearTypes
  for (let gearTypeName in equipmentType) {
    let gearType = equipmentType[gearTypeName];

    let clonedPopupSelectEquipmentTypeNode = tplPopupSelectEquipmentTypeBase.content.cloneNode(true);
    let popupSelectEquipmentType = clonedPopupSelectEquipmentTypeNode.getElementById(`popup--select-${equipmentTypeName}-`);
    popupSelectEquipmentType.id += `-${gearTypeName}`;
    let listSelectEquipmentType = clonedPopupSelectEquipmentTypeNode.getElementById(`list--select-${equipmentTypeName}-`);
    listSelectEquipmentType.id += `-${gearTypeName}`;
    tplPopupParent.appendChild(clonedPopupSelectEquipmentTypeNode);

    popupSelectEquipmentType = document.getElementById(`${popupSelectEquipmentType.id}`)
    // TODO: update popupSelectEquipmentType before adding EventListener
    //popupSelectEquipmentType.addEventListener('click', (evt) => {
      //evt.stopPropagation()
    //});

    //============================
    // CLONE SELECTION LIST ENTRY
    const tplListEntryParent = document.getElementById(`${listSelectEquipmentType.id}`);
    const tplListEntryBase = document.getElementById('template--selection-list-entry');

    // iterate over all items in $gearType
    for (let gearItemName in gearType) {
      let gearItem = gearType[gearItemName];

      // get list entry panel
      let clonedListEntryNode = tplListEntryBase.content.cloneNode(true);
      let panelListEntry = clonedListEntryNode.getElementById('panel--list-entry-');
      panelListEntry.id += `-${gearItemName}`;

      tplListEntryParent.appendChild(clonedListEntryNode);
      panelListEntry = document.getElementById(`${panelListEntry.id}`);

      // list entry panel onclick
      panelListEntry.classList.add('cursor-pointer');
      panelListEntry.addEventListener('click', () => {
        applySelection(equipmentTypeName, gearTypeName, gearItem, gearItemName)
      }, false);

      // list entry panel color
      if (gearItem.rarity == "Exotic") {
        panelListEntry.style.borderColor = 'var(--cExotic)';
        panelListEntry.style.color = 'var(--cExotic)';
      }
      else if (gearItem.rarity == "Named") {
        panelListEntry.style.borderColor = 'var(--cNamed)';
        panelListEntry.style.color = 'var(--cNamed)';
      }
      else if (gearItem.rarity == "GearSet") {
        panelListEntry.style.borderColor = 'var(--cGearSet)';
        panelListEntry.style.color = 'var(--cGearSet)';
      }
      else if (gearItem.rarity == "HighEnd") {
        panelListEntry.style.borderColor = 'var(--cHighEnd)';
        panelListEntry.style.color = 'var(--cHighEnd)';
      }

      // list entry name
      let entryName = panelListEntry.getElementsByClassName('entry--name')[0];
      entryName.innerHTML = gearItemName;

      // list entry type
      if (gearItem.hasOwnProperty('type') && gearItem.type !== gearItemName) {
        let entryType = panelListEntry.getElementsByClassName('entry--type')[0];
        entryType.innerHTML = "(";
        entryType.innerHTML += gearItem.type;
        entryType.innerHTML += ")";
      };

      // list entry set (mltpc) boni
      let entryMltpcAttributes = panelListEntry.getElementsByClassName('entry--mltpc-attributes')[0];
      entryMltpcAttributes.classList.add('h-line--top');
      let mltpcAttribute1 = panelListEntry.getElementsByClassName('mltpc-attribute-1')[0];
      let mltpcAttribute2 = panelListEntry.getElementsByClassName('mltpc-attribute-2')[0];
      let mltpcAttribute3 = panelListEntry.getElementsByClassName('mltpc-attribute-3')[0];
      let mltpcName = gearItem.type;

      if (gearItem.rarity == "Exotic") {
        mltpcAttribute1.innerHTML = gearItem.attributeCore + ': ';
        mltpcAttribute1.innerHTML += gearItem.attributeCoreValue;
        mltpcAttribute2.innerHTML = gearItem.attributeMinor1 + ': ';
        mltpcAttribute2.innerHTML += gearItem.attributeMinor1Value;
        mltpcAttribute3.innerHTML = gearItem.attributeMinor2 + ': ';
        mltpcAttribute3.innerHTML += gearItem.attributeMinor2Value;
      }
      else if (gearItem.rarity == "GearSet") {
        mltpcAttribute1.innerHTML = mltpc[mltpcName].attributeCore + ': ';
        mltpcAttribute1.innerHTML += mltpc[mltpcName].attributeCoreValue;
        mltpcAttribute2.innerHTML = mltpc[mltpcName].attributeMinor1 + ': ';
        mltpcAttribute2.innerHTML += mltpc[mltpcName].attributeMinor1Value;
        mltpcAttribute3.innerHTML = mltpc[mltpcName].gearSetTalentName + '<br><br>';
        mltpcAttribute3.innerHTML += mltpc[mltpcName].gearSetTalentText;
      }
      else if (gearItem.rarity !== "Improvised") { //aka. is a normal brand-item
        mltpcAttribute1.innerHTML = mltpc[mltpcName].attribute1 + ': ';
        mltpcAttribute1.innerHTML += mltpc[mltpcName].attribute1Value;
        mltpcAttribute2.innerHTML = mltpc[mltpcName].attribute2 + ': ';
        mltpcAttribute2.innerHTML += mltpc[mltpcName].attribute2Value;
        mltpcAttribute3.innerHTML = mltpc[mltpcName].attribute3 + ': ';
        mltpcAttribute3.innerHTML += mltpc[mltpcName].attribute3Value;
      };

      // list entry talent
      let entryTalent = panelListEntry.getElementsByClassName('entry--talent-name')[0];
      if (gearItem.hasOwnProperty('talentName')) {
        entryTalent.classList.add('h-line--top');
        entryTalent.innerHTML = gearItem.talentName;
      };
      if (gearItem.hasOwnProperty('talentText')) {
        panelListEntry.getElementsByClassName('entry--talent-text')[0].innerHTML = gearItem.talentText;
      };
    }

    // CLONE SELECTION LIST ENTRY
    //============================
  }
}

// CLONE EQUIPMENT SELECTION POPUPS
//============================

//==============================
// EVENT LISTENERS
document.getElementById('button--mobile-console').addEventListener('click', () => {
  document.write('<script id="script--mobile-console" defer src="./include/hnl.mobileconsole.js"></script>');
})
// create event listener aborts
let abortControlls = {};

// add listener: close popup on background click
let popupFrameMain = document.getElementById("popup--frame-main");
popupFrameMain.addEventListener('click', () => {
  hidePopup();
}, false);

// add removable listener to gearslot-panel: show selection popup
for (let equipmentTypeName in equipment) {
  let equipmentType = equipment[equipmentTypeName];
  for (let gearTypeName in equipmentType) {
    let panelGearType = document.getElementById(`panel--${gearTypeName}`);
    panelGearType.classList.add('cursor-pointer');

    // create event listener abort
    abortControlls[`controller-${gearTypeName}`] = new AbortController();

    panelGearType.addEventListener('click', () => {
      showPopup(equipmentTypeName, gearTypeName);
    }, { signal: abortControlls[`controller-${gearTypeName}`].signal }, false);
  }
}

// EVENT LISTENERS
//==============================

//==============================
// FUNCTIONS
function showPopup(equipmentTypeName, gearTypeName) {
  //document.getElementById('popup--frame-main').style.display = "flex";
  document.getElementById('popup--frame-main').classList.remove("hide");
  //document.getElementById(`popup--select-armor--${equipmentTypeName}`).style.display = "flex";
  document.getElementById(`popup--select-${equipmentTypeName}--${gearTypeName}`).classList.remove("hide");
  // reset scroll state to top
  document.getElementById(`list--select-${equipmentTypeName}--${gearTypeName}`).scrollTop = 0;
  document.body.style.overflow = "hidden";
}

function hidePopup() {
  document.getElementById('popup--frame-main').classList.add("hide");
  document.body.style.overflow = "";
}

function applySelection(equipmentTypeName, gearTypeName, gearItem, gearItemName) {
  let panelGearType = document.getElementById(`panel--${gearTypeName}`);

  // remove previous showPopup listener, bc slot content has to be clickable
  panelGearType.classList.remove('cursor-pointer');
  abortControlls[`controller-${gearTypeName}`].abort();

  hidePopup();

  //============================
  // CLONE GEAR SLOT
  const tplGearslotParent = document.getElementById(`panel--${gearTypeName}`);
  tplGearslotParent.innerHTML = "";
  const tplGearslotBase = document.getElementById('template--gearslot');
  let clonedGearslotNode = tplGearslotBase.content.cloneNode(true);

  let gearslot = clonedGearslotNode.getElementById('gearslot-');
  gearslot.id += `-${gearTypeName}`;

  tplGearslotParent.appendChild(clonedGearslotNode);
  gearslot = document.getElementById(`${gearslot.id}`);

  // gearslot-name
  let gearslotName = gearslot.getElementsByClassName('gearslot--name')[0];
  gearslotName.childNodes[0].nodeValue = gearItemName;

  // add new showPopup listener to "Name" div
  gearslotName.classList.add('cursor-pointer');
  gearslotName.addEventListener('click', () => {
    showPopup(equipmentTypeName, gearTypeName);
  }, false);

  // gearslot color
  if (gearItem.rarity == "Exotic") {
    tplGearslotParent.style.borderColor = 'var(--cExotic)';
    gearslotName.style.color = 'var(--cExotic)';
    gearslotName.style.background = 'linear-gradient(28deg, var(--c0), var(--cExotic))';
  }
  else if (gearItem.rarity == "GearSet") {
    tplGearslotParent.style.borderColor = 'var(--cGearSet)';
    gearslotName.style.color = 'var(--cGearSet)';
    gearslotName.style.background = 'linear-gradient(28deg, var(--c0), var(--cGearSet))';
  }
  else if (gearItem.rarity == "Named") {
    tplGearslotParent.style.borderColor = 'var(--cNamed)';
    gearslotName.style.color = 'var(--cNamed)';
    gearslotName.style.background = 'linear-gradient(28deg, var(--c0), var(--cNamed))';
  }
  else if (gearItem.rarity == "HighEnd") {
    tplGearslotParent.style.borderColor = 'var(--cHighEnd)';
    gearslotName.style.color = 'var(--cHighEnd)';
    gearslotName.style.background = 'linear-gradient(28deg, var(--c0), var(--cNamed))';
  };

  //============================
  // GEARSLOT ATTRIBUTES
  let attributeTypeNames = []
  attributeTypeNames.push('core attribute');
  attributeTypeNames.push('minor attribute');
  if (gearItem.rarity !== 'GearSet') {attributeTypeNames.push('minor attribute')};
  if (gearTypeName == 'mask' || gearTypeName == 'backpack' || gearTypeName == 'chest' || gearItem.type == 'Improvised') {attributeTypeNames.push('mod')};
  if (gearItem.rarity == 'Exotic' || gearTypeName == 'backpack' || gearItemName == 'chest') {attributeTypeNames.push('talent')}

  for (let attributeTypeName of attributeTypeNames) {
    let attributeTypeNameData = attributeTypeName; //to choose from attributes-object
    if (attributeTypeName == 'minor attribute' && document.getElementById(`dropdown--selector--${gearTypeName}--${attributeTypeNameData} 1`) == null) {attributeTypeNameData = attributeTypeName; attributeTypeName = "minor attribute 1"}
    else if (attributeTypeName == 'minor attribute' && document.getElementById(`dropdown--selector--${gearTypeName}--${attributeTypeName} 1`) !== null) {attributeTypeNameData = attributeTypeName; attributeTypeName = "minor attribute 2"}

    console.log(`attributeTypeName: ${attributeTypeName}; attributeTypeNameData: ${attributeTypeNameData}`)

    //============================
    // CORE ATTRIBUTE DROPDOWN SELECTOR
    const tplDropdownSelectorParent = gearslot;
    const tplDropdownSelectorBase = document.getElementById('template--dropdown');
    let clonedDropdownSelectorNode = tplDropdownSelectorBase.content.cloneNode(true);
    let dropdownSelector = clonedDropdownSelectorNode.getElementById('dropdown--selector-');
    dropdownSelector.id += `-${gearTypeName}--${attributeTypeName}`;
    let dropdownOptions = clonedDropdownSelectorNode.getElementById('dropdown--options-');
    dropdownOptions.id += `-${gearTypeName}--${attributeTypeName}`;
    tplDropdownSelectorParent.appendChild(clonedDropdownSelectorNode);
    dropdownSelector = document.getElementById(`${dropdownSelector.id}`);
    dropdownOptions = dropdownOptions.getElementsByClassName('dropdown--options')[0];

    dropdownSelector.classList.add('h-line--bottom');

    let dropdownSelectorText = dropdownSelector.getElementsByClassName('dropdown--selector--text')[0];
    let dropdownSelectorValue = dropdownSelector.getElementsByClassName('dropdown--selector--value')[0];
    let dropdownSelectorSymbol = dropdownSelector.getElementsByClassName('symbol')[0];

    // core attribute dropdown selector default
    dropdownSelectorText.innerHTML = `Select ${attributeTypeNameData}`;

    if (gearItem.hasOwnProperty(attributeTypeName)) {
      let gearItemAttributeTypeName = gearItem[attributeTypeName].name;
      let pngName = attributes[equipmentTypeName][attributeTypeNameData][gearItemAttributeTypeName].png;
      let img = new Image();
      img.src = `./icons/${pngName}.png`;
      dropdownSelectorText.innerHTML = "";
      dropdownSelectorText.appendChild(img);
      dropdownSelectorText.innerHTML += " " + gearItemAttributeTypeName;

      dropdownSelectorValue.innerHTML = `${attributes[equipmentTypeName][attributeTypeNameData][gearItemAttributeTypeName].value}`;

      if (gearItem[attributeTypeName].hasOwnProperty('value')) {
        dropdownSelectorValue.innerHTML = gearItem[attributeTypeName].value;
      }
    }

    // core attribute dropdown selector onclick
    if (!(gearItem.hasOwnProperty(attributeTypeName))) {
      dropdownSelectorSymbol.innerHTML = "&#9660";
      dropdownSelector.addEventListener('click', () => {
        dropdownOptions.classList.toggle('hide');
        if (dropdownOptions.classList.contains('hide')) {
          dropdownSelectorSymbol.innerHTML = "&#9660";
        }
        else {
          dropdownSelectorSymbol.innerHTML = "&#9661";
        }
      })
    }
    // CORE ATTRIBUTE DROPDOWN SELECTOR
    //============================

    //============================
    // CORE ATTRIBUTE DROPDOWN OPTIONS
    const tplDropdownOptionParent = dropdownOptions;
    const tplDropdownOptionBase = document.getElementById('template--dropdown--option');
    
    // iterate over attributes armor core
    for (let attributeName of Object.keys(attributes[equipmentTypeName][attributeTypeNameData])) {
      console.log(`attributeName: ${attributeName}`)
      let clonedDropdownOptionNode = tplDropdownOptionBase.content.cloneNode(true);
      let dropdownOption = clonedDropdownOptionNode.getElementById('dropdown--option-');
      dropdownOption.id += `-${gearTypeName}--${attributeTypeName}--${attributeName}`;
      tplDropdownOptionParent.appendChild(clonedDropdownOptionNode);
      dropdownOption = document.getElementById(`${dropdownOption.id}`);

      let dropdownOptionKey = dropdownOption.getElementsByClassName('dropdown--option--key')[0];

      let pngName = attributes[equipmentTypeName][attributeTypeNameData][attributeName].png;
      let img = new Image();
      img.src = `./icons/${pngName}.png`;
      dropdownOptionKey.appendChild(img);
      dropdownOptionKey.innerHTML += ` ${attributeName}`;

      let dropdownOptionValue = dropdownOption.getElementsByClassName('dropdown--option--value')[0];
      let optionValue = attributes[equipmentTypeName][attributeTypeNameData][attributeName].value;
      dropdownOptionValue.innerHTML = `${optionValue}`;

      // core attribute dropdown option onclick
      dropdownOption.addEventListener('click', () => {
        dropdownSelectorText.innerHTML = dropdownOptionKey.innerHTML;
        dropdownSelectorValue.innerHTML = dropdownOptionValue.innerHTML;
        dropdownSelectorSymbol.innerHTML = "&#9660";
        dropdownOptions.classList.add('hide');
      })
    }
    // CORE ATTRIBUTE DROPDOWN OPTIONS
    //============================

  }
  // GEARSLOT ATTRIBUTES
  //============================

  // CLONE GEAR SLOT
  //============================
}

  // FUNCTIONS
  //==============================
// }, false);

/*
let eventTarget = document.querySelectorAll(`[id*="${icons[i]}"]`);

const tplXXXtemplatenameXXXParent = XXXparentnameXXX;
const tplXXXtemplatenameXXXBase = document.getElementById('template--XXXtemplatenameXXX');
let clonedXXXtemplatenameXXXNode = tplXXXtemplatenameXXXBase.content.cloneNode(true);
let XXXtemplatefirstchildXXX = clonedXXXtemplatenameXXXNode.getElementById('XXXtemplatenameXXX--XXXtemplatefirstchildXXX-');
XXXtemplatefirstchildXXX.id += "-XXXfirstchildidXXX";
tplXXXtemplatenameXXXParent.appendChild(clonedXXXtemplatenameXXXNode);
XXXtemplatefirstchildXXX = document.getElementById(`${XXXtemplatefirstchildXXX.id}`);
*/
