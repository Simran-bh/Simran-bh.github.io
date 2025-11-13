// ============================================
// DATA LOADING - Students modify this
// ============================================
/**
 * Load data from API - Students replace with their chosen endpoint
 */
async function loadData() {
  try {
    // TODO: Replace with student's chosen API
    // Examples:
     const response = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    // const response = await fetch('https://api.nasa.gov/neo/rest/v1/feed?api_key=DEMO_KEY');
    // const data = await response.json();

   //const response = await fetch ("./data.json")
    const data = await response.json();
    console.table(data);

    return data;
    
    // Simulate API delay
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // return mockRestaurantData;
  } catch (error) {
    console.error("Failed to load data:", error);
    throw new Error("Could not load data from API");
  }
}

export default loadData

// Just planning here 
// But in terms of functionaity of data, card veiw should likely have 
// Important info to get a sense o the restaurant like category, location, ect
// Table view can have name + maybe cleanliness so people can sort through that info
// Based on what matters to them 
// Category veiw we can choose  location, category. date of inspection ( before ater spec date), as categoroes
// MAYBE a collumn for passed/ vs violated any fo the inspection categorues (but htis one will be tough and is an add on)
// Stats cwill work on last -> an be common violations -> can do one of 10 mst ollon vioations with numebrs of how many failed, Then oen of location/ category of 
// Restaurants that failed
