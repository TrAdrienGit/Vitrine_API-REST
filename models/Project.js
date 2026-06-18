const mongoose = require("mongoose");
const { v4: uuid4 } = require("uuid");

const supplementaryLinkSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true
        },
        link: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        _id: false
    }
);

const blockSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            enum: ["title", "text", "image", "gif", "video"]
        },

        toc_title: {
            type: String,
            default: ""
        },

        content: {
            type: String,
            required: true
        }
    },
    {
        _id: false
    }
);

const projectSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        cover: {
            type: String,
            required: true
        },

        stack: [
            {
                type: String,
                trim: true
            }
        ],

        ownerId: {
            type: String,
            required: true
        },

        supplementary_link: [supplementaryLinkSchema],

        blocks: [blockSchema]
    },
    {
        collection: "Projects",
        timestamps: true
    }
);

module.exports = mongoose.model("Project", projectSchema);