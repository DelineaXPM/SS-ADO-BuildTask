/**
 * Model returned for grant requests.
 */
export class AccessGrant {
    access_token: string | undefined;
    refresh_token: string | undefined;
    token_type: string | undefined;
    expires_in: number | undefined;
}