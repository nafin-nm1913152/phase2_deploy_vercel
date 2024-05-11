import DataRepo from "../../repo/dataRepository";


export async function GET(request)
{
    const data = await DataRepo.getAllUsers();
    return Response.json(data, { status: 200 });
}


export async function POST(request)
{
    const newUser = await request.json();
    const data = await DataRepo.createUser(newUser);
    return Response.json(data, { status: 200 });
}