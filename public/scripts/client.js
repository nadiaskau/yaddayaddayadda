let slider = document.getElementById('switch');
slider.addEventListener('change', changeTheme);
let userid;
let usertheme;

window.onload = function () {
  init();
};

//Fetching our user
async function getUser(url = '/users/theme') {
  const user = await fetch(url, {
    method: 'GET',
  });
  return user.json();
}

//Sending theme option
async function updateUserTheme(body) {
  await fetch('/users/theme', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-type': 'application/json' },
    redirect: 'follow',
  })
    .then((theme) => theme.json())
    .then((text) => console.log(text));
}

//On page load
async function init() {
  //let theme;
  let checked = document.getElementById('switch');

  //Calling the fetch to check for theme option
  getUser().then((user) => {
    if (user.theme == 0) {
      checked.checked = false;
      document
        .getElementById('pagestyle')
        .setAttribute('href', 'stylesheets/styleColor.css');
    } else {
      checked.checked = true;
      document
        .getElementById('pagestyle')
        .setAttribute('href', 'stylesheets/style.css');
    }
    userid = user._id;
  });
}

async function changeTheme() {
  let checked = document.getElementById('switch').checked;
  let theme;
  if (checked) {
    theme = 1;
  } else {
    theme = 0;
  }

  //Body for the POST request
  let body = { theme: theme };
  //Calling our fetch POST to update user theme in MongoDB
  updateUserTheme(body);
  //Refreshing our page
  window.location.href = '/';
}
