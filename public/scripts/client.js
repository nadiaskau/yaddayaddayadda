let slider = document.getElementById('switch');
slider.addEventListener('change', changeTheme);

function changeTheme() {
  let checked = document.getElementById('switch').checked;
  if (!checked) {
    document
      .getElementById('pagestyle')
      .setAttribute('href', 'stylesheets/styleColor.css');
  } else {
    document
      .getElementById('pagestyle')
      .setAttribute('href', 'stylesheets/style.css');
  }
}
