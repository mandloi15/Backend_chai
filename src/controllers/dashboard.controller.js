const mongoose = require('mongoose')
const Video = require('../models/video.model.js')
const Subscription = require('../models/subscription.model.js')
const Like = require('../models/like.model.js')
const ApiError = require('../utils/ApiError.js')
const ApiResponse = require('../utils/ApiResponse.js')
const asyncHandler = require('../utils/asyncHandler.js')

const getChannelStats = asyncHandler(async (req, res) => {
    const channelId = req.user?._id;

    if (!channelId) {
        throw new ApiError(401, "Unauthorized request");
    }

    const totalVideos = await Video.countDocuments({
        owner: channelId,
    });

    const totalSubscribers = await Subscription.countDocuments({
        channel: channelId,
    });

    const totalLikes = await Like.aggregate([
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "videoData",
            },
        },
        {
            $unwind: "$videoData",
        },
        {
            $match: {
                "videoData.owner": new mongoose.Types.ObjectId(channelId),
            },
        },
        {
            $count: "totalLikes",
        },
    ]);

    const totalViews = await Video.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(channelId),
            },
        },
        {
            $group: {
                _id: null,
                totalViews: {
                    $sum: "$views",
                },
            },
        },
    ]);

    const stats = {
        totalVideos,
        totalSubscribers,
        totalLikes: totalLikes[0]?.totalLikes || 0,
        totalViews: totalViews[0]?.totalViews || 0,
    };

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                stats,
                "Channel stats fetched successfully"
            )
        );
});

const getChannelVideos = asyncHandler(async (req, res) => {
    const channelId = req.user?._id;

    if (!channelId) {
        throw new ApiError(401, "Unauthorized request");
    }

    const videos = await Video.find({
        owner: channelId,
    }).sort({ createdAt: -1 });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                videos,
                "Channel videos fetched successfully"
            )
        );
});

module.exports = {
    getChannelStats,
    getChannelVideos,
};