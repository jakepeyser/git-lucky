import React from 'react';
import { getLangs } from '../../utils'
import { TextField, AutoComplete, SelectField, MenuItem,
         DatePicker, RadioButtonGroup, RadioButton, RaisedButton } from 'material-ui';

export default ({ updateState, invokeSearch, curFilter, following, curLang }) => (
  <div id="search">
    <form onSubmit={ invokeSearch }>
      <TextField
        hintText="Search..."
        fullWidth={ true }
        onChange={ (evt) => updateState('search', evt.target.value) }
      />
      <div className="search-filters">
        <div className="filter-selector">
          <h3>Filter by:</h3>
          <RadioButtonGroup name="filterBy" defaultSelected="username"
            onChange={ (evt, val) => updateState('filter', val) }>
            <RadioButton
              value="username"
              label="User"
            />
            <RadioButton
              value="dates"
              label="Date Range"
            />
            <RadioButton
              value="language"
              label="Language"
            />
          </RadioButtonGroup>
        </div>
        <div className="filter">
          <AutoComplete
            hintText="gaearon"
            dataSource={ following.map(user => user.username) }
            onUpdateInput={ (val) => updateState('username', val) }
            maxSearchResults={ 10 }
            floatingLabelText="Username"
            style={{ display: curFilter === 'username' ? 'inline-block' : 'none' }}
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
              style={{ display: curFilter === 'dates' ? 'inline-block' : 'none' }}
            fullWidth={ true }
            />
            <DatePicker
              hintText="Before"
              floatingLabelText="Max Date"
              firstDayOfWeek={0}
              autoOk={ true }
              maxDate={ new Date() }
              onChange={ (evt, date) => updateState('beforeDate', date) }
              style={{ display: curFilter === 'dates' ? 'inline-block' : 'none' }}
            fullWidth={ true }
            />
          </div>
          <SelectField
            floatingLabelText="Language"
            maxHeight={ 200 }
            fullWidth={ true }
            value={ curLang }
            onChange={ (evt, ind, val) => updateState('language', val) }
            style={{ display: curFilter === 'language' ? 'inline-block' : 'none' }}
          >
          {
            getLangs().map(lang =>
              <MenuItem key={ lang } value={ lang } primaryText={ lang } />
            )
          }
          </SelectField>
        </div>
      </div>
      <RaisedButton
        label="Search"
        type="submit"
        fullWidth={ true }
        style={{ marginTop: '15px' }}
      />
    </form>
  </div>
);
