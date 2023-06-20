import Idea from "@models/idea";
import { connectToDB } from "@utils/database";

export const GET = async(request) => {
    try {
        await connectToDB();
        const ideas = await Idea.find({}).populate('creator');
        return new Response(JSON.stringify(ideas), {
            status:200})
    } catch (error) {
        return new Response("Failed to fetch all ideas", {
        status:500})
    }
}