import {
    AlDefaultClient,
    AlLocatorService,
} from '@al/core';
import { expect } from 'chai';
import { describe } from 'mocha';
import * as sinon from 'sinon';
import { AlExternalScanSchedulerClient } from '../src/index';

beforeEach(() => {
    AlLocatorService.setContext( { environment: "production" } );
    AlDefaultClient.setGlobalParameters( { noEndpointsResolution: true } );
});

afterEach(() => {
    sinon.restore();
});

// Global spy.
let stub: sinon.SinonSpy;

describe('EXTERNAL SCAN SCHEDULER CLIENT', () => {
    describe('immediateScan', () => {
        beforeEach(() => {
            stub = sinon.stub(AlDefaultClient as any, 'axiosRequest').returns(Promise.resolve({ status: 200, data: {} }));
        });
        afterEach(() => {
            stub.restore();
        });
        it('should call PUT with the correct path', async () => {
            await AlExternalScanSchedulerClient.immediateScan('123', 'deploy-1', 'asset-key-1');
            expect(stub.callCount).to.equal(1);
            expect(stub.args[0][0].method).to.equal('PUT');
            expect(stub.args[0][0].url).to.contain('deploy-1/asset-key-1/immediate_scan');
        });
    });
});
