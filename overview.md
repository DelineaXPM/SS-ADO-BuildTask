# Delinea Platform Secret Server Task for Azure DevOps

The task in this extension retrieves secrets for use in both Build and Release pipelines in Azure DevOps. It sets environment variables for each requested field, using the slug name (with an optional prefix) as the variable name. This functionality works for both the Delinea Platform and Delinea Secret Server, allowing pipelines to securely consume secrets from either product.

## Configuration

To retrieve secrets, the task requires:

- Url for the source Delinea Platform Or Secret Server
- Username
- Password
- Secret Id

It is recomended that the password be stored in Azure Key Vault. Using this approach requires an additional task in the pipeline to retrieve the password first which can then be referenced as an environment variable in the DSS task configuration.

### Field Filter

Using * for the field filter will retrieve all the fields from the secret. A specific field/slug name (or multiple names separated by commas) can also be configured.

### Variable Prefix

Environment variable names are constructed using the configured variable prefix and the slug name. For example, with a variable prefix of "DSS_", the field with slug name "xyz" will result in an environment variable with name "DSS_xyz".

![Delinea Platform Secret Server Task Configuration](https://github.com/DelineaXPM/SS-ADO-BuildTask/raw/main/images/task-config.png)
