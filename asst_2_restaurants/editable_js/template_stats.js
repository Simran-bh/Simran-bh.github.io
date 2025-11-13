/**
 * STATS VIEW - STUDENTS IMPLEMENT
 * Show aggregate statistics and insights - good for understanding the big picture
 */
function showStats(data) {
  // TODO: Students implement this function
  // Requirements:
  // - Calculate meaningful statistics from the dataset
  // - Present insights visually
  // - Show distributions, averages, counts, etc.
  // - Help users understand patterns in the data
  /*html*/

  

// placing all count variables here
let total_restaurants = 0;
let failed_Inspection_Result = 0;

const Count_by_Type = {};
const Count_by_Category = {};
const Count_by_City = {};


 data.forEach(function(r) 
{total_restaurants = total_restaurants + 1;

const Inspection_result = r.inspection_results;
const Inspection_Type = r.inspection_type;
const Restaurant_Category = r.category;
const city = r.city;


if (Inspection_result.includes("Violations")||Inspection_result.includes("violations"))
{
failed_Inspection_Result = failed_Inspection_Result+1;

if (!Count_by_Type[Inspection_Type])
    {Count_by_Type[Inspection_Type] = 0;}
Count_by_Type[Inspection_Type] = Count_by_Type[Inspection_Type] + 1;


if (!Count_by_Category[Restaurant_Category])
    {Count_by_Category[Restaurant_Category] = 0;}
Count_by_Category[Restaurant_Category] = Count_by_Category[Restaurant_Category] + 1;

if (!Count_by_City[city])
    {Count_by_City[city] = 0;}
Count_by_City[city] = Count_by_City[city] + 1;

 }});

const failed_Percent = ((failed_Inspection_Result/total_restaurants)*100).toFixed(0)
const TypeWritten = Object.entries(Count_by_Type)
.sort(function(a, b)

{return b[1] - a[1];})
.map(function([type,count])
{
// Add inspection in name if not already included
let Full_Type_name = type;
if (!type.includes("inspection") && !type.includes("Inspection"))
{Full_Type_name = type + " Inspection";}

const percent = ((count/total_restaurants)*100).toFixed(0);

  if (percent>0)   
  {return `<li>${Full_Type_name}: (${percent}%) </li>`;}
  else {return "";}})
.join("");



//data.forEach(function(r) {
  //  const City_result = r.inspection_results
    //const city = r.city
  //  if (City_result.includes("Violations")||City_result.includes("violations"))
    //    if(!CitiesThatFailed[city])
      //       {CitiesThatFailed[city] = 0;
        //     }
          //   CitiesThatFailed[city] = CitiesThatFailed[city] + 1;
         //   }
     //   });
             
const CityBiggestFail = Object.entries(Count_by_City).sort(function (a, b) 
   {return  b[1] - a[1];
})[0];


  const CityBiggestFail_Name = CityBiggestFail[0];
  const CityBiggestFail_Count = CityBiggestFail[1];

return `
    <h2 class="view-title"> Inspection Statistics</h2>
    <div class="stats-grid">
      <section class="stats-card">
        <h3>Total Inspections</h3>
        <p><strong>${total_restaurants}</strong></p>
      </section>

      <section class="stats-card">
        <h3>Failed Inspections</h3>
        <p><strong>${failed_Percent}%</strong> (${failed_Inspection_Result} restaurants)</p>
      </section>

      <section class="stats-card">
        <h3>Types of Failed Inspections</h3>
        <ul>${TypeWritten}</ul>
      </section>

      <section class="stats-card">
        <h3>City with Most Failed Inspections</h3>
        <p><strong>${CityBiggestFail_Name}</strong> — ${CityBiggestFail_Count} failed</p>
      </section>
    </div>
  `;
}


  //              <h2 class="view-title">📈 Statistics View</h2>
    //            <div class="todo-implementation">
      //              <h3>TODO: Implement Statistics View</h3>
        //            <p><strong>Your task:</strong> Calculate and display key insights from the data</p>
          //          <p><strong>Good for:</strong> Understanding trends, making data-driven decisions, seeing the big picture</p>
            //        <p><strong>Consider:</strong> Average ratings? Price distribution? Most common cuisines? Geographic spread?</p>
              //      <p><strong>Total records:</strong> ${data.length} items to analyze</p>
             //   </div>
           // `;





export default showStats
