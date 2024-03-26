// Description: JavaScript file for FAQ page

document.addEventListener('DOMContentLoaded', function () {
    const homeLink = document.getElementById('homeLink');
    const otherLink = document.getElementById('otherLink');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    function resetColors() {
      homeLink.style.color = '';
      homeLink.style.backgroundColor = '';
      otherLink.style.color = '';
      otherLink.style.backgroundColor = '';
      dropdownItems.forEach(item => {
        item.style.color = '';
        item.style.backgroundColor = '';
      });
    }

    homeLink.addEventListener('click', function () {
      resetColors();
      homeLink.focus();
      homeLink.style.setProperty('color', '#2B3A67', 'important');
      homeLink.style.setProperty('background-color', '#7ADFBB', 'important');
    });

    otherLink.addEventListener('click', function () {
      resetColors();
      otherLink.focus();
      otherLink.style.setProperty('color', '#2B3A67', 'important');
      otherLink.style.setProperty('background-color', '#7ADFBB', 'important');
    });

    dropdownItems.forEach(item => {
      item.addEventListener('click', function () {
        resetColors();
        item.focus();
        item.style.setProperty('color', '#2B3A67', 'important');
        item.style.setProperty('background-color', '#7ADFBB', 'important');
      });
    });

  });

  const anwser = document.getElementById('anwser');
  const search = document.getElementById('search');

  search.addEventListener('keypress', function(event) { 
    if (event.key === 'Enter') {
      event.preventDefault();
      const searchTerm = event.target.value.trim().toLowerCase();
      
      markSearchTerm(searchTerm);
    }
  });

  document.body.addEventListener('click', function(event) {
    const searchInput = document.getElementById('search');
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (!searchTerm) {
      unmarkTerms();
    }
  });

  function markSearchTerm(searchTerm) {
    // Clear existing marks
    unmarkTerms();

    const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = textNodes.nextNode()) {
      const text = node.nodeValue.toLowerCase();
      let index = text.indexOf(searchTerm);
      let lastIndex = -1;
      while (index !== -1) {
        const parent = node.parentNode;
        const before = document.createTextNode(text.substring(lastIndex + 1, index));
        const markNode = document.createElement('mark');
        markNode.textContent = text.substring(index, index + searchTerm.length);
        if (parent && typeof parent.insertBefore === 'function') {
          parent.insertBefore(before, node);
          parent.insertBefore(markNode, node);
          lastIndex = index + searchTerm.length - 1;
          index = text.indexOf(searchTerm, lastIndex + 1);
        } else {
          break;
        }
      }
      if (parent && typeof parent.insertBefore === 'function') {
        const after = document.createTextNode(text.substring(lastIndex + 1));
        parent.insertBefore(after, node);
        parent.removeChild(node);
      }
    }
  }

  function unmarkTerms() {
    const marks = document.querySelectorAll('mark');
    marks.forEach(mark => {
      const parent = mark.parentNode;
      if (parent && typeof parent.replaceChild === 'function') {
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
      }
    });
  }
  function expandAccordionItem(accordionItem) {
    if (accordionItem) {
      const accordionButton = accordionItem.querySelector('.accordion-button');
      if (accordionButton && accordionButton.classList.contains('collapsed')) {
        accordionButton.click(); // Simulate a click to expand the accordion item
      }
    }
}