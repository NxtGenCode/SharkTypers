const colorBlocks = document.getElementsByClassName('color-block');

const sharkPreview = document.getElementById('shark-preview');

function changeColor(e){
    return sharkPreview.setAttribute('src', './img/sharks/'+`${e.target.id}`+'-shark.png');
}

for(i = 0; i < colorBlocks.length; i++){
    colorBlocks[i].addEventListener('click', changeColor)
}