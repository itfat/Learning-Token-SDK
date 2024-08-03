import axios, { AxiosInstance } from 'axios';
import { ApiResponse, PreEventDetails, User } from './types';

/**
 * @class
 * Client class for interacting with the API.
 */
export class Client {
    private httpClient: AxiosInstance;
    private token: string;

    /**
     * Creates an instance of the Client.
     * @param {string} baseURL - The base URL of the API.
     */
    constructor(baseURL: string, token: string) {
        this.token = token;
        this.httpClient = axios.create({
            baseURL,
            headers: { 'Authorization': `Bearer ${token}` }
        });
    }

    /**
     * Fetches a user by their ID.
     * @param {number} userId - The ID of the user.
     * @returns {Promise<ApiResponse<User>>} The response containing the user data.
     */
    async getUser(userId: number): Promise<ApiResponse<User>> {
        const response = await this.httpClient.get<User>(`/users/${userId}`);
        return {
            data: response.data,
            status: response.status,
            statusText: response.statusText
        };
    }

    /**
     * Fetches a list of users.
     * @returns {Promise<ApiResponse<User[]>>} The response containing the list of users.
     */
    async getUsers(): Promise<ApiResponse<User[]>> {
        const response = await this.httpClient.get<User[]>('/users');
        return {
            data: response.data,
            status: response.status,
            statusText: response.statusText
        };
    }

    /**
     * Fetch pre event data using GraphQL.
     * @param {number} eventId - The ID of the event.
     * @returns {Promise<ApiResponse<PreEventDetails>>} The response containing the pre event details.
     */
    async getPreEventDetails(eventId: number): Promise<ApiResponse<PreEventDetails>> {
        const query = `{
            event(id: ${eventId}) {
                title
                eventType
                description
                dateTime
                speakerDetails {
                    name
                }
                host {
                    name
                }
            }
        }`;

        const variables = {
            eventId
        };

       try {
            const response = await this.httpClient.post<{ data: PreEventDetails }>('/gql', { query, variables });
            return {
                data: response.data.data,
                status: response.status,
                statusText: response.statusText
            };
        } catch (error) {
            console.error('Error fetching and storing event details:', error);
            throw error;
        }
    }
}
