//card template
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
//separate events on past/future/all
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
//full template to add to html
function showTemplate(filteredEvents) {
  let template = '';
  for (let event of filteredEvents) {
    template += fillCard(event);
  }
  return template;
}
let cards = document.querySelector('.cards');
let eventsCards = cardEvents(data.events, 'past');
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
searchBar.addEventListener('input', crossFilters);
function searchFilter(searchBar) {
  let query = searchBar.value.toLowerCase().trim();
  let resultsTemplate = searchEvents(eventsCards, query);
  return resultsTemplate;
}
//checkboxs
function checkboxTemplate(label) {
  return `<div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="${label}"
                />
                <label class="form-check-label" for="${label}"
                  >${
                    label[0].toUpperCase() +
                    label.replace('-', ' ').slice(1, label.length)
                  }</label
                >
              </div>`;
}
let checksLabel = [
  'food-fair',
  'museum',
  'costume-party',
  'music-concert',
  'race',
  'book-exchange',
  'cinema',
];
let checksContainer = document.querySelector('#checks');
function renderChecks() {
  let template = '';
  checksLabel.forEach((label) => (template += checkboxTemplate(label)));
  return template;
}
checksContainer.innerHTML = renderChecks();
function checksEvents(events, activeChecks) {
  let filtered = [];
  for (let event of events) {
    if (activeChecks.includes(event.category.toLowerCase().replace(' ', '-'))) {
      filtered.push(event);
    }
  }
  return filtered;
}
let checks = document.querySelectorAll('input[type="checkbox"]');

checks.forEach((check) => check.addEventListener('change', crossFilters));

function checksFilter(events) {
  let activeChecks = [];
  checks.forEach((check) => {
    if (check.checked === true) {
      if (activeChecks.includes(check.id)) {
        activeChecks = activeChecks.filter((checkbox) => checkbox !== check.id);
      } else {
        activeChecks.push(check.id);
      }
    }
  });
  if (activeChecks.length < 1) {
    return events;
  } else {
    return checksEvents(events, activeChecks);
  }
}
//render filtered events
function crossFilters() {
  let searchResults = searchFilter(searchBar);
  let checksResults = checksFilter(searchResults);
  if (checksResults.length < 1) {
    cards.innerHTML = `<h3>No results. Try other filters/keywords.</h3>`;
  } else {
    cards.innerHTML = showTemplate(checksResults);
  }
}
