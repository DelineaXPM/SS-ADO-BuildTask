import tl = require("azure-pipelines-task-lib/task");

import { Configuration } from "./Configuration";
import { UserCredential } from "./UserCredential";
import { Secret } from "./Secret";
import { SecretField } from "./SecretField";

/**
 * Represents the parameters used to create a
 * secret server configuration and to specify
 * the secret and key/values to read from it.
 */
export class ServerTaskParameters {

    public config: Configuration | undefined;
    public secretId: string | undefined;
    public fieldFilter: string[] | undefined;
    public variablePrefix: string | undefined;
    public comment: string | undefined;

    /**
     * Builds the vault configuration and assigns other
     * task variables from the pipeline parameters.
     */
    public getTaskParameters(): ServerTaskParameters {
        this.config = new Configuration();
        this.config.credentials = new UserCredential();
        this.config.serverUrl = tl.getInput("ServerUrl", false);
        this.config.credentials.username = tl.getInput("Username", true);
        this.config.credentials.password = tl.getInput("Password", true);
        this.secretId = tl.getInput("SecretId", true);
        this.fieldFilter = tl.getDelimitedInput("FieldFilter", ",", false);
        this.variablePrefix = tl.getInput("VariablePrefix", false);
        let comment = tl.getInput("Comment", false);
        if (comment !== undefined && comment.length > 0) {
            this.comment = comment;
        }
        return this;
    }

    /**
     * Gets the list of field names to retrieve from the secret
     * @param secret used to get the list of names
     * @returns array of data keys to read from the secret
     */
    public getFieldNames(secret: Secret): string[] {
        if (this.getAllFields()) {
            return this.getAllFieldNames(secret);
        }

        if (this.fieldFilter) {
            return this.fieldFilter;
        }

        return [] as string[];
    }

    /**
     * Gets the name to use for the variable to store the field value
     * @param fieldName is the field name or slug in the secret field
     */
    public getVariableName(fieldName: string): string {
        return this.variablePrefix ? this.variablePrefix + fieldName : fieldName;
    }

    /**
     * Determines if all the fields should be read from the secret.
     * @returns true if the filter is "*" or undefined/empty, false otherwise.
     */
    private getAllFields(): boolean {
        if (this.fieldFilter && this.fieldFilter.length > 0) {
            if (this.fieldFilter.length === 1 && this.fieldFilter[0] === "*") {
                return true;
            }
            else {
                return false;
            }
        } else {
            return true;
        }
    }

    /**
     * Gets all the field names from the given secret.
     * @param secret is the secret from which to read the field names.
     */
    private getAllFieldNames(secret: Secret): string[] {
        if (!secret) {
            return [] as string[];
        }

        if (!secret.items) {
            return [] as string[];
        }

        let fieldNames: string[] = new Array(secret.items.length);

        for (var i = 0; i < secret.items.length; i++) {
            let field: SecretField = secret.items[i];
            if (field.fieldName) {
                fieldNames[i] = field.fieldName;
            }
            else if (field.slug) {
                fieldNames[i] = field.slug;
            }
            else {
                fieldNames[i] = "";
            }
        }

        return fieldNames;
    }
}
