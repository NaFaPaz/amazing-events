function filledTemplate(image, name, description, price) {
  return `
      <div class="card" style="width: 18rem">
          <img
            src="${image}"
            class="card-img-top"
            alt="${name}"
          />
          <h5 class="card-title">${name}</h5>
          <div class="card-body">
            <p class="card-text">${description}</p>
            <div
              class="card-bottom d-flex justify-content-between align-items-center"
            >
              <p>Price $${price}</p>
              <a href="./details.html" class="btn btn-primary">View more</a>
            </div>
          </div>
        </div>
        `;
}
function cardTemplate(cardsData, filter) {
  let template = '';
  for (let card of cardsData) {
    if (filter === 'past') {
      if (card.date < data.currentDate) {
        template += filledTemplate(
          card.image,
          card.name,
          card.description,
          card.price
        );
      }
    } else if (filter === 'upcoming') {
      if (card.date > data.currentDate) {
        template += filledTemplate(
          card.image,
          card.name,
          card.description,
          card.price
        );
      }
    } else {
      template += filledTemplate(
        card.image,
        card.name,
        card.description,
        card.price
      );
    }
  }
  return template;
}
const templateHome = cardTemplate(data.events);
const templatePast = cardTemplate(data.events, 'past');
const templateUpcoming = cardTemplate(data.events, 'upcoming');
