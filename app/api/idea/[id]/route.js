import Idea from "@models/idea";
import { connectToDB } from "@utils/database";


// GET (read)
export const GET = async({params}) => {
    try {
        await connectToDB();
        const ideas = await Idea.findById(params.id).populate('creator');
        if(!ideas) return new Response("Idea not found", {status:404})

        return new Response(JSON.stringify(ideas), {
            status:200})
    } catch (error) {
        return new Response("Failed to fetch all ideas", {
        status:500})
    }
}

// PATCH (update)
export const PATCH = async (request, {params}) => {
    const {idea,tag} = await request.json();

    try{
        await connectToDB();

        const existingIdea = await Idea.findById(params.id);

        if(!existingIdea) return new Response("Idea not found", {status:404})

        existingIdea.idea = idea;
        existingIdea.tag = tag;

        await existingIdea.save();

        return new Response(JSON.stringify(existingIdea), {status:200})
    } catch(error) {
        return new Response("Failed to update idea", {status: 500})
    }
}

//DELETE (delete)
export const DELETE = async (request, {params}) => {
    try {
        await connectToDB();
        await Idea.findByIdAndRemove(params.id);
        return new Response("Idea deleted successfully", {status:200})
    } catch (error) {
        return new Response("Failed to delete idea", {status:500})
    }
}