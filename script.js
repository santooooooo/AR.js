// ユーザーの入力処理
const sign = window.prompt("緯度(latitude)を入力してください")
console.log(sign)

var arModel =
{
  url: "./assets/pin/pin.glb",
  scale: "0.3 0.3 0.3",
  rotation: "0 180 0",
  info: "目的地",
};

window.addEventListener("load", () => {
  const model = document.getElementById("pin");

  function success(pos) {
    var crd = pos.coords;
    const latitude = crd.latitude;
    const longitude = crd.longitude;
    model.setAttribute(
      "gps-entity-place",
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    model.setAttribute("scale", "15 15 15");
    model.setAttribute("scale", arModel.scale);
    model.setAttribute("rotation", arModel.rotation);
    model.setAttribute("gltf-model", arModel.url);
    // model.setAttribute("animation-mixer", "");
  }

  function error(err) {
    console.error("Error in retrieving position", err);
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  return navigator.geolocation.getCurrentPosition(success, error, options);
});
