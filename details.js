let card = document.querySelector('.card');
function fillCard(event) {
  console.log(event);
  return `<div class="row g-0">
              <div class="col-lg-4">
                <img
                  src="${event.image}"
                  class="img-fluid rounded-start"
                  alt="${event.name}"
                />
              </div>
              <div class="col-lg-8">
                <h5 class="card-title">${event.name}</h5>
                <span class="category">${event.cateogry}</span>
                <div class="card-detail-bottom card-body d-flex flex-wrap p-lg-5">
                  <p class="card-text">${event.description}</p>
                  <p>Location: ${event.location}</p>
                  <div class="d-flex justify-content-between">
                    <p>Capacity: ${event.place}</p>
                    <p>Assistance: ${event.assistance}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p>Price: $${event.price}</p>
                    <p>Date: ${event.date}</p>
                  </div>
                </div>
              </div>
            </div>`;
}
let query = location.search;
let searchParams = new URLSearchParams(query);
query = searchParams.get('id');
let filteredEvent = data.events.find((card) => {
  return card._id === query;
});
console.log(filteredEvent);
card.innerHTML = fillCard(filteredEvent);
