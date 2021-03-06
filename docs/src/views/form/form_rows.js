import React, {
  Component,
} from 'react';

import {
  EuiCheckboxGroup,
  EuiFieldNumber,
  EuiFieldPassword,
  EuiFieldSearch,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiRange,
  EuiRadioGroup,
  EuiSelect,
  EuiSwitch,
  EuiTextArea,
} from '../../../../src/components';

// Don't use this, make proper ids instead. This is just for the example.
function makeId() {
  return Math.random().toString(36).substr(2, 5);
}

export default class extends Component {
  constructor(props) {
    super(props);

    const idPrefix = makeId();

    this.state = {
      isSwitchChecked: false,
      checkboxes: [{
        id: `${idPrefix}0`,
        label: 'Option one',
      }, {
        id: `${idPrefix}1`,
        label: 'Option two is checked by default',
      }, {
        id: `${idPrefix}2`,
        label: 'Option three',
      }],
      checkboxIdToSelectedMap: {
        [`${idPrefix}1`]: true,
      },
      radios: [{
        id: `${idPrefix}4`,
        label: 'Option one',
      }, {
        id: `${idPrefix}5`,
        label: 'Option two is selected by default',
      }, {
        id: `${idPrefix}6`,
        label: 'Option three',
      }],
      radioIdSelected: `${idPrefix}5`,
    };
  }

  onSwitchChange = () => {
    this.setState({
      isSwitchChecked: !this.state.isSwitchChecked,
    });
  }

  onCheckboxChange = optionId => {
    const newCheckboxIdToSelectedMap = Object.assign({}, this.state.checkboxIdToSelectedMap, {
      [optionId]: !this.state.checkboxIdToSelectedMap[optionId],
    });

    this.setState({
      checkboxIdToSelectedMap: newCheckboxIdToSelectedMap,
    });
  }

  onRadioChange = optionId => {
    this.setState({
      radioIdSelected: optionId,
    });
  }

  render() {
    return (
      <EuiForm>
        <EuiFormRow
          id={makeId()}
          label="Text field"
          helpText="I am some friendly help text."
        >
          <EuiFieldText name="first" />
        </EuiFormRow>

        <EuiFormRow
          id={makeId()}
          label="Text field with icon"
        >
          <EuiFieldText
            defaultValue="Text field with customizable icon"
            icon="user"
          />
        </EuiFormRow>

        <EuiFormRow
          id={makeId()}
          label="Number field"
          helpText="Any number between 1 and 5"
        >
          <EuiFieldNumber
            name="number"
            min={1}
            max={5}
          />
        </EuiFormRow>

        <EuiFormRow
          id={makeId()}
          label="Password"
        >
          <EuiFieldPassword defaultValue="password" />
        </EuiFormRow>

        <EuiFormRow
          id={makeId()}
          label="Search"
        >
          <EuiFieldSearch />
        </EuiFormRow>

        <EuiFormRow
          label="Text area"
          id={makeId()}
        >
          <EuiTextArea name="textarea"/>
        </EuiFormRow>

        <EuiFormRow
          label="Select"
          id={makeId()}
        >
          <EuiSelect
            options={[
              { value: 'option_one', text: 'Option one' },
              { value: 'option_two', text: 'Option two' },
              { value: 'option_three', text: 'Option three' },
            ]}
          />
        </EuiFormRow>

        <EuiFormRow
          id={makeId()}
          label="Range"
        >
          <EuiRange
            min={0}
            max={100}
            name="range"
            id="range"
          />
        </EuiFormRow>

        <EuiFormRow
          label="Use a switch instead of a single checkbox"
        >
          <EuiSwitch
            name="switch"
            id={makeId()}
            label="Should we do this?"
            checked={this.state.isSwitchChecked}
            onChange={this.onSwitchChange}
          />
        </EuiFormRow>

        <EuiFormRow
          id={makeId()}
          label="Checkboxes"
        >
          <EuiCheckboxGroup
            options={this.state.checkboxes}
            idToSelectedMap={this.state.checkboxIdToSelectedMap}
            onChange={this.onCheckboxChange}
          />
        </EuiFormRow>

        <EuiFormRow
          id={makeId()}
          label="Radio"
        >
          <EuiRadioGroup
            options={this.state.radios}
            idSelected={this.state.radioIdSelected}
            onChange={this.onRadioChange}
          />
        </EuiFormRow>
      </EuiForm>
    );
  }
}
