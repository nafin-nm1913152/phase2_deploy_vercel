import DataRepo from "../../../repo/dataRepository";


export async function GET(request, { params })
{
    const type = params.type;
    const product = await DataRepo.getProductsByType(type);

    if (product) {return Response.json(product, { status: 200 });}
    else {return Response.json({ message: "User not found" }, { status: 404 });}
}


export async function PUT(request, { params })
{
    const product_id = params.type;
    const product_data = await request.json();
    const data = await DataRepo.updateProduct(parseInt(product_id), product_data);
    return Response.json(data, { status: 200 });
}


export async function DELETE(request, { params })
{
    const product_id = params.type;
    const data = await DataRepo.deleteProduct(parseInt(product_id));
    return Response.json(data, { status: 200 });
}