/* eslint-disable @typescript-eslint/no-var-requires */
// metricsHook.js
const axios = require('axios');

module.exports = {
  sendMetrics: function (req, res, userContext, events, done) {
    // Extracción de métricas del objeto de respuesta
    const metrics = {
      requestDuration: res.timings.response, // Duración de la respuesta
      statusCode: res.statusCode,            // Código de estado HTTP
      downloadedBytes: res.body.length       // Tamaño de la respuesta
    };

    // Endpoint donde `prom-client` está escuchando
    const metricsEndpoint = 'http://localhost:9091/metrics';

    // Envía cada métrica a prom-client
    Promise.all(Object.entries(metrics).map(([metricName, value]) =>
      axios.post(metricsEndpoint, {
        metric: `http_${metricName}`, // Prefijo 'http_' para claridad
        value
      })
    ))
    .then(() => done())
    .catch(err => {
      console.error('Failed to send metrics', err.message);
      done(); // Asegúrate de llamar a done incluso si falla
    });
  }
};
