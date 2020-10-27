import { UserCredential } from "./UserCredential";

/**
 * Constants for default configuration values
 */
const DefaultApiPathUri = "api/v1";
const DefaultTokenPathUri = "oauth2/token";

/**
 * Model which defines vault configuration parameters
 */
export class Configuration {
    credentials: UserCredential | undefined;
    serverUrl: string | undefined;
    apiPathUri: string | undefined;
    tokenPathUri: string | undefined;

    /**
    * Validates server configurations and populates unspecified properties
    * with their default values.
    * @returns the server configuration updated with default values for unspecified properties
    */
    public setDefaults(): Configuration {
        if (!this.apiPathUri) {
            this.apiPathUri = DefaultApiPathUri;
        }

        if (!this.tokenPathUri) {
            this.tokenPathUri = DefaultTokenPathUri;
        }

        return this;
    }

    /**
    * Formats the resource url.
    * @param resource the resource type
    * @param path the path to the resource
    * @returns the url to the resource
    */
    public formatUrl(resource: string, path: string): string {
        if (!this.serverUrl) {
            return "";
        }

        if (resource === "token") {
            return `${this.serverUrl}/${this.tokenPathUri}`;
        }

        return `${this.serverUrl}/${this.apiPathUri}/${resource}/${path}`;
    }
}