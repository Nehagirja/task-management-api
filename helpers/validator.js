class validator {
    static validateTaskInfo(taskInfo, taskData){
        if(taskInfo.hasOwnProperty("task") && 
        taskInfo.hasOwnProperty("taskId") && 
        taskInfo.hasOwnProperty("description") &&
        taskInfo.hasOwnProperty("flag") &&
        this.validateUniqueTaskId(taskInfo, taskData)) {
            return {
                "status": true,
                "message": "Task has beeen added"
            };
        }
    if(!this.validateUniqueTaskId(taskInfo, taskData)){
        return {
            "status": false,
            "message": "Task id has to be unique"
        };
    } return {
            "status": false,
            "message": "Task info is malformed. Please mention all properties."
    }
}

static validateUniqueTaskId(taskInfo, taskData){
    let valueFound = taskId.tasks.some( el => el.taskId === taskInfo.taskId);
    if(valueFound) return false;
    return true;
}
}

module.exports = validator;