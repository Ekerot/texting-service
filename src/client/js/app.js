// *** CLIENT JS *** //

function toggleSpinner() {
  var spinner = document.getElementById('loading-spinner');

  spinner.classList.toggle('hide-spinner');
}

function sendMessage() {
  var name = document.getElementById('text1').value;
  var place = document.getElementById('text2').value;
  var xhr = new XMLHttpRequest();

  toggleSpinner();

  xhr.open('POST', 'http://gsiot-kqp9-e4pf.try.yaler.io/message', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    text1: name,
    text2: place
  }));

  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var response = JSON.parse(xhr.responseText);
      var image = document.getElementById('text-image-response');

      image.setAttribute('src', response.imgUrl);

      toggleSpinner();
    }
  };
}
