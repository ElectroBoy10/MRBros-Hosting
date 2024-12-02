fetch('Public/MenuData/menu-data.txt')
  .then(response => response.text())
  .then(menuData => {
    const parsedMenuData = JSON.parse(menuData);
    const menuContainer = document.getElementById('menu-container');

    for (const category in parsedMenuData) {
      const categoryDiv = document.createElement('div');
      categoryDiv.id = category; 

      const categoryData = parsedMenuData[category]; 

      const categoryName = categoryData.name || category.replace('-contents', ''); 

      const categoryNameSpan = document.createElement('span'); 
      categoryNameSpan.textContent = categoryName;

      if (categoryData.price) {
        categoryNameSpan.textContent += ` - R${categoryData.price}`; 
      }

      categoryDiv.innerHTML = `<h3>${categoryNameSpan.outerHTML}</h3>`; 

      menuContainer.appendChild(categoryDiv);

      const categoryList = document.createElement('ul');
      categoryDiv.appendChild(categoryList);

      const itemsArray = categoryData.items || categoryData; 

      itemsArray.forEach(item => {
        const listItem = document.createElement('li');

        if (item.subcategories) {
          const subcategoryHeading = document.createElement('h4');
          subcategoryHeading.textContent = item.name;

          if (item.price) {
            const subcategoryPrice = document.createElement('span');
            subcategoryPrice.textContent = ` - R${item.price}`;
            subcategoryPrice.classList.add('subcategory-price');
            subcategoryHeading.appendChild(subcategoryPrice);
          }

          listItem.appendChild(subcategoryHeading);

          const subcategoryList = document.createElement('ul');
          item.subcategories.forEach(subItem => {
            const subItemElement = document.createElement('li');
            subItemElement.innerHTML = `
              <div class="menu-item">
                <span class="item-name">${subItem.name}</span>
                ${subItem.price !== "0" ? `<span class="item-price">R${subItem.price}</span>` : ''}
              </div>`;
            subcategoryList.appendChild(subItemElement);
          });

          listItem.appendChild(subcategoryList);
        } else {
          listItem.innerHTML = `
            <div class="menu-item">
              <span class="item-name">${item.name}</span>
              ${item.price !== "0" ? `<span class="item-price">R${item.price}</span>` : ''}
            </div>`;
        }

        categoryList.appendChild(listItem);
      });
    }
  })
  .catch(error => {
    console.error("Error loading menu:", error);
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = '<p class="error-message">Error loading menu. Please try again later.</p>';
  });


const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const targetId = link.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
  });
});


const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


document.getElementById('MRBros').addEventListener('click', () => {
  if (confirm("Do you want to continue to biolink?")) { 
    window.open("https://bio.link/mrbros1509", "_blank");
  } 
});
