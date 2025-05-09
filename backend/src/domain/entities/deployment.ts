export enum DeploymentStatus {
    DRAFT = 'draft',
    ACTIVE = 'active',
    FINISHED = 'finished',
}

export enum DeploymentTaskStatus {
    PULLING = 'pulling',
    PENDING = 'pending',
    RUNNING = 'running',
    FAILED = 'failed',
}

export interface DeploymentConfig {
    image: string;
    command?: string;
}