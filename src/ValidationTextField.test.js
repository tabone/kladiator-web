import React from 'react'
import { shallow } from 'enzyme'
import Textfield from '@material-ui/core/Textfield'
import {
  VALIDITY_VALID,
  default as ValidationTextField
} from './ValidationTextField'

describe('ValidationTextField Component', () => {
  describe('Blurring for the first time', () => {
    let value = null
    let onBlur = null
    let onBlurEvent = null
    let onValidation = null

    beforeEach(() => {
      onBlurEvent = {}
      onBlur = jest.fn()
      onValidation = jest.fn()
      value = 'textfield value'

      const wrapper = shallow(<ValidationTextField
        value={value}
        onBlur={onBlur}
        onValidation={onValidation} />)

      wrapper.props().onBlur(onBlurEvent)
    })

    it('should invoke the onBlur prop', () => {
      const onBlurCalls = onBlur.mock.calls
      expect(onBlurCalls.length).toBe(1)
      expect(onBlurCalls[0][0]).toBe(onBlurEvent)
    })

    it('should validate the textfield value', () => {
      const onValidationCalls = onValidation.mock.calls
      expect(onValidationCalls.length).toBe(1)
      expect(onValidationCalls[0][0]).toBe(value)
    })
  })

  describe('Blurring after the first blur', () => {
    let onBlur = null
    let onBlurEvent = null
    let onValidation = null

    beforeEach(() => {
      onBlurEvent = {}
      onBlur = jest.fn()
      onValidation = jest.fn()

      const wrapper = shallow(<ValidationTextField
        onBlur={onBlur}
        onValidation={onValidation} />)

      wrapper.props().onBlur()
      onBlur.mockClear()
      onValidation.mockClear()
      wrapper.props().onBlur(onBlurEvent)
    })

    it('should invoke the onBlur prop', () => {
      const onBlurCalls = onBlur.mock.calls
      expect(onBlurCalls.length).toBe(1)
      expect(onBlurCalls[0][0]).toBe(onBlurEvent)
    })

    it('should not validate the textfield value', () => {
      expect(onValidation.mock.calls.length).toBe(0)
    })
  })

  describe('Changing the textfield value before the first blur', () => {
    let onChange = null
    let onValidation = null
    let onChangeEvent = null

    beforeEach(() => {
      onChange = jest.fn()
      onValidation = jest.fn()
      onChangeEvent = { target: { value: 'new-textfield-value' } }

      const wrapper = shallow(<ValidationTextField
        onChange={onChange}
        onValidation={onValidation} />)

      wrapper.props().onChange(onChangeEvent)
    })

    it('should invoke the onChange prop', () => {
      const onChangeCalls = onChange.mock.calls
      expect(onChangeCalls.length).toBe(1)
      expect(onChangeCalls[0][0]).toBe(onChangeEvent)
    })

    it('should not validate the new textfield value', () => {
      expect(onValidation.mock.calls.length).toBe(0)
    })
  })

  describe('Changing the textfield value after the first blur', () => {
    let onChange = null
    let onValidation = null
    let onChangeEvent = null

    beforeEach(() => {
      onChange = jest.fn()
      onValidation = jest.fn()
      onChangeEvent = { target: { value: 'new-textfield-value' } }

      const wrapper = shallow(<ValidationTextField
        onChange={onChange}
        onValidation={onValidation} />)

      wrapper.props().onBlur()
      onValidation.mockClear()
      wrapper.props().onChange(onChangeEvent)
    })

    it('should invoke the onChange prop', () => {
      const onChangeCalls = onChange.mock.calls
      expect(onChangeCalls.length).toBe(1)
      expect(onChangeCalls[0][0]).toBe(onChangeEvent)
    })

    it('should validate the new textfield value', () => {
      const onValidationCalls = onValidation.mock.calls
      expect(onValidationCalls.length).toBe(1)
      expect(onValidationCalls[0][0]).toBe(onChangeEvent.target.value)
    })
  })

  describe('Fixing an invalid textfield value', () => {
    let wrapper = null
    let onValidityChange = null

    beforeEach(() => {
      onValidityChange = jest.fn()

      wrapper = shallow(<ValidationTextField
        onValidation={()=>{}}
        onValidityChange={onValidityChange} />)

      wrapper.setProps({ helperText: 'error-message' })
      onValidityChange.mockClear()
      wrapper.setProps({ helperText: VALIDITY_VALID })
    })

    it('should remove the error message', () => {
      expect(wrapper.props().helperText).toBe(null)
    })

    it('should not mark the textfield as invalid', () => {
      expect(wrapper.props().error).toBe(false)
    })

    it('should invoke the onValidityChange prop indicating that the value has been fixed', () => {
      const onValidityChangeCalls = onValidityChange.mock.calls
      expect(onValidityChangeCalls.length).toBe(1)
      expect(onValidityChangeCalls[0][0]).toBe(true)
    })
  })

  describe('Invalidating a valid textfield value', () => {
    let wrapper = null
    let helperText = null
    let onValidityChange = null

    beforeEach(() => {
      onValidityChange = jest.fn()
      helperText = 'error-message'

      wrapper = shallow(<ValidationTextField
        onValidation={()=>{}}
        onValidityChange={onValidityChange} />)

      wrapper.setProps({ helperText: VALIDITY_VALID })
      onValidityChange.mockClear()
      wrapper.setProps({ helperText })
    })

    it('should display the error message', () => {
      expect(wrapper.props().helperText).toBe(helperText)
    })

    it('should mark the textfield as invalid', () => {
      expect(wrapper.props().error).toBe(true)
    })

    it('should invoke the onValidityChange prop indicating that the value has been invalidated', () => {
      const onValidityChangeCalls = onValidityChange.mock.calls
      expect(onValidityChangeCalls.length).toBe(1)
      expect(onValidityChangeCalls[0][0]).toBe(false)
    })
  })

  describe('Changing a valid textfield value without invalidating it', () => {
    let wrapper = null
    let onValidityChange = null

    beforeEach(() => {
      onValidityChange = jest.fn()

      wrapper = shallow(<ValidationTextField
        onValidation={()=>{}}
        onValidityChange={onValidityChange} />)

      wrapper.setProps({ helperText: VALIDITY_VALID })
      onValidityChange.mockClear()
      wrapper.setProps({ helperText: VALIDITY_VALID })
    })

    it('should not display the error message', () => {
      expect(wrapper.props().helperText).toBe(null)
    })

    it('should not mark the textfield as invalid', () => {
      expect(wrapper.props().error).toBe(false)
    })

    it('should not invoke the onValidityChange prop', () => {
      expect(onValidityChange.mock.calls.length).toBe(0)
    })
  })

  describe('Changing an invalid textfield value without fixing it', () => {
    let wrapper = null
    let helperText = null
    let onValidityChange = null

    beforeEach(() => {
      onValidityChange = jest.fn()
      helperText = 'error-message'

      wrapper = shallow(<ValidationTextField
        onValidation={()=>{}}
        onValidityChange={onValidityChange} />)

      wrapper.setProps({ helperText })
      onValidityChange.mockClear()
      wrapper.setProps({ helperText })
    })

    it('should display the error message', () => {
      expect(wrapper.props().helperText).toBe(helperText)
    })

    it('should mark the textfield as invalid', () => {
      expect(wrapper.props().error).toBe(true)
    })

    it('should not invoke the onValidityChange prop', () => {
      expect(onValidityChange.mock.calls.length).toBe(0)
    })
  })

  describe('Changing an invalid textfield value to fix the current problem but fail on another criteria', () => {
    let wrapper = null
    let helperText = null
    let onValidityChange = null

    beforeEach(() => {
      onValidityChange = jest.fn()
      helperText = 'error-message'

      wrapper = shallow(<ValidationTextField
        onValidation={()=>{}}
        onValidityChange={onValidityChange} />)

      wrapper.setProps({ helperText: `${helperText}-old` })
      onValidityChange.mockClear()
      wrapper.setProps({ helperText })
    })

    it('should display the latest error message', () => {
      expect(wrapper.props().helperText).toBe(helperText)
    })

    it('should mark the textfield as invalid', () => {
      expect(wrapper.props().error).toBe(true)
    })

    it('should not invoke the onValidityChange prop', () => {
      expect(onValidityChange.mock.calls.length).toBe(0)
    })
  })

  describe('Validating a valid unvalidated textfield value', () => {
    let wrapper = null
    let onValidityChange = null

    beforeEach(() => {
      onValidityChange = jest.fn()

      wrapper = shallow(<ValidationTextField
        helperText={null}
        onValidation={()=>{}}
        onValidityChange={onValidityChange} />)

      wrapper.setProps({ helperText: VALIDITY_VALID })
    })

    it('should not display the error message', () => {
      expect(wrapper.props().helperText).toBe(null)
    })

    it('should not mark the textfield as invalid', () => {
      expect(wrapper.props().error).toBe(false)
    })

    it('should invoke the onValidityChange prop indicating that the value is valid', () => {
      const onValidityChangeCalls = onValidityChange.mock.calls
      expect(onValidityChangeCalls.length).toBe(1)
      expect(onValidityChangeCalls[0][0]).toBe(true)
    })
  })

  describe('Validating an invalid unvalidated textfield value', () => {
    let wrapper = null
    let helperText = null
    let onValidityChange = null

    beforeEach(() => {
      helperText = 'error-message'
      onValidityChange = jest.fn()

      wrapper = shallow(<ValidationTextField
        helperText={null}
        onValidation={()=>{}}
        onValidityChange={onValidityChange} />)

      wrapper.setProps({ helperText })
    })

    it('should display the error message', () => {
      expect(wrapper.props().helperText).toBe(helperText)
    })

    it('should mark the textfield as invalid', () => {
      expect(wrapper.props().error).toBe(true)
    })

    it('should invoke the onValidityChange prop indicating that the value is invalid', () => {
      const onValidityChangeCalls = onValidityChange.mock.calls
      expect(onValidityChangeCalls.length).toBe(1)
      expect(onValidityChangeCalls[0][0]).toBe(false)
    })
  })
})
