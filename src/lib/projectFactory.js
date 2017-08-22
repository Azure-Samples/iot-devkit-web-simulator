import { Map } from 'immutable';

export const getAllProjects = () => {
	return Map({
		GetStarted: Map({
			jsCode: require('../data/GetStarted/mockedSample.js'),
			displayName: "Get Started",
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
			files: Map({
				"azureFunction": Map({
					type: "directory",
					data: Map({
						"function.json": Map({
							type: "file",
							format: "json",
							data: require('../data/ShakeShake/azureFunction/function.json'),
						}),
						"index.js": Map({
							type: "file",
							format: "javascript",
							data: require('../data/ShakeShake/azureFunction/index.js'),
						}),
						"package.json": Map({
							type: "file",
							format: "json",
							data: require('../data/ShakeShake/azureFunction/package.json'),
						}),
					})
				}),
				"ShakeShake.ino": Map({
					type: "file",
					format: "cpp",
					data: require('../data/ShakeShake/ShakeShake.ino'),
				}),
				"_iothub_client_sample_mqtt.h": Map({
					type: "file",
					format: "cpp",
					data: require('../data/ShakeShake/_iothub_client_sample_mqtt.h'),
				}),
				"_iothub_client_sample_mqtt.cpp": Map({
					type: "file",
					format: "cpp",
					data: require('../data/ShakeShake/_iothub_client_sample_mqtt.cpp'),
				}),
			}),
		}),
	});
}