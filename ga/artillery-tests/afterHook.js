/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

module.exports = {
  handleAfter: function(result, done) {
    console.log("Hook after está siendo ejecutado.");
    const metrics = {
      meanResponseTime: result.global_stats.latency.mean,
      maxResponseTime: result.global_stats.latency.max,
      minResponseTime: result.global_stats.latency.min,
      p95ResponseTime: result.global_stats.latency.p95
    };

    Object.entries(metrics).forEach(([key, value]) => {
      console.log(`Sending metric ${key} with value ${value}`);
      axios.post('http://localhost:9091/metrics', {
        metric: `artillery_${key}`,
        value
      }).then(response => {
        console.log(`Metric ${key} sent successfully.`);
      }).catch(err => {
        console.error(`Failed to send metric ${key}`, err.message);
      });
    });

    done();
  }
};
