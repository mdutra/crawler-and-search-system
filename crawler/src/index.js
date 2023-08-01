const QueueService = require("./services/queue-service");

(async () => {
    await QueueService.initConsumer();
})();
