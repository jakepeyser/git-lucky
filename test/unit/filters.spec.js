import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Filters from '../../browser/app/components/search/Filters';
import muiTheme from '../../browser/app/components/mui-theme'
const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

describe('<Filters/>', function() {

  describe('basic component', function() {
    let wrapper;
    before(function() {
      wrapper = shallowWithContext(<Filters following={[]}/>);
    });

    it('should render the wrapper and child components', function() {
      expect(wrapper.node.props.className).to.equal('filters');
      expect(wrapper.find('.filter-selector')).to.have.length(1);
      expect(wrapper.find('.filter')).to.have.length(1);
    });
  });
});
