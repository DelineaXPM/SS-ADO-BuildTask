# Thycotic Secret Server Task for Azure DevOps

The task in this extension allows the retrieval of secrets for use in both Build and Release pipelines in Azure DevOps. The task sets environment variables for the requested fields with variable names based on the slug names with an optional configured prefix. 

## Configuration

To retrieve secrets, the task requires:

- Url for the source Secret Server
- Api path uri (e.g. /api/v1)
- Token path uri (e.g. /oauth2/token)
- Username
- Password
- Secret Id

It is recomended that the password be stored in Azure Key Vault. Using this approach requires an additional task in the pipeline to retrieve the password first which can then be referenced as an environment variable in the TSS task configuration.

### Field Filter

Using * for the field filter will retrieve all the fields from the secret. A specific field/slug name (or multiple names separated by commas) can also be configured.

### Variable Prefix

Environment variable names are constructed using the configured variable prefix and the slug name. For example, with a variable prefix of "TSS_", the field with slug name "xyz" will result in an environment variable with name "TSS_xyz".

![Thycotic Secret Server Task Configuration](images/task-config.png)