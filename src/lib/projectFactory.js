import { Map } from 'immutable';
import * as CONSTANTS from '../constants/localStorageKeys';

export const getAllProjects = () => {
	return Map({
		GetStarted: Map({
			jsCode: require('../data/GetStarted/mockedSample.js'),
			displayName: "Get Started",
            config: Map({
                connectionString: localStorage.getItem(CONSTANTS.GETSTARTED_CONNECTIONSTRING) ? localStorage.getItem(CONSTANTS.GETSTARTED_CONNECTIONSTRING) : "",
            }),
			files: Map({
				"GetStarted.ino": Map({
					type: "file",
					format: "cpp",
					data: require('../data/GetStarted/GetStarted.ino'),
				}),
				"iothub_client_sample_mqtt.h": Map({
					type: "file",
					format: "cpp",
					data: require('../data/GetStarted/iothub_client_sample_mqtt.h'),
				}),
				"iothub_client_sample_mqtt.cpp": Map({
					type: "file",
					format: "cpp",
					data: require('../data/GetStarted/iothub_client_sample_mqtt.cpp'),
				}),
				"utility.h": Map({
					type: "file",
					format: "cpp",
					data: require('../data/GetStarted/utility.h'),
				}),
				"utility.cpp": Map({
					type: "file",
					format: "cpp",
					data: require('../data/GetStarted/utility.cpp'),
				}),
				"config.h": Map({
					type: "file",
					format: "cpp",
					data: require('../data/GetStarted/config.h'),
				}),
			})
		}),
		ShakeShake: Map({
			jsCode: require('../data/ShakeShake/mockedSample.js'),
			displayName: "Shake Shake",
            config: Map({
                connectionString: localStorage.getItem(CONSTANTS.SHAKESHAKE_CONNECTIONSTRING) ? localStorage.getItem(CONSTANTS.SHAKESHAKE_CONNECTIONSTRING) : "",
                topic: localStorage.getItem(CONSTANTS.SHAKESHAKE_TOPIC) ? localStorage.getItem(CONSTANTS.SHAKESHAKE_TOPIC) : "song",
            }),
            deployLink: "https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure-Samples%2Fiot-devkit-web-simulator%2Fsource%2Fsrc%2Fdata%2FShakeShake%2FazureDeploy.json",
			files: Map({
				"azureFunction": Map({
					type: "directory",
					data: Map({
						"function.json": Map({
							type: "file",
							format: "json",
							data: require('../data/ShakeShake/azureFunction/function.json'),
						}),
						"run.csx": Map({
							type: "file",
							format: "csharp",
							data: require('../data/ShakeShake/azureFunction/run.csx'),
						}),
						"project.json": Map({
							type: "file",
							format: "json",
							data: require('../data/ShakeShake/azureFunction/project.json'),
						}),
					})
				}),
				"ShakeShake.ino": Map({
					type: "file",
					format: "cpp",
                    data: localStorage.getItem(CONSTANTS.SHAKESHAKE_TOPIC) ? require('../data/ShakeShake/ShakeShake.ino').replace(/("{\\"topic\\":\\")[^\\]*(\\"}";)/, '$1' + localStorage.getItem(CONSTANTS.SHAKESHAKE_TOPIC) + '$2') : require('../data/ShakeShake/ShakeShake.ino'),
				}),
				"ShakeUI.h": Map({
					type: "file",
					format: "cpp",
					data: require('../data/ShakeShake/ShakeUI.h'),
				}),
				"ShakeUI.cpp": Map({
					type: "file",
					format: "cpp",
					data: require('../data/ShakeShake/ShakeUI.cpp'),
				}),
			}),
		}),
	});
}