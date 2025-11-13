
/**
 * CARD VIEW - PROVIDED AS EXAMPLE
 * Display data as browsable cards - good for comparing individual items
 */
function showCards(data) {
  const cardHTML = data
    .map(
        (restaurant) => 
    
  {let Cards_initial_Results = restaurant.inspection_results;
    let Cards_Final_Results = "";
    if(Cards_initial_Results.includes("Violations")||Cards_initial_Results.includes("violations"))
    
    {Cards_Final_Results = "NOT Safe";}
else 
    {Cards_Final_Results = "Safe";}
      return `
                <div class="restaurant-card">
                    <h3>${restaurant.name}</h3>
                    <p><strong>Restaurant Status: </strong>${Cards_Final_Results}</p>
                   <p><strong>Establishment Type:</strong> ${restaurant.category}</p>
                    <p><strong>City:</strong> ${restaurant.city}</p>
                    <p><strong>Owner:</strong> ${restaurant.owner}</p>
                    <strong>Inspection type:</strong> ${restaurant.inspection_type}</p>


                    </div>
                    `;

})
    .join("");
     /*html
     <p><strong>proper sewage disposal:</strong> ${restaurant.proper_sewage_disposal}</p> 
                     
                    
                    
             <p><strong>food contaminant safe:</strong> ${restaurant.food_protected_from}</p> 
                
     
     */






  return `
                
                <p class="view-description">Browse restaurants to see their inspection status</p>
                <div class="card-grid">
                    ${cardHTML}
                </div>
            `;
}

export default showCards;