// @flow

let config = {
	Meteor: null,
};

type Config = {
	Meteor: Object,
};

function setTSchemaConfig({Meteor}: Config) {
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
