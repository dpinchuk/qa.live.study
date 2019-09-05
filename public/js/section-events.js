const events = [
  "img/section-events/1.png",
  "img/section-events/2.png",
  "img/section-events/3.png",
  "img/section-events/4.png",
  "img/section-events/5.png",
  "img/section-events/6.png",
  "img/section-events/7.png",
  "img/section-events/8.png",
  "img/section-events/1.png",
];

let showEvents = array => {
  clearDiv("events");
  for (let i = 0; i < array.length; i++) {
    document.getElementById("events").innerHTML +=
      "<div class='d-flex justify-content-center col s12 m3 l3 section-events__img-item'>" +
      "   <a href='#!' data-rel='fancybox'>" +
      "       <img src='" +
      array[i] +
      "' style='opacity: 1;' alt=''>" +
      "   </a>" +
      "</div>";
  }
};

document.addEventListener("DOMContentLoaded", showEvents(events));
