let config = null;

function setTSchemaConfig({Meteor}) {
	config = {
		Meteor,
	};
}

function getTSchemaConfig() {
	return config;
}

export {
	setTSchemaConfig,
	getTSchemaConfig,
};
