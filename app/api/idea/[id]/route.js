import Idea from "@models/idea";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const idea = await Idea.findById(params.id).populate("creator")
        if (!idea) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(idea), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { idea, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingIdea = await Idea.findById(params.id);

        if (!existingIdea) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingIdea.idea = idea;
        existingIdea.tag = tag;

        await existingIdea.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Idea.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};