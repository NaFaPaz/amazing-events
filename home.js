function fillCard(event) {
  return `
      <div class="card" style="width: 18rem">
          <img
            src="${event.image}"
            class="card-img-top"
            alt="${event.name}"
          />
          <h5 class="card-title">${event.name}</h5>
          <div class="card-body">
            <p class="card-text">${event.description}</p>
            <div
              class="card-bottom d-flex justify-content-between align-items-center"
            >
              <p>Price $${event.price}</p>
              <a href="./details.html" class="btn btn-primary">View more</a>
            </div>
          </div>
        </div>
        `;
}
function cardEvents(cardsData, filter) {
  let events = [];
  for (let card of cardsData) {
    if (filter === 'past') {
      if (card.date < data.currentDate) {
        events.push(card);
      }
    } else if (filter === 'upcoming') {
      if (card.date > data.currentDate) {
        events.push(card);
      }
    } else {
      events.push(card);
    }
  }
  return events;
}
function showTemplate(filteredEvents) {
  let template = '';
  for (let event of filteredEvents) {
    template += fillCard(event);
  }
  return template;
}
let cards = document.querySelector('.cards');
let eventsCards = cardEvents(data.events);
cards.innerHTML = showTemplate(eventsCards);

//filters
//search
function searchEvents(events, query) {
  let results = [];
  for (let event of events) {
    if (event.name.toLowerCase().includes(query)) {
      results.push(event);
    }
  }
  return results;
}
let searchBar = document.querySelector('input[type="search"]');
searchBar.addEventListener('input', (e) => {
  let query = e.target.value.toLowerCase().trim();
  let resultsTemplate = searchEvents(eventsCards, query);
  cards.innerHTML = showTemplate(resultsTemplate);
});
function checksFilter(events, checks) {
  let filtered = [];
  for (let event of events) {
    if (checks.includes(event.category.toLowerCase().replace(' ', '-'))) {
      filtered.push(event);
    }
  }
  return filtered;
}
let checks = document.querySelectorAll('input[type="checkbox"]');
let activeChecks = [];
checks.forEach((check) =>
  check.addEventListener('change', (e) => {
    let checkID = e.target.id;
    if (activeChecks.includes(checkID)) {
      activeChecks = activeChecks.filter((check) => check !== checkID);
    } else {
      activeChecks.push(checkID);
    }
    let filtersTemplate = checksFilter(eventsCards, activeChecks);
    if (filtersTemplate.length > 0) {
      cards.innerHTML = showTemplate(filtersTemplate);
    } else {
      cards.innerHTML = showTemplate(eventsCards);
    }
  })
);
