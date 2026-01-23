document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const searchInput = document.getElementById('faqSearch');
  const clearSearchBtn = document.getElementById('clearSearch');
  const resetSearchBtn = document.getElementById('resetSearch');
  const categoryCards = document.querySelectorAll('.category-card');
  const faqCategories = document.querySelectorAll('.faq-category');
  const faqItems = document.querySelectorAll('.faq-item');
  const noResults = document.getElementById('noResults');
  const resultsInfo = document.getElementById('resultsInfo');
  const resultsCount = document.getElementById('resultsCount');
  const hintTags = document.querySelectorAll('.hint-tag');

  let currentCategory = 'all';
  let currentSearch = '';

  // Initialize
  init();

  function init() {
    setupSearchListeners();
    setupCategoryFilters();
    setupHintTags();
    setupAccordionAnimations();
  }

  // Search functionality
  function setupSearchListeners() {
    if (searchInput) {
      searchInput.addEventListener('input', debounce(handleSearch, 300));
      searchInput.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });
      searchInput.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', clearSearch);
    }

    if (resetSearchBtn) {
      resetSearchBtn.addEventListener('click', clearSearch);
    }
  }

  function handleSearch(e) {
    const searchTerm = e.target.value.trim().toLowerCase();
    currentSearch = searchTerm;
    
    // Show/hide clear button
    if (clearSearchBtn) {
      clearSearchBtn.style.display = searchTerm ? 'flex' : 'none';
    }

    // Clear previous highlights
    clearHighlights();

    if (searchTerm.length === 0) {
      showAllItems();
      hideNoResults();
      hideResultsInfo();
      return;
    }

    let visibleCount = 0;

    // Reset category filter when searching
    categoryCards.forEach(card => card.classList.remove('active'));
    document.querySelector('[data-category="all"]')?.classList.add('active');
    currentCategory = 'all';

    // Filter and highlight items
    faqItems.forEach(item => {
      const questionText = item.querySelector('.question-text')?.textContent.toLowerCase() || '';
      const answerText = item.querySelector('.answer-content')?.textContent.toLowerCase() || '';
      
      if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
        item.classList.remove('hidden');
        item.style.display = '';
        visibleCount++;
        
        // Highlight matches
        highlightText(item, searchTerm);
      } else {
        item.classList.add('hidden');
        item.style.display = 'none';
      }
    });

    // Show/hide categories based on visible items
    faqCategories.forEach(category => {
      const visibleItems = category.querySelectorAll('.faq-item:not(.hidden)');
      if (visibleItems.length === 0) {
        category.classList.add('hidden');
        category.style.display = 'none';
      } else {
        category.classList.remove('hidden');
        category.style.display = '';
      }
    });

    // Show results info or no results message
    if (visibleCount === 0) {
      showNoResults();
      hideResultsInfo();
    } else {
      hideNoResults();
      showResultsInfo(visibleCount);
    }
  }

  function clearSearch() {
    if (searchInput) {
      searchInput.value = '';
      currentSearch = '';
    }
    if (clearSearchBtn) {
      clearSearchBtn.style.display = 'none';
    }
    clearHighlights();
    showAllItems();
    hideNoResults();
    hideResultsInfo();
    filterByCategory(currentCategory);
  }

  function highlightText(container, searchTerm) {
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach(node => {
      const text = node.nodeValue;
      const lowerText = text.toLowerCase();
      const index = lowerText.indexOf(searchTerm);
      
      if (index !== -1 && node.parentNode.nodeName !== 'MARK') {
        const before = text.substring(0, index);
        const match = text.substring(index, index + searchTerm.length);
        const after = text.substring(index + searchTerm.length);
        
        const fragment = document.createDocumentFragment();
        
        if (before) fragment.appendChild(document.createTextNode(before));
        
        const mark = document.createElement('mark');
        mark.textContent = match;
        fragment.appendChild(mark);
        
        if (after) fragment.appendChild(document.createTextNode(after));
        
        node.parentNode.replaceChild(fragment, node);
      }
    });
  }

  function clearHighlights() {
    document.querySelectorAll('#faq mark').forEach(mark => {
      const parent = mark.parentNode;
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize();
    });
  }

  // Category filtering
  function setupCategoryFilters() {
    categoryCards.forEach(card => {
      card.addEventListener('click', function() {
        const category = this.dataset.category;
        
        // Update active state
        categoryCards.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        
        currentCategory = category;
        
        // Clear search when changing category
        if (searchInput) {
          searchInput.value = '';
          currentSearch = '';
        }
        if (clearSearchBtn) {
          clearSearchBtn.style.display = 'none';
        }
        clearHighlights();
        hideNoResults();
        hideResultsInfo();
        
        filterByCategory(category);
      });
    });
  }

  function filterByCategory(category) {
    if (category === 'all') {
      faqCategories.forEach(cat => {
        cat.classList.remove('hidden');
        cat.style.display = '';
      });
      faqItems.forEach(item => {
        item.classList.remove('hidden');
        item.style.display = '';
      });
    } else {
      faqCategories.forEach(cat => {
        if (cat.dataset.category === category) {
          cat.classList.remove('hidden');
          cat.style.display = '';
        } else {
          cat.classList.add('hidden');
          cat.style.display = 'none';
        }
      });
    }
  }

  // Hint tags
  function setupHintTags() {
    hintTags.forEach(tag => {
      tag.addEventListener('click', function() {
        const searchTerm = this.dataset.search;
        if (searchInput) {
          searchInput.value = searchTerm;
          searchInput.dispatchEvent(new Event('input'));
          searchInput.focus();
        }
      });
    });
  }

  // Accordion animations
  function setupAccordionAnimations() {
    const accordionButtons = document.querySelectorAll('.faq-question');
    
    accordionButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Smooth scroll to question if it's below viewport
        setTimeout(() => {
          const rect = this.getBoundingClientRect();
          if (rect.top < 0) {
            this.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 350);
      });
    });
  }

  // Helper functions
  function showAllItems() {
    faqCategories.forEach(cat => {
      cat.classList.remove('hidden');
      cat.style.display = '';
    });
    faqItems.forEach(item => {
      item.classList.remove('hidden');
      item.style.display = '';
    });
  }

  function showNoResults() {
    if (noResults) {
      noResults.style.display = 'block';
    }
  }

  function hideNoResults() {
    if (noResults) {
      noResults.style.display = 'none';
    }
  }

  function showResultsInfo(count) {
    if (resultsInfo && resultsCount) {
      resultsCount.textContent = count;
      resultsInfo.style.display = 'block';
    }
  }

  function hideResultsInfo() {
    if (resultsInfo) {
      resultsInfo.style.display = 'none';
    }
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Navbar functionality (keeping original)
  const homeLink = document.getElementById('homeLink');
  const dropdownItems = document.querySelectorAll('.dropdown-item');

  if (homeLink) {
    homeLink.addEventListener('click', function() {
      resetNavColors();
      this.style.setProperty('color', '#2B3A67', 'important');
      this.style.setProperty('background-color', '#7ADFBB', 'important');
    });
  }

  dropdownItems.forEach(item => {
    item.addEventListener('click', function() {
      resetNavColors();
      this.style.setProperty('color', '#2B3A67', 'important');
      this.style.setProperty('background-color', '#7ADFBB', 'important');
    });
  });

  function resetNavColors() {
    if (homeLink) {
      homeLink.style.removeProperty('color');
      homeLink.style.removeProperty('background-color');
    }
    dropdownItems.forEach(item => {
      item.style.removeProperty('color');
      item.style.removeProperty('background-color');
    });
  }
});

