import mongoose, {Schema, model, models} from "mongoose";

const IdeaSchema = new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    idea: {
        type:String,
        reuqired: [true, "Idea is required."],
    },
    tag: {
        type: String,
        required: [true, "Tag is required"],
    }
});

const Idea = models.Idea || model('Idea', IdeaSchema);

export default Idea;