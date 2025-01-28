function spark(event: MouseEvent){
    let iElement = document.createElement('i') as HTMLElement;
    
    // top and lef related to the position of this element. 
    iElement.style.top = (event.pageY) + 'px';
    iElement.style.left = (event.pageX) + 'px';
    
    iElement.classList.add("mouse-movement");
    iElement.style.scale = `${Math.random() * 2 + 1 }`

    iElement.style.setProperty("--xAxis",pixelPath());
    iElement.style.setProperty("--yAxis",pixelPath());

    document.body.appendChild(iElement);
    setTimeout(() => { document.body.removeChild(iElement) } , 2000)
}


function pixelPath() :string {
    return `${Math.random()*400-200}px`;
}

let submitBtn = document.querySelector(".submitBtn")  as HTMLElement;
let mainInput = document.querySelector(".messageBox") as HTMLElement;

function showSubmitBtn(){    
    submitBtn.style.opacity=`${1}`;
}

mainInput.addEventListener("keydown",showSubmitBtn);
document.addEventListener('mousemove',spark);