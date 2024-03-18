import { PrometheusQuery, PrometheusRules } from "../src/index.js";
const tenantId = '47a0940f-274f-4583-8e02-a06af0fc2061';
const prometheusAlertInstance = new PrometheusRules('http://127.0.0.1:53630/prometheus', tenantId);
const prometheusQueryInstance = new PrometheusQuery('http://127.0.0.1:53630/prometheus');
console.log(await prometheusAlertInstance.getAlertRules({ ruleName: 'test' }));
console.log(await prometheusAlertInstance.setAlertRuleGroup('test-group', {
    name: 'test-1',
    rules: [
        {
            alert: 'alert-1',
            expr: 'up{job="alert"} == 0',
            annotations: {
                summary: 'testing alerts',
                description: 'description'
            }
        }
    ]
}));
console.log(await prometheusAlertInstance.getAlertRules({ ruleName: 'test' }));
console.log(await prometheusQueryInstance.getQueryInstant({
    query: 'up'
}));
console.log(await prometheusQueryInstance.getQueryRange({
    query: 'up',
    start: '1710783099',
    end: '1710793099',
    step: '5m',
}));
console.log(await prometheusQueryInstance.getQueryExemplars({
    query: 'up',
    start: '1710783099',
    end: '1710793099',
}));
