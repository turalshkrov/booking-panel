const sidebarMenu = document.querySelector(".sidebar-menu");
const contentHeader = document.querySelector(".content-header");
const contentBody = document.querySelector(".content-body");
const contentFooter = document.querySelector(".content-footer");

const tabs = [
  { name: "staff", header: "Select staff" },
  { name: "service", header: "Select service" },
  { name: "date & time", header: "Select date & time" },
  { name: "comfirmation", header: "Confirm details" },
];

const staff = [
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

const services = [
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

const times = [
  {
    "start_time": "09:00",
    "end_time": "09:30"
  },
  {
    "start_time": "09:30",
    "end_time": "10:00"
  }
];

const formElements = [
  {
    name: 'first-name',
    label: 'First name',
    type: 'text',
  },
  {
    name: 'last-name',
    label: 'Last name',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
  }
]

let currentTabIndex = 0;
let selectedStaff = null;
let selectedService = null;
let selectedDate = null;
let selectedTime = null;
let customer = null;
let month = null;
let year = null;

const sidebarMenuRender = () => {
  sidebarMenu.innerHTML = "";
  tabs.forEach((tab, index) => {
    const sidebarItem = document.createElement('div');
    const sidebarItemNumber = document.createElement('span');
    const sidebarItemName = document.createElement('span');
    sidebarItem.classList.add('sidebar-menu-item');
    sidebarItemNumber.classList.add('sidebar-menu-number');
    sidebarItemNumber.innerText = index + 1;
    sidebarItemName.innerText = tab.name;
    sidebarItem.append(sidebarItemNumber, sidebarItemName);
    sidebarMenu.appendChild(sidebarItem);
  });
}

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
  contentHeader.firstElementChild.innerText = tabs[currentTabIndex].header;
}

const showWarningMessage = (message) => {
  const warningMessage = document.querySelector('.warning-message');
  warningMessage.children[1].innerText = message.toUpperCase();
  warningMessage.style.visibility = 'visible';
  setTimeout(() => {
    warningMessage.style.visibility = 'hidden';
  }, 2000);
}

const footerRender = () => {
  contentFooter.innerHTML = "";
  const backButton = document.createElement('button');
  const nextButton = document.createElement('button');
  const warningMessage = document.createElement('div');
  warningMessage.classList.add('warning-message');
  warningMessage.innerHTML += '<i class="fa-solid fa-circle-exclamation"></i> <span></span>';
  warningMessage.style.visibility = 'hidden';
  backButton.className = 'btn back-btn';
  nextButton.className = 'btn next-btn';
  backButton.innerText = 'back';
  nextButton.innerText = currentTabIndex === 3 ? 'confirm booking' : 'next';
  backButton.style.visibility = currentTabIndex === 0 ? 'hidden' : 'visible';
  backButton.addEventListener('click', () => {
    currentTabIndex -= 1;
    uiRender();
    const warningMessage = document.querySelector('.warning-message');
    warningMessage.style.visibility = 'hidden';
  });
  nextButton.addEventListener('click', () => {
    if (currentTabIndex <= 3) {
      if (currentTabIndex === 0) {
        if (selectedStaff) { currentTabIndex += 1; uiRender(); }
        else showWarningMessage('select staff');
      }
      else if (currentTabIndex === 1) {
        if (selectedService) { currentTabIndex += 1; uiRender(); }
        else showWarningMessage('select service');
      }
      else if (currentTabIndex === 2) {
        if (selectedTime) { currentTabIndex += 1; uiRender(); }
        else showWarningMessage('select Date & Time');
      }
      else if (currentTabIndex === 3) {
        if (customer) {
          const booking = {
            staff_id: selectedStaff,
            service_id: selectedService,
            date: selectedDate,
            time: selectedTime,
            customer: customer
          }
          console.log(booking);
          currentTabIndex = 0;
          selectedStaff = null;
          selectedService = null;
          selectedDate = null;
          selectedTime = null;
          customer = null;
          month = null;
          year = null;
          uiRender();
          showModal('Confirmation successfully completed!');
        }
        else {
          showWarningMessage('Fill All Inputs');
        }
      }
    }
  }
);
contentFooter.append(backButton, warningMessage, nextButton);
}

const showModal = (message) => {
  const modal = document.createElement('div');
  const modalContent = document.createElement('div');
  const modalHeader = document.createElement('div');
  const modalText = document.createElement('div');
  modal.className = 'modal';
  modalContent.className = 'modal-content';
  modalHeader.className = 'modal-header';
  modalText.className = 'modal-text';
  modalHeader.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  modalHeader.firstElementChild.addEventListener('click', () => {
    modal.remove();
  })
  modalText.innerText = message;
  modalContent.append(modalHeader, modalText);
  modal.append(modalContent);
  document.body.append(modal);
}

const selectedStaffUpdate = () => {
  const staffCards = [...document.querySelectorAll('.staff')];
  staffCards.forEach(item => {
    item.classList.remove('card-active');
    if (Number(item.getAttribute('staff-id')) === selectedStaff) item.classList.add('card-active');
  });
}

const staffContentRender = () => {
  contentBody.innerHTML = "";
  contentBody.className = 'content-body';
  staff.forEach((item, index) => {
    const staffCard = document.createElement('div');
    const cardRightDiv = document.createElement('div');
    const img = document.createElement('img');
    const textConatiner = document.createElement('div');
    const cardTitle = document.createElement('h5');
    const cardDescription = document.createElement('p');
    staffCard.setAttribute('staff-id', item.id);
    staffCard.className = 'staff card';
    cardRightDiv.classList.add('card-right');
    img.classList.add('card-img');
    textConatiner.classList.add('text-container');
    cardTitle.classList.add('card-title');
    cardDescription.classList.add('card-description');
    img.src = `../assets/images/staff-${index}.png`;
    cardTitle.innerText = item.name;
    cardDescription.innerText = item.desc;
    textConatiner.append(cardTitle, cardDescription);
    cardRightDiv.append(img, textConatiner);
    staffCard.append(cardRightDiv);
    staffCard.addEventListener('click', () => {
      selectedStaff = item.id;
      selectedStaffUpdate();
      currentTabIndex += 1;
      uiRender()
    });
    contentBody.appendChild(staffCard);
  });
}

const selectedServiceUpdate = () => {
  const serviceCards = [...document.querySelectorAll('.service')];
  serviceCards.forEach(item => {
    item.classList.remove('card-active');
    if (Number(item.getAttribute('service-id')) === selectedService) item.classList.add('card-active');
  })
}

const servicesRender = () => {
  contentBody.innerHTML = "";
  contentBody.className = 'content-body';
  services.forEach((item, index) => {
    const serviceCard = document.createElement('div');
    const cardRightDiv = document.createElement('div');
    const priceDiv = document.createElement('div');
    const img = document.createElement('img');
    const textConatiner = document.createElement('div');
    const cardTitle = document.createElement('h5');
    const cardDescription = document.createElement('p');
    serviceCard.setAttribute('service-id', item.id);
    serviceCard.className = 'service card';
    cardRightDiv.classList.add('card-right');
    priceDiv.classList.add('price');
    img.classList.add('card-img');
    textConatiner.classList.add('text-container');
    cardTitle.classList.add('card-title');
    cardDescription.classList.add('card-description');
    img.src = `../assets/images/service-${index}.png`;
    cardTitle.innerText = item.name;
    cardDescription.innerText = item.duration;
    textConatiner.append(cardTitle, cardDescription);
    priceDiv.innerText = item.price + '$';
    cardRightDiv.append(img, textConatiner);
    serviceCard.append(cardRightDiv, priceDiv);
    serviceCard.addEventListener('click', () => {
      selectedService = item.id;
      selectedServiceUpdate();
      currentTabIndex += 1;
      uiRender();
    });
    contentBody.appendChild(serviceCard);
  })
}

const dateTimeRender = () => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const weekDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
  };
  const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
  };
  const daysOfMonth = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (currentTabIndex === 2) {
    contentBody.innerHTML = "";
    contentBody.classList.add('datetime-content');
  }
  let currentDate = new Date();
  if (month === null) month = currentDate.getMonth();
  if (year === null) year = currentDate.getFullYear();
  const monthStartDay = new Date(year + "-" + (month + 1) + "-01").getDay();
  const monthName = monthNames[month];
  const dateDiv = document.createElement('div');
  const timeDiv = document.createElement('div');
  const dateHeader = document.createElement('div');
  const timeHeader = document.createElement('div');
  const dateLabel = document.createElement('span');
  const timeLabel = document.createElement('div');
  const weekDays = document.createElement('div');
  const dateSelector = document.createElement('div');
  const timeSelector = document.createElement('div');
  const daysContainer = document.createElement('div');
  const datePrevButton = document.createElement('button');
  const dateNextButton = document.createElement('button');
  const timeBody = document.createElement('div');
  timeLabel.classList.add('time-label');
  dateLabel.classList.add('date-label');
  dateDiv.classList.add('date');
  timeDiv.classList.add('time');
  dateHeader.classList.add('date-header');
  timeHeader.classList.add('time-header');
  timeBody.classList.add('time-body');
  dateSelector.classList.add('date-selector');
  timeSelector.classList.add('time-selector');
  daysContainer.classList.add('days-container');
  weekDays.classList.add('week-days')
  datePrevButton.className = 'date-btn';
  dateNextButton.className = 'date-btn';
  datePrevButton.innerHTML = `<i class="fa-solid fa-angle-left"></i>`;
  dateNextButton.innerHTML = `<i class="fa-solid fa-angle-right"></i>`;
  datePrevButton.addEventListener('click', () => {
    month -= 1;
    if (month === -1) {
      month = 11;
      year -= 1;
    }
    uiRender();
  });
  dateNextButton.addEventListener('click', () => {
    month += 1;
    if (month === 12) {
      month = 0;
      year += 1;
    }
    uiRender();
  });
  timeLabel.innerText = selectedDate ? selectedDate : 'Select Date';
  dateLabel.innerText = `${monthName} ${year}`;
  dateHeader.append(datePrevButton, dateLabel, dateNextButton);
  weekDayNames.forEach(day => {
    const span = document.createElement('span');
    span.classList.add('week-day');
    span.innerText = day;
    weekDays.appendChild(span);
  });
  for (let i = 0; i < monthStartDay - 1; i++) {
    const span = document.createElement('span');
    daysContainer.append(span);
  }
  for (let i = 1; i <= daysOfMonth[month]; i++) {
    const date = `${year}-${month < 10 ? '0' + (month + 1) : (month + 1)}-${i}`;
    const span = document.createElement('span');
    span.classList.add('day');
    if (year === currentDate.getFullYear() && month === currentDate.getMonth()) {
      if (i - currentDate.getDate() < 3 && i - currentDate.getDate() >= 0) {
        span.classList.add('active-day');
        if (date === selectedDate) span.classList.add('selected-day');
        span.addEventListener('click', () => {
          span.classList.add('selected-day');
          selectedDate = date;
          uiRender();
        })
      }
    }
    span.innerText = i;
    daysContainer.append(span);
  }
  dateSelector.append(weekDays, daysContainer);
  timeHeader.innerText = 'Time';
  times.forEach(time => {
    const timeCard = document.createElement('div');
    timeCard.classList.add('time-card');
    if (`${time.start_time} - ${time.end_time}` === selectedTime) timeCard.classList.add('time-card-active');
    timeCard.innerHTML = `<span>${time.start_time}</span><span>${time.end_time}</span>`;
    timeCard.addEventListener('click', () => {
      selectedTime = `${time.start_time} - ${time.end_time}`;
      currentTabIndex += 1;
      uiRender();
    });
    if (selectedDate) timeBody.append(timeCard);
  });
  timeSelector.append(timeLabel, timeBody);
  dateDiv.append(dateHeader, dateSelector);
  timeDiv.append(timeHeader, timeSelector);
  contentBody.append(dateDiv, timeDiv);
}

