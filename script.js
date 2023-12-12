// ユーザーの入力情報
// const latitude = Number(window.prompt("緯度(latitude)を入力してください", 0))
// const longitude = Number(window.prompt("経度(longtitude)を入力してください", 0))

var arModel = {
  url: "./assets/pin/pin.glb",
  scale: "0.3 0.3 0.3",
  rotation: "0 180 0",
  info: "目的地",
};

window.addEventListener("load", () => {
  // ユーザー入力処理
  let useCurrentLocation = false
  let latitude = 0
  let longitude = 0
  const potiosionDialog = document.getElementById("positionDialog")
  const checkBox = potiosionDialog.querySelector("checkbox")
  const useCurrentLocationInput = document.getElementById("positionDialog")
  const latitudeInput = document.getElementById("positionDialog")
  const longitudeInput = document.getElementById("positionDialog")

  potiosionDialog.showModal();
  checkBox.addEventListener("change", () => {
    useCurrentLocation = checkBox.value
  });
  potiosionDialog.addEventListener("close", (e) => {
    useCurrentLocation = useCurrentLocationInput.value
    latitude = latitudeInput.value
    longitude = longitudeInput.value
  });
  console.log("現在地を使う？" + useCurrentLocation, "緯度" + latitude, "経度" + longitude);

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
