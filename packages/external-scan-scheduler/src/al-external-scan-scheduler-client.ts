/**
 * Module to deal with available External Scan Scheduler Public API endpoints
 */
import {
    AlDefaultClient,
    AlLocation,
    AlApiClient,
} from '@al/core';

type QParams = {[q: string]: string | number | boolean} | {};

export class AlExternalScanSchedulerClientInstance {

    private serviceName = 'external_scan_scheduler';
    private serviceVersion: number = 1;

    constructor(public client: AlApiClient = AlDefaultClient) {}

    /**
     * immediate_scan
     * @api {put} /external_scan_scheduler/v1/:account_id/:deployment_id/:asset_key/immediate_scan
     * This updates the asset's immediate scan time, which effectively puts the asset to the top of the scan queue.
     * Also, this makes the last scan time of the asset not matter, even if it was last scanned a second ago.
     */
    async immediateScan(accountId: string, deploymentId: string, assetKey: string, params: QParams = {}): Promise<void> {
        return AlDefaultClient.put({
            service_stack: AlLocation.InsightAPI,
            service_name: this.serviceName,
            version:      this.serviceVersion,
            account_id:   accountId,
            path:         `${deploymentId}/${assetKey}/immediate_scan`,
            params:       params,
        });
    }
}
