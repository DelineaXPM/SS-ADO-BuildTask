import { SecretField } from "./SecretField";

/**
 * Model class for server secret
 */
export class Secret {
    name: string | undefined;
    folderId: number | undefined;
    id: number | undefined;
    siteId: number | undefined;
    secretTemplateId: number | undefined;
    secretPolicyId: number | undefined;
    active: boolean | undefined;
    checkedOut: boolean | undefined;
    checkOutEnabled: boolean | undefined;
    items: SecretField[] | undefined;

    /**
     * Gets a secret field
     * @param fieldName the name or slug of the secret field
     * @returns the requested secret field, null if not found
    */
    public getField(fieldName: string): SecretField | null {
        if (!this.items || this.items.length === 0) {
            return null;
        }
        
        for (let field of this.items) {
            if (field.fieldName === fieldName) {
                return field;
            }
            if (field.slug === fieldName) {
                return field;
            }
        }

        return null;
    }
}