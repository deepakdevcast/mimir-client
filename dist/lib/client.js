class PrometheusMimirClient {
    baseUrl;
    headers;
    constructor(baseUrl) {
        this.baseUrl = `${baseUrl}/prometheus`;
    }
    setTenant(tenantId) {
        this.headers = {
            'X-Scope-OrgID': tenantId,
        };
        return this;
    }
    getUrl() {
        return this.baseUrl;
    }
    async getAlertList() {
        const res = await fetch(`${this.baseUrl}/api/v1/alerts`, {
            headers: this.headers
        });
        return { status: res.status, text: res.statusText };
    }
}
export default PrometheusMimirClient;
