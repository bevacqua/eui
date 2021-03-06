import React, {
  Component,
} from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalOverlay,
  EuiRange,
  EuiSwitch,
} from '../../../../src/components';

function makeId() {
  return Math.random().toString(36).substr(2, 5);
}

export class ModalExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      isSwitchChecked: true,
    };

    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  onSwitchChange = () => {
    this.setState({
      isSwitchChecked: !this.state.isSwitchChecked,
    });
  }

  closeModal() {
    this.setState({ isModalVisible: false });
  }

  showModal() {
    this.setState({ isModalVisible: true });
  }

  render() {
    const formSample = (
      <EuiForm>
        <EuiFormRow>
          <EuiSwitch
            id={makeId()}
            name="popswitch"
            label="Isn't this modal form cool?"
            checked={this.state.isSwitchChecked}
            onChange={this.onSwitchChange}
          />
        </EuiFormRow>

        <EuiFormRow
          id={makeId()}
          label="A text field"
        >
          <EuiFieldText name="popfirst" />
        </EuiFormRow>

        <EuiFormRow
          id={makeId()}
          label="Range"
          helpText="Some help text for the range"
        >
          <EuiRange
            min={0}
            max={100}
            name="poprange"
          />
        </EuiFormRow>
      </EuiForm>
    );


    let modal;

    if (this.state.isModalVisible) {
      modal = (
        <EuiModalOverlay>
          <EuiModal
            onClose={this.closeModal}
            style={{ width: '800px' }}
          >
            <EuiModalHeader>
              <EuiModalHeaderTitle >
                Form in a modal
              </EuiModalHeaderTitle>
            </EuiModalHeader>

            <EuiModalBody>
              {formSample}
            </EuiModalBody>

            <EuiModalFooter>
              <EuiButtonEmpty
                onClick={this.closeModal}
                size="s"
              >
                Cancel
              </EuiButtonEmpty>

              <EuiButton
                onClick={this.closeModal}
                size="s"
                fill
              >
                Save
              </EuiButton>
            </EuiModalFooter>
          </EuiModal>
        </EuiModalOverlay>
      );
    }
    return (
      <div>
        <EuiButton onClick={this.showModal}>
          Show Modal
        </EuiButton>

        {modal}
      </div>
    );
  }
}
