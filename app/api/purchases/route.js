import DataRepo from "../../repo/dataRepository";


export async function GET(request)
{
    const data = await DataRepo.getAllPurchases();
    return Response.json(data, { status: 200 });
}


export async function POST(request)
{
    const newPurchase = await request.json();
    const data = await DataRepo.createPurchase(newPurchase);
    return Response.json(data, { status: 200 });
}