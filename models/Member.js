const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        phone_number: {
            type: String,
            default: ""
        },

        mail: {
            type: String,
            required: true,
            trim: true
        },

        github: {
            type: String,
            default: ""
        },

        linkedin: {
            type: String,
            default: ""
        }
    },
    {
        _id: false
    }
);

const supplementaryLinkSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },

        link: {
            type: String,
            required: true
        }
    },
    {
        _id: false
    }
);

const memberSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },

        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            trim: true
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        job: {
            type: String,
            required: true
        },

        avatar: {
            type: String,
            default: ""
        },

        presentation: {
            type: String,
            default: ""
        },

        location: {
            type: String,
            default: ""
        },

        contact: {
            type: contactSchema,
            required: true
        },

        skills: [
            {
                type: String,
                trim: true
            }
        ],

        projects: [
            {
                type: String
            }
        ],

        supplementary_link: [supplementaryLinkSchema]
    },
    {
        collection: "Membres",
        timestamps: true
    }
);

module.exports = mongoose.model("Member", memberSchema);