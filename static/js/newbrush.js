window.onload = () => {
   const canvas = document.getElementById('canvas');
   const saveButton = document.getElementById('save');
   const loadInput = document.getElementById('load');
  saveButton.addEventListener('click', () => this.save());
  loadInput.addEventListener('change', (event) => this.load(event));
 
  initDraw(canvas);
 };



function initDraw(canvas) {
    function setMousePosition(e) {
        var ev = e || window.event; //Moz || IE
        if (ev.pageX) { //Moz
            mouse.x = ev.pageX + window.pageXOffset;
            mouse.y = ev.pageY + window.pageYOffset;
        } else if (ev.clientX) { //IE
            mouse.x = ev.clientX + document.body.scrollLeft;
            mouse.y = ev.clientY + document.body.scrollTop;
        }
    };

    var mouse = {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0
    };
    var element = null;

    canvas.onmousemove = function (e) {
        setMousePosition(e);
        if (element !== null) {
            element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
            element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
            element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
            element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
        }
    }

    canvas.onclick = function (e) {
        if (element !== null) {
            element = null;
            canvas.style.cursor = "default";
            console.log("finsihed.");
        } else {
            console.log("begun.");
            document.getElementById("canvas").innerHTML=""
            mouse.startX = mouse.x;
            mouse.startY = mouse.y;
            element = document.createElement('div');
            element.className = 'rectangle'
            
            element.style.left = mouse.x + 'px';
            element.style.top = mouse.y + 'px';
            canvas.appendChild(element)
            canvas.style.cursor = "crosshair";
        }
    }
}
 
function save() {
  var div = document.getElementById('background')   
  html2canvas(div).then(canvas => {
    var dataURL = canvas.toDataURL();
    $.ajax({
      type: "POST",
      url: "http://localhost:5000/model",
      data:{
        imageBase64: dataURL
      }
    }).done(function() {
      console.log('sent');
        window.location.href = "http://localhost:5000/output";
    });
  });

}
  
function load(event) {
  const file = [...event.target.files].pop();
  this.readTheFile(file)
    .then((image) => this.loadTheImage(image))
}

function loadTheImage(image) {
  this.flag = true;
  document.getElementById('background').style.backgroundImage = "url(" + image + ")";             
}
   
function readTheFile(file) {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });
}
 