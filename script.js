const text = document.querySelector('#myInput');
const btn = document.querySelector('.addBtn');
const ul = document.querySelector('ul');
const tabs = document.querySelectorAll('.tabs>div');
const tabsContainer = tabs[0].parentNode;


function createLi(text, classLi){
  if (text.length>1){
    const li = document.createElement('li');
    const trash = document.createElement('img');
    const inProgress = document.createElement('img');
    if(text.indexOf(classLi) > -1){
      text = text.slice(0, text.indexOf(classLi));
      li.className = classLi;
    }
    li.innerHTML = text;
    trash.src = 'https://cdn2.iconfinder.com/data/icons/web/512/Trash_Can-512.png';
    trash.className = 'trash';
    inProgress.src= 'https://png.icons8.com/ios/1600/in-progress.png';
    inProgress.className = 'inProgress';
    li.appendChild(trash);
    li.appendChild(inProgress);
    ul.appendChild(li);
    if (!classLi){
        localStorage.setItem(text, text);
    }

  }
}

function createList(){
  tabs[0].classList.add('selected');
  for (key in localStorage){
      if(localStorage.hasOwnProperty(key)){
        if (key.indexOf('inProgressLi')>-1){
          createLi(key, 'inProgressLi');
          continue;
        }
        createLi(key, 'checked');
      }
    }
}
createList();

btn.addEventListener('click', ()=>{
  createLi(text.value);
  text.value = '';
}, false);

text.addEventListener('keyup', (e)=>{
   if(e.keyCode == 13){
     createLi(text.value)
     text.value = '';
   }
}, false);

function changeState(target, clas){
  let text = target.textContent;
  if(target.className !== clas){
    target.className = clas;
    delete localStorage[text];
    delete localStorage[text + 'inProgressLi'];
    delete localStorage[text + 'checked'];
    localStorage.setItem(text + clas, text);
    return;
   }
    target.classList.remove(clas);
    delete localStorage[text + clas];
    localStorage.setItem(text, text);
}

ul.addEventListener('click', (e)=>{
  if (e.target.tagName === 'LI') {
    changeState(e.target, 'checked');
  }
  if (e.target.className === 'trash'){
    delete localStorage[e.target.parentNode.textContent + 'checked'];
    delete localStorage[e.target.parentNode.textContent + 'inProgressLi']
    delete localStorage[e.target.parentNode.textContent];
    ul.removeChild(e.target.parentNode);
  }

  if(e.target.className === 'inProgress'){
    changeState(e.target.parentNode, 'inProgressLi')
  }

},false);


function newListWithParam(target, param){

  for(i = 0; i<tabs.length; i++){
    tabs[i].classList.remove('selected');
  }
  target.classList.add('selected');
    while (ul.firstChild) {
     ul.removeChild(ul.firstChild);
    }
  for (key in localStorage){
      if (key.indexOf(param)>-1){
        if(localStorage.hasOwnProperty(key)){
            createLi(key, param);
        }
      }
   }
}
tabsContainer.addEventListener('click',(e)=>{
   if (e.target.className === 'progress'){
        newListWithParam(e.target, 'inProgressLi');
   }
   if(e.target.className === 'done'){
        newListWithParam(e.target, 'checked');
   }
   if(e.target.className === 'all'){
     while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
     }
     for(i = 0; i<tabs.length; i++){
       tabs[i].classList.remove('selected');
     }
     e.target.classList.add('selected');
     createList();
   }
}, false)
