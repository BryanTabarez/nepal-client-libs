import { AlLocation } from '@al/core';
import {
  assert,
  expect,
} from 'chai';
import { describe } from 'mocha';
import * as sinon from 'sinon';
import { AlKalmClientInstance } from '../src/index';

const serviceName = 'kalm';
const serviceVersion = 'v1';

let kalmClient:AlKalmClientInstance;

beforeEach( () => {
    kalmClient = new AlKalmClientInstance();
} );
afterEach(() => {
  sinon.restore();
});

describe('Kalm Client Test Suite', () => {
  const accountId = '1234';
  describe('when retrieving catalog tables', () => {
    let stub: sinon.SinonSpy;

    beforeEach(() => {
      stub = sinon.stub(kalmClient['client'], 'get');
    });

    afterEach(() => {
      stub.restore();
    });

    it('should should call get() on the AlDefaultClient instance to the kalm catalog tables items endpoint for all tables', async() => {
      await kalmClient.listCatalogTables();
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_stack: AlLocation.InsightAPI,
        service_name: serviceName,
        version: serviceVersion,
        path: '/catalog/table'
      };

      assert.deepEqual(payload, stub.args[0][0]);
    });

    it('should should call get() on the AlDefaultClient instance to the kalm catalog tables items endpoint for a single table', async() => {
      await kalmClient.getCatalogTable('test');
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_stack: AlLocation.InsightAPI,
        service_name: serviceName,
        version: serviceVersion,
        path: '/catalog/table/test'
      };

      assert.deepEqual(payload, stub.args[0][0]);
    });

    it('should should call get() on the AlDefaultClient instance to the startSimpleQuery end point', async() => {
      await kalmClient.startSimpleQuery(accountId, 'test');
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_stack: AlLocation.InsightAPI,
        service_name: serviceName,
        version: serviceVersion,
        account_id: accountId,
        path: `/query/test`,
        params: {},
        validation: {
          providers: kalmClient,
          schema: 'https://alertlogic.com/schematics/kalm#definitions/queryResponse'
        }
      };

      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
});
