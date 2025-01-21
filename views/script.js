document.addEventListener('DOMContentLoaded', async () => {
  const createCategoryError = document.getElementById('create-category-error');
  const updateCategoryError = document.getElementById('update-category-error');
  const deleteCategoryError = document.getElementById('delete-category-error');
  const createSubcategoryError = document.getElementById('create-subcategory-error');
  const categoryDropdown = document.getElementById('category-dropdown'); // Category dropdown
  const subcategoryDropdown = document.getElementById('subcategory-dropdown'); // Subcategory dropdown

  // Fetch and populate categories
  async function fetchCategories() {
    try {
      const response = await fetch('http://localhost:4000/api/v1/categories');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      const subcategoryCategoryDropdown = document.getElementById('subcategory-category');
      const updateSubcategoryCategoryDropdown = document.getElementById('update-subcategory-category');

      // Clear dropdowns
      categoryDropdown.innerHTML = '<option value="">Select Category</option>';
      subcategoryCategoryDropdown.innerHTML = '<option value="">Select Category</option>';
      updateSubcategoryCategoryDropdown.innerHTML = '<option value="">Select New Category</option>';

      data.data.forEach((category) => {
        const option = document.createElement('option');
        option.value = category._id;
        option.textContent = category.name;

        categoryDropdown.appendChild(option);
        subcategoryCategoryDropdown.appendChild(option.cloneNode(true));
        updateSubcategoryCategoryDropdown.appendChild(option.cloneNode(true));
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
      createCategoryError.textContent = 'Error fetching categories: ' + error.message;
    }
  }

  // Fetch and populate subcategories for a selected category
  async function fetchSubcategories(categoryId) {
    try {
      if (!categoryId) return;

      const response = await fetch(`http://localhost:4000/api/v1/categories/${categoryId}/subcategories`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      if (data.data.length === 0) {
        subcategoryDropdown.innerHTML = '<option value="">No subcategories found</option>';
        subcategoryDropdown.disabled = true;
      } else {
        subcategoryDropdown.innerHTML = '<option value="">Select Subcategory</option>';
        subcategoryDropdown.disabled = false;

        data.data.forEach((subcategory) => {
          const option = document.createElement('option');
          option.value = subcategory._id;
          option.textContent = subcategory.name;
          subcategoryDropdown.appendChild(option);
        });
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      updateCategoryError.textContent = 'Error fetching subcategories: ' + error.message;
    }
  }

  // Handle category selection
  categoryDropdown.addEventListener('change', (event) => {
    const categoryId = event.target.value;
    if (categoryId) {
      fetchSubcategories(categoryId);
    } else {
      subcategoryDropdown.innerHTML = '';
      subcategoryDropdown.disabled = true;
    }
  });

  // Fetch categories on page load
  fetchCategories();

  // Handle create category
  document.getElementById('create-category-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('category-name').value;
    createCategoryError.textContent = '';
    try {
      const response = await fetch('http://localhost:4000/api/v1/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors.map((err) => err.msg).join(', '));
      }
      await fetchCategories();
      document.getElementById('category-name').value = '';
    } catch (error) {
      createCategoryError.textContent = error.message;
    }
  });

  // Handle update category
  document.getElementById('update-category-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = document.getElementById('update-category-id').value;
    const name = document.getElementById('update-category-name').value;
    updateCategoryError.textContent = '';
    try {
      const response = await fetch(`http://localhost:4000/api/v1/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors.map((err) => err.msg).join(', '));
      }
      await fetchCategories();
      document.getElementById('update-category-id').value = '';
      document.getElementById('update-category-name').value = '';
    } catch (error) {
      updateCategoryError.textContent = error.message;
    }
  });

  // Handle delete category
  document.getElementById('delete-category-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = document.getElementById('delete-category-id').value;
    deleteCategoryError.textContent = '';
    try {
      const response = await fetch(`http://localhost:4000/api/v1/categories/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors.map((err) => err.msg).join(', '));
      }
      await fetchCategories();
      document.getElementById('delete-category-id').value = '';
    } catch (error) {
      deleteCategoryError.textContent = error.message;
    }
  });

  // Handle create subcategory
  document.getElementById('create-subcategory-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('subcategory-name').value;
    const categoryId = document.getElementById('subcategory-category').value;
    if (!categoryId) {
      createSubcategoryError.textContent = 'Please select a category.';
      return;
    }
  
    console.log('Selected Category ID:', categoryId);
    createSubcategoryError.textContent = '';
    try {
      const response = await fetch(`http://localhost:4000/api/v1/categories/${categoryId}/subcategories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors.map((err) => err.msg).join(', '));
      }
      fetchSubcategories(categoryId);
      document.getElementById('subcategory-name').value = '';
    } catch (error) {
      createSubcategoryError.textContent = error.message;
    }
  });
});
