let totalYearOfExperience = document.getElementById("total-year-of-experience");
let experience = document.getElementById("experience");
let calculateExperienceShow = document.getElementById("calcuate-year");
// const age = () => {
//   const today = new Date();
//   const birthYear = 2000;
//   const birthMonth = 12;
//   const birthDay = 12;

//   let currentAge = today.getFullYear() - birthYear;

//   if (
//     today.getMonth() + 1 < birthMonth ||
//     (today.getMonth() + 1 === birthMonth && today.getDate() < birthDay)
//   ) {
//     currentAge--;
//   }

//   // Update DOM
//   const ageElements = document.getElementsByClassName("age");
//   for (let i = 0; i < ageElements.length; i++) {
//     ageElements[i].innerText = `${currentAge} Years`;
//   }
// };

// Add Skills
const skill = [
  // Frontend frameworks and languages
  {
    id: "1",
    image_url: "./logo/angular.png",
    alt: "Angular JS",
    title: "Angular JS",
  },
  {
    id: "2",
    image_url: "./logo/icons8-react-native.svg",
    alt: "React",
    title: "React",
  },
  {
    id: "3",
    image_url: "./logo/Typescript.png",
    alt: "TypeScript",
    title: "TypeScript",
  },
  {
    id: "4",
    image_url: "./logo/js.svg",
    alt: "Javascript",
    title: "Javascript",
  },
  {
    id: "5",
    image_url: "./logo/html-5-01.svg",
    alt: "HTML",
    title: "HTML",
  },

  // Styling tools
  {
    id: "6",
    image_url: "./logo/css3-alter.svg",
    alt: "CSS",
    title: "CSS",
  },
  {
    id: "7",
    image_url: "./logo/Bootstrap.svg",
    alt: "BootStrap",
    title: "BootStrap",
  },
  {
    id: "8",
    image_url: "./logo/Tailwindcss.png",
    alt: "Tailwind",
    title: "Tailwind",
  },
  {
    id: "9",
    image_url: "./logo/less-seeklogo.com.svg",
    alt: "LESS",
    title: "LESS",
  },
  {
    id: "10",
    image_url: "./logo/sass.svg",
    alt: "SASS",
    title: "SASS",
  },

  // Backend and databases
  {
    id: "11",
    image_url: "./logo/node.svg",
    alt: "Node.js",
    title: "Node.js",
  },
  {
    id: "12",
    image_url: "./logo/phython.svg",
    alt: "Python",
    title: "Python",
  },
  {
    id: "13",
    image_url: "./logo/Docker.png",
    alt: "Docker",
    title: "Docker",
  },
  {
    id: "14",
    image_url: "./logo/mongodb-alt.svg",
    alt: "Mongo DB",
    title: "Mongo DB",
  },
  {
    id: "15",
    image_url: "./logo/sqlserver.svg",
    alt: "SQL",
    title: "SQL",
  },
  {
    id: "16",
    image_url: "./logo/icons8-firebase.svg",
    alt: "Firebase",
    title: "Firebase",
  },

  // Developer tools and others
  {
    id: "17",
    image_url: "./logo/git.svg",
    alt: "Git",
    title: "Git",
  },
  {
    id: "18",
    image_url: "./logo/figma-alter.svg",
    alt: "Figma",
    title: "Figma",
  },
  {
    id: "19",
    image_url: "./logo/FlutterFlow.png",
    alt: "FlutterFlow",
    title: "FlutterFlow",
  },
  {
    id: "20",
    image_url: "./logo/Grafana.jpg",
    alt: "Grafana",
    title: "Grafana",
  },
  {
    id: "21",
    image_url: "./logo/M-files.png",
    alt: "M-files",
    title: "M-files",
  },
];

for (let i of skill) {
  let skill_container = document.getElementsByClassName("skill_container");
  let skill_card = document.createElement("div");
  skill_card.classList.add("card", "skill_card");
  skill_card.setAttribute("data-toggle", "tooltip");
  skill_card.setAttribute("data-placement", "right");
  skill_card.setAttribute("title", i.title);
  let skill_image = document.createElement("img");
  skill_image.classList.add("skill_image", "image");
  skill_image.setAttribute("src", i.image_url);
  skill_image.setAttribute("alt", i.alt);
  skill_card.appendChild(skill_image);
  skill_container[0].appendChild(skill_card);
}
// }
function calculateExperience(dateOfJoining) {
  const joinDate = new Date(dateOfJoining);
  const today = new Date();

  let years = today.getFullYear() - joinDate.getFullYear();
  let months = today.getMonth() - joinDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years} years ${months} months`;
}

const skillSets = document.querySelectorAll(".skill-set");

skillSets.forEach((skillSet) => {
  const toggleBtn = skillSet.querySelector(".toggle-btn");
  const hiddenSkills = skillSet.querySelector(".hide-skills");

  const hiddenSkillsText = hiddenSkills.textContent.trim();
  const hiddenSkillsCount = hiddenSkillsText
    .split(",")
    .filter((s) => s.trim().length > 0).length;
  toggleBtn.textContent = `+${hiddenSkillsCount} skills`;

  toggleBtn.addEventListener("click", () => {
    if (hiddenSkills.style.display === "none" || !hiddenSkills.style.display) {
      hiddenSkills.style.display = "inline"; // Show
      toggleBtn.textContent = "Show less";
    } else {
      hiddenSkills.style.display = "none"; // Hide
      toggleBtn.textContent = `+${hiddenSkillsCount} skills`;
    }
  });
});

window.onload = () => {
  totalYearOfExperience.innerText = calculateExperience("22-August-2022");
  experience.innerText = calculateExperience("22-August-2022");
  calculateExperienceShow.innerText = calculateExperience("20-April-2024");
  // age();
  AOS.init();
};
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
