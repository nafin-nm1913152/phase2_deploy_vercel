import DataRepo from "../../../repo/dataRepository";


export async function GET(request, { params })
{
    const user_id = params.user_id;
    const user = await DataRepo.getUserById(parseInt(user_id));

    if (user) {return Response.json(user, { status: 200 });}
    else {return Response.json({ message: "User not found" }, { status: 404 });}
}


export async function PUT(request, { params })
{
    const user_id = params.user_id;
    const user_data = await request.json();
    const data = await DataRepo.updateUser(parseInt(user_id), user_data);
    return Response.json(data, { status: 200 });
}


export async function DELETE(request, { params })
{
    const user_id = params.user_id;
    const user = await DataRepo.deleteUser(parseInt(user_id));
    return Response.json(user, { status: 200 });
}