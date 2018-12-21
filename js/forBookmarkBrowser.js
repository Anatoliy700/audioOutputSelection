javascript:(function () {
  const settings = {};
  const url = "https://anatoliy700.github.io/audioOutputSelection/js/audioOutputSelection.js";
  if (typeof audioOutputSelection === "undefined") {
    let s = document.createElement("script");
    s.addEventListener('load', evt => {
      audioOutputSelection.init(settings)
    });
    s.src = url;
    s.type = "text/javascript";
    document.getElementsByTagName("body")[0].appendChild(s);
  }
})();