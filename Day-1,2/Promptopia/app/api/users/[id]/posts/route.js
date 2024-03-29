import Prompt from "@models/prompt.model";
import { connectToDB } from "@utils/database";
import user from "@models/users.model";

export const GET = async (request,{params}) => {
    try {
        await connectToDB()
        const prompts = await Prompt.find({
            creator:params.id
        }).populate('creator');
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 