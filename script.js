// import data from "./data.json";

const root = document.getElementById("root");
var generation = 0;
var renderName = (ele, id) => {
  // Check if there is any object with id in data
  const obj = data.find((o) => o.id == id);
  if (obj == undefined) {
    return;
  }

  //check if it has children
  const children = data.filter((o) => o.parent_id == id);
  if (children.length > 0) {
    generation++;
    const ul = document.createElement("ul");
    children.map((child) => {
      let cls = child.dead == 1 ? "dead" : "alive";

      let user_img = `https://arvind-007.github.io/ckb/imgs/${child.id}.jpg`;
      let age = 0;
      if (child.yob != "") {
        if (child.yod != "") {
          age = child.yod - child.yob;
        } else {
          age = new Date().getFullYear() - child.yob;
        }
      }

      const li = document.createElement("li");
      li.innerHTML = `<a class="${cls}"><img src="${user_img}" onerror="load_default_img(this, ${age}, ${generation})"><span>${
        child.name
      }${age ? ` (${age})` : ""}</span></a>`;
      renderName(li, child.id);
      ul.appendChild(li);
    });
    ele.appendChild(ul);
    generation--;
  }
};
renderName(root, 1);

function load_default_img(ele, age, generation) {
  let img_do = "https://arvind-007.github.io/ckb/imgs/do.jpg";
  let img_dy = "https://arvind-007.github.io/ckb/imgs/dy.jpg";
  let img_dk = "https://arvind-007.github.io/ckb/imgs/dk.jpg";
  let img_doo = "https://arvind-007.github.io/ckb/imgs/doo.jpg";
  let img_dyo = "https://arvind-007.github.io/ckb/imgs/dyo.jpg";
  if (age > 0 && age <= 15) {
    default_img = img_dk;
  } else if (age > 15 && age <= 50) {
    default_img = img_dy;
  } else {
    default_img = img_do;
  }
  //if more than 4th generation show young image
  if (generation > 3 && generation <= 5) {
    default_img = img_doo;
  } else if (generation > 5 && generation <= 7) {
    default_img = img_dyo;
  } else if (generation > 7) {
    //Show kids image
    default_img = img_dk;
  }
  ele.src = default_img;
}

$(function () {
  $("#btn-show-all").click(function () {
    $("ul").show();
  });
  $("a").click(function () {
    if ($(this).children("i").length > 0) {
      $(this)
        .children("i")
        .toggleClass("fa-caret-up")
        .toggleClass("fa-caret-down");
    }
    $(this).next("ul").toggle();
  });

  $("li").each(function () {
    if ($(this).children("ul").length > 0) {
      $(this)
        .children("a")
        .append('<i class="fa fa-caret-down" class="arrow"></i>');
    }
  });

  $("ul").hide();
  $("ul").first().show();
  $("ul").eq(1).show();
  //$("body").scrollTo("0");
  console.log("total", data.length);
  $("#total").text(data.length);
  $("#total_alive").text(data.filter((o) => o.dead == 0).length);
});
