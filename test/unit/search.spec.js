import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Search from '../../browser/app/components/search/Search';
import muiTheme from '../../browser/app/components/mui-theme'
const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

describe('<Search/>', function() {

  describe('basic component', function() {
    let wrapper;
    before(function() {
      wrapper = shallowWithContext(<Search repos={[]}/>);
    });

    it('should render the wrapper and child components', function() {
      expect(wrapper.node.props.id).to.equal('search');
      const form = wrapper.find('form');
      expect(form).to.have.length(1);
    });
  });
});
