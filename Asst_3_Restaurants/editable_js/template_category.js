/**
 * CATEGORY VIEW - STUDENTS IMPLEMENT
 * Group data by categories - good for understanding relationships and patterns
 */
function showCategories(data) {
  // TODO: Students implement this function
  // Requirements:
  // - Group data by a meaningful category (cuisine, neighborhood, price, etc.)
  // - Show items within each group
  // - Make relationships between groups clear
  // - Consider showing group statistics
  /*html*/

const City_Group = {};
data.forEach(r=>
  {const Individual_city = r.city || 'Unknown';
     if (!City_Group[Individual_city])
      {City_Group[Individual_city] = [];}

    City_Group[Individual_city].push(r);
  });

  const Category_Section = Object.entries(City_Group)
    .map(([city_name, Restaurant_list]) => 


    {const Listed_names = [...new Set(Restaurant_list.map((r) =>  `<li>${r.name}</li>`))]
      .join("");


  return `
    <section class = "Category_Card">
      <div class = "category_card_title">
      <h3>${city_name}</h3>
      <span class = "count_for_category">${Restaurant_list.length} locations </span>
   </div>

   <ul class = "category-card-list">
   ${Listed_names}
   </ul>
   </section>
   `
   ;
   
})
.join("");
  return  `
 <h2 class="view-title"> Restaurants by City</h2>
 <div class = "category-grid">
  ${Category_Section}
</div>
`;} 


// Can try with reduce too if time



 
              
 //               <div class="todo-implementation">
//                <h3>TODO: Implement Category View</h3>
//                  <p><strong>Your task:</strong> Group the data by categories to show relationships</p>
//                  <p><strong>Good for:</strong> Understanding patterns, finding similar items, exploring by type</p>
//                  <p><strong>Consider:</strong> Group by cuisine? Neighborhood? Price range? What tells the best story?</p>
//                  <p><strong>Available categories:</strong> ${[
//                    ...new Set(data.map((item) => item.cuisine)),
//                  ].join(", ")}</p>
//              </div>
//          `;
//

export default showCategories;