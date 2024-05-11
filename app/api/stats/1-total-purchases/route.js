// Import the necessary modules
import DataRepository from "../../../repo/dataRepository.js";

// Define the handler function for the route
export async function GET(request)
{
        // Call the function to get total purchases by product and year
        const totalPurchases = await DataRepository.getAllPurchaseStats();

        // Return the total purchases data
        return Response.json(totalPurchases, { status: 200 });
}
