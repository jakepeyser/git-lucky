import React from 'react';
import { getLangs } from '../../utils'
import { AutoComplete, SelectField, MenuItem,
         DatePicker, RadioButtonGroup, RadioButton } from 'material-ui';

const filters = {
  username: 'User',
  dates: 'Date Range',
  language: 'Language'
}

const filterStyle = (curVal, val) =>
  ({ display: curVal === val ? 'inline-block' : 'none' });

export default ({ updateState, curFilter, following, curLang }) => (
  <div className="filters">
    <div className="filter-selector">
      <h3>Filter by:</h3>
      <RadioButtonGroup name="filterBy" defaultSelected={ curFilter }
        onChange={ (evt, val) => updateState('filter', val) }>
      { // Filter options defined above
        Object.keys(filters).map(type => {
          return <RadioButton key={ type } value={ type } label={ filters[type] } />
        })
      }
      </RadioButtonGroup>
    </div>
    <div className="filter">
      <AutoComplete
        hintText="gaearon"
        dataSource={ following.map(user => user.username) }
        onUpdateInput={ (val) => updateState('username', val) }
        maxSearchResults={ 10 }
        floatingLabelText="Username"
        style={ filterStyle(curFilter, 'username') }
        fullWidth={ true }
      />
      <div className="date-range">
        <DatePicker
          hintText="After"
          floatingLabelText="Min Date"
          firstDayOfWeek={0}
          autoOk={ true }
          maxDate={ new Date() }
          onChange={ (evt, date) => updateState('afterDate', date) }
          style={ filterStyle(curFilter, 'dates') }
          fullWidth={ true }
        />
        <DatePicker
          hintText="Before"
          floatingLabelText="Max Date"
          firstDayOfWeek={0}
          autoOk={ true }
          maxDate={ new Date() }
          onChange={ (evt, date) => updateState('beforeDate', date) }
          style={ filterStyle(curFilter, 'dates') }
          fullWidth={ true }
        />
      </div>
      <SelectField
        floatingLabelText="Language"
        maxHeight={ 200 }
        fullWidth={ true }
        value={ curLang }
        onChange={ (evt, ind, val) => updateState('language', val) }
        style={ filterStyle(curFilter, 'language') }
      >
      { // List all of the first-class langs supported by GitHub
        getLangs().map(lang =>
          <MenuItem key={ lang } value={ lang } primaryText={ lang } />
        )
      }
      </SelectField>
    </div>
  </div>
);
