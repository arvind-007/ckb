// import data from "./data.json";

const root = document.getElementById("root");
var renderName = (ele, id) => {
  // Check if there is any object with id in data
  const obj = data.find((o) => o.id == id);
  if (obj == undefined) {
    console.log("gihuh");
    return;
  }

  //check if it has children
  const children = data.filter((o) => o.parent_id == id);
  if (children.length > 0) {
    const ul = document.createElement("ul");
    children.map((child) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const img = document.createElement("img");
      img.src = "https://arvind-007.github.io/ckb/imgs/male_man.jpg";
      const span = document.createElement("span");
      span.style.display = "block";
      span.style.width = "100%";
      span.style.padding = "5px 10px";
      if (child.dead == 1) a.classList.add("dead");
      const node = document.createTextNode(child.name);
      a.appendChild(img);
      span.appendChild(node);
      a.appendChild(span);
      li.appendChild(a);
      renderName(li, child.id);
      ul.appendChild(li);
    });
    ele.appendChild(ul);
  }
};
renderName(root, 1);

$(function () {
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
