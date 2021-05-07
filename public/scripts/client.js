let slider = document.getElementById('switch');
slider.addEventListener('change', changeTheme);

window.onload = function() {
  init();
};




async function init(){
  //let theme; 
  let checked = document.getElementById('switch');

  //Fetching our user
async function getUser(url = '/users/theme'){
  const user = await fetch(url, {
    method:'GET'})
    return user.json(); 
}
  //Calling the fetch
  getUser().then(data => {
    if(data.theme == 0){
      checked.checked = false;
    }
    else {
      checked.checked = true;
    }
  });
}

async function changeTheme() {
/*   let checked = document.getElementById('switch').checked;
  let toggle = document.getElementById('switch'); 
  let theme; 

  getUser().then(data => {data = theme})

  if(theme == 0){
    checked = false;
  }

  if (theme == 1) {
    document
      .getElementById('pagestyle')
      .setAttribute('href', 'stylesheets/styleColor.css');
      
  } else {
    document
      .getElementById('pagestyle')
      .setAttribute('href', 'stylesheets/style.css');
  } */
}
