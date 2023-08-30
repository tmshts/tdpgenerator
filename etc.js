function getRadioValue(id) {
    let children = document.querySelectorAll(id);
    for(const child of children) {
        if(child.checked){
            return child.value;
        }
    }
}

function getCheckValue(cls) {
    const arr = []
    let children = document.querySelectorAll(cls);
    for(const child of children) {
        if(child.checked){
            arr.push(child.value)
        }
    }
    return arr;
}

export{getRadioValue, getCheckValue};