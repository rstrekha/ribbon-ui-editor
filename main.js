const btnCreateGroup2 = document.querySelector('.ribbon-editor-button-2');
const btnCreateGroup3 = document.querySelector('.ribbon-editor-button-3');
const ribbonNav = document.getElementById('ribbon-nav');

btnCreateGroup2.onclick = createTwoButtonGroup;
btnCreateGroup3.onclick = createThreeButtonGroup;

ribbonNav.onclick = function(event) {
    let selectedButton = event.target.closest('.ribbon-tab-button');
    let tabName = selectedButton.dataset.tabName;
    let ribbonId = 'tab-' + tabName;

    let ribbonButtons = document.querySelectorAll('nav button');
    for (let button of ribbonButtons) button.classList.remove('active-button');
    selectedButton.classList.add('active-button');
    
    let selectedRibbon = document.getElementById(ribbonId);
    selectedRibbon.style.zIndex = '1';
    selectedRibbon.classList.add('active');
    for (let ribbon of document.querySelectorAll('.ribbon-group-container')) {
        if (ribbon != selectedRibbon) {
            ribbon.style.zIndex = '-1';
            ribbon.classList.remove('active');
        }
    }
}

function addButtonHandlersForGroup(ribbonGroup) {
    let editButton = ribbonGroup.querySelector('.edit-button-row').firstElementChild;
    let leftButton = ribbonGroup.querySelector('.edit-button-row').children[1];
    let rightButton = ribbonGroup.querySelector('.edit-button-row').lastElementChild;
    
    editButton.onclick = function(e) {
        let ribbonGroup = e.target.closest('.ribbon-group');
        editGroup(ribbonGroup);
    };
    
    leftButton.onclick = function(e) { 
        let ribbonGroup = e.target.closest('.ribbon-group');
        let previousRibbonGroup = ribbonGroup.previousElementSibling;
        
        // Swap the elements.
        if (previousRibbonGroup) {
            previousRibbonGroup.before(ribbonGroup);
        } else {
            ribbonGroup.parentElement.lastElementChild.after(ribbonGroup);
        }
    };
    
    rightButton.onclick = function(e) {
        let ribbonGroup = e.target.closest('.ribbon-group');
        let nextRibbonGroup = ribbonGroup.nextElementSibling;
        
        // Swap the elements.
        if (nextRibbonGroup) {
            nextRibbonGroup.after(ribbonGroup);
        } else {
            ribbonGroup.parentElement.firstElementChild.before(ribbonGroup);
        }
    };
}

// Add a hard-coded ribbon group to the ribbon tab.
function createTwoButtonGroup() {
    let newGroup = document.createElement('div');
    newGroup.classList.add('ribbon-group');
    newGroup.classList.add('two-button-columns');
    
    let button1 = document.createElement('button');
    let button2 = document.createElement('button');
    button1.classList.add('btn-col');
    button1.innerHTML = '<i class="far fa-file"></i><br/>Button One';
    button2.classList.add('btn-col');
    button2.innerHTML = '<i class="far fa-file"></i><br/>Button Two';
    
    let caption = document.createElement('div');
    caption.classList.add('label');
    caption.textContent = prompt('Name the group with a descriptive caption: ', '') ?? 'Test';
    
    let editButtonGroup = document.createElement('div');
    editButtonGroup.classList.add('edit-button-row');
    editButtonGroup.innerHTML = '<button>✎</button> <button>◀</button> <button>▶</button>';
    
    newGroup.append(button1, button2);
    newGroup.append(caption);
    newGroup.append(editButtonGroup);
    
    addButtonHandlersForGroup(newGroup);
    
    let activeTab = document.querySelector('.active');
    activeTab.append(newGroup);
}

// Add a hard-coded ribbon group to the ribbon tab.
function createThreeButtonGroup() {
    let newGroup = document.createElement('div');
    newGroup.classList.add('ribbon-group');
    newGroup.classList.add('three-button-columns');
    
    let button1 = document.createElement('button');
    let button2 = document.createElement('button');
    let button3 = document.createElement('button');
    button1.classList.add('btn-col');
    button1.innerHTML = '<i class="far fa-file"></i><br/>Button One';
    button2.classList.add('btn-col');
    button2.innerHTML = '<i class="far fa-file"></i><br/>Button Two';
    button3.classList.add('btn-col');
    button3.innerHTML = '<i class="far fa-file"></i><br/>Button Three';
    
    let caption = document.createElement('div');
    caption.classList.add('label');
    caption.textContent = prompt('Name the group with a descriptive caption: ', '') ?? 'Test';
    
    let editButtonGroup = document.createElement('div');
    editButtonGroup.classList.add('edit-button-row');
    editButtonGroup.innerHTML = '<button>✎</button> <button>◀</button> <button>▶</button>';
    
    newGroup.append(button1, button2, button3);
    newGroup.append(caption);
    newGroup.append(editButtonGroup);
    
    addButtonHandlersForGroup(newGroup);
    
    let activeTab = document.querySelector('.active');
    activeTab.append(newGroup);
}

// Add edit and arrow buttons to each ribbon group.
let ribbonGroups = document.querySelectorAll('.ribbon-group-container .ribbon-group');
for (let ribbonGroup of ribbonGroups) {
    let editButtonGroup = document.createElement('div');
    editButtonGroup.classList.add('edit-button-row');
    editButtonGroup.innerHTML = '<button>✎</button> <button>◀</button> <button>▶</button>';
    ribbonGroup.append(editButtonGroup);
    
    addButtonHandlersForGroup(ribbonGroup);
    console.log('Adding event handler');
}

// Event handler for Alt-key tooltips.
document.addEventListener('keyup', function(event) {
    if (event.key == 'Alt') {
        event.preventDefault();
        if (document.querySelector('#ribbon-nav .button-wrapper span')) {
            let tooltips = document.querySelectorAll('#ribbon-nav .button-wrapper span');
            tooltips.forEach(t => t.remove());
            document.onkeyup = null;
        } else {
            let navButtons = document.querySelectorAll('.ribbon-tab-button');
            let tooltipKeys = [];
            for (let button of navButtons) {
                let tooltipText = button.dataset.keyTooltip;
                tooltipKeys.push(tooltipText.slice(0,1));
                let tooltip = document.createElement('span');
                tooltip.style.position = 'absolute';
                tooltip.innerHTML = tooltipText;
                tooltip.style.left = ((button.clientWidth - tooltip.getBoundingClientRect().width - 8) / 2) + 'px';
                console.log('clientWidth: ' + tooltip.getBoundingClientRect().width);
                tooltip.style.bottom = '-16px';
                button.closest('.button-wrapper').append(tooltip);
            }
            console.log(tooltipKeys);
            document.onkeyup = function(e) {
                let key = e.key.toUpperCase();
                if (tooltipKeys.includes(key)) {
                    let button = document.querySelector(`[data-key-tooltip="${key}"]`);
                    button.click();
                }
            };
        }

        if (document.getElementById('ribbon-nav').classList.contains('alt-tooltips')) {
            
        }
    }
});
