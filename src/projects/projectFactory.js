const projectList = {
    getStarted: {
        displayName: "GetStarted",
        files: new Map(
            ["config.h",null],
            ["GetStarted.ino",null],
            ["iothub_client_sample_mqtt.cpp",null],
            ["iothub_client_sample_mqtt.h",null],
            ["utility.cpp",null],
            ["utility.h",null],
        )
    },
    shakeShake: {
        displayName: "Shake Shake",
        files: ["ShakeShake.ino", "iothub_client_sample_mqtt.cpp", "iothub_client_sample_mqtt.h",
            new Map(
                ["azureFunction", ["function.json", "index.js", "package.json"]]
            )
        ],
    }
}

class ProjectFactory {
    getProject(projectName) {
        if(!Object.keys(projectList).includes(projectName)) {
            return null;
        }

    }

    getProjectList() {
        return Object.keys(projectList);
    }
}


export default ProjectFactory