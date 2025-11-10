let jsonData;
let data;
let category = '';
let filteredProjects = [];
let isViewedOnMobile;

async function loadJSON() {
    try {
      const response = await fetch('database.json');
      data = await response.json();
      jsonData = data;
      listProjects(data, category);
      return data;
    } catch (error) {
      console.error('Error loading JSON:', error);
    }
}

let projektitData;

function listProjects(data, category) {
    // Filter projects based on category
    filteredProjects = category 
        ? data.projektit.filter(project => project.category === category)
        : data.projektit;

    projektitData = '';
    
    // Use filteredProjects array and filteredIndex for rendering
    filteredProjects.forEach((project, filteredIndex) => {
        // Find the original index for showArticle function
        const originalIndex = data.projektit.findIndex(p => p.id === project.id);
        
        projektitData += `<a onclick="showArticle(${filteredIndex})" class="projekti-linkki fade-in-up" style="animation-delay: ${filteredIndex * 0.05}s">`;
        projektitData += `<div class="icon-and-link">`;
        projektitData += `<div class="ball ${project.iconcolor}"></div>`;
        projektitData += project.heading;
        projektitData += `</div>`;
        projektitData += `</a>`;
    });
    
    document.getElementById("projektit").innerHTML = projektitData;
    
    // Show the first project in the filtered list
    if (filteredProjects.length > 0) {
        // showArticle(0);
    } else {
        // Clear article content if no projects
        document.getElementById("articleName").innerHTML = "";
        document.getElementById("articleHeading").innerHTML = "Ei projekteja";
        document.getElementById("articleContent").innerHTML = "Valitulla kategoriolla ei löytynyt projekteja.";
    }
}

function showcategory(selectedCategory) {
    const allCategories = document.querySelectorAll('[onclick*="showcategory"]');
    allCategories.forEach(el => {
        el.classList.remove('selected');
    });

    // Add selected class to clicked button
    event.target.classList.add('selected');
    
    // Update the category and list projects
    category = selectedCategory;
    listProjects(data, category);
}

function changeTheme() {
  let loadedTheme = themeManager.getSavedTheme();
  if (loadedTheme == "light") {
    themeManager.setTheme("dark-blue");
  } else if (loadedTheme == "dark-blue") {
    themeManager.setTheme("deep-dark")
  } else {
    themeManager.setTheme("light")
  }
}

// Call the function
loadJSON();

function showArticle(filteredIndex) {

  // We need to make so that on mobile it does not automatically run this line
  // 1. when loading the page and 2. when selecting a category.
  document.getElementById("article").style.display = "block";


  document.getElementById("articleName").classList.add('slowshow');
  document.getElementById("articleHeading").classList.add('slowshow');
  document.getElementById("articleContent").classList.add('slowshow');

    // Use filteredIndex to get the project from filteredProjects
    const project = filteredProjects[filteredIndex];
    
    if (!project) return;
    
    // Update the article content
    if (project.metainfo.date !== "") {
        document.getElementById("articleName").innerHTML = project.heading + ", " + project.metainfo.date;
    } else {
        document.getElementById("articleName").innerHTML = project.heading;
    }
    document.getElementById("articleHeading").innerHTML = project.article.heading;
    document.getElementById("articleContent").innerHTML = project.article.content;


}

document.getElementById("articleHeading").addEventListener('animationend', () => {
  console.log('Animation finished!');
  document.getElementById("articleName").classList.remove('slowshow');
  document.getElementById("articleHeading").classList.remove('slowshow');
  document.getElementById("articleContent").classList.remove('slowshow');
});