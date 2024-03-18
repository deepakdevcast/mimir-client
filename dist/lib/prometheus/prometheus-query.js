import generateRequestUrl from "../../utils/function.js";
import { PrometheusQueryEndpoint } from "./types.js";
class PrometheusQuery {
    baseUrl;
    prometheusQueryEndpoint = PrometheusQueryEndpoint;
    tenant;
    constructor(baseUrl, tenantId) {
        this.baseUrl = baseUrl;
        this.tenant = tenantId;
    }
    setTenant(tenantId) {
        this.tenant = tenantId;
    }
    async getQueryInstant(query) {
        let tenantHeaders;
        if (this.tenant)
            tenantHeaders = { 'X-Scope-OrgID': this.tenant };
        const reqUrl = generateRequestUrl({
            baseUrl: this.baseUrl,
            path: this.prometheusQueryEndpoint.queryInstant.path,
            queryParams: query,
            params: {},
        });
        const res = await fetch(reqUrl, {
            method: this.prometheusQueryEndpoint.queryInstant.method,
            headers: tenantHeaders,
        });
        return { status: res.status, data: await res.json() };
    }
    async getQueryRange(query) {
        let tenantHeaders;
        if (this.tenant)
            tenantHeaders = { 'X-Scope-OrgID': this.tenant };
        const reqUrl = generateRequestUrl({
            baseUrl: this.baseUrl,
            path: this.prometheusQueryEndpoint.queryRange.path,
            queryParams: query,
            params: {},
        });
        console.log('requested data on url:', reqUrl);
        const res = await fetch(reqUrl, {
            method: this.prometheusQueryEndpoint.queryRange.method,
            headers: tenantHeaders,
        });
        return { status: res.status, data: await res.json() };
    }
    async getQueryExemplars(query) {
        let tenantHeaders;
        if (this.tenant)
            tenantHeaders = { 'X-Scope-OrgID': this.tenant };
        const reqUrl = generateRequestUrl({
            baseUrl: this.baseUrl,
            path: this.prometheusQueryEndpoint.queryExemplars.path,
            queryParams: query,
            params: {},
        });
        console.log('requested data on url:', reqUrl);
        const res = await fetch(reqUrl, {
            method: this.prometheusQueryEndpoint.queryExemplars.method,
            headers: tenantHeaders,
        });
        return { status: res.status, data: await res.json() };
    }
}
export default PrometheusQuery;
