//  selecting  navigation bar elements
let navBar = document.createElement("nav");
let navSec = document.querySelectorAll("section");
let navContainer = document.querySelector("ul");

for (let i = 0; i < navSec.length; i++) {
  let anchor = document.createElement("a"); 
  anchor.innerText = `Section ${i + 1}`;

  let lists = document.createElement("li");
  lists.appendChild(anchor);  
  navBar.appendChild(lists); 
}
navContainer.appendChild(navBar); 


//function counts lists and display them 
function add() {
  let navSec = document.querySelectorAll("section");
  let ul = document.querySelector("ul");
  let navBar = document.createElement("div");

  navSec.forEach( (ele)=> {
    let list = document.createElement("li");
        let anchor = document.createElement("a");
        list.classList.add("li");
    let dataNav = ele.getAttribute("data-nav");
    anchor.textContent = dataNav;
    list.appendChild(anchor);
    navBar.appendChild(list);
  });
  ul.appendChild(navBar);

  //  calc  loca of the active sec
  window.onscroll = ()=> { 
    for (let section of currentSections) {
      let secLocation = section.offsetTop;
      if (secLocation < window.pageYOffset + 200) {
            currentSections.forEach((secRemoved) => {
          secRemoved.classList.remove("actiVe");
        });
        section.classList.add("actiVe");
      }
    }
  };
}

// select nav list  
let navBarList = document.getElementById("navbar__list");
console.log(navBarList)
let lis = document.querySelectorAll("li");

let currentSections = [...document.getElementsByTagName("section")];
//  style the nav bar
navBarList.classList.add("nav");
for (let li of lis) {
    li.classList.add("li");
}


window.onscroll =  () => {
  for (let section of currentSections) {
    let secLocation = section.offsetTop;
    section.addEventListener("click", () =>
    section.scrollIntoView({ behavior: "smooth" })
    );
    console.log(section)
    if (secLocation < window.pageYOffset + 300) {
        currentSections.forEach((sec) => {
          sec.classList.remove("actiVe");
        });
        section.classList.add("actiVe");

      let data = section.getAttribute("data-nav");
      //  which list belong to which section
      lis.forEach((li) => {
            if (data === li.textContent) {
              lis.forEach((li) => {
                li.classList.remove("activeClass");
                console.log(li)
              });
              li.classList.toggle("activeClass");
            }
      });
    }
  }
};

console.log(navBarList)
// listen to scroll to display the sec
lis.forEach( (li) => {
  currentSections.forEach( (section) => {
    if (li.textContent === section.getAttribute("data-nav")) {
        li.addEventListener("click",  (event)=> {
          event.preventDefault();
          section.scrollIntoView({ behavior: "smooth" });
        });
    }
  });
});