const formContentRender = () => {
  contentBody.innerHTML = "";
  contentBody.className = 'content-body';
  const form = document.createElement('form');
  const note = document.createElement('h4');
  const noteContent = document.createElement('div');
  const noteStaff = document.createElement('p');
  const noteService = document.createElement('p');
  const noteDate = document.createElement('p');
  const noteprice = document.createElement('p');
  noteStaff.innerText = 'staff: ' + (selectedStaff && staff.find(staff => staff.id === selectedStaff).name);
  noteService.innerText = 'service: ' + (selectedService && services.find(service => service.id === selectedService).name);
  noteDate.innerText = 'date: ' + `${selectedDate}/${selectedTime}`;
  noteprice.innerText = 'price: ' + (selectedService && services.find(service => service.id === selectedService).price + '$');
  noteContent.className = 'note-content';
  note.innerText = 'Note';
  noteContent.append(noteStaff, noteService, noteDate, noteprice);
  formElements.forEach(element => {
    const inputGroup = document.createElement('div');
    const input = document.createElement('input');
    const label = document.createElement('label');
    inputGroup.className = 'input-group';
    input.id = element.name;
    input.type = element.type;
    label.innerText = element.label;
    label.htmlFor = element.name;
    input.addEventListener('change', () => {
      customer = {
        ...customer,
        [element.name]: input.value,
      }
    })
    inputGroup.append(label, input);
    form.appendChild(inputGroup);
  });
  contentBody.append(form, note, noteContent);
}

const uiRender = () => {
  sidebarMenuRender();
  sidebarMenuUpdate();
  contentHeaderUpdate();
  if(currentTabIndex === 0) { staffContentRender(); selectedStaffUpdate(); }
  if (currentTabIndex === 1) { servicesRender(); selectedServiceUpdate(); }
  if (currentTabIndex === 2) { dateTimeRender(); }
  if (currentTabIndex === 3) { formContentRender(); }
  footerRender();
}

uiRender();