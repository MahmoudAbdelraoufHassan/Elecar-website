// fetch cars data
const featuredCars = document.querySelector(".featured .container");

async function getPopularCars() {
  try {
    const res = await fetch("assets/data/cars.json");
    if (!res.ok) throw new Error("No Cars Found");
    const data = await res.json();
    data.cars.filter(
      (car) =>
        car.brand === "Porsche" &&
        car.imgDirection === "left" &&
        createCarCard(car),
    );

    new Glide(".glide", {
      type: "carousel",
      perView: 3.2,
      autoplay: 3000,
      hoverpause: true,
      perTouch: 3.2,
      gap: 10,
      breakpoints: {
        1024: { perView: 2 },
        768: { perView: 1.2 },
      },
    }).mount();
  } catch (err) {
    console.log(err);
  }
}

const featuredFilters = document.querySelector(".featured__filter");
let prevFilter = "";

function Filters(e) {
  if (e.target.localName === "button") {
    let currentFilter = e.target.dataset.filter;

    if (currentFilter === prevFilter) return;

    document.querySelectorAll(".featured__filter button").forEach((btn) => {
      btn.classList.remove("active");
    });

    e.target.classList.add("active");

    featuredCars.innerHTML = "";

    getFeaturedCars(e.target.dataset.filter);
  }
}

featuredFilters.addEventListener("click", Filters);

async function getFeaturedCars(filter = "All") {
  prevFilter = filter;
  try {
    const res = await fetch("assets/data/cars.json");
    if (!res.ok) throw new Error("No Cars Found");
    const data = await res.json();
    data.cars.forEach((car) => {
      if (car.featured && (filter === "All" || car.brand === filter))
        createCarCardAlt(car);
    });
  } catch (err) {
    console.log(err);
  }
}

function createCarCard(car) {
  const glideSildes = document.querySelector(".glide__slides");
  const glideSlide = document.createElement("li");
  glideSlide.className = "glide__slide";
  const card = document.createElement("div");
  card.className = "car__card";
  //shape
  const shape = document.createElement("div");
  shape.className = "shape";
  card.appendChild(shape);

  // Info
  const info = document.createElement("div");
  info.className = "card__info";
  const h2 = document.createElement("h2");
  h2.textContent = car.brand;
  const h4 = document.createElement("h4");
  h4.textContent = car.model;
  info.appendChild(h2);
  info.appendChild(h4);
  card.appendChild(info);

  // Image
  const imageDiv = document.createElement("div");
  imageDiv.className = "card__image";
  const img = document.createElement("img");
  img.src = car.image; // مصدر موثوق من project assets
  img.alt = `${car.brand} ${car.model}`;
  imageDiv.appendChild(img);
  card.appendChild(imageDiv);

  // Data
  const dataDiv = document.createElement("div");
  dataDiv.className = "card__data";

  const zeroToHundred = document.createElement("div");
  const zImg = document.createElement("img");
  zImg.src = "assets/images/dashboard.svg";
  const zSpan = document.createElement("span");
  zSpan.textContent = `${car.zeroToHundred}s`;
  zeroToHundred.appendChild(zImg);
  zeroToHundred.appendChild(zSpan);

  const topSpeed = document.createElement("div");
  const tImg = document.createElement("img");
  tImg.src = "assets/images/funds-box-line.svg";
  const tSpan = document.createElement("span");
  tSpan.textContent = car.topSpeed;
  topSpeed.appendChild(tImg);
  topSpeed.appendChild(tSpan);

  const range = document.createElement("div");
  const rImg = document.createElement("img");
  rImg.src = "assets/images/charging-pile.svg";
  const rSpan = document.createElement("span");
  rSpan.textContent = car.fuelType;
  range.appendChild(rImg);
  range.appendChild(rSpan);

  dataDiv.appendChild(zeroToHundred);
  dataDiv.appendChild(topSpeed);
  dataDiv.appendChild(range);

  card.appendChild(dataDiv);

  // Price
  const priceDiv = document.createElement("div");
  priceDiv.className = "card__price";
  const priceH3 = document.createElement("h3");
  priceH3.textContent = car.price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  priceDiv.appendChild(priceH3);
  card.appendChild(priceDiv);

  // Button
  const btn = document.createElement("button");
  btn.className = "card__btn";
  const btnImg = document.createElement("img");
  btnImg.src = "assets/images/shopping-bag.svg";
  btnImg.alt = "Add to cart";
  btn.appendChild(btnImg);

  // Event listener  button
  btn.addEventListener("click", () => {
    alert(`${car.brand} ${car.model} added to cart!`);
  });

  card.appendChild(btn);
  glideSlide.append(card);
  glideSildes.appendChild(glideSlide);
}

function createCarCardAlt(car) {
  const card = document.createElement("div");
  card.className = "car__card";
  card.classList.add("car__card");
  card.classList.add("car__card--alt");
  // card.className += "car__card--alt";
  //shape
  const shape = document.createElement("div");
  shape.className = "shape";
  card.appendChild(shape);

  // Info
  const info = document.createElement("div");
  info.className = "card__info";
  const h2 = document.createElement("h2");
  h2.textContent = car.brand;
  const h4 = document.createElement("h4");
  h4.textContent = car.model;
  info.appendChild(h2);
  info.appendChild(h4);
  card.appendChild(info);

  // Image
  const imageDiv = document.createElement("div");
  imageDiv.className = "card__image";
  const img = document.createElement("img");
  img.src = car.image;
  img.alt = `${car.brand} ${car.model}`;
  imageDiv.appendChild(img);
  card.appendChild(imageDiv);

  // Price
  const priceDiv = document.createElement("div");
  priceDiv.className = "card__price";
  const priceH3 = document.createElement("h3");
  priceH3.textContent = car.price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  priceDiv.appendChild(priceH3);
  card.appendChild(priceDiv);

  // Button
  const btn = document.createElement("button");
  btn.className = "card__btn";
  const btnImg = document.createElement("img");
  btnImg.src = "assets/images/shopping-bag.svg";
  btnImg.alt = "Add to cart";
  btn.appendChild(btnImg);

  // Event listener  button
  btn.addEventListener("click", () => {
    alert(`${car.brand} ${car.model} added to cart!`);
  });

  card.appendChild(btn);
  featuredCars.appendChild(card);
}

getPopularCars();
getFeaturedCars();
