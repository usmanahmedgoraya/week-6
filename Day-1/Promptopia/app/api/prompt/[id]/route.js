import Prompt from "@models/prompt.model";
import { connectToDB } from "@utils/database";


// Get Prompt
export const GET = async (request, { params }) => {
    try {
        await connectToDB()
        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) {
            return new Response("No Prompt found", { status: 404 })
        }
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}

// Update Prompt

export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();

    try {
        await connectToDB()
        const ExistingPrompt = await Prompt.findById(params.id)
        if (!ExistingPrompt) {
            return new Response("No Prompt found", { status: 404 })
        }
        // Update the prompt with new data
        ExistingPrompt.prompt = prompt;
        ExistingPrompt.tag = tag;

        await ExistingPrompt.save();

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};