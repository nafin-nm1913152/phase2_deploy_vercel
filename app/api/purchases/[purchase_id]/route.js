import DataRepo from "../../../repo/dataRepository";


export async function GET(request, { params })
{
    const purchase_id = params.purchase_id;
    const purchase = await DataRepo.getPurchaseById(parseInt(purchase_id));

    if (purchase) {return Response.json(purchase, { status: 200 });}
    else {return Response.json({ message: "User not found" }, { status: 404 });}
}


export async function PUT(request, { params })
{
    const purchase_id = params.purchase_id;
    const purchase_data = await request.json();
    const data = await DataRepo.updatePurchase(parseInt(purchase_id), purchase_data);
    return Response.json(data, { status: 200 });
}


export async function DELETE(request, { params })
{
    const purchase_id = params.purchase_id;
    const data = await DataRepo.deletePurchase(parseInt(purchase_id));
    return Response.json(data, { status: 200 });
}