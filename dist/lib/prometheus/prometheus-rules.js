import * as YAML from "yaml";
import { PrometheusEndpoint } from "./types.js";
import generateRequestUrl from "../../utils/function.js";
class PrometheusRules {
    baseUrl;
    prometheusEndpoint = PrometheusEndpoint;
    tenant;
    constructor(baseUrl, tenantId) {
        this.baseUrl = baseUrl;
        this.tenant = tenantId;
    }
    setTenant(tenantId) {
        this.tenant = tenantId;
    }
    async getAlertRules(query) {
        const rawEndpoint = this.prometheusEndpoint.rules;
        if (query)
            rawEndpoint.queryParams = query;
        const reqUrl = generateRequestUrl({
            baseUrl: this.baseUrl,
            path: rawEndpoint.path,
            queryParams: rawEndpoint.queryParams || {},
            params: {}
        }).replace(/(?<!:)\/+/g, '/');
        console.log('tenantID: ', this.tenant);
        let tenantHeaders;
        if (this.tenant)
            tenantHeaders = { 'X-Scope-OrgID': this.tenant };
        const res = await fetch(reqUrl, {
            method: 'get',
            headers: tenantHeaders,
        });
        if (res.status == 200) {
            return await res.text();
        }
        else {
            return res;
        }
    }
    async setAlertRuleGroup(namespace, alertGroup) {
        const rawEndpoint = this.prometheusEndpoint.setRuleGroupByNamespace;
        const reqUrl = generateRequestUrl({
            baseUrl: this.baseUrl,
            path: rawEndpoint.path,
            queryParams: {},
            params: { namespace },
        }).replace(/(?<!:)\/+/g, '/');
        const alertYaml = new YAML.Document();
        alertYaml.contents = alertGroup;
        let tenantHeaders;
        if (this.tenant)
            tenantHeaders = { 'Content-Type': 'application/yaml', 'X-Scope-OrgID': this.tenant };
        const res = await fetch(reqUrl, {
            method: 'post',
            headers: tenantHeaders,
            body: alertYaml.toString(),
        });
        if (res.status == 202) {
            return await res.text();
        }
        else {
            return res;
        }
    }
}
export default PrometheusRules;
