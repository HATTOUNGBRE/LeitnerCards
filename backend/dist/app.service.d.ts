export type ApplicationStatus = {
    name: string;
    status: 'ready';
    boundedContexts: string[];
};
export declare class AppService {
    getStatus(): ApplicationStatus;
}
