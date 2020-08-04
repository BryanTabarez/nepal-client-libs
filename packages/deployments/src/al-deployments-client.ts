/**
 * Module to deal with available Deployments Public API endpoints
 */
import {
  AlApiClient,
  AlDefaultClient,
  AlLocation,
} from '@al/core';
import {
  Deployment,
  DeploymentCreateBody,
  DeploymentUpdateBody,
} from './types';

export class AlDeploymentsClientInstance {

  private serviceName = 'deployments';
  private serviceVersion = 'v1';

  /* istanbul ignore next */
  constructor(public client:AlApiClient = AlDefaultClient) {
  }

  async createDeployment(accountId: string, deploymentRequest: DeploymentCreateBody) {
    return this.client.post<Deployment>({
      service_stack: AlLocation.InsightAPI,
      version: this.serviceVersion,
      service_name: this.serviceName,
      account_id: accountId,
      path: '/deployments',
      data: deploymentRequest,
    });
  }

  async updateDeployment(accountId: string, deploymentId: string, deploymentRequest: DeploymentUpdateBody) {
    return this.client.put<Deployment>({
      service_stack: AlLocation.InsightAPI,
      version: this.serviceVersion,
      service_name: this.serviceName,
      account_id: accountId,
      path: `/deployments/${deploymentId}`,
      data: deploymentRequest,
    });
  }

  async deleteDeployment(accountId: string, deploymentId: string) {
    return this.client.delete<any>({
      service_stack: AlLocation.InsightAPI,
      version: this.serviceVersion,
      service_name: this.serviceName,
      account_id: accountId,
      path: `/deployments/${deploymentId}`,
    });
  }

  async getDeployment(accountId: string, deploymentId: string) {
    return this.client.get<Deployment>({
      service_stack: AlLocation.InsightAPI,
      version: this.serviceVersion,
      service_name: this.serviceName,
      account_id: accountId,
      path: `/deployments/${deploymentId}`,
    });

  }

  async listDeployments(accountId: string, filters?: string[]) {
    return this.client.get<Deployment[]>({
      service_stack: AlLocation.InsightAPI,
      version: this.serviceVersion,
      service_name: this.serviceName,
      account_id: accountId,
      path: '/deployments',
      params: filters
    });
  }
}
