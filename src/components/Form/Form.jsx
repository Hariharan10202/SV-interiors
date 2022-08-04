import React from 'react';
import { Form, Input, TextArea, Button, Dropdown } from 'semantic-ui-react';

import { Places } from '../../places';

import ReactLoading from 'react-loading';

const FormExampleFieldControlId = ({ files, uploadProgress, InputHandler, dropDownHandler }) => (
  <>
    <Form.Group widths='equal'>
      <Form.Field
        id='Landmark Name'
        control={Input}
        label='Landmark name'
        onChange={InputHandler}
        placeholder='Land mark'
        required={true}
      />
    </Form.Group>
    <Form.Field
      id='Address'
      control={TextArea}
      onChange={InputHandler}
      style={{ resize: 'none' }}
      label='Address'
      placeholder='Address'
      required={true}
    />
    <Form.Field
      id='Location'
      control={Input}
      onChange={InputHandler}
      label='Location'
      placeholder='Location'
      required={true}
    />
    <Dropdown
      placeholder='Select Place'
      id='Place'
      search
      onChange={(event, { value }) => dropDownHandler(value)}
      selection
      style={{ marginBottom: '20px' }}
      options={Places}
      required={true}
    />
    {(!files.length !== 0 && !uploadProgress) || uploadProgress === 100 ? (
      <div style={{ width: 'fit-content' }}>
        <Form.Field
          id='form-button-control-public'
          control={Button}
          content='Confirm'
          label='Submit'
        />
      </div>
    ) : (
      <ReactLoading type='bars' color='black' />
    )}
  </>
);

export default FormExampleFieldControlId;
