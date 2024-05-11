import DataRepo from "../../repo/dataRepository";


export async function GET(request)
{
    const data = await DataRepo.getAllProducts();
    return Response.json(data, { status: 200 });
}


export async function POST(request)
{
    const newProduct = await request.json();
    const data = await DataRepo.createProduct(newProduct);
    return Response.json(data, { status: 200 });
}