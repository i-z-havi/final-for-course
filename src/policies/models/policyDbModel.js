const policyDbModel = (data) => {
    return {
        title: data.Title,
        subtitle: data.Subtitle,
        description: data.Description
    }
}
export default policyDbModel;