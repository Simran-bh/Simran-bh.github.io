
/**
 * TABLE VIEW - STUDENTS IMPLEMENT
 * Display data in sortable rows - good for scanning specific information
 */
function showTable(data) {
  // TODO: Students implement this function
  // Requirements:
  // - Show data in a table format
  // - Include all important fields
  // - Make it easy to scan and compare
  // - Consider adding sorting functionality
  /*html*/ 
  // Table -? getting categorie sin compliance a customer might care abotu 
  // in their own eating -> not like cooling time ect
  // should change in compliant and out of compliance to just yes/ no
  // Organize date properly
  

  const rows = data.map((r) => `
    <tr>
        <td>${r.name|| 'Unknown'}</td>
        <td>${r.city|| 'Unknown'}</td>
        <td>${r.inspection_type|| 'Unknown'}</td>
        <td>${new Date(r.inspection_date).toLocaleDateString()}</td>
        <td>${r.inspection_results|| 'Unknown'}</td>
        <td>${r.food_protected_from|| 'Unknown'}</td>
        <td>${r.proper_hand_washing|| 'Unknown'}</td>
        <td>${r.ill_workers_restricted|| 'Unknown'}</td>
        <td>${r.rodent_and_insects|| 'Unknown'}</td>
        
    </tr> `).join('');
    
  return `
        <h2 class="view-title"> Inspection Details</h2> 
        <table class = "Data_Table">
                <thead>
                    <tr>
                        <th>Name</th>
                         <th>City</th>
                         <th>Inspection Type</th>
                        <th>Date</th>
                        <th>Result</th>
                        <th>Food Protected From</th>
                        <th>Proper Hand Washing</th>
                        <th>Ill Workers Restricted</th>
                        <th>Rodent & Insects</th>
                    </tr>
                    </thead>
                    <tbody>${rows}</tbody>
        </table>



                
            `;
}

export default showTable;


/* <div class="todo-implementation">
                <h3>TODO: Implement Table View</h3>
                 <p><strong>Your task:</strong> Display the data as a sortable table</p>
                    <p><strong>Good for:</strong> Scanning specific data points, comparing values, finding specific information</p>
                    <p><strong>Consider:</strong> Which columns are most important? How can you make scanning easy?</p>
                    <p><strong>Data available:</strong> ${data.length} items loaded</p>
                </div>
                */

                // Q for later -> based on rubric, is || unknown best way to handle missing data
                // W inspection results theres a lot of ----- -> what should I do w this? should I use a diff category


                // lines i removed
                  //<td>${r.inspection_date|| 'Unknown'}</td