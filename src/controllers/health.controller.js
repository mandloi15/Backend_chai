const healthCheck = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Server is running properly",
            uptime: process.uptime(),
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Health check failed",
            error: error.message
        });
    }
};

module.exports = { healthCheck }