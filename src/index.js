const sidebarMenu = document.querySelector(".sidebar-menu");
const contentHeader = document.querySelector(".content-header");

const tabs = [
  { name: "staff", header: "Select staff" },
  { name: "service", header: "Select service" },
  { name: "date & time", header: "Select date & time" },
  { name: "comfirmation", header: "Confirm details" },
];

export const staff = [
  {
    "id": 1,
    "name": "Alex Rosetta",
    "desc": "alexyrosetta@egmail.com",
    "image": "staff-1.png",
  },
  {
    "id": 2,
    "name": "Maria July",
    "desc": "mariajuly@egmail.com",
    "image": "staff-2.png",
  }
];

export const services = [
  {
    "id": 1,
    "name": "Oral hygiene",
    "image": "service-1.jpg",
    "duration": "1 hour",
    "price": 50.00,
  },
  {
    "id": 2,
    "name": "Implants",
    "image": "service-2.jpg",
    "duration": "1 hour 30 minutes",
    "price": 120.00,
  },
  {
    "id": 3,
    "name": "Check up",
    "image": "service-3.jpg",
    "duration": "1 hour 12 minutes",
    "price": 140.00,
  }
];

export const time = [
  {
    "start_time": "09:00",
    "end_time": "09:30"
  },
  {
    "start_time": "09:30",
    "end_time": "10:00"
  }
];

let currentTabIndex = 0;

tabs.forEach((tab, index) => {
  const sidebarItem = document.createElement('div');
  const sidebarItemNumber = document.createElement('span');
  const sidebarItemName = document.createElement('span');
  sidebarItem.classList.add('sidebar-menu-item');
  sidebarItemNumber.classList.add('sidebar-menu-number');
  sidebarItemNumber.innerText = index + 1;
  sidebarItemName.innerText = tab.name;
  sidebarItem.append(sidebarItemNumber);
  sidebarItem.append(sidebarItemName);
  sidebarMenu.appendChild(sidebarItem);
});

const sidebarMenuUpdate = () => {
  const sidebarItems = [...document.querySelectorAll('.sidebar-menu-item')];
  sidebarItems.filter((_, index) => index < currentTabIndex).forEach(item => {
    item.classList.add('sidebar-menu-item-done');
    item.firstElementChild.remove();
    const doneIcon = document.createElement('i');
    doneIcon.className = 'fa-solid fa-check';
    item.insertBefore(doneIcon, item.firstChild);
  });
  sidebarItems[currentTabIndex].classList.add('sidebar-menu-item-active');
  sidebarItems[currentTabIndex].firstChild.classList.add('sidebar-menu-number-active');
}

const contentHeaderUpdate = () => {
  contentHeader.firstElementChild.innerText = tabs[currentTabIndex].header
}

sidebarMenuUpdate();
contentHeaderUpdate();