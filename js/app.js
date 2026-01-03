(function () {
  'use strict';

  let currentDestinations = [...destinations];

  function createDestinationCard(destination) {
    const card = document.createElement('article');
    card.className = 'destination-card';
    card.dataset.id = destination.id;

    const stars = '★'.repeat(Math.floor(destination.rating));

    const imageBase = destination.image.split('?')[0];

    card.innerHTML = `
      <div class="card-image-wrapper">
        <picture>
          <source
            media="(min-width: 1024px)"
            srcset="${imageBase}?w=800&h=600&fit=crop&q=80 1x, ${imageBase}?w=1600&h=1200&fit=crop&q=80 2x"
          >
          <source
            media="(min-width: 768px)"
            srcset="${imageBase}?w=600&h=450&fit=crop&q=80 1x, ${imageBase}?w=1200&h=900&fit=crop&q=80 2x"
          >
          <img
            src="${imageBase}?w=400&h=300&fit=crop&q=80"
            srcset="${imageBase}?w=400&h=300&fit=crop&q=80 1x, ${imageBase}?w=800&h=600&fit=crop&q=80 2x"
            alt="${destination.name}"
            class="card-image"
            loading="lazy"
          >
        </picture>
        <span class="card-badge">${destination.badge}</span>
      </div>
      <div class="card-content">
        <div class="card-header">
          <h3 class="card-title">${destination.name}</h3>
          <p class="card-location">📍 ${destination.location}</p>
        </div>
        <p class="card-description">${destination.description}</p>
        <div class="card-footer">
          <div class="card-rating">
            <span class="rating-stars">${stars}</span>
            <span>${destination.rating}</span>
          </div>
          <div>
            <p class="card-price">$${destination.price}</p>
            <p class="price-label">per night</p>
          </div>
        </div>
        <button class="card-cta" data-id="${destination.id}">View Details</button>
      </div>
    `;

    const img = card.querySelector('.card-image');
    if (img) {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', () => {
          img.classList.add('loaded');
        });
      }
    }

    return card;
  }

  function renderDestinations(destinationsToRender) {
    const grid = document.getElementById('destinations-grid');
    if (!grid) return;

    grid.innerHTML = '';

    if (destinationsToRender.length === 0) {
      grid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--color-text-light);">No destinations found matching your filters.</p>';
      return;
    }

    destinationsToRender.forEach(destination => {
      const card = createDestinationCard(destination);
      grid.appendChild(card);
    });
  }

  function sortDestinations(sortBy) {
    let sorted = [...currentDestinations];

    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        break;
    }

    return sorted;
  }

  function filterDestinations() {
    const locationFilter = document.getElementById('location-select').value;
    const priceFilter = document.getElementById('price-select').value;

    let filtered = [...destinations];

    if (locationFilter !== 'all') {
      filtered = filtered.filter(dest => dest.region === locationFilter);
    }

    if (priceFilter !== 'all') {
      filtered = filtered.filter(dest => dest.priceRange === priceFilter);
    }

    currentDestinations = filtered;
    const sortBy = document.getElementById('sort-select').value;
    const sorted = sortDestinations(sortBy);
    renderDestinations(sorted);
  }

  function handleSortChange() {
    const sortBy = document.getElementById('sort-select').value;
    const sorted = sortDestinations(sortBy);
    renderDestinations(sorted);
  }

  function openModal(destinationId) {
    const destination = destinations.find(d => d.id === parseInt(destinationId));
    if (!destination) return;

    const modal = document.getElementById('detail-modal');
    const modalBody = document.getElementById('modal-body');

    const stars = '★'.repeat(Math.floor(destination.rating));
    const imageBase = destination.image.split('?')[0];

    modalBody.innerHTML = `
      <picture>
        <source
          media="(min-width: 768px)"
          srcset="${imageBase}?w=1200&h=800&fit=crop&q=80 1x, ${imageBase}?w=2400&h=1600&fit=crop&q=80 2x"
        >
        <img
          src="${imageBase}?w=800&h=600&fit=crop&q=80"
          srcset="${imageBase}?w=800&h=600&fit=crop&q=80 1x, ${imageBase}?w=1600&h=1200&fit=crop&q=80 2x"
          alt="${destination.name}"
          class="modal-image"
        >
      </picture>
      <div class="modal-details">
        <div class="modal-header">
          <h2 class="modal-title" id="modal-title">${destination.name}</h2>
          <p class="modal-location">📍 ${destination.location}</p>
          <div class="modal-rating">
            <span class="rating-stars">${stars}</span>
            <span>${destination.rating}</span>
            <span style="color: var(--color-text-light);">• ${destination.reviews} reviews</span>
          </div>
        </div>
        <p class="modal-description">${destination.description}</p>
        <div class="modal-amenities">
          <h4>Amenities</h4>
          <div class="amenities-list">
            ${destination.amenities.map(amenity => `
              <div class="amenity-item">
                <span>✓</span>
                <span>${amenity}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="modal-footer">
          <div class="modal-price-info">
            <span class="modal-price">$${destination.price}</span>
            <span class="modal-price-label">per night</span>
          </div>
          <button class="modal-cta">Book Now</button>
        </div>
      </div>
    `;

    const modalImg = modalBody.querySelector('.modal-image');
    if (modalImg) {
      if (modalImg.complete) {
        modalImg.classList.add('loaded');
      } else {
        modalImg.addEventListener('load', () => {
          modalImg.classList.add('loaded');
        });
      }
    }

    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = document.getElementById('detail-modal');
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  function handleCardClick(e) {
    const button = e.target.closest('.card-cta');
    if (button) {
      const destinationId = button.dataset.id;
      openModal(destinationId);
    }
  }

  function init() {
    renderDestinations(currentDestinations);

    const sortSelect = document.getElementById('sort-select');
    const locationSelect = document.getElementById('location-select');
    const priceSelect = document.getElementById('price-select');
    const modal = document.getElementById('detail-modal');
    const modalClose = modal.querySelector('.modal-close');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const destinationsGrid = document.getElementById('destinations-grid');

    if (sortSelect) {
      sortSelect.addEventListener('change', handleSortChange);
    }

    if (locationSelect) {
      locationSelect.addEventListener('change', filterDestinations);
    }

    if (priceSelect) {
      priceSelect.addEventListener('change', filterDestinations);
    }

    if (destinationsGrid) {
      destinationsGrid.addEventListener('click', handleCardClick);
    }

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
      modalOverlay.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
        closeModal();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
