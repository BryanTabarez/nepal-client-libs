import { AlGlobalizer } from '@al/core';
import { AlExternalScanSchedulerClientInstance } from './al-external-scan-scheduler-client';

export * from './al-external-scan-scheduler-client';
/* tslint:disable:variable-name */
export const AlExternalScanSchedulerClient = AlGlobalizer.instantiate( "AlExternalScanSchedulerClient", () => new AlExternalScanSchedulerClientInstance() );
