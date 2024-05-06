// Auth: John O'Neal
// Date: 05/06/2024
// Desc: This is the main script file for the Reel Conditions Web App.

// SIDEBAR TOGGLE
let sidebarOpen = false;
const sidebar = document.getElementById('leftSidebar');
const openButton = document.getElementById('openButton');
const closeButton = document.getElementById('closeButton');

openButton.addEventListener('click', openLeftSidebar);
closeButton.addEventListener('click', closeLeftSidebar);

function openLeftSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add('left-sidebar-responsive');
    sidebarOpen = true;
    console.log('Sidebar opened');
  }
}

function closeLeftSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove('left-sidebar-responsive');
    sidebarOpen = false;
  }
}

