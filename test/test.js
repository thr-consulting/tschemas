import 'babel-polyfill'
import 'jsdom-global/register';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount, shallow} from 'enzyme';
import React, {Component} from 'react';
import TPropTypes from '../lib';

chai.use(chaiEnzyme());

const routerLocation = {
	hash: '',
	pathname: '/',
	search: ',',
	state: {}
};

function RouterLocationComponent(props) {
	return <div/>;
}
RouterLocationComponent.propTypes = {
	routerLocation: TPropTypes.routerLocation.isRequired,
};

class Fixture extends Component {
	render() {
		return (
			<div>
				<RouterLocationComponent routerLocation={routerLocation}/>
			</div>
		);
	}
}

const wrapper = mount(<Fixture/>);

describe('TPropTypes', () => {
	expect(wrapper.find(RouterLocationComponent).first()).to.have.prop('routerLocation');
	expect(wrapper.find(RouterLocationComponent).first()).to.have.prop('routerLocation').deep.equal({});
});